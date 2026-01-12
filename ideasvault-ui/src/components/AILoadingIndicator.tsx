import { Sparkles } from 'lucide-react';

interface AILoadingIndicatorProps {
  message?: string;
}

export function AILoadingIndicator({ message = 'AI is analyzing your idea...' }: AILoadingIndicatorProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 border border-purple-500/30 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <div className="absolute inset-0 bg-purple-400/20 blur-xl animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Processing</h3>
            <p className="text-sm text-slate-400">{message}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Running local AI model in your browser</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
            <span>Your data never leaves your device</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
            <span>First analysis may take 1-2 minutes to download model</span>
          </div>
        </div>

        <div className="mt-6 w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-gradient-x"></div>
        </div>
      </div>
    </div>
  );
}
