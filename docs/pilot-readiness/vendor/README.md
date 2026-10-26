# Locally bundled PDF assets

These files are served with the application. They are never requested from a CDN at runtime. No assessment data is sent to their publishers.

- `jspdf.umd.min.js`: [jsPDF v4.2.1](https://github.com/parallax/jsPDF/tree/v4.2.1), MIT licence in `jspdf-LICENSE.txt`. Only the text, font and PDF save APIs are used. No HTML rendering, external images, annotations or AI services.
- `NotoSans-Regular.ttf`: [Noto Sans at revision ffebf8c1ee449e544955a7e813c54f9b73848eac](https://github.com/notofonts/noto-fonts/blob/ffebf8c1ee449e544955a7e813c54f9b73848eac/hinted/ttf/NotoSans/NotoSans-Regular.ttf), SIL Open Font License in `NotoSans-LICENSE.txt`. The font is embedded in generated reports. No font files are modified.

SHA-256 checksums, recorded 26 October 2026:

```text
e6551fcdc32f09d6853b2c5126d18d01d9447e0da618a41a11ebeee0f6c20d54  jspdf.umd.min.js
dc388ec35ff463288cdde3588a36fd4ed12a45deff053243b37309acc9ef583b  jspdf-LICENSE.txt
b85c38ecea8a7cfb39c24e395a4007474fa5a4fc864f6ee33309eb4948d232d5  NotoSans-Regular.ttf
0dab92d0544f7b233403f14b84a663bdbfa746982eda629e7f4f9ffe1b036feb  NotoSans-LICENSE.txt
```

To update, retrieve a specific official revision and its licence, record checksums, review upstream changes, then rerun model, browser and report tests. Do not replace these with runtime CDN links.
