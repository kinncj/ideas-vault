import type { Idea } from '../constants';

const STORAGE_KEY = 'ideasvault_ideas';

export const storage = {
  getIdeas(): Idea[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const ideas = JSON.parse(data) as Array<Omit<Idea, 'createdAt'> & { createdAt: string }>;
      // Convert date strings back to Date objects
      return ideas.map((idea) => ({
        ...idea,
        createdAt: new Date(idea.createdAt)
      }));
    } catch (error) {
      console.error('Error loading ideas from storage:', error);
      return [];
    }
  },

  saveIdeas(ideas: Idea[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch (error) {
      console.error('Error saving ideas to storage:', error);
    }
  },

  addIdea(idea: Idea): void {
    const ideas = this.getIdeas();
    ideas.unshift(idea);
    this.saveIdeas(ideas);
  },

  updateIdea(id: string, updates: Partial<Idea>): void {
    const ideas = this.getIdeas();
    const index = ideas.findIndex(i => i.id === id);
    if (index !== -1) {
      ideas[index] = { ...ideas[index], ...updates };
      this.saveIdeas(ideas);
    }
  },

  deleteIdea(id: string): void {
    const ideas = this.getIdeas().filter(i => i.id !== id);
    this.saveIdeas(ideas);
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};
