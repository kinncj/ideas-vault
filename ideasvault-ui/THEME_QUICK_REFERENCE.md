# Theme Quick Reference

## 🎨 Colors

### Backgrounds
```css
bg-slate-950  /* Main background */
bg-slate-900  /* Elevated surfaces */
bg-slate-800  /* Cards */
bg-slate-700  /* Hover states */
```

### Text
```css
text-white       /* Headings */
text-slate-300   /* Body text */
text-slate-400   /* Secondary text */
text-slate-500   /* Placeholders */
```

### Brand
```css
/* Primary (Indigo) */
bg-indigo-600 text-indigo-400 border-indigo-500

/* Secondary (Violet) */
bg-violet-600 text-violet-400 border-violet-500

/* Gradients */
bg-gradient-to-r from-indigo-600 to-violet-600
```

### Semantic
```css
/* Success */
bg-emerald-500/10 text-emerald-400 border-emerald-500/20

/* Warning */
bg-amber-500/10 text-amber-400 border-amber-500/20

/* Error */
bg-red-500/10 text-red-400 border-red-500/20

/* Info */
bg-blue-500/10 text-blue-400 border-blue-500/20
```

## 🔘 Buttons

```tsx
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>
<button className="btn-outline">Outline</button>
<button className="btn-ghost">Ghost</button>

/* Sizes */
<button className="btn-primary btn-sm">Small</button>
<button className="btn-primary btn-lg">Large</button>
```

## 📦 Cards

```tsx
<div className="card">Basic Card</div>
<div className="card-hover">Hover Effect</div>
<div className="card-interactive">Clickable</div>
```

## 🏷️ Badges

```tsx
<span className="badge-success">Success</span>
<span className="badge-warning">Warning</span>
<span className="badge-error">Error</span>
<span className="badge-info">Info</span>
<span className="badge-primary">Primary</span>
```

## 📝 Inputs

```tsx
<input className="input" placeholder="Text..." />
<input className="input-error" placeholder="Error..." />
```

## ✨ Effects

```tsx
/* Glassmorphism */
<div className="glass">Glass effect</div>
<div className="glass-strong">Stronger glass</div>
<div className="glass-light">Light glass</div>

/* Gradient Text */
<h1 className="text-gradient">Gradient</h1>
<h2 className="text-gradient-primary">Primary</h2>

/* Gradient Backgrounds */
<div className="bg-gradient-primary">Primary gradient</div>
<div className="bg-gradient-radial">Radial glow</div>
```

## 🎬 Animations

```tsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-fade-in-up">Fade + slide up</div>
<div className="animate-fade-in-down">Fade + slide down</div>
<div className="animate-slide-in-right">Slide from right</div>
<div className="animate-scale-in">Scale in</div>
<div className="animate-glow">Glow pulse</div>
```

## 🖱️ Hover Effects

```tsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-scale">Scales on hover</div>
<div className="hover-glow">Glows on hover</div>
```

## 📏 Spacing

```tsx
/* Common spacing values */
p-4   /* 16px padding */
p-6   /* 24px padding */
p-8   /* 32px padding */

gap-2 /* 8px gap */
gap-4 /* 16px gap */
gap-6 /* 24px gap */

mb-4  /* 16px bottom margin */
mb-6  /* 24px bottom margin */
mb-8  /* 32px bottom margin */
```

## 🔲 Border Radius

```tsx
rounded-lg   /* 16px */
rounded-xl   /* 20px */
rounded-2xl  /* 24px */
rounded-3xl  /* 32px */
rounded-full /* Circle */
```

## 🌑 Shadows

```tsx
shadow-lg          /* Standard shadow */
shadow-xl          /* Large shadow */
shadow-2xl         /* Extra large shadow */

/* Colored shadows */
shadow-lg shadow-indigo-500/30
shadow-xl shadow-violet-500/50
```

## 🎯 Focus States

```tsx
<button className="focus-ring">Ring focus</button>
<input className="focus-ring-inset">Inset focus</input>
```

## 📜 Scrollbars

```tsx
<div className="custom-scrollbar overflow-auto">
  Custom scrollbar
</div>

<div className="scrollbar-thin overflow-auto">
  Thin scrollbar
</div>

<div className="scrollbar-hide overflow-auto">
  Hidden scrollbar
</div>
```

## 📐 Layout

```tsx
/* Container */
<div className="container-app">
  Max-width container with responsive padding
</div>

/* Section */
<section className="section">
  Section with responsive vertical padding
</section>
```

## 🎨 Common Patterns

### Hero Section
```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
  <div className="container-app section">
    <h1 className="text-6xl font-bold text-gradient mb-6">
      Hero Headline
    </h1>
    <p className="text-xl text-slate-300 mb-8">
      Supporting text
    </p>
    <button className="btn-primary btn-lg">
      Call to Action
    </button>
  </div>
</div>
```

### Card Grid
```tsx
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  <div className="card-hover">Card 1</div>
  <div className="card-hover">Card 2</div>
  <div className="card-hover">Card 3</div>
</div>
```

### Form
```tsx
<form className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      Label
    </label>
    <input className="input" placeholder="Enter value..." />
  </div>
  <button className="btn-primary w-full">
    Submit
  </button>
</form>
```

### Status with Badge
```tsx
<div className="flex items-center gap-2">
  <span className="badge-success">
    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
    Ready
  </span>
</div>
```

### Modal/Dialog Background
```tsx
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-modal">
  <div className="glass-strong rounded-2xl p-6 max-w-lg mx-auto mt-20">
    Modal content
  </div>
</div>
```

## 💡 Pro Tips

1. **Combine utilities**: `card-hover animate-fade-in`
2. **Use opacity modifiers**: `bg-indigo-500/10`, `text-white/80`
3. **Responsive design**: `md:grid-cols-2 lg:grid-cols-3`
4. **Dark mode optimized**: All colors work on dark backgrounds
5. **Transition everything**: Add `transition-all duration-300` for smooth interactions
6. **Use gradients sparingly**: For CTAs and important headlines only
7. **Glass effects**: Perfect for overlays and floating elements
8. **Consistent spacing**: Stick to 4, 6, 8, 12, 16, 24

## 🔗 Full Documentation

See [THEME.md](./THEME.md) for complete documentation.
