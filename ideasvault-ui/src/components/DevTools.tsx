import { Trash2, RefreshCw, Cpu, Sparkles, HardDrive, X, GripVertical } from 'lucide-react';
import { storage } from '../utils/storage';
import { useState, useEffect, useRef } from 'react';

interface DevToolsProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export function DevTools({ isVisible = true, onClose }: DevToolsProps) {
  const [aiMode, setAiMode] = useState<'ai' | 'heuristic'>('ai');
  const [webGPUSupported, setWebGPUSupported] = useState(false);
  const [modelCached, setModelCached] = useState(false);
  const [cacheInfo, setCacheInfo] = useState<{ model: string; cachedAt: string } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const devToolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check WebGPU support
    setWebGPUSupported(!!(navigator as any).gpu);
    // Load saved preference
    const saved = localStorage.getItem('ideasvault_ai_mode');
    if (saved === 'heuristic') setAiMode('heuristic');
    
    // Check model cache status
    checkModelCache();

    // Load saved position
    const savedPosition = localStorage.getItem('devtools_position');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const checkModelCache = async () => {
    const { IdeaAnalyzer } = await import('../utils/aiAnalyzer');
    const analyzer = new IdeaAnalyzer();
    setModelCached(analyzer.isModelCached());
    setCacheInfo(analyzer.getCachedModelInfo());
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (devToolsRef.current) {
      const rect = devToolsRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - (devToolsRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (devToolsRef.current?.offsetHeight || 0);
      
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));
      
      setPosition({ x: boundedX, y: boundedY });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Save position
      localStorage.setItem('devtools_position', JSON.stringify(position));
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleClose = () => {
    localStorage.setItem('devtools_visible', 'false');
    onClose?.();
  };

  if (!isVisible) return null;

  const toggleAiMode = () => {
    const newMode = aiMode === 'ai' ? 'heuristic' : 'ai';
    setAiMode(newMode);
    localStorage.setItem('ideasvault_ai_mode', newMode);
    console.log(`🔄 Switched to ${newMode.toUpperCase()} mode`);
    alert(`Analysis mode: ${newMode === 'ai' ? '🧠 AI-Powered (Local LLM)' : '📊 Heuristic (Fast)'}\n\nNext idea analysis will use ${newMode} mode.`);
  };

  const handleClearAll = () => {
    console.log('🗑️ Clear All button clicked');
    if (window.confirm('Clear all ideas and reset the app? This cannot be undone.')) {
      console.log('Clearing localStorage...');
      localStorage.clear();
      console.log('Reloading page...');
      window.location.reload();
    }
  };

  const handleClearModelCache = async () => {
    console.log('🗑️ Clear Model Cache button clicked');
    if (window.confirm('Clear the AI model cache? The model will be re-downloaded on next analysis (3.8GB).')) {
      const { IdeaAnalyzer } = await import('../utils/aiAnalyzer');
      const analyzer = new IdeaAnalyzer();
      await analyzer.clearModelCache();
      setModelCached(false);
      setCacheInfo(null);
      alert('Model cache cleared! The model will be downloaded again on next AI analysis.');
    }
  };

  const handleReanalyzeAll = async () => {
    console.log('🔄 Re-analyze button clicked');
    if (window.confirm('Re-analyze all ideas? This will update all ideas with fresh AI analysis.')) {
      console.clear();
      console.log('🔄 Starting re-analysis of all ideas...');
      const { IdeaAnalyzer } = await import('../utils/aiAnalyzer');
      const analyzer = new IdeaAnalyzer();
      const ideas = storage.getIdeas();
      
      console.log(`📊 Found ${ideas.length} ideas to re-analyze\n`);
      
      for (let i = 0; i < ideas.length; i++) {
        const idea = ideas[i];
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`[${i + 1}/${ideas.length}] 🔍 Re-analyzing: "${idea.title}"`);
        console.log(`Description: ${idea.description.substring(0, 100)}...`);
        console.log(`Tags: ${idea.tags.join(', ')}\n`);
        
        const analysis = await analyzer.analyzeIdea(idea.title, idea.description, idea.tags);
        storage.updateIdea(idea.id, { ...analysis, status: 'ready' });
        
        console.log(`✅ Completed: ${idea.title}\n`);
      }
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 All ideas re-analyzed successfully!');
      console.log('💾 Data saved to localStorage');
      console.log('🔄 Refresh the page to see updated data');
      
      // Update cache status
      await checkModelCache();
      
      alert('Re-analysis complete! Check console for full details.\n\nClick OK to refresh the page.');
      window.location.reload();
    } else {
      console.log('Re-analysis cancelled by user');
    }
  };

