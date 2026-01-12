import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, Zap } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Ideas Vault</h1>
          </div>
        </motion.div>

        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-4xl mb-6"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Your startup ideas,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              researched on autopilot
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            Store your ideas securely while AI agents work 24/7 to validate markets,
            analyze competitors, and calculate readiness scores.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <button
            onClick={onEnterApp}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-lg font-semibold rounded-2xl hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60"
          >
            <span className="flex items-center gap-2">
              Open Your Vault
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl w-full"
        >
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Secure Storage"
            description="Your ideas are encrypted and stored safely in your personal vault"
          />
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Market Analysis"
            description="AI agents research market size, trends, and opportunities automatically"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Instant Insights"
            description="Get readiness scores and competitor analysis in real-time"
          />
        </motion.div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-indigo-500/50 transition-all duration-300"
    >
      <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  );
}
