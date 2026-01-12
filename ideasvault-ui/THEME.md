# Ideas Vault - Theme System Documentation

## Overview

The Ideas Vault UI uses a comprehensive, professional theme system built on **Tailwind CSS v4** with a dark-mode-first approach. The theme features modern indigo/violet gradients as primary colors with a dark slate background for a sleek, professional appearance.

## Architecture

The theme is structured using Tailwind's layered approach:

1. **`@theme`** - CSS custom properties and design tokens
2. **`@layer base`** - Global styles and resets
3. **`@layer components`** - Reusable component classes
4. **`@layer utilities`** - Custom utility classes
5. **Keyframe Animations** - Custom animations

## Color System

### Background Colors
- **Primary Background**: `slate-950` (rgb(2, 6, 23))
- **Elevated Surfaces**: `slate-900` (rgb(15, 23, 42))
- **Muted Backgrounds**: `slate-800` (rgb(30, 41, 59))

### Foreground Colors
- **Primary Text**: `slate-50` (rgb(248, 250, 252))
- **Secondary Text**: `slate-300` (rgb(203, 213, 225))
- **Tertiary Text**: `slate-400` (rgb(148, 163, 184))

### Brand Colors

#### Primary (Indigo)
- `primary-400`: rgb(129, 140, 248) - Light variant
- `primary-500`: rgb(99, 102, 241) - Main brand color
- `primary-600`: rgb(79, 70, 229) - Dark variant

#### Secondary (Violet)
- `secondary-400`: rgb(167, 139, 250) - Light variant
- `secondary-500`: rgb(139, 92, 246) - Main secondary color
- `secondary-600`: rgb(124, 58, 237) - Dark variant

#### Accent (Cyan)
- `accent-400`: rgb(34, 211, 238)

### Semantic Colors
- **Success**: `emerald-400` - rgb(52, 211, 153)
- **Warning**: `amber-400` - rgb(251, 191, 36)
- **Error**: `red-400` - rgb(248, 113, 113)
- **Info**: `blue-400` - rgb(96, 165, 250)

## Typography

### Font Families
- **Sans-serif**: `Inter` (with system fallbacks)
- **Monospace**: `ui-monospace` with fallbacks

### Font Sizes
| Name | Size | Pixels |
|------|------|--------|
| `text-xs` | 0.75rem | 12px |
| `text-sm` | 0.875rem | 14px |
| `text-base` | 1rem | 16px |
| `text-lg` | 1.125rem | 18px |
| `text-xl` | 1.25rem | 20px |
| `text-2xl` | 1.5rem | 24px |
| `text-3xl` | 1.875rem | 30px |
| `text-4xl` | 2.25rem | 36px |
| `text-5xl` | 3rem | 48px |
| `text-6xl` | 3.75rem | 60px |
| `text-7xl` | 4.5rem | 72px |

### Line Heights
- `leading-tight`: 1.25
- `leading-snug`: 1.375
- `leading-normal`: 1.5
- `leading-relaxed`: 1.625
- `leading-loose`: 2

## Spacing System

Complete spacing scale from `0` to `24`:
- `spacing-1`: 0.25rem (4px)
- `spacing-2`: 0.5rem (8px)
- `spacing-4`: 1rem (16px)
- `spacing-6`: 1.5rem (24px)
- `spacing-8`: 2rem (32px)
- `spacing-12`: 3rem (48px)
- `spacing-16`: 4rem (64px)
- `spacing-24`: 6rem (96px)

## Border Radius

- `radius-sm`: 0.375rem (6px)
- `radius-base`: 0.5rem (8px)
- `radius-md`: 0.75rem (12px)
- `radius-lg`: 1rem (16px)
- `radius-xl`: 1.25rem (20px)
- `radius-2xl`: 1.5rem (24px)
- `radius-3xl`: 2rem (32px)
- `radius-full`: 9999px (circular)

## Shadow System

### Standard Shadows
- `shadow-xs`: Subtle shadow for minimal elevation
- `shadow-sm`: Small shadow for slight elevation
- `shadow-md`: Medium shadow for cards
- `shadow-lg`: Large shadow for modals
- `shadow-xl`: Extra large shadow for floating elements
- `shadow-2xl`: Maximum shadow for dramatic effect

