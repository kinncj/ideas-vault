export type InputType = 'text' | 'voice' | 'image';

export type IdeaStatus = 'ready' | 'analyzing';

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export interface GrowthMetric {
  year: number;
  value: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: IdeaStatus;
  inputType: InputType;
  imageData?: string; // Base64 encoded image data
  readinessScore: number;
  marketSize: string;
  targetAudience: string;
  topCompetitor: string;
  competitorStrength: string;
  keyTrend: string;
  competitors: Competitor[];
  growthMetrics: GrowthMetric[];
  actionPlan: string[];
  createdAt: Date;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: IdeaStatus;
  inputType: InputType;
  imageData?: string; // Base64 encoded image data
  readinessScore: number;
  marketSize: string;
  targetAudience: string;
  topCompetitor: string;
  competitorStrength: string;
  keyTrend: string;
  competitors: Competitor[];
  growthMetrics: GrowthMetric[];
  actionPlan: string[];
  createdAt: Date;
}
