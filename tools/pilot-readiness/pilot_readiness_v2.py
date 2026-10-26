#!/usr/bin/env python3
"""Versioned self-reported evidence assessment; no approval or semantic verification."""
import argparse
import copy
import datetime
import json
from pathlib import Path
import re

CRITERIA = json.loads((Path(__file__).parent / 'v2' / 'criteria.json').read_text())
KEYS = [c['key'] for c in CRITERIA]
GATES = ['quality_review', 'workflow_owner', 'human_oversight', 'data_approval', 'rollback']
DECISIONS = {'hold': 'WITHHOLD EXPANSION', 'further': 'FURTHER ASSESSMENT REQUIRED',
             'complete': 'COMPLETE RECORD - HUMAN DECISION REQUIRED', 'offline': 'OFFLINE EXPERIMENT - NO ROLLOUT DECISION'}
WARNING = 'All answers, acceptance claims and issue positions are self-reported, not independently verified. No result authorises operation, expansion or deployment, certifies compliance or proves business value.'


def trim(value):
    # Match ECMAScript String.trim, including BOM and excluding NEL.
    return value.strip(' \t\n\r\v\f\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff')


def empty_record():
    return {'schema_version': 2, 'methodology_version': '2.0', 'pilot': '', 'fictional': False,
            'details': dict.fromkeys(['process', 'outcome', 'date', 'reference'], ''),
            'scope': {'activity': 'unknown', 'data': 'unknown', 'external_effects': 'unknown', 'people_impact': 'unknown', 'proposed_scale': '', 'current_version': ''},
            'material_issue': {'status': 'unknown', 'summary': '', 'owner': '', 'action': 'unknown', 'next_step': ''},
            'evidence': {k: {'status': 'unknown', 'reference': '', 'note': ''} for k in KEYS}}


def keys(value, required, label, optional=()):
    if not isinstance(value, dict):
        raise ValueError(label + ' must be an object')
    if set(value) - set(required) - set(optional):
        raise ValueError(label + ': unsupported fields; nothing was discarded')
    if set(required) - set(value):
        raise ValueError(label + ': missing required fields')


def text(value, maximum, label):
    if not isinstance(value, str) or len(value.encode('utf-16-le', 'surrogatepass')) // 2 > maximum:
        raise ValueError(f'{label} must be text of at most {maximum} characters')


def choice(value, allowed, label):
    if not isinstance(value, str) or value not in allowed:
        raise ValueError(label + ': invalid choice')


def valid_date(value):
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', value) or int(value[:4]) < 1900:
        return False
    try:
        return datetime.date.fromisoformat(value).isoformat() == value
    except ValueError:
        return False


def validate_v1(p):
    if not isinstance(p, dict) or not isinstance(p.get('pilot'), str) or not trim(p['pilot']):
        raise ValueError('V1 pilot must be a non-empty string')
    if 'schema_version' in p and (type(p['schema_version']) not in (int, float) or p['schema_version'] != 1):
        raise ValueError('Unsupported source schema version')
    keys(p.get('evidence'), KEYS, 'V1 evidence')
    for k in KEYS:
        r = p['evidence'][k]
        if not isinstance(r, dict) or r.get('status') not in ('yes', 'no', 'unknown') or not isinstance(r.get('note'), str) or (r['status'] == 'yes' and not trim(r['note'])):
            raise ValueError('Invalid V1 evidence record')
        text(r['note'], 3000, k)
    text(p['pilot'], 200, 'V1 pilot')


def validate(p):
    keys(p, ['schema_version', 'methodology_version', 'pilot', 'fictional', 'details', 'scope', 'material_issue', 'evidence'], 'record', ['migration'])
    if type(p['schema_version']) not in (int, float) or p['schema_version'] != 2 or p['methodology_version'] != '2.0':
        raise ValueError('Unsupported schema or methodology version; nothing was discarded')
    text(p['pilot'], 200, 'pilot')
    if type(p['fictional']) is not bool:
        raise ValueError('fictional must be boolean')
    keys(p['details'], ['process', 'outcome', 'date', 'reference'], 'details')
    for k, v in p['details'].items():
        text(v, 10 if k == 'date' else 500, k)
    if p['details']['date'] and not valid_date(p['details']['date']):
        raise ValueError('Assessment date must be a real YYYY-MM-DD date')
    s = p['scope']
    keys(s, ['activity', 'data', 'external_effects', 'people_impact', 'proposed_scale', 'current_version'], 'scope')
    choice(s['activity'], ['unknown', 'offline_experiment', 'bounded_internal_pilot', 'real_world_workflow', 'wider_deployment'], 'activity')
    choice(s['data'], ['unknown', 'synthetic_public', 'real_data', 'sensitive_data'], 'data')
    for k in ['external_effects', 'people_impact']:
        choice(s[k], ['yes', 'no', 'unknown'], k)
    for k in ['proposed_scale', 'current_version']:
        text(s[k], 500, k)
    i = p['material_issue']
    keys(i, ['status', 'summary', 'owner', 'action', 'next_step'], 'material_issue')
    choice(i['status'], ['none_identified', 'unresolved', 'unknown'], 'material issue status')
    choice(i['action'], ['investigate', 'contain', 'resolve', 'determine', 'unknown'], 'material issue action')
    for k in ['summary', 'owner', 'next_step']:
        text(i[k], 200 if k == 'owner' else 3000, k)
    keys(p['evidence'], KEYS, 'evidence')
    for k, r in p['evidence'].items():
        keys(r, ['status', 'reference', 'note'], k)
        choice(r['status'], ['yes', 'no', 'unknown'], k)
        text(r['reference'], 500, k + ' reference')
        text(r['note'], 3000, k + ' note')
    if 'migration' in p:
        m = p['migration']
        keys(m, ['source_schema_version', 'source_record', 'date_reviewed'], 'migration')
        if type(m['source_schema_version']) not in (int, float) or m['source_schema_version'] != 1 or type(m['date_reviewed']) is not bool:
            raise ValueError('Invalid migration metadata')
        validate_v1(m['source_record'])
    if len(json.dumps(p, ensure_ascii=False, separators=(',', ':')).encode('utf-8', 'surrogatepass')) > 1000000:
        raise ValueError('Record exceeds the supported 1 MB import size')
    return p


