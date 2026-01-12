# CI/CD Pipeline for Ideas Vault

## Overview

Ideas Vault uses **GitHub Actions** for continuous integration and deployment. Since it's a static SPA, the pipeline is straightforward:

1. **Build** - Compile React/TypeScript code  
2. **Test** - Run unit and E2E tests  
3. **Deploy** - Push static files to hosting  

## Current Pipeline

### Workflow Diagram

```mermaid
graph LR
    Push[Git Push] --> Install[Install Dependencies]
    Install --> Lint[Lint Code]
    Lint --> TypeCheck[Type Check]
    TypeCheck --> Test[Run Tests]
    Test --> Build[Build SPA]
    Build --> Deploy[Deploy to Hosting]
    
    style Push fill:#4CAF50
    style Deploy fill:#2196F3
```

## GitHub Actions Workflow

### Complete `.github/workflows/deploy.yml`

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: ideasvault-ui/package-lock.json
      
      - name: Install dependencies
        working-directory: ./ideasvault-ui
        run: npm ci
      
      - name: Lint code
        working-directory: ./ideasvault-ui
        run: npm run lint
      
      - name: Type check
        working-directory: ./ideasvault-ui
        run: npx tsc --noEmit
      
      - name: Run tests
        working-directory: ./ideasvault-ui
        run: npm test
      
      - name: Build
        working-directory: ./ideasvault-ui
        run: npm run build
      
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./ideasvault-ui/dist
```

## Pipeline Stages

### 1. Code Quality

**Linting**
```yaml
- name: Lint code
  run: npm run lint
```

Checks:
- ESLint rules
- Code formatting
- React best practices
- TypeScript conventions

**Type Checking**
```yaml
- name: Type check
  run: npx tsc --noEmit
```

Verifies TypeScript types are correct.

### 2. Testing

**Unit Tests**
```yaml
- name: Run tests
  run: npm test
```

Runs:
- Vitest unit tests
- Component tests
- Hook tests
- Utility function tests

**E2E Tests (Optional)**
```yaml
- name: E2E Tests
  run: npm run test:e2e
```

If Playwright is configured:
- Full user flow testing
- Browser compatibility tests

### 3. Build

**Production Build**
```yaml
- name: Build
  run: npm run build
```

Process:
1. TypeScript compilation
2. Vite bundling
3. Minification
4. Tree shaking
5. Asset optimization
6. Output to `dist/` folder

### 4. Deployment

#### GitHub Pages

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./ideasvault-ui/dist
```

**Setup**:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` → `/` (root)
4. Save

#### Netlify

```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v2
  with:
    publish-dir: './ideasvault-ui/dist'
    production-deploy: true
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

#### Vercel

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.ORG_ID }}
    vercel-project-id: ${{ secrets.PROJECT_ID }}
    working-directory: ./ideasvault-ui
```

## Environment-Specific Deployments

### Preview (on PR)

```yaml
on:
  pull_request:
    branches: [ main ]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      # ... build steps ...
      - name: Deploy Preview
        uses: netlify/actions/cli@master
        with:
          args: deploy --dir=ideasvault-ui/dist
```

Creates preview URL: `https://deploy-preview-123--ideasvault.netlify.app`

### Production (on main)

```yaml
on:
  push:
    branches: [ main ]
```

## Troubleshooting

### Build Fails

**Issue**: TypeScript errors

**Solution**: Fix type errors locally first
```bash
cd ideasvault-ui
npm run build
npx tsc --noEmit
```

### Deployment Fails

**Issue**: 404 on routes (SPA routing)

**Solution**: Configure hosting for SPA routing

**GitHub Pages** - add `public/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=/index.html">
  </head>
</html>
```

**Netlify** - add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel** - add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## Best Practices

1. **Cache dependencies** - Speeds up builds
2. **Run tests before deploy** - Catch issues early
3. **Use semantic versioning** - Tag releases
4. **Secure secrets** - Use GitHub Secrets
5. **Test locally first** - Don't rely on CI for debugging

## Example: Minimal Workflow

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: ideasvault-ui/package-lock.json
      
      - working-directory: ./ideasvault-ui
        run: |
          npm ci
          npm run lint
          npm test
          npm run build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./ideasvault-ui/dist
```

## Related Documentation

- [Deployment Overview](./README.md) - Static hosting options
- [Development Guide](../development/README.md) - Local development
- [Frontend Architecture](../architecture/frontend-architecture.md) - Code structure

---

**Simple SPA, Simple CI/CD** 🚀
