import { Wrench, Sparkles, Cpu, Database, Code } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SettingsProps {
  onShowDevTools: () => void;
}

export function Settings({ onShowDevTools }: SettingsProps) {
  const [aiMode, setAiMode] = useState<'ai' | 'heuristic'>('ai');
  const [webGPUSupported, setWebGPUSupported] = useState(false);
  const [devToolsVisible, setDevToolsVisible] = useState(true);

  useEffect(() => {
    setWebGPUSupported(!!(navigator as any).gpu);
    const saved = localStorage.getItem('ideasvault_ai_mode');
    if (saved === 'heuristic') setAiMode('heuristic');
    
    const visible = localStorage.getItem('devtools_visible');
    setDevToolsVisible(visible !== 'false');
  }, []);

  const toggleAiMode = () => {
    const newMode = aiMode === 'ai' ? 'heuristic' : 'ai';
    setAiMode(newMode);
    localStorage.setItem('ideasvault_ai_mode', newMode);
  };

  const handleShowDevTools = () => {
    localStorage.setItem('devtools_visible', 'true');
    setDevToolsVisible(true);
    onShowDevTools();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure your Ideas Vault experience</p>
      </div>

      <div className="space-y-6">
        {/* AI Analysis Settings */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">AI Analysis</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Analysis Mode</h3>
                <p className="text-sm text-slate-400">
                  Choose between AI-powered analysis or fast heuristic analysis
                </p>
              </div>
              <button
                onClick={toggleAiMode}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  aiMode === 'ai'
                    ? 'bg-purple-600 text-white hover:bg-purple-500'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {aiMode === 'ai' ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Mode
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Heuristic Mode
                  </span>
                )}
              </button>
            </div>

            {aiMode === 'ai' && (
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-1">WebGPU Status</h4>
                    <p className="text-sm text-slate-400">
                      {webGPUSupported ? (
                        <span className="text-green-400">✓ WebGPU supported - AI analysis available</span>
                      ) : (
                        <span className="text-amber-400">⚠ WebGPU not supported - using heuristic fallback</span>
                      )}
                    </p>
                    {webGPUSupported && (
                      <p className="text-xs text-slate-500 mt-2">
                        The AI model (3.8GB) is cached locally and will load instantly after first download.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Developer Tools */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Code className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Developer Tools</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Dev Tools Panel</h3>
                <p className="text-sm text-slate-400">
                  Access advanced debugging and development features
                </p>
              </div>
              {!devToolsVisible && (
                <button
                  onClick={handleShowDevTools}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors"
                >
                  <Wrench className="w-4 h-4" />
                  Show Dev Tools
                </button>
              )}
            </div>

            {devToolsVisible && (
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400">
                  <span className="text-green-400">✓</span> Dev Tools panel is visible
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  The Dev Tools panel can be dragged around the screen and closed when not needed.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Database className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Storage</h2>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-white font-medium mb-1">Local Storage</h3>
              <p className="text-sm text-slate-400">
                All your ideas are stored locally in your browser. No data is sent to external servers.
              </p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500">
                💡 Your ideas are saved automatically and persist across sessions. 
                The AI model cache is stored in IndexedDB and survives browser restarts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