def normalise_import(value):
    if isinstance(value, dict) and type(value.get('schema_version')) in (int, float) and value['schema_version'] == 2:
        validate(value)
        return copy.deepcopy(value)
    validate_v1(value)
    p = empty_record()
    p['pilot'] = value['pilot']
    p['fictional'] = value.get('fictional') is True
    if 'details' in value:
        if not isinstance(value['details'], dict):
            raise ValueError('V1 details must be an object')
        for k in p['details']:
            if k in value['details']:
                text(value['details'][k], 10 if k == 'date' else 500, k)
                p['details'][k] = value['details'][k]
    for k in KEYS:
        p['evidence'][k]['note'] = value['evidence'][k]['note']
    p['migration'] = {'source_schema_version': 1, 'source_record': copy.deepcopy(value), 'date_reviewed': False}
    validate(p)
    return p


def assess(p):
    validate(p)
    issue, scope = p['material_issue'], p['scope']
    def supported(r):
        return r['status'] == 'yes' and bool(trim(r['reference'])) and bool(trim(r['note']))
    blockers = [{'check': c['key'], 'requirement': c['question'], 'status': 'no', 'note': p['evidence'][c['key']]['note'], 'reference': p['evidence'][c['key']]['reference'], 'next_action': c['next']} for c in CRITERIA if p['evidence'][c['key']]['status'] == 'no']
    gaps = []
    def gap(check, problem, action):
        gaps.append({'check': check, 'problem': problem, 'next_action': action})
    if not trim(p['pilot']):
        gap('pilot', 'Pilot not identified', 'Identify the pilot without entering sensitive details.')
    for k in ['process', 'outcome', 'date']:
        if not trim(p['details'][k]):
            gap(k, k + ' not supplied', 'Select an assessment date explicitly; an import does not set today automatically.' if k == 'date' else f'Record the {k} being assessed.')
    if p.get('migration') and not p['migration']['date_reviewed']:
        gap('migration_date', 'Legacy assessment date has not been reviewed', 'Review and explicitly confirm the date for this V2 reassessment.')
    safe_offline = scope['activity'] == 'offline_experiment' and scope['data'] == 'synthetic_public' and scope['external_effects'] == 'no' and scope['people_impact'] == 'no' and issue['status'] == 'none_identified' and supported(p['evidence']['data_approval'])
    if scope['activity'] == 'unknown':
        gap('activity', 'Activity scope is unknown', 'Choose the actual activity and the proposed scale of use.')
    if scope['data'] == 'unknown':
        gap('data', 'Data context is unknown', 'Establish whether actual data is synthetic/public, real or sensitive.')
    for k in ['external_effects', 'people_impact']:
        if scope[k] == 'unknown':
            gap(k, k.replace('_', ' ') + ' is unknown', 'Establish external consequences and effects on real people before relying on the record.')
    if scope['activity'] == 'offline_experiment' and (scope['data'] not in ('synthetic_public', 'unknown') or scope['external_effects'] == 'yes' or scope['people_impact'] == 'yes'):
        gap('scope_conflict', 'The offline description conflicts with real data or effects', 'Use the actual operational scope; an offline label cannot bypass safeguards.')
    if not safe_offline:
        for k in ['proposed_scale', 'current_version']:
            if not trim(scope[k]):
                gap(k, k.replace('_', ' ') + ' not supplied', 'Record the intended scale and the workflow/model version that the evidence covers.')
    if issue['status'] == 'unknown':
        gap('material_issue', 'Material issue position is unknown or insufficiently assessed', 'Have a responsible owner investigate quality, safety, security, applicable requirements and operational concerns.')
    if issue['status'] == 'unresolved':
        for k in ['summary', 'owner', 'next_step']:
            if not trim(issue[k]):
                gap('issue_' + k, 'Material issue ' + k.replace('_', ' ') + ' not supplied', 'Assign a responsible human to describe the issue and determine investigation, containment and resolution.')
        if issue['action'] == 'unknown':
            gap('issue_action', 'Material issue action is not determined', 'Have the responsible human determine the appropriate investigation, containment or resolution.')
    for c in CRITERIA:
        k = c['key']
        if safe_offline and k != 'data_approval':
            continue
        r = p['evidence'][k]
        if r['status'] == 'unknown':
            gap(k, 'Current acceptable condition has not been established', c['next'])
        elif r['status'] == 'yes' and not supported(r):
            gap(k, 'Yes lacks a record reference or finding note', 'Identify the supporting record and what it demonstrates. ' + c['next'])
    known_issues = []
    if issue['status'] == 'unresolved':
        known_issues = [{'summary': trim(issue['summary']) or 'An unresolved material issue is reported; a description is still needed.', 'owner': trim(issue['owner']) or 'Responsible owner not yet assigned', 'action': issue['action'], 'next_step': trim(issue['next_step']) or 'Assign a responsible owner to investigate, contain where necessary and resolve the issue or determine an appropriate course.'}]
    route = 'operational'
    if known_issues:
        decision = DECISIONS['hold']
        reason = 'A material issue is reported as unresolved. Withhold expansion and have a responsible human investigate, contain or resolve it before reconsideration.'
    elif safe_offline:
        route = 'offline_learning'
        decision = DECISIONS['further'] if gaps else DECISIONS['offline']
        reason = 'The offline learning boundary is recorded, but assessment identification or date information is missing. This does not prohibit learning or authorise operational use.' if gaps else 'This is recorded as a synthetic/public offline exercise with no real people or external effects and applicable permission. Production governance gaps do not prohibit learning. This is no operational approval; reassess before any real use.'
    elif blockers:
        decision = DECISIONS['hold']
        reason = 'One or more required current conditions are recorded as not satisfied. Withhold expansion until the named conditions are resolved.'
    elif gaps:
        decision = DECISIONS['further']
        reason = 'Evidence or context is incomplete, unknown or unsupported. This is not permission to continue or expand a pilot.'
    else:
        decision = DECISIONS['complete']
        reason = 'All ten current conditions have affirmative references and findings, with no material issue reported. This describes a complete self-reported record, not verified suitability. An independent responsible person must decide.'
    actions = []
    if known_issues:
        i = known_issues[0]
        action = 'determine appropriate containment and investigation' if i['action'] == 'unknown' else i['action']
        actions.append({'check': 'material_issue', 'owner': i['owner'], 'action': f"{i['summary']} Next: {i['next_step']} Human action: {action}."})
    if issue['status'] == 'unknown' and (trim(issue['owner']) or trim(issue['next_step'])):
        actions.append({'check': 'material_issue', 'owner': trim(issue['owner']) or 'Responsible owner not yet assigned', 'action': trim(issue['next_step']) or 'Investigate the material issue position before relying on the assessment.'})
    if route != 'offline_learning':
        for b in blockers:
            actions.append({'check': b['check'], 'owner': 'Responsible workflow owner', 'action': b['next_action']})
    for g in gaps:
        actions.append({'check': g['check'], 'owner': 'Responsible workflow owner', 'action': g['next_action']})
    if route == 'offline_learning':
        actions.append({'check': 'scope', 'owner': 'Person responsible for the exercise', 'action': 'Keep the exercise offline and within applicable permissions. Reassess before real data, external actions, real people or operational use.'})
    if decision == DECISIONS['complete']:
        for c in CRITERIA:
            actions.append({'check': c['key'], 'owner': 'Independent responsible reviewer', 'action': 'Inspect the actual acceptance evidence. ' + c['next']})
    if scope['external_effects'] == 'yes' or scope['people_impact'] == 'yes' or scope['data'] == 'sensitive_data':
        actions.append({'check': 'consequences', 'owner': 'Responsible owner and appropriate specialist reviewer', 'action': 'Independently check affected people, external or irreversible consequences and applicable permissions/security requirements for the intended scale. This tool does not establish compliance.'})
    return {'schema_version': 2, 'methodology_version': '2.0', 'pilot': trim(p['pilot']), 'assessment_route': route, 'decision': decision, 'reason': reason, 'known_issues': known_issues, 'known_blockers': blockers, 'essential_blockers': [b for b in blockers if b['check'] in GATES], 'evidence_gaps': gaps, 'next_actions': actions, 'warning': WARNING}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('--migrate', action='store_true', help='Export a migrated V2 draft, not an assessment')
    args = parser.parse_args()
    try:
        p = normalise_import(json.loads(args.input.read_text(encoding='utf-8')))
        print(json.dumps(p if args.migrate else assess(p), indent=2, ensure_ascii=True))
    except (ValueError, TypeError, OSError) as exc:
        parser.exit(2, f'Input error: {exc}\n')

if __name__ == '__main__':
    main()