### Colored Shadows
- `shadow-primary`: Indigo-tinted shadow
- `shadow-primary-lg`: Large indigo-tinted shadow
- `shadow-secondary`: Violet-tinted shadow
- `shadow-secondary-lg`: Large violet-tinted shadow

## Transitions

### Durations
- `duration-75`: 75ms
- `duration-150`: 150ms
- `duration-200`: 200ms
- `duration-300`: 300ms (default)
- `duration-500`: 500ms
- `duration-700`: 700ms

### Easing Functions
- `ease-linear`: Linear timing
- `ease-in`: Accelerating
- `ease-out`: Decelerating
- `ease-in-out`: Smooth (default)
- `ease-bounce`: Bouncy effect
- `ease-smooth`: Extra smooth

### Combined Transitions
- `transition-fast`: 150ms ease-in-out
- `transition-base`: 300ms ease-in-out
- `transition-slow`: 500ms ease-in-out

## Component Classes

### Button Variants

```tsx
// Primary button - main call-to-action
<button className="btn-primary">
  Click Me
</button>

// Secondary button - alternative actions
<button className="btn-secondary">
  Cancel
</button>

// Outline button - subtle actions
<button className="btn-outline">
  Learn More
</button>

// Ghost button - minimal style
<button className="btn-ghost">
  Skip
</button>

// Size modifiers
<button className="btn-primary btn-sm">Small</button>
<button className="btn-primary btn-lg">Large</button>
```

### Card Variants

```tsx
// Basic card
<div className="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

// Hoverable card
<div className="card-hover">
  <h3>Hover Me</h3>
</div>

// Interactive card (clickable)
<div className="card-interactive" onClick={handleClick}>
  <h3>Click Me</h3>
</div>
```

### Badge Variants

```tsx
<span className="badge-success">Success</span>
<span className="badge-warning">Warning</span>
<span className="badge-error">Error</span>
<span className="badge-info">Info</span>
<span className="badge-primary">Primary</span>
```

### Input Variants

```tsx
// Standard input
<input className="input" placeholder="Enter text..." />

// Error state input
<input className="input-error" placeholder="Invalid input" />
```

## Utility Classes

### Gradient Text

```tsx
// Standard gradient (indigo to violet)
<h1 className="text-gradient">
  Gradient Heading
</h1>

// Primary gradient
<h2 className="text-gradient-primary">
  Primary Gradient
</h2>

// Secondary gradient
<h3 className="text-gradient-secondary">
  Secondary Gradient
</h3>

// Success gradient
<span className="text-gradient-success">
  Success Text
</span>
```

### Glassmorphism Effects

```tsx
// Standard glass effect
<div className="glass p-6 rounded-xl">
  Glassmorphism content
</div>

// Strong glass effect
<div className="glass-strong p-6 rounded-xl">
  More opaque glass
</div>

// Light glass effect
<div className="glass-light p-6 rounded-xl">
  Subtle glass
</div>
```

### Gradient Backgrounds

```tsx
// Primary gradient background
<div className="bg-gradient-primary p-8 rounded-2xl">
  Content with gradient
</div>

// Radial gradient (for backgrounds)
<div className="bg-gradient-radial">
  Radial glow effect
</div>
```

### Animation Utilities

```tsx
// Fade in
<div className="animate-fade-in">Fades in</div>

// Fade in from bottom
<div className="animate-fade-in-up">Slides up while fading</div>

// Fade in from top
<div className="animate-fade-in-down">Slides down while fading</div>

// Slide from right
<div className="animate-slide-in-right">Slides from right</div>

// Scale in
<div className="animate-scale-in">Scales up</div>

// Glow effect
<div className="animate-glow">Pulsing glow</div>
```

### Hover Effects

```tsx
// Lift on hover
<div className="hover-lift">Lifts up on hover</div>

// Scale on hover
<div className="hover-scale">Scales up on hover</div>

// Glow on hover
<div className="hover-glow">Glows on hover</div>
```

### Scrollbar Utilities

