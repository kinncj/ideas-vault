import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  LandingPage,
  AppLayout,
  Dashboard,
  CaptureModal,
  IdeaDetailView,
  DevTools,
  Settings
} from './components';
import { type Idea, type InputType } from './constants';
import { storage } from './utils/storage';
import { IdeaAnalyzer } from './utils/aiAnalyzer';
import { onboarding, DEMO_IDEAS } from './utils/onboarding';

const analyzer = new IdeaAnalyzer();

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [devToolsVisible, setDevToolsVisible] = useState(true);
  const navigate = useNavigate();

  // Load ideas from localStorage on mount
  useEffect(() => {
    const storedIdeas = storage.getIdeas();
    setIdeas(storedIdeas);
    
    // Check if this is first time user
    if (storedIdeas.length === 0 && !onboarding.isComplete()) {
      setShowOnboarding(true);
    }

    // Check DevTools visibility
    const visible = localStorage.getItem('devtools_visible');
    setDevToolsVisible(visible !== 'false');
  }, []);

  const handleLoadDemoData = async () => {
    setShowOnboarding(false);
    onboarding.markComplete();
    
    // Add demo ideas
    for (const demo of DEMO_IDEAS) {
      const tags = demo.tags.split(',').map(t => t.trim());
      await handleSubmitIdea(demo.title, demo.description, tags, 'text');
    }
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    onboarding.markComplete();
  };

  const handleEnterApp = () => {
    navigate('/vault');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSelectIdea = (idea: Idea) => {
    navigate(`/vault/idea/${idea.id}`);
  };

  const handleBackToDashboard = () => {
    navigate('/vault');
  };

  const handleDeleteIdea = () => {
    // Refresh ideas list after deletion
    const storedIdeas = storage.getIdeas();
    setIdeas(storedIdeas);
    navigate('/vault');
  };

  const handleSubmitIdea = async (
    title: string,
    description: string,
    tags: string[],
    inputType: InputType,
    imageData?: string
  ) => {
    // Create idea with analyzing status
    const newIdea: Idea = {
      id: Date.now().toString(),
      title,
      description,
      tags,
      status: 'analyzing',
      inputType,
      imageData,
      readinessScore: 0,
      marketSize: '',
      targetAudience: '',
      topCompetitor: '',
      competitorStrength: '',
      keyTrend: '',
      competitors: [],
      growthMetrics: [],
      actionPlan: [],
      createdAt: new Date()
    };

    // Add idea to state and storage immediately
    setIdeas([newIdea, ...ideas]);
    storage.addIdea(newIdea);
    setIsCaptureModalOpen(false);

    // Analyze idea in background
    try {
      const analysis = await analyzer.analyzeIdea(title, description, tags);
      const analyzedIdea: Idea = {
        ...newIdea,
        ...analysis,
        status: 'ready'
      };

      // Update idea with analysis results
      setIdeas(prevIdeas =>
        prevIdeas.map(idea => idea.id === newIdea.id ? analyzedIdea : idea)
      );
      storage.updateIdea(newIdea.id, { ...analysis, status: 'ready' });
    } catch (error) {
      console.error('Error analyzing idea:', error);
      // Still mark as ready even if analysis fails
      storage.updateIdea(newIdea.id, { status: 'ready' });
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage onEnterApp={handleEnterApp} />} />
        <Route
          path="/vault"
          element={
            <AppLayout onLogout={handleLogout}>
              <Dashboard
                ideas={ideas}
                onOpenCapture={() => setIsCaptureModalOpen(true)}
                onSelectIdea={handleSelectIdea}
              />
            </AppLayout>
          }
        />
        <Route
          path="/vault/settings"
          element={
            <AppLayout onLogout={handleLogout}>
              <Settings onShowDevTools={() => setDevToolsVisible(true)} />
            </AppLayout>
          }
        />
        <Route
          path="/vault/idea/:id"
          element={
            <AppLayout onLogout={handleLogout}>
              <IdeaDetailViewRoute
                ideas={ideas}
                onBack={handleBackToDashboard}
                onDelete={handleDeleteIdea}
              />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CaptureModal
        isOpen={isCaptureModalOpen}
        onClose={() => setIsCaptureModalOpen(false)}
        onSubmit={handleSubmitIdea}
      />

      <DevTools
        isVisible={devToolsVisible}
        onClose={() => setDevToolsVisible(false)}
      />

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to Ideas Vault!</h2>
            <p className="text-slate-300 mb-6">
              Your vault is empty. Would you like to load some example ideas to see how it works?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSkipOnboarding}
                className="flex-1 px-6 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-700 transition-colors"
              >
                Start Fresh
              </button>
              <button
                onClick={handleLoadDemoData}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                Load Examples
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Helper component to handle idea detail route with params
function IdeaDetailViewRoute({
  ideas,
  onBack,
  onDelete,
}: {
  ideas: Idea[];
  onBack: () => void;
  onDelete: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const idea = ideas.find(i => i.id === id);

  if (!idea) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Idea Not Found</h2>
          <p className="text-slate-400 mb-4">The idea you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
          >
            Back to Vault
          </button>
        </div>
      </div>
    );
  }

  return <IdeaDetailView idea={idea} onBack={onBack} onDelete={onDelete} />;
}

export default App;
