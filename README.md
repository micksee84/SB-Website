# Sunshine Brigade website

The website at [sunshinebrigade.ca](https://www.sunshinebrigade.ca/), hosted on Wix Headless.

## How it works

- Everything in `site/` is the live website: plain HTML, CSS and a little JavaScript, no build step.
- Every push to `main` runs `.github/workflows/deploy.yml`, which logs in to Wix and runs `wix release`. That puts the `site/` folder live, replacing what was there before.
- You can also run the deploy by hand: **Actions → Deploy to Wix → Run workflow**.
- `wix.config.json` links this repo to the Wix site (site ID and app ID). Leave it as it is.

## Pages

| File | Page |
| --- | --- |
| `site/index.html` | Home |
| `site/builder.html` | The Worksheet Builder |
| `site/getting-started.html` | Getting started guide |
| `site/assets/site.css` | Shared styles for every page |
| `site/assets/site.js` | The "What you can make" picker on the home page |

Pictures live in the Wix Media Manager (`static.wixstatic.com` links), not in this repo. Fonts come from Google Fonts (DynaPuff and Nunito).

## One-time setup

1. In Wix, create an API key: [API Keys Manager](https://manage.wix.com/account/api-keys) → Generate API Key, with access to the Sunshine Brigade site.
2. In this repo, go to **Settings → Secrets and variables → Actions → New repository secret**, name it `WIX_API_KEY` and paste the key.

## Working locally (optional)

Needs Node 24.22.1 or newer.

```bash
npm ci
npx wix login      # once, in a browser
npx wix preview    # a preview link, without going live
npx wix release    # go live by hand
```
