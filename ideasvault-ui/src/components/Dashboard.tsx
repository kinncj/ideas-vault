import { motion } from 'framer-motion';
import { Plus, FileText, Mic, Image, Loader2 } from 'lucide-react';
import type { Idea } from '../constants';

interface DashboardProps {
  ideas: Idea[];
  onOpenCapture: () => void;
  onSelectIdea: (idea: Idea) => void;
}

export function Dashboard({ ideas, onOpenCapture, onSelectIdea }: DashboardProps) {
  return (
    <div className="p-6 md:p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Your Vault
          </h1>
          <p className="text-slate-400">
            {ideas.length} {ideas.length === 1 ? 'idea' : 'ideas'} stored and analyzed
          </p>
        </div>
        <button
          onClick={onOpenCapture}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
        >
          <Plus className="w-5 h-5" />
          Add New Idea
        </button>
      </div>

      {/* Ideas Grid */}
      {ideas.length === 0 ? (
        <EmptyState onOpenCapture={onOpenCapture} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ideas.map((idea, index) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              index={index}
              onClick={() => onSelectIdea(idea)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface IdeaCardProps {
  idea: Idea;
  index: number;
  onClick: () => void;
}

function IdeaCard({ idea, index, onClick }: IdeaCardProps) {
  const inputTypeIcons = {
    text: <FileText className="w-4 h-4" />,
    voice: <Mic className="w-4 h-4" />,
    image: <Image className="w-4 h-4" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
    >
      {/* Header with Status and Input Type */}
      <div className="flex items-start justify-between mb-4">
        <StatusBadge status={idea.status} />
        <div className="p-2 bg-slate-700/50 text-slate-400 rounded-lg group-hover:text-indigo-400 transition-colors">
          {inputTypeIcons[idea.inputType]}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">
        {idea.title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
        {idea.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {idea.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-medium rounded-lg border border-indigo-500/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Readiness Score Preview */}
      {idea.status === 'ready' && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Readiness Score</span>
            <span className="text-lg font-bold text-emerald-400">
              {idea.readinessScore}%
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface StatusBadgeProps {
  status: 'ready' | 'analyzing';
}

function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'ready') {
    return (
      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Ready
      </div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-lg border border-amber-500/20 flex items-center gap-1.5"
    >
      <Loader2 className="w-3 h-3 animate-spin" />
      Agents Analyzing...
    </motion.div>
  );
}

interface EmptyStateProps {
  onOpenCapture: () => void;
}

function EmptyState({ onOpenCapture }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center">
          <Plus className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Your vault is empty
        </h2>
        <p className="text-slate-400 mb-8">
          Start by adding your first startup idea. Our AI agents will begin researching
          it immediately to provide you with market insights and validation.
        </p>
        <button
          onClick={onOpenCapture}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-indigo-500/30"
        >
          <Plus className="w-5 h-5" />
          Add Your First Idea
        </button>
      </div>
    </motion.div>
  );
}
