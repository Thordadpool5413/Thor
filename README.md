# ThorDad website

## Current live setup

The live site at `thordad.com` is currently managed through **WordPress on Hostinger**, using the active custom block theme `thordad-editable`.

Do **not** deploy this static GitHub repository directly into Hostinger `public_html` while WordPress is installed. Doing that can overwrite or hide the WordPress site.

## Live source of truth

Use WordPress/Hostinger for live edits:

1. Log in to WordPress for `thordad.com`.
2. Use `Pages` to edit page content.
3. Use `Appearance -> Editor` to edit the block theme header, footer, and templates.
4. Keep LiteSpeed Cache disabled while actively editing, or clear cache after changes.

Current important WordPress pages:

- Home: `/`
- TD Lab: `/td-lab/`
- Family: `/family/`
- Updates: `/updates/`
- About: `/about/`
- Contact: `/contact/`
- Archive placeholder: `/archive/`
- Private Lab placeholder: `/private-lab/`

Legacy note: `/apps-websites/` redirects to `/td-lab/`.

Current standalone app paths hosted under WordPress/Hostinger:

- Hospice Roadmap: `/apps/websites/hospice-roadmap/`
- Hospice Provider Sales Intelligence Rep Cost Calculator: `/apps/hospice-rep-cost-calculator/`

## What this repo is now

This repo contains the older static HTML/CSS/JavaScript version of the ThorDad site. It can still be useful as a backup/reference, but it is **not** the live editing source while WordPress is active.

If you later decide to stop using WordPress and return to a static site, then this repo can be deployed again after backing up or removing the WordPress install.