```tsx
// Custom styled scrollbar
<div className="custom-scrollbar overflow-auto">
  Scrollable content
</div>

// Thin scrollbar
<div className="scrollbar-thin overflow-auto">
  Scrollable content with thin bar
</div>

// Hide scrollbar
<div className="scrollbar-hide overflow-auto">
  Scrollable but no visible scrollbar
</div>
```

### Focus States

```tsx
// Ring focus style
<button className="focus-ring">
  Focused with ring
</button>

// Inset ring focus
<button className="focus-ring-inset">
  Focused with inset ring
</button>
```

### Safe Area Utilities (Mobile)

For devices with notches/islands:

```tsx
<div className="safe-top">Top safe area</div>
<div className="safe-bottom">Bottom safe area</div>
<div className="safe-left">Left safe area</div>
<div className="safe-right">Right safe area</div>
```

## Layout Utilities

### Container
```tsx
<div className="container-app">
  <!-- Max-width container with responsive padding -->
</div>
```

### Section
```tsx
<section className="section">
  <!-- Section with responsive vertical padding -->
</section>
```

## Custom Animations

The theme includes several keyframe animations:

- **fadeIn**: Simple fade in
- **fadeInUp**: Fade in + slide up
- **fadeInDown**: Fade in + slide down
- **slideInRight**: Slide in from right
- **scaleIn**: Scale up from center
- **glow**: Pulsing glow effect
- **spin**: 360° rotation
- **ping**: Expanding ping effect
- **pulse**: Opacity pulse
- **bounce**: Bouncing effect

## Usage Examples

### Creating a Card with Hover Effect

```tsx
<div className="card-hover">
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-white">Card Title</h3>
  </div>
  <p className="text-slate-400">
    Card description with proper color contrast.
  </p>
</div>
```

### Creating a Primary Button with Icon

```tsx
<button className="btn-primary">
  <Plus className="w-5 h-5" />
  Add New Item
</button>
```

### Creating a Hero Section

```tsx
<section className="section">
  <div className="container-app">
    <h1 className="text-7xl font-bold text-gradient mb-6">
      Your Awesome Headline
    </h1>
    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
      Supporting text with proper hierarchy
    </p>
    <button className="btn-primary btn-lg">
      Get Started
    </button>
  </div>
</section>
```

### Creating a Status Badge

```tsx
<div className="flex gap-2">
  <span className="badge-success">
    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
    Active
  </span>
  <span className="badge-warning">
    <Loader2 className="w-3 h-3 animate-spin" />
    Processing
  </span>
</div>
```

## Best Practices

1. **Use Semantic Colors**: Use `emerald` for success, `amber` for warning, `red` for errors
2. **Maintain Contrast**: Always test text on backgrounds for readability
3. **Use Consistent Spacing**: Stick to the spacing scale (4, 6, 8, 12, etc.)
4. **Apply Transitions**: Add `transition-all duration-300` to interactive elements
5. **Use Glass Effects**: For overlays and floating elements, use glass variants
6. **Gradient Text**: Use sparingly for emphasis and headlines
7. **Focus States**: Always include focus states for accessibility
8. **Dark Theme First**: All colors are optimized for dark backgrounds

## Accessibility

The theme includes:
- ✅ High contrast ratios for text
- ✅ Focus ring styles for keyboard navigation
- ✅ Semantic color usage
- ✅ Screen reader-friendly markup
- ✅ Proper heading hierarchy
- ✅ Touch-friendly sizing (min 44px for interactive elements)

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ iOS Safari (latest)
- ✅ Chrome Android (latest)

## Performance

- CSS file size: ~70KB (9KB gzipped)
- No runtime CSS-in-JS overhead
- Optimized with PurgeCSS via Tailwind
- All fonts are preloaded from Google Fonts

## Customization

To customize the theme, edit the `@theme` block in `src/index.css`:

```css
@theme {
  /* Override any color, spacing, or design token */
  --color-primary-500: YOUR_COLOR_HERE;
}
```

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Color Palette Reference](https://tailwindcss.com/docs/customizing-colors)
- [Inter Font](https://fonts.google.com/specimen/Inter)

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Maintained by**: Frontend Development Team
