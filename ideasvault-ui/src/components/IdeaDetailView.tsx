import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Download,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Trash2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Idea } from '../constants';
import { storage } from '../utils/storage';

interface IdeaDetailViewProps {
  idea: Idea;
  onBack: () => void;
  onDelete?: () => void;
}

export function IdeaDetailView({ idea, onBack, onDelete }: IdeaDetailViewProps) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${idea.title}"? This action cannot be undone.`)) {
      storage.deleteIdea(idea.id);
      if (onDelete) onDelete();
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Vault
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {idea.title}
                </h1>
                <StatusBadge status={idea.status} />
              </div>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-lg border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
  <button 
                onClick={handleDelete}
                className="p-3 bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
                title="Delete idea"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            
            <div className="flex gap-2">
              <button className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl hover:bg-slate-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl hover:bg-slate-700 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Concept & Readiness */}
          <div className="lg:col-span-2 space-y-6">
            {/* Concept Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-400" />
                Concept
              </h2>
              {idea.imageData && (
                <div className="mb-4">
                  <img 
                    src={idea.imageData} 
                    alt={idea.title} 
                    className="w-full max-h-64 object-contain rounded-lg border border-slate-700"
                  />
                </div>
              )}
              <p className="text-slate-300 leading-relaxed">{idea.description}</p>
            </motion.div>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <MetricCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Total Addressable Market"
                value={idea.marketSize}
                delay={0.2}
              />
              <MetricCard
                icon={<Users className="w-5 h-5" />}
                label="Primary Target Audience"
                value={idea.targetAudience}
                delay={0.25}
              />
              <MetricCard
                icon={<Target className="w-5 h-5" />}
                label="Top Competitor"
                value={idea.topCompetitor}
                subtitle={idea.competitorStrength}
                delay={0.3}
              />
              <MetricCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Key Market Trend"
                value={idea.keyTrend}
                delay={0.35}
              />
            </div>

            {/* Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">
                Projected Market Growth
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={idea.growthMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="year"
                      stroke="#94a3b8"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${value}M`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                      }}
                      formatter={(value) => [`$${value}M`, 'Market Size']}
                    />
                    <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Competitors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">
                Competitor Analysis
              </h2>
              <div className="space-y-4">
                {idea.competitors.map((competitor, i) => (
                  <CompetitorCard key={i} competitor={competitor} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Readiness & Action Plan */}
          <div className="space-y-6">
            {/* Readiness Score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Readiness Score
              </h2>
              <div className="flex items-end gap-2 mb-2">
                <div className="text-6xl font-bold text-emerald-400">
                  {idea.readinessScore}
                </div>
                <div className="text-2xl text-emerald-400 mb-2">/100</div>
              </div>
              <p className="text-sm text-slate-400">
                {idea.readinessScore >= 85 && 'Excellent - Ready to execute'}
                {idea.readinessScore >= 70 && idea.readinessScore < 85 && 'Good - Minor refinements needed'}
                {idea.readinessScore < 70 && 'Fair - Requires more research'}
              </p>
            </motion.div>

            {/* Action Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">
                Suggested Next Steps
              </h2>
              <div className="space-y-3">
                {idea.actionPlan.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700/50"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center text-sm font-semibold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  delay: number;
}

function MetricCard({ icon, label, value, subtitle, delay }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-5"
    >
      <div className="flex items-center gap-2 text-indigo-400 mb-3">
        {icon}
        <span className="text-sm font-medium text-slate-400">{label}</span>
      </div>
      <p className="text-lg font-semibold text-white mb-1">{value}</p>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </motion.div>
  );
}

interface CompetitorCardProps {
  competitor: {
    name: string;
    strength: string;
    weakness: string;
  };
}

function CompetitorCard({ competitor }: CompetitorCardProps) {
  return (
    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
      <h3 className="font-semibold text-white mb-3">{competitor.name}</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-emerald-400 font-medium mb-1">Strength</p>
            <p className="text-sm text-slate-300">{competitor.strength}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-amber-400 font-medium mb-1">Weakness</p>
            <p className="text-sm text-slate-300">{competitor.weakness}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'ready' | 'analyzing' }) {
  if (status === 'ready') {
    return (
      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Ready
      </div>
    );
  }

  return (
    <div className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-lg border border-amber-500/20 flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
      Analyzing
    </div>
  );
}
