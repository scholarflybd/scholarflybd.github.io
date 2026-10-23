# ScholarFly BD Premium Website — launch guide

## Upload revised website files
1. Unzip this package. Upload all root HTML files and the complete `assets` folder into `scholarflybd/scholarflybd.github.io` (branch `main`).
2. GitHub may require overwriting existing files via the repository web editor or a Git client. For a simple full replacement, use GitHub Desktop or a fresh commit replacing the files, keeping the existing repository and Pages configuration.
3. Keep `CNAME` with `scholarflybd.com`. Do not replace your existing DNS records.
4. Confirm Pages settings remain `main / (root)`, custom domain `scholarflybd.com`, HTTPS enabled.

## Connect the student assessment form
1. Open https://script.google.com/ in the Google account that will own the applications.
2. Create a new Apps Script project. Replace Code.gs with contents of `GOOGLE_FORM_SETUP.gs`.
3. Select and run `createScholarFlyAssessmentForm` once. Review required access permissions and only authorize if comfortable.
4. Open the execution log (View > Logs) for the student form URL, editor URL and private response Sheet URL.
5. Open the form editor to review the questions and add an OPTIONAL File upload question manually for CV if wanted (Google sign-in is generally required for upload). Otherwise students can supply a restricted CV link in the existing field.
6. Open `assets/config.js` in your GitHub repository, paste the student responder URL into `window.SCHOLARFLY_FORM_URL = "...";` and commit.
7. Set the correct confirmed WhatsApp international digits in `window.SCHOLARFLY_WHATSAPP = "...";` and commit. Never guess the country code.
8. Submit a fake/test response and verify it appears in the private Sheet. Delete the test response afterwards.
9. Protect access: restrict Form editor and Sheets access; turn on 2FA; set a data retention policy and final privacy notice before public collection.

## Important
- Scholarship details describe general funding routes and are not live availability confirmations.
- The site displays only public contact details, never student responses.
- All 30 country entries have official or public-institution links; verify current schemes and eligibility before promoting them.
- Google Form creation requires your Google account permission; the script is not pre-run.
