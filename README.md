# ThorDad static website (Hostinger-ready)

This project is a plain static site (HTML/CSS/JavaScript) and can be deployed directly to Hostinger without a Node/Python runtime.

## Files to upload
Upload everything in this folder to your Hostinger `public_html` directory:

- `index.html`
- `about.html`
- `family.html`
- `updates.html`
- `lab.html`
- `archive.html`
- `private-lab.html`
- `contact.html`
- `styles.css`
- `script.js`
- `.htaccess`

## Hostinger deployment steps
1. Open Hostinger hPanel.
2. Go to **Websites** → **Manage** → **File Manager**.
3. Open `public_html`.
4. Delete old site files (or back them up first).
5. Upload this repo's files directly into `public_html`.
6. Ensure `index.html` is present in `public_html`.
7. Clear Hostinger cache/CDN if enabled.
8. Hard refresh your browser (`Ctrl+F5` / `Cmd+Shift+R`).

## Runtime stack
- Static HTML/CSS/JavaScript
- No framework required
- No build command required

## Notes
- `.htaccess` enables extensionless routes (e.g., `/about` → `about.html`) and caching rules optimized for Hostinger/Apache.

## Hostinger Git Deploy (if using Node.js Web App importer)
If Hostinger shows **"Unsupported framework or invalid project structure"** while importing from Git:

1. Choose **Node.js 24** runtime.
2. Choose framework type **Other/Custom**.
3. Set project root to `/`.
4. Set build command to `npm run build`.
5. Set output/public directory to `/` (root).

This repo includes a minimal `package.json` so Hostinger's framework detection can proceed even though this is a static site.
