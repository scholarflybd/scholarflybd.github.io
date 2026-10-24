# ScholarFly BD

Production website: https://scholarflybd.com/

Static HTML, CSS and JavaScript deployed from this repository through GitHub Pages. The active public pages are the root HTML files and their assets/ dependencies. Keep CNAME and .nojekyll intact.

## Assessment

The live Google Form is embedded in assessment.html and also linked directly for browsers that block embeds. The public responder URL is configured in assets/config.js. Responses are owned by scholarflybd@gmail.com and linked to a private Google Sheet. An installable Apps Script form-submit trigger emails the owner a notification; applicant answers are not copied to the email. Applicant email receipts are not enabled.

Never commit response data, private Sheet links, CVs, credentials or script property values. Do not rerun legacy GOOGLE_FORM_SETUP.gs to create duplicate forms. Maintain the existing ScholarFly BD Student Assessment Apps Script project instead.

## Maintenance

- Edit root HTML pages for content.
- assets/style.css controls responsive styles.
- assets/main.js handles navigation, WhatsApp and homepage selection prefills.
- assets/data.js holds 31 indicative destination resources; assets/directory.js handles filtering.
- The old root data.js/main.js/config.js and build.py are legacy, not the active site source. Do not regenerate production pages using build.py.
- Verify current award details against official sources before adding deadlines or claiming a call is open.
- When changing the responder URL, update assets/config.js and the no-JavaScript links/iframe in assessment.html together.

## Validation performed

Public form submission and confirmation tested without Google login. Email validation tested. Website source checked for internal links, section anchors, duplicate IDs, headings and JavaScript syntax. Live UI checks are performed after deployment. A clearly labelled test response may remain in the owner's Sheet.