  return (
    <div
      ref={devToolsRef}
      className="fixed bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 min-w-[220px] select-none"
      style={{
        left: position.x || 'auto',
        top: position.y || 'auto',
        right: position.x ? 'auto' : '1rem',
        bottom: position.y ? 'auto' : '1rem',
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-slate-700 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-white">Dev Tools</h3>
        </div>
        <button
          onClick={handleClose}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
          aria-label="Close Dev Tools"
        >
          <X className="w-4 h-4 text-slate-400 hover:text-white" />
        </button>
      </div>
      
      <div className="p-4">
      
      {/* AI Mode Status */}
      <div className="mb-3 p-2 bg-slate-700/50 rounded-lg">
        <div className="text-xs text-slate-400 mb-1">Analysis Mode</div>
        <div className="flex items-center gap-2">
          {aiMode === 'ai' ? (
            <><Sparkles className="w-4 h-4 text-purple-400" /> <span className="text-sm text-white">AI-Powered</span></>
          ) : (
            <><Cpu className="w-4 h-4 text-blue-400" /> <span className="text-sm text-white">Heuristic</span></>
          )}
        </div>
        {!webGPUSupported && aiMode === 'ai' && (
          <div className="text-xs text-amber-400 mt-1">⚠️ WebGPU not supported</div>
        )}
      </div>

      {/* Model Cache Status */}
      {aiMode === 'ai' && webGPUSupported && (
        <div className="mb-3 p-2 bg-slate-700/50 rounded-lg">
          <div className="text-xs text-slate-400 mb-1">Model Cache</div>
          <div className="flex items-center gap-2">
            <HardDrive className={`w-4 h-4 ${modelCached ? 'text-green-400' : 'text-slate-400'}`} />
            <span className="text-sm text-white">
              {modelCached ? 'Cached (3.8GB)' : 'Not cached'}
            </span>
          </div>
          {cacheInfo && (
            <div className="text-xs text-slate-400 mt-1">
              {new Date(cacheInfo.cachedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={toggleAiMode}
          className={`flex items-center gap-2 px-4 py-2 text-white text-sm rounded-lg transition-colors ${
            aiMode === 'ai' ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'
          }`}
        >
          {aiMode === 'ai' ? (
            <><Cpu className="w-4 h-4" /> Switch to Heuristic</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Switch to AI</>
          )}
        </button>
        <button
          onClick={() => {
            console.log('🧪 TEST: Console is working!');
            console.log('Current ideas:', storage.getIdeas());
            console.log('AI Mode:', aiMode);
            console.log('WebGPU Support:', webGPUSupported);
            alert('Check the console - you should see logs!');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-500 transition-colors"
        >
          🧪 Test Console
        </button>
        <button
          onClick={handleReanalyzeAll}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Re-analyze All Ideas
        </button>
        {modelCached && aiMode === 'ai' && (
          <button
            onClick={handleClearModelCache}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-500 transition-colors"
          >
            <HardDrive className="w-4 h-4" />
            Clear Model Cache
          </button>
        )}
        <button
          onClick={handleClearAll}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear All Data
        </button>
      </div>
      </div>
    </div>
  );
}
