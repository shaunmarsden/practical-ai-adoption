"""Inspect PDFs actually downloaded from the live assessment; requires pdfplumber."""
import hashlib
import json
import re
from pathlib import Path
import pdfplumber

here = Path(__file__).resolve().parent
evidence = here / 'evidence'
cases = json.loads((here / 'scenarios.json').read_text())['cases']
outputs = []
clean = lambda text: re.sub(r'\s+', '', text)
for filename, expected, case_id in [
    ('blocked.pdf', 'DO NOT EXPAND', None),
    ('limited.pdf', 'LIMITED PILOT ONLY', 'AD-24'),
    ('all-yes.pdf', 'READY FOR HUMAN REVIEW', 'AD-22'),
    ('critical-review.pdf', 'READY FOR HUMAN REVIEW', 'AD-04'),
    ('long-notes.pdf', 'READY FOR HUMAN REVIEW', 'long'),
    ('undated-import.pdf', 'READY FOR HUMAN REVIEW', 'legacy'),
]:
    path = evidence / 'reports' / filename
    with pdfplumber.open(path) as pdf:
        text = '\n'.join(page.extract_text() or '' for page in pdf.pages)
        # Headers/footers interrupt extracted notes when a note spans pages.
        body_text = '\n'.join(page.crop((50, 65, 545, 780)).extract_text() or '' for page in pdf.pages)
        assert expected in text, (filename, 'wrong decision')
        assert '10. Monitoring and review' in text
        assert 'Self-reported / Human approval required' in text
        assert 'Methodology and limitations' in text
        assert 'None has been independently verified' in re.sub(r'\s+', ' ', text)
        if case_id and case_id.startswith('AD-'):
            case = next(c for c in cases if c['id'] == case_id)
            for key, record in case['payload']['evidence'].items():
                if record['note']:
                    assert clean(record['note']) in clean(body_text), (filename, key, 'note changed')
        if case_id == 'long':
            original = json.loads((evidence / 'long-notes-input.json').read_text())
            assert text.count('END-OF-NOTE') == 10
            for key, record in original['evidence'].items():
                assert clean(record['note']) in clean(body_text), (filename, key, 'long note lost')
        if case_id == 'AD-04':
            assert 'critical errors remain unresolved' in text
            assert 'None recorded.' in text
        page_checks = []
        for i, page in enumerate(pdf.pages, 1):
            chars = [c for c in page.chars if c['text'].strip()]
            assert all(50 <= c['x0'] <= c['x1'] <= 545 for c in chars), (filename, i, 'horizontal clipping')
            assert all(0 < c['top'] < c['bottom'] < 820 for c in chars), (filename, i, 'outside page')
            body = [c for c in chars if 60 < c['top'] < 795]
            assert all(c['bottom'] < 775 for c in body), (filename, i, 'footer overlap')
            page_checks.append({'page': i, 'a4': abs(page.width - 595.28) < 1 and abs(page.height - 841.89) < 1, 'margins_pass': True})
        outputs.append({'file': filename, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'pages': len(pdf.pages), 'decision': expected, 'text_and_note_checks_pass': True, 'page_checks': page_checks})
(evidence / 'report-checks.json').write_text(json.dumps(outputs, indent=2) + '\n')
print(json.dumps([{'file': r['file'], 'pages': r['pages'], 'checks_pass': True} for r in outputs], indent=2))
