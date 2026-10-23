# ScholarFly BD starter website

A static, responsive multi-page website for scholarflybd.com, ready for GitHub Pages.

## Pages
- `index.html` - Home
- `about.html` - About
- `scholarships.html` - 30 example country pathways and search/filter
- `services.html` - Services
- `assessment.html` - Assessment form preparation
- `contact.html` - Contact / FAQ
- `privacy.html` - Provisional privacy notice

## Connect Google Form (required before real assessment submissions)
1. Create the Google Form and review consent/privacy questions and file access permissions.
2. Publish the form and copy its responder link.
3. Open `assets/config.js` and set `window.SCHOLARFLY_FORM_URL = "https://docs.google.com/forms/d/e/FORM_ID/viewform";`.
4. Commit the file. All buttons marked 'Assess My Profile' will then link to your form.

## Activate WhatsApp link
Confirm the country code; then set `window.SCHOLARFLY_WHATSAPP` in `assets/config.js` to international digits only (no +, spaces or hyphens). This was intentionally left blank.

## Deploy to GitHub Pages
1. Create a public GitHub repository (e.g. `scholarflybd-website`).
2. Upload all files from this folder to the repository root, including `CNAME`, `.nojekyll`, and `assets/`. Do not upload the containing folder alone.
3. Go to Settings > Pages > Build and deployment > Deploy from a branch > main > /(root) > Save.
4. Under Settings > Pages > Custom domain, enter `scholarflybd.com` and save.
5. In Namecheap Domain > Manage, delete the existing redirect from scholarflybd.com to http://www.scholarflybd.com/.
6. With Namecheap BasicDNS, go to Advanced DNS > Host Records and configure the GitHub Pages A records:
   - A Record | @ | 185.199.108.153
   - A Record | @ | 185.199.109.153
   - A Record | @ | 185.199.110.153
   - A Record | @ | 185.199.111.153
   - CNAME Record | www | YOUR-GITHUB-USERNAME.github.io (replace placeholder)
7. Remove conflicting `@` or `www` parking, redirect, A, CNAME or other conflicting records, *after* confirming what they do. Do not delete mail-related MX/TXT records.
8. Allow DNS propagation, verify the custom domain and enable Enforce HTTPS in GitHub Pages.

Official documentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Before public launch
- The scholarship entries are examples / pathways, not confirmed currently open awards. Verify and add dated official sources before advertising specific openings.
- Customize business identity/team and review legal privacy notice.
- Never commit application spreadsheets, personal CVs, or Google account credentials to GitHub.
- Google Forms will generally require Google sign-in from upload respondents.
- Test navigation, form submission, HTTPS, mobile layout and accessibility.
