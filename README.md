# ScholarFly BD website (GitHub Pages)

Static site: HTML, CSS, vanilla JS. No backend, no build step needed to deploy.

## Upload
Upload everything in this folder (including `CNAME`, `.nojekyll` and `assets/`) to the root of the `scholarflybd.github.io` repository, replacing old files. Keep `CNAME` as is. DNS and HTTPS stay unchanged.

## What to edit
- `assets/config.js`: Google Form link and WhatsApp number (the only settings).
- `assets/data.js`: scholarship directory. Each programme has name, provider, type, levels (B/M/P/D), coverage and official url. Add a country by copying one block. (`build.py` regenerates pages and data; optional.)

## Connect the Google Form
1. Go to script.google.com > New project, paste `apps-script/create_form.gs`, run `createScholarFlyForm` and approve permissions.
2. Open Execution log: copy the responder link into `formUrl` in `assets/config.js`; commit.
3. In the Form editor, add file-upload questions (CV PDF, transcripts) in section H. Uploads need Google sign-in.
4. Keep the response Sheet private. Never share it or commit it.
5. Submit a test response and check the Sheet, emails and confirmation message before announcing the form.

## WhatsApp
The number 01021824935 has a 010 prefix, which matches South Korean mobile numbers (+82). Confirm the country code, then set `whatsapp` (digits only, e.g. 82...). Leave empty until sure.

## Before launch
- Verify every scholarship on its official site; add deadlines and verification dates.
- Review Privacy Policy and Terms with a qualified adviser; set a retention period.
- Add real team profiles and photos you have rights to use.
