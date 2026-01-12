import { Sparkles, Check, AlertTriangle, Info, X, Loader2 } from 'lucide-react';

/**
 * Theme Showcase Component
 * 
 * This component demonstrates all available theme components and utilities.
 * Use this as a reference when building new UI components.
 * 
 * To view this showcase:
 * 1. Import this component in your App.tsx
 * 2. Render <ThemeShowcase /> temporarily
 * 3. Remove when done
 */

export function ThemeShowcase() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="container-app">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Ideas Vault Theme Showcase
          </h1>
          <p className="text-xl text-slate-300">
            A comprehensive preview of all theme components and utilities
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Buttons</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">
                <Sparkles className="w-5 h-5" />
                Primary Button
              </button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-outline">Outline Button</button>
              <button className="btn-ghost">Ghost Button</button>
              <button className="btn-primary" disabled>Disabled</button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary btn-sm">Small Button</button>
              <button className="btn-primary">Regular Button</button>
              <button className="btn-primary btn-lg">Large Button</button>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Cards</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-3">
                Basic Card
              </h3>
              <p className="text-slate-400">
                Standard card with no hover effects. Good for static content.
              </p>
            </div>
            <div className="card-hover">
              <h3 className="text-xl font-semibold text-white mb-3">
                Hover Card
              </h3>
              <p className="text-slate-400">
                Card with hover lift effect and border color change.
              </p>
            </div>
            <div className="card-interactive">
              <h3 className="text-xl font-semibold text-white mb-3">
                Interactive Card
              </h3>
              <p className="text-slate-400">
                Clickable card with hover effects and active state.
              </p>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <span className="badge-success">
              <Check className="w-3 h-3" />
              Success
            </span>
            <span className="badge-warning">
              <AlertTriangle className="w-3 h-3" />
              Warning
            </span>
            <span className="badge-error">
              <X className="w-3 h-3" />
              Error
            </span>
            <span className="badge-info">
              <Info className="w-3 h-3" />
              Info
            </span>
            <span className="badge-primary">
              <Sparkles className="w-3 h-3" />
              Primary
            </span>
            <span className="badge-warning">
              <Loader2 className="w-3 h-3 animate-spin" />
              Processing
            </span>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Form Inputs</h2>
          <div className="max-w-2xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Standard Input
              </label>
              <input 
                className="input" 
                placeholder="Enter your text here..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Error Input
              </label>
              <input 
                className="input-error" 
                placeholder="This field has an error" 
              />
              <p className="text-red-400 text-sm mt-1">This field is required</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Textarea
              </label>
              <textarea 
                className="input min-h-32" 
                placeholder="Enter longer text here..."
              />
            </div>
          </div>
        </section>

        {/* Gradient Text Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Gradient Text</h2>
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-gradient">
              Standard Gradient (Indigo to Violet)
            </h3>
            <h3 className="text-4xl font-bold text-gradient-primary">
              Primary Gradient (Multi-stop Indigo)
            </h3>
            <h3 className="text-4xl font-bold text-gradient-secondary">
              Secondary Gradient (Violet to Fuchsia)
            </h3>
            <h3 className="text-4xl font-bold text-gradient-success">
              Success Gradient (Emerald to Teal)
            </h3>
          </div>
        </section>

        {/* Glass Effects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Glassmorphism</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                Standard Glass
              </h3>
              <p className="text-slate-300">
                50% opacity with subtle blur
              </p>
            </div>
            <div className="glass-strong p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                Strong Glass
              </h3>
              <p className="text-slate-300">
                70% opacity with medium blur
              </p>
            </div>
            <div className="glass-light p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                Light Glass
              </h3>
              <p className="text-slate-300">
                30% opacity with subtle blur
              </p>
            </div>
          </div>
        </section>

        {/* Animations Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Animations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card animate-fade-in">
              <h3 className="text-lg font-semibold text-white mb-2">
                Fade In
              </h3>
              <p className="text-slate-400 text-sm">
                Simple fade animation
              </p>
            </div>
            <div className="card animate-fade-in-up">
              <h3 className="text-lg font-semibold text-white mb-2">
                Fade In Up
              </h3>
              <p className="text-slate-400 text-sm">
                Fade + slide from bottom
              </p>
            </div>
            <div className="card animate-fade-in-down">
              <h3 className="text-lg font-semibold text-white mb-2">
                Fade In Down
              </h3>
              <p className="text-slate-400 text-sm">
                Fade + slide from top
              </p>
            </div>
            <div className="card animate-slide-in-right">
              <h3 className="text-lg font-semibold text-white mb-2">
                Slide In Right
              </h3>
              <p className="text-slate-400 text-sm">
                Slide from right side
              </p>
            </div>
            <div className="card animate-scale-in">
              <h3 className="text-lg font-semibold text-white mb-2">
                Scale In
              </h3>
              <p className="text-slate-400 text-sm">
                Scale up from center
              </p>
            </div>
            <div className="card animate-glow">
              <h3 className="text-lg font-semibold text-white mb-2">
                Glow Effect
              </h3>
              <p className="text-slate-400 text-sm">
                Pulsing glow animation
              </p>
            </div>
          </div>
        </section>

        {/* Hover Effects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Hover Effects</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card hover-lift">
              <h3 className="text-lg font-semibold text-white mb-2">
                Hover Lift
              </h3>
              <p className="text-slate-400 text-sm">
                Lifts up on hover
              </p>
            </div>
            <div className="card hover-scale">
              <h3 className="text-lg font-semibold text-white mb-2">
                Hover Scale
              </h3>
              <p className="text-slate-400 text-sm">
                Scales up on hover
              </p>
            </div>
            <div className="card hover-glow">
              <h3 className="text-lg font-semibold text-white mb-2">
                Hover Glow
              </h3>
              <p className="text-slate-400 text-sm">
                Glows on hover
              </p>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Color Palette</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Primary (Indigo)</h3>
              <div className="flex flex-wrap gap-4">
                <ColorSwatch color="bg-indigo-400" label="400" />
                <ColorSwatch color="bg-indigo-500" label="500" />
                <ColorSwatch color="bg-indigo-600" label="600" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Secondary (Violet)</h3>
              <div className="flex flex-wrap gap-4">
                <ColorSwatch color="bg-violet-400" label="400" />
                <ColorSwatch color="bg-violet-500" label="500" />
                <ColorSwatch color="bg-violet-600" label="600" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Semantic Colors</h3>
              <div className="flex flex-wrap gap-4">
                <ColorSwatch color="bg-emerald-400" label="Success" />
                <ColorSwatch color="bg-amber-400" label="Warning" />
                <ColorSwatch color="bg-red-400" label="Error" />
                <ColorSwatch color="bg-blue-400" label="Info" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Backgrounds</h3>
              <div className="flex flex-wrap gap-4">
                <ColorSwatch color="bg-slate-950" label="950" dark />
                <ColorSwatch color="bg-slate-900" label="900" dark />
                <ColorSwatch color="bg-slate-800" label="800" dark />
                <ColorSwatch color="bg-slate-700" label="700" dark />
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white">Heading 1 - 60px</h1>
            <h2 className="text-5xl font-bold text-white">Heading 2 - 48px</h2>
            <h3 className="text-4xl font-bold text-white">Heading 3 - 36px</h3>
            <h4 className="text-3xl font-bold text-white">Heading 4 - 30px</h4>
            <h5 className="text-2xl font-bold text-white">Heading 5 - 24px</h5>
            <h6 className="text-xl font-bold text-white">Heading 6 - 20px</h6>
            <p className="text-lg text-slate-300">
              Body Large - 18px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-base text-slate-300">
              Body Regular - 16px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-sm text-slate-400">
              Body Small - 14px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="text-xs text-slate-500">
              Caption - 12px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </section>

        {/* Scrollbar Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Scrollbars</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Custom Scrollbar</h3>
              <div className="custom-scrollbar h-48 overflow-auto bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="text-slate-300 mb-2">
                    Line {i + 1} - Scroll to see custom scrollbar
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Thin Scrollbar</h3>
              <div className="scrollbar-thin h-48 overflow-auto bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="text-slate-300 mb-2">
                    Line {i + 1} - Thin scrollbar variant
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Hidden Scrollbar</h3>
              <div className="scrollbar-hide h-48 overflow-auto bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="text-slate-300 mb-2">
                    Line {i + 1} - Scrollbar is hidden but functional
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-slate-800">
          <p className="text-slate-400">
            Theme Showcase - Ideas Vault UI - {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}

// Helper component for color swatches
function ColorSwatch({ color, label, dark = false }: { color: string; label: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <div className={`w-20 h-20 ${color} rounded-xl shadow-lg mb-2 ${dark ? 'border border-slate-700' : ''}`} />
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
