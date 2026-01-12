// Onboarding and demo data utilities

const ONBOARDING_KEY = 'ideasvault_onboarding_complete';

export const onboarding = {
  isComplete(): boolean {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  },

  markComplete(): void {
    localStorage.setItem(ONBOARDING_KEY, 'true');
  },

  reset(): void {
    localStorage.removeItem(ONBOARDING_KEY);
  }
};

// Demo ideas for first-time users
export const DEMO_IDEAS = [
  {
    title: 'AI-Powered Email Assistant',
    description: 'An intelligent email management tool that uses AI to categorize, prioritize, and draft responses to emails. It learns from your writing style and can handle routine correspondence automatically.',
    tags: '#SaaS, #AI, #Productivity'
  },
  {
    title: 'DevPortfolio - No-Code Portfolio Builder',
    description: 'A specialized portfolio builder that integrates with GitHub to automatically showcase projects, contributions, and skills with beautiful templates.',
    tags: '#SaaS, #Developer Tools, #NoCode'
  }
];
