"""Read actual browser downloads. Requires pdfplumber, a maintainer-only dependency."""
import hashlib
import json
import re
import sys
from pathlib import Path
import pdfplumber

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from pilot_readiness_v2 import assess
folder = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('test-results/v2')
compact = lambda s: re.sub(r'\s+', '', re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', s))
checks = []
for file in sorted(folder.glob('*.pdf')):
    payload = json.loads(file.with_suffix('.json').read_text())
    expected = assess(payload)
    with pdfplumber.open(file) as pdf:
        text = '\n'.join(p.extract_text() or '' for p in pdf.pages)
        body = '\n'.join(p.crop((50, 65, 545, 780)).extract_text() or '' for p in pdf.pages)
        assert compact(expected['decision']) in compact(text), file.name
        assert '10. Monitoring and response' in text
        assert 'Self-reported / No operational approval / Method 2.0' in text
        assert 'Schema version 2 / methodology version 2.0' in text
        for key, record in payload['evidence'].items():
            assert compact(record['note']) in compact(body), (file.name, key, 'note lost')
            assert compact(record['reference']) in compact(body), (file.name, key, 'reference lost')
        for key in ['summary', 'owner', 'next_step']:
            if payload['material_issue'][key]:
                assert compact(payload['material_issue'][key]) in compact(body), (file.name, key, 'issue context lost')
        for issue in expected['known_issues']:
            assert compact(issue['summary']) in compact(body)
            assert compact(issue['next_step']) in compact(body)
            assert compact(issue['owner']) in compact(body)
        if expected['known_issues']:
            assert 'Known unresolved material issue' in (pdf.pages[0].extract_text() or ''), 'Issue heading must be in the opening summary'
        if file.name.startswith('long-notes'):
            assert text.count('END-OF-NOTE') == 10
        for page in pdf.pages:
            chars = [c for c in page.chars if c['text'].strip()]
            assert all(50 <= c['x0'] <= c['x1'] <= 545 for c in chars), (file.name, 'horizontal clipping')
            assert all(0 < c['top'] < c['bottom'] < 820 for c in chars), (file.name, 'outside page')
            assert all(c['bottom'] < 775 for c in chars if 60 < c['top'] < 795), (file.name, 'footer overlap')
        checks.append({'file': file.name, 'sha256': hashlib.sha256(file.read_bytes()).hexdigest(), 'pages': len(pdf.pages), 'decision': expected['decision'], 'note_reference_issue_and_bounds_checks': 'pass'})
assert len(checks) >= 13, 'Expected both browser sizes and the long-note report'
(folder / 'pdf-checks.json').write_text(json.dumps(checks, indent=2) + '\n')
print(json.dumps(checks, indent=2))
