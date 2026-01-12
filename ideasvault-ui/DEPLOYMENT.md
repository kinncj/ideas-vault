# Deploying to GitHub Pages

This app is automatically deployed to GitHub Pages at: https://kinncj.github.io/ideas-vault/

## Automatic Deployment

Every push to the `main` branch triggers an automatic deployment via GitHub Actions.

## Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

Note: Manual deployment requires the `gh-pages` package. Install it with:
```bash
npm install -D gh-pages
```

## GitHub Pages Setup

To enable GitHub Pages for this repository:

1. Go to your repository settings: https://github.com/kinncj/ideas-vault/settings/pages
2. Under "Source", select "GitHub Actions"
3. The app will be deployed automatically on the next push to main

## Local Development

The app uses a base path of `/ideas-vault/` for GitHub Pages. To test locally with the same configuration:

```bash
npm run build
npm run preview
```

Then visit: http://localhost:4173/ideas-vault/
