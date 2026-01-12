# Ideas Vault Deployment Guide

## Current Deployment Status

**Ideas Vault is a static Single-Page Application (SPA) that requires only static file hosting. No backend infrastructure is needed.**

## Table of Contents

- [Overview](#overview)
- [Build Process](#build-process)
- [Hosting Options](#hosting-options)
- [Domain Configuration](#domain-configuration)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Overview

Ideas Vault is currently a **frontend-only application** built with React and Vite. It stores all data locally in the browser's localStorage and does not require any backend services, databases, or APIs.

### Technology Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Storage**: Browser localStorage
- **Deployment**: Static file hosting

### What You DON'T Need
- ❌ Docker
- ❌ Kubernetes
- ❌ Backend servers
- ❌ Databases
- ❌ Load balancers
- ❌ API gateways
- ❌ Container registries

### What You DO Need
- ✅ Node.js 20+ (for building only)
- ✅ Static file hosting service
- ✅ (Optional) Custom domain

---

## Build Process

### 1. Install Dependencies

```bash
cd ideasvault-ui
npm install
```

### 2. Build for Production

```bash
npm run build
```

This creates a `dist/` folder containing optimized static files:
```
dist/
├── index.html          # Entry point
├── assets/
│   ├── index-[hash].js    # JavaScript bundle
│   ├── index-[hash].css   # CSS bundle
│   └── [images/fonts]     # Static assets
└── [other files]
```

### 3. Test the Build Locally (Optional)

```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

---

## Hosting Options

### Option 1: GitHub Pages (Recommended for Personal Projects)

**Pros**: Free, automatic HTTPS, easy deployment
**Cons**: Public repositories only (for free tier)

#### Setup Instructions:

1. **Install gh-pages package** (already included in package.json):
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Configure base path** in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/ideasvault/',  // Replace with your repo name
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

6. **Access your site**:
   - `https://yourusername.github.io/ideasvault/`

#### Automatic Deployment with GitHub Actions:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: 'ideasvault-ui/package-lock.json'
      
      - name: Install dependencies
        working-directory: ./ideasvault-ui
        run: npm ci
      
      - name: Build
        working-directory: ./ideasvault-ui
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./ideasvault-ui/dist
```

---

### Option 2: Netlify (Recommended for Production)

**Pros**: Free tier, automatic HTTPS, CDN, form handling, redirects
**Cons**: None for static sites

#### Manual Deployment (Drag & Drop):

1. Build your application:
   ```bash
   npm run build
   ```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag the `dist/` folder onto the page

4. Your site is live! (e.g., `https://random-name-12345.netlify.app`)

#### Automatic Deployment from Git:

1. Go to [https://app.netlify.com](https://app.netlify.com)

2. Click "Add new site" → "Import an existing project"

3. Connect your Git provider (GitHub, GitLab, Bitbucket)

4. Select your repository

5. Configure build settings:
   - **Base directory**: `ideasvault-ui`
   - **Build command**: `npm run build`
   - **Publish directory**: `ideasvault-ui/dist`

6. Click "Deploy site"

#### Create `netlify.toml` for Configuration:

```toml
[build]
  base = "ideasvault-ui"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

---

### Option 3: Vercel (Best Developer Experience)

**Pros**: Zero-config, automatic HTTPS, global CDN, analytics
**Cons**: None for static sites

#### Deployment Steps:

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. **Option A - Using Vercel CLI**:
   ```bash
   cd ideasvault-ui
   vercel
   ```
   Follow the prompts.

3. **Option B - Using Vercel Dashboard**:
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `ideasvault-ui`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click "Deploy"

4. Your site is live! (e.g., `https://ideasvault.vercel.app`)

#### Create `vercel.json` for Configuration:

```json
{
  "buildCommand": "cd ideasvault-ui && npm run build",
  "outputDirectory": "ideasvault-ui/dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Option 4: Cloudflare Pages

**Pros**: Free, global CDN, Workers for serverless functions
**Cons**: None for static sites

#### Deployment Steps:

1. Go to [https://pages.cloudflare.com](https://pages.cloudflare.com)

2. Click "Create a project"

3. Connect your Git provider

4. Select your repository

5. Configure build settings:
   - **Build command**: `cd ideasvault-ui && npm run build`
   - **Build output directory**: `ideasvault-ui/dist`
   - **Root directory**: leave empty

6. Click "Save and Deploy"

---

### Option 5: AWS S3 + CloudFront

**Pros**: Highly scalable, customizable, enterprise-grade
**Cons**: More complex setup, requires AWS knowledge

#### Deployment Steps:

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://ideasvault-app
   ```

2. **Configure bucket for static website hosting**:
   ```bash
   aws s3 website s3://ideasvault-app \
     --index-document index.html \
     --error-document index.html
   ```

3. **Build and upload**:
   ```bash
   npm run build
   cd dist
   aws s3 sync . s3://ideasvault-app --delete
   ```

4. **Create CloudFront distribution** (optional, for CDN):
   - Go to AWS Console → CloudFront
   - Create distribution
   - Origin: Your S3 bucket
   - Default Root Object: `index.html`
   - Error Pages: 404 → /index.html (for SPA routing)

5. **Access your site**:
   - S3: `http://ideasvault-app.s3-website-us-east-1.amazonaws.com`
   - CloudFront: `https://d1234abcd.cloudfront.net`

---

### Option 6: Any Web Server

You can deploy to any web server that can serve static files:

- **Apache**: Place files in `/var/www/html`
- **Nginx**: Place files in `/usr/share/nginx/html`
- **IIS**: Place files in `C:\inetpub\wwwroot`
- **Docker**: Use nginx image

**Example Nginx Configuration**:

```nginx
server {
    listen 80;
    server_name ideasvault.com;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

**Example Docker Deployment**:

Create `Dockerfile` in `ideasvault-ui/`:

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t ideasvault .
docker run -p 8080:80 ideasvault
```

---

## Domain Configuration

### Using Custom Domain

Once deployed, you can add a custom domain:

#### GitHub Pages:
1. Add a `CNAME` file to `public/` folder with your domain
2. Configure DNS with your domain provider:
   - Type: `CNAME`
   - Name: `www` (or `@` for apex)
   - Value: `yourusername.github.io`

#### Netlify/Vercel/Cloudflare:
1. Go to your project dashboard
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. SSL certificate is automatic

#### DNS Records:

For `www.example.com`:
```
Type: CNAME
Name: www
Value: your-app.netlify.app (or vercel.app, etc.)
```

For apex domain `example.com`:
```
Type: A (or ALIAS)
Name: @
Value: [IP address from hosting provider]
```

---

## Environment Variables

Ideas Vault currently doesn't require environment variables since it's frontend-only. However, you can configure Vite environment variables if needed:

### Create `.env` file (for development):

```env
VITE_APP_NAME=Ideas Vault
VITE_APP_VERSION=1.0.0
```

### Create `.env.production` file (for production):

```env
VITE_APP_NAME=Ideas Vault
VITE_APP_VERSION=1.0.0
VITE_ANALYTICS_ID=your-analytics-id
```

### Access in Code:

```typescript
const appName = import.meta.env.VITE_APP_NAME;
const version = import.meta.env.VITE_APP_VERSION;
```

**Note**: Vite only exposes variables prefixed with `VITE_`.

---

## Troubleshooting

### Issue: Blank page after deployment

**Cause**: Incorrect base path configuration

**Solution**: Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/',  // For root domain
  // or
  base: '/ideasvault/',  // For GitHub Pages
})
```

Rebuild and redeploy.

---

### Issue: 404 errors on page refresh

**Cause**: SPA routing not configured on server

**Solutions**:

**Netlify**: Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel**: Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Nginx**: Update config:
```nginx
try_files $uri $uri/ /index.html;
```

**Apache**: Create `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### Issue: Build fails

**Cause**: Outdated dependencies or Node version

**Solution**:
```bash
# Update Node.js to version 20+
nvm install 20
nvm use 20

# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

---

### Issue: Assets not loading

**Cause**: Incorrect asset paths

**Solution**: Use relative paths in code:
```typescript
// ✅ Good
import logo from './assets/logo.svg'

// ❌ Bad
import logo from '/assets/logo.svg'
```

---

## Production Checklist

Before deploying to production:

- [ ] Test the build locally (`npm run preview`)
- [ ] Update `package.json` version
- [ ] Verify all assets load correctly
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Configure custom domain (if applicable)
- [ ] Enable HTTPS
- [ ] Set up analytics (optional)
- [ ] Configure error tracking (optional)
- [ ] Test SPA routing (refresh on different pages)
- [ ] Verify localStorage functionality
- [ ] Check console for errors
- [ ] Test all features end-to-end

---

## Deployment Commands Quick Reference

```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Deploy with Vercel CLI
vercel --prod

# Deploy with Netlify CLI
netlify deploy --prod

# Upload to S3
aws s3 sync dist/ s3://your-bucket --delete
```

---

## Getting Help

- **Build Issues**: Check Vite documentation at [https://vitejs.dev](https://vitejs.dev)
- **Hosting Issues**: Refer to your hosting provider's documentation
- **General Help**: Open an issue on GitHub

---

## Future Backend Deployment

**When a backend is added**, refer to:
- `docs/future/deployment/` - Future deployment architecture
- `docs/future/deployment/docker.md` - Docker containerization
- `docs/future/deployment/kubernetes.md` - Kubernetes orchestration

Currently, **these are not needed and should be ignored**.

---

**Last Updated**: January 12, 2026  
**Application Type**: Static SPA  
**Deployment Complexity**: Simple (static files only)
