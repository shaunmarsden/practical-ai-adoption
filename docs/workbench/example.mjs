import { emptyRecord } from './content.mjs';

// Entirely invented example for learning the interface, not a real trial,
// observed benefit, permission check, V2 result or approval.
export function fictionalExample() {
  return {
    ...emptyRecord(),
    work: 'Fictional community club: prepare the weekly public meeting-date notice. The task starts when a meeting date is agreed and ends when the three notice templates show the same checked date.',
    owner: 'Fictional club communications coordinator (authority has not been confirmed).',
    current: 'A volunteer copies a meeting date into three separate public templates. A date may be changed in one place but not the others. No real records or organisation were used for this example.',
    baseline: 'Fictional scenario only. No time measurements, quality sample, source records or verified error frequency are available.',
    impact: 'An inconsistent public date could confuse visitors. The fictional example contains no real people or actual incidents.',
    nonAi: 'Try one shared date source and update each notice from that source, or remove duplicate templates.',
    ai: 'Not applicable. Generating dates with AI does not solve the source-of-truth problem.',
    tradeoffs: 'A shared date source is simpler to test and check. Setup time and effectiveness are unknown. AI adds review burden without an established benefit.',
    route: 'Investigate the shared date source first; reconsider if the actual process has exceptions it cannot handle.',
    boundary: 'No AI trial proposed. First document where the date is entered and who is allowed to change it.',
    permissions: 'No AI trial proposed. Authority to change the real club process is unknown and must be checked before any real change.',
    roles: 'Not applicable - no AI trial proposed.',
    sample: 'Not applicable - no AI trial proposed. A future non-AI comparison could examine different notice types with permission.',
    thresholds: 'Not applicable - no AI trial proposed. Before testing any change, agree how to check consistency and staff effort.',
    stop: 'Not applicable - no AI trial proposed. Keep the current notices until a replacement is authorised and verified.',
    evidenceType: 'Fictional exercise',
    results: 'No pilot has happened. There are no results or measured savings.',
    costs: 'Unknown. No productivity, cash or capacity benefit has been measured.',
    limits: 'Invented scenario, not a real organisation or observed process. No trial, external validation or independent user review.',
    issues: 'Unknown actual workflow details, approval owner, frequency of inconsistent dates and change costs.',
    readiness: 'Not applicable (explain below)',
    readinessRecord: 'No AI pilot or V2 review. The fictional non-AI option is only a planning illustration.',
    followup: 'If used in real work, verify the workflow with its owner and obtain permission before changing any published notices.',
    decision: 'No human decision recorded',
    decisionOwner: '',
    decisionDate: '',
    rationale: 'No authorised person has made a decision. The preferred option is a fictional hypothesis.',
    next: 'First possible next step: map the actual date-update process with the responsible person; no action is authorised here.'
  };
}
