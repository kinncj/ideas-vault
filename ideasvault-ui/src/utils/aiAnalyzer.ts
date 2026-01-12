import type { Idea, Competitor } from '../constants';
import * as webllm from '@mlc-ai/web-llm';

// AI-powered idea analyzer using local LLM (runs in browser via WebGPU)
export class IdeaAnalyzer {
  private engine: webllm.MLCEngine | null = null;
  private initializationPromise: Promise<void> | null = null;
  private isInitialized = false;
  private useAI = true; // Toggle to use AI or fallback to heuristics

  constructor() {
    // Detect WebGPU support
    if (!(navigator as any).gpu) {
      console.warn('⚠️ WebGPU not supported in this browser. Falling back to heuristic analysis.');
      this.useAI = false;
    }
  }

  // Check if the AI model is already cached
  isModelCached(): boolean {
    return localStorage.getItem('webllm_model_cached') !== null;
  }

  // Get cached model information
  getCachedModelInfo(): { model: string; cachedAt: string } | null {
    const cached = localStorage.getItem('webllm_model_cached');
    if (!cached) return null;
    try {
      return JSON.parse(cached);
    } catch {
      return null;
    }
  }

  // Clear the model cache (useful for debugging or forcing re-download)
  async clearModelCache(): Promise<void> {
    localStorage.removeItem('webllm_model_cached');
    // Clear IndexedDB cache used by WebLLM
    try {
      const databases = await indexedDB.databases();
      for (const db of databases) {
        if (db.name?.includes('webllm') || db.name?.includes('mlc')) {
          indexedDB.deleteDatabase(db.name);
          console.log(`🗑️ Cleared cache database: ${db.name}`);
        }
      }
      console.log('✅ Model cache cleared successfully');
    } catch (error) {
      console.error('Failed to clear model cache:', error);
    }
  }

  // Initialize the local AI model (one-time download and setup)
  async initializeAI(): Promise<void> {
    if (this.isInitialized || !this.useAI) return;
    if (this.initializationPromise) return this.initializationPromise;

    this.initializationPromise = (async () => {
      try {
        // Check if model is already cached
        const cachedModelInfo = localStorage.getItem('webllm_model_cached');
        if (cachedModelInfo) {
          console.log('✨ Using cached AI model from IndexedDB...');
        } else {
          console.log('🤖 Initializing local AI model (first time may take 2-3 minutes to download)...');
          console.log('💾 Model will be cached in browser storage for future use');
        }
        
        // Use Qwen2.5-3B-Instruct (3.8GB) - excellent at structured JSON output and instruction following
        // WebLLM automatically caches the model in IndexedDB after first download
        this.engine = await webllm.CreateMLCEngine('Qwen2.5-3B-Instruct-q4f16_1-MLC', {
          initProgressCallback: (progress) => {
            const percentage = (progress.progress * 100).toFixed(1);
            if (cachedModelInfo) {
              console.log(`📦 Loading cached model: ${percentage}%`);
            } else {
              console.log(`📥 Downloading model: ${percentage}%`);
            }
          }
        });
        
        // Mark model as cached for next time
        localStorage.setItem('webllm_model_cached', JSON.stringify({
          model: 'Qwen2.5-3B-Instruct-q4f16_1-MLC',
          cachedAt: new Date().toISOString()
        }));
        
        this.isInitialized = true;
        console.log('✅ AI model ready!');
        console.log('💾 Model cached in IndexedDB for instant loading next time');
      } catch (error) {
        console.error('❌ Failed to initialize AI model:', error);
        console.log('↩️ Falling back to heuristic analysis');
        this.useAI = false;
      }
    })();

    return this.initializationPromise;
  }

  // Analyze idea and generate market insights
  async analyzeIdea(title: string, description: string, tags: string[]): Promise<Partial<Idea>> {
    console.log('🤖 AI Analyzer starting analysis...');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Tags:', tags);

    // Try AI analysis first, fallback to heuristics if unavailable
    if (this.useAI) {
      try {
        await this.initializeAI();
        if (this.isInitialized && this.engine) {
          console.log('🧠 Using local AI model for analysis...');
          return await this.analyzeWithAI(title, description, tags);
        }
      } catch (error) {
        console.error('AI analysis failed:', error);
        console.log('↩️ Falling back to heuristic analysis');
      }
    }

    // Fallback to heuristic analysis
    console.log('📊 Using heuristic analysis...');
    return await this.analyzeWithHeuristics(title, description, tags);
  }

  // AI-powered analysis using local LLM
  private async analyzeWithAI(title: string, description: string, tags: string[]): Promise<Partial<Idea>> {
    if (!this.engine) throw new Error('AI engine not initialized');

    // Truncate description to fit in context window (4096 tokens ≈ 16000 chars)
    // Leave room for prompt instructions (~1000 tokens) and response (~1500 tokens)
    const maxDescriptionLength = 6000;
    let truncatedDescription = description;
    
    if (description.length > maxDescriptionLength) {
      truncatedDescription = description.slice(0, maxDescriptionLength) + '\n\n[... description truncated for AI analysis ...]';
      console.log(`⚠️ Description truncated from ${description.length} to ${maxDescriptionLength} characters to fit AI context window`);
    }

    const prompt = `Analyze this business idea and provide market analysis. Return ONLY a JSON object with this exact structure:

Business Idea:
Title: ${title}
Tags: ${tags.join(', ')}
Description: ${truncatedDescription.substring(0, 2000)}

Required JSON format (return ONLY the JSON, no other text):
{
  "readinessScore": <number 0-100>,
  "marketSize": "$X.XB",
  "targetAudience": "description of target market",
  "competitors": [
    {"name": "competitor name", "strength": "what they do well", "weakness": "what they lack"}
  ],
  "keyTrend": "relevant market trend",
  "actionPlan": ["concrete step 1", "concrete step 2", "concrete step 3"],
  "growthMetrics": [
    {"year": 2026, "value": <number>},
    {"year": 2027, "value": <number>},
    {"year": 2028, "value": <number>},
    {"year": 2029, "value": <number>}
  ]
}`;

    console.log('💭 Querying AI model...');
    const response = await this.engine.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a business analyst AI that returns analysis in JSON format. Always respond with valid JSON only, no markdown formatting or explanations. Ensure all JSON strings are properly quoted and closed.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 1500,
    });

    const aiResponse = response.choices[0]?.message?.content;
    console.log('🤖 AI Response received');
    console.log('📄 Raw AI response length:', aiResponse?.length);

    try {
      // Extract JSON from response (handle markdown code blocks and plain JSON)
      let jsonStr = aiResponse || '';
      
      // Remove markdown code blocks if present
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      
      // Try to find the most complete JSON object
      // Use a greedy match to capture the full JSON structure
      let cleanJson = '';
      
      // First, try to extract JSON from first { to last }
      const firstBrace = jsonStr.indexOf('{');
      const lastBrace = jsonStr.lastIndexOf('}');
      
      if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
        throw new Error('No valid JSON structure found in response');
      }
      
      cleanJson = jsonStr.substring(firstBrace, lastBrace + 1);
      
      // Fix common AI JSON issues
      // 1. Remove trailing commas before closing brackets
      cleanJson = cleanJson.replace(/,(\s*[}\]])/g, '$1');
      
      // 2. Fix incomplete string values (missing closing quotes)
      // Count quotes to detect unclosed strings
      const quoteCount = (cleanJson.match(/"/g) || []).length;
      if (quoteCount % 2 !== 0) {
        console.warn('⚠️ Detected unclosed string in JSON response');
        // Try to fix by finding the last incomplete value and truncating
        const lines = cleanJson.split('\n');
        let fixedLines: string[] = [];
        let openBraces = 0;
        let openBrackets = 0;
        let inString = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          let validLine = line;
          
          // Track brace/bracket depth
          for (const char of line) {
            if (char === '"' && (i === 0 || line[line.indexOf(char) - 1] !== '\\')) {
              inString = !inString;
            }
            if (!inString) {
              if (char === '{') openBraces++;
              if (char === '}') openBraces--;
              if (char === '[') openBrackets++;
              if (char === ']') openBrackets--;
            }
          }
          
          // If still in a string at line end, try to close it
          if (inString && i < lines.length - 1) {
            validLine = line + '"';
            inString = false;
          }
          
          fixedLines.push(validLine);
        }
        
        cleanJson = fixedLines.join('\n');
        
        // Ensure proper closing of arrays and objects
        while (openBrackets > 0) {
          cleanJson += '\n]';
          openBrackets--;
        }
        while (openBraces > 0) {
          cleanJson += '\n}';
          openBraces--;
        }
      }
      
      console.log('🧹 Cleaned JSON length:', cleanJson.length);
      console.log('🔍 JSON preview:', cleanJson.substring(0, 200) + '...' + cleanJson.substring(cleanJson.length - 100));
      
      const analysis = JSON.parse(cleanJson);
      
      // Validate required fields
      if (!analysis.readinessScore || !analysis.marketSize || !analysis.targetAudience) {
        console.warn('⚠️ Missing required fields in parsed JSON');
        console.warn('Available fields:', Object.keys(analysis));
        throw new Error('Parsed JSON missing required fields');
      }
      
      console.log('✅ AI Analysis complete!');

      return {
        readinessScore: analysis.readinessScore || 70,
        marketSize: analysis.marketSize || '$2.5B',
        targetAudience: analysis.targetAudience || 'Tech-forward professionals',
        topCompetitor: analysis.competitors?.[0]?.name || 'Market Leader',
        competitorStrength: analysis.competitors?.[0]?.strength || 'Strong market position',
        keyTrend: analysis.keyTrend || 'Digital transformation accelerating',
        competitors: analysis.competitors || [],
        growthMetrics: analysis.growthMetrics || this.generateGrowthMetrics(2.5),
        actionPlan: analysis.actionPlan || []
      };
    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', parseError);
      if (parseError instanceof SyntaxError) {
        console.error('JSON Syntax Error at:', parseError.message);
      }
      console.log('↩️ Falling back to heuristics');
      return await this.analyzeWithHeuristics(title, description, tags);
    }
  }

  // Heuristic-based analysis (original logic)
  private async analyzeWithHeuristics(_title: string, description: string, tags: string[]): Promise<Partial<Idea>> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extract keywords and analyze sentiment
    const keywords = this.extractKeywords(description);
    console.log('📊 Extracted keywords:', keywords);
    
    const sentiment = this.analyzeSentiment(description);
    console.log('😊 Sentiment score:', sentiment);
    
    const complexity = this.assessComplexity(description);
    console.log('🧠 Complexity score:', complexity);
    
    // Generate market size based on keywords and industry
    const marketSize = this.estimateMarketSize(keywords, tags);
    console.log('💰 Estimated market size:', `$${marketSize}B`);
    
    // Determine target audience
    const targetAudience = this.determineTargetAudience(keywords, tags);
    console.log('🎯 Target audience:', targetAudience);
    
    // Generate competitor analysis
    const competitors = this.generateCompetitorAnalysis(keywords, tags);
    console.log('🏢 Found competitors:', competitors.map(c => c.name));
    
    // Calculate readiness score
    const readinessScore = this.calculateReadinessScore(description, tags, sentiment, complexity);
    console.log('✅ Readiness score:', readinessScore);
    
    // Generate growth metrics
    const growthMetrics = this.generateGrowthMetrics(marketSize);
    console.log('📈 Growth metrics:', growthMetrics);
    
    // Generate action plan
    const actionPlan = this.generateActionPlan(keywords, tags, readinessScore);
    console.log('📋 Action plan generated:', actionPlan.length, 'steps');
    
    // Determine key trend
    const keyTrend = this.determineKeyTrend(tags, keywords);
    console.log('🔥 Key trend:', keyTrend);
    
    console.log('✨ Heuristic Analysis complete!');

    return {
      readinessScore,
      marketSize: `$${marketSize}B`,
      targetAudience,
      topCompetitor: competitors[0].name,
      competitorStrength: competitors[0].strength,
      keyTrend,
      competitors,
      growthMetrics,
      actionPlan
    };
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction
    const commonWords = new Set([
      'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
      'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
      'could', 'should', 'may', 'might', 'can', 'that', 'this', 'these',
      'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'them', 'their'
    ]);

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word))
      .slice(0, 10);
  }

  private analyzeSentiment(text: string): number {
    // Simple sentiment analysis based on positive/negative words
    const positiveWords = ['good', 'great', 'excellent', 'innovative', 'efficient', 'powerful', 'easy', 'fast', 'smart', 'intelligent', 'automated', 'secure', 'reliable', 'scalable', 'flexible'];
    const negativeWords = ['difficult', 'hard', 'slow', 'expensive', 'complicated', 'poor', 'bad', 'weak', 'limited', 'outdated'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0.5; // neutral

    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) score += 0.05;
      if (negativeWords.some(nw => word.includes(nw))) score -= 0.05;
    });

    return Math.max(0, Math.min(1, score));
  }

  private assessComplexity(text: string): number {
    // Assess idea complexity based on description length and structure
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // More complex ideas have longer descriptions and more structured writing
    let complexity = 0.5;
    if (words > 50) complexity += 0.1;
    if (words > 100) complexity += 0.1;
    if (avgWordsPerSentence > 15) complexity += 0.1;
    
    return Math.min(1, complexity);
  }

  private estimateMarketSize(keywords: string[], tags: string[]): number {
    // Estimate market size based on industry indicators
    const techKeywords = ['ai', 'software', 'platform', 'saas', 'app', 'digital', 'cloud', 'data', 'automation', 'intelligence'];
    const enterpriseKeywords = ['enterprise', 'business', 'corporate', 'professional', 'b2b'];
    const consumerKeywords = ['consumer', 'user', 'personal', 'home', 'lifestyle', 'b2c'];
    const healthKeywords = ['health', 'medical', 'wellness', 'healthcare', 'fitness'];
    const financeKeywords = ['finance', 'payment', 'banking', 'fintech', 'crypto'];
    const educationKeywords = ['education', 'learning', 'training', 'course', 'edtech'];
    
    let baseSize = 1.5; // $1.5B base
    
    const allText = [...keywords, ...tags.map(t => t.replace('#', ''))].join(' ').toLowerCase();
    
    // Large market multipliers
    if (financeKeywords.some(kw => allText.includes(kw))) baseSize *= 3.5; // Finance is huge
    if (healthKeywords.some(kw => allText.includes(kw))) baseSize *= 2.8; // Healthcare is massive
    if (techKeywords.some(kw => allText.includes(kw))) baseSize *= 2.2; // Tech is growing
    if (educationKeywords.some(kw => allText.includes(kw))) baseSize *= 1.8;
    
    // Target market modifiers
    if (enterpriseKeywords.some(kw => allText.includes(kw))) baseSize *= 1.7; // Enterprise = bigger deals
    if (consumerKeywords.some(kw => allText.includes(kw))) baseSize *= 1.4; // Consumer = volume
    
    // Specific high-value keywords
    if (allText.includes('ai') || allText.includes('automation')) baseSize *= 1.5;
    if (allText.includes('blockchain') || allText.includes('crypto')) baseSize *= 1.4;
    if (allText.includes('security') || allText.includes('cyber')) baseSize *= 1.3;
    
    // Add realistic variation
    baseSize *= (0.85 + Math.random() * 0.3);
    
    return Math.round(baseSize * 10) / 10; // Round to 1 decimal
  }

  private determineTargetAudience(keywords: string[], tags: string[]): string {
    const allText = [...keywords, ...tags.map(t => t.replace('#', ''))].join(' ').toLowerCase();
    
    const audiences = [
      { keywords: ['marine', 'ocean', 'nautical', 'boat', 'vessel', 'ship', 'maritime', 'sailor'], audience: 'Marine professionals, boat operators, commercial shipping companies, and maritime organizations' },
      { keywords: ['fish', 'fishing', 'angler', 'catch', 'tackle', 'commercial fishing'], audience: 'Commercial and recreational fishermen, fishing charter operators, and marine resource managers' },
      { keywords: ['weather', 'forecast', 'meteorology', 'climate'], audience: 'Weather-dependent industries, outdoor professionals, and climate-sensitive operations' },
      { keywords: ['farm', 'agriculture', 'crop', 'farmer', 'harvest', 'rural'], audience: 'Farmers, agricultural businesses, and agribusiness professionals' },
      { keywords: ['transport', 'logistics', 'fleet', 'driver', 'delivery'], audience: 'Fleet managers, logistics companies, and transportation coordinators' },
      { keywords: ['restaurant', 'food service', 'chef', 'kitchen', 'hospitality'], audience: 'Restaurant owners, food service operators, and hospitality professionals' },
      { keywords: ['enterprise', 'corporate', 'business', 'b2b', 'professional', 'organization'], audience: 'Enterprise organizations (500+ employees) and Fortune 1000 companies' },
      { keywords: ['smb', 'small business', 'startup', 'founder', 'entrepreneur'], audience: 'Small-to-medium businesses, startups, and entrepreneurial teams (5-50 people)' },
      { keywords: ['developer', 'programmer', 'engineer', 'code', 'api', 'technical'], audience: 'Software developers, DevOps engineers, and technical teams' },
      { keywords: ['designer', 'creative', 'artist', 'content', 'marketing'], audience: 'Creative professionals, designers, and content creators' },
      { keywords: ['consumer', 'personal', 'individual', 'home', 'family', 'lifestyle', 'b2c'], audience: 'General consumers aged 25-45, tech-savvy early adopters' },
      { keywords: ['student', 'education', 'learning', 'academic', 'university'], audience: 'Students, educational institutions, and lifelong learners' },
      { keywords: ['health', 'medical', 'doctor', 'healthcare', 'patient', 'clinic'], audience: 'Healthcare providers, medical professionals, and wellness practitioners' },
      { keywords: ['finance', 'accounting', 'cfo', 'financial'], audience: 'Finance professionals, CFOs, and accounting teams' },
      { keywords: ['sales', 'crm', 'customer', 'lead'], audience: 'Sales teams, account executives, and customer success managers' },
      { keywords: ['hr', 'human resources', 'recruiting', 'talent'], audience: 'HR departments, talent acquisition teams, and people ops' },
      { keywords: ['ecommerce', 'retail', 'merchant', 'seller'], audience: 'E-commerce merchants, retail brands, and online sellers' },
    ];

    for (const { keywords: kws, audience } of audiences) {
      if (kws.some(kw => allText.includes(kw))) {
        return audience;
      }
    }

    return 'Tech-forward professionals and early adopter organizations';
  }

  private generateCompetitorAnalysis(keywords: string[], tags: string[]): Competitor[] {
    const allText = [...keywords, ...tags.map(t => t.replace('#', ''))].join(' ').toLowerCase();
    const competitors: Competitor[] = [];
    
    // Real-world competitor patterns based on industry
    const competitorSets = {
      saas: ['Salesforce', 'HubSpot', 'Zendesk', 'Intercom', 'Slack', 'Asana', 'Monday.com', 'ClickUp'],
      ai: ['OpenAI', 'Anthropic', 'Cohere', 'Jasper', 'Copy.ai', 'Writer', 'Grammarly', 'Notion AI'],
      email: ['Gmail', 'Outlook', 'Superhuman', 'Hey', 'Spark', 'Front', 'Mailchimp', 'SendGrid'],
      productivity: ['Notion', 'Coda', 'Airtable', 'Trello', 'ClickUp', 'Linear', 'Height', 'Shortcut'],
      developer: ['GitHub', 'GitLab', 'Bitbucket', 'Vercel', 'Netlify', 'Render', 'Railway', 'Fly.io'],
      design: ['Figma', 'Sketch', 'Adobe XD', 'Canva', 'Framer', 'InVision', 'Miro', 'FigJam'],
      ecommerce: ['Shopify', 'WooCommerce', 'BigCommerce', 'Wix', 'Squarespace', 'Webflow', 'Amazon'],
      fintech: ['Stripe', 'Square', 'PayPal', 'Plaid', 'Wise', 'Revolut', 'Chime', 'Brex'],
      security: ['Okta', 'Auth0', 'Duo', '1Password', 'LastPass', 'Bitwarden', 'CrowdStrike'],
      analytics: ['Google Analytics', 'Mixpanel', 'Amplitude', 'Heap', 'Segment', 'PostHog'],
      crm: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho', 'Freshworks', 'Close', 'Copper'],
      communication: ['Slack', 'Discord', 'Microsoft Teams', 'Zoom', 'Loom', 'Whereby', 'Around'],
      weather: ['Weather.com', 'AccuWeather', 'Dark Sky', 'Weather Underground', 'NOAA', 'Windy', 'Buoy Weather'],
      marine: ['Windy', 'PredictWind', 'Windfinder', 'SailFlow', 'Navionics', 'C-MAP', 'Garmin Marine'],
      fishing: ['Fishbrain', 'Navionics', 'FishAngler', 'Fishidy', 'iAngler', 'Pro Angler', 'FishTrack'],
      agriculture: ['Climate FieldView', 'John Deere Operations', 'FarmLogs', 'AgWorld', 'Trimble Ag'],
      transportation: ['Uber', 'Lyft', 'Waze', 'Google Maps', 'Samsara', 'Motive', 'Fleet Complete'],
      food: ['DoorDash', 'Uber Eats', 'Grubhub', 'Toast', 'Square for Restaurants', 'OpenTable'],
      travel: ['Booking.com', 'Airbnb', 'Expedia', 'TripAdvisor', 'Kayak', 'Hopper', 'Skyscanner'],
      fitness: ['Peloton', 'Strava', 'MyFitnessPal', 'Fitbit', 'Apple Fitness', 'Nike Training', 'Whoop']
    };

    // Detect category and select real competitors
    let categoryCompetitors: string[] = [];
    
    if (allText.match(/\b(marine|ocean|sea|nautical|boat|vessel|ship|maritime)\b/)) {
      categoryCompetitors = competitorSets.marine;
    } else if (allText.match(/\b(fish|fishing|angler|catch|tackle)\b/)) {
      categoryCompetitors = competitorSets.fishing;
    } else if (allText.match(/\b(weather|forecast|climate|meteorology|temperature|precipitation)\b/)) {
      categoryCompetitors = competitorSets.weather;
    } else if (allText.match(/\b(farm|agriculture|crop|harvest|soil|irrigation)\b/)) {
      categoryCompetitors = competitorSets.agriculture;
    } else if (allText.match(/\b(transport|logistics|fleet|delivery|shipping|route)\b/)) {
      categoryCompetitors = competitorSets.transportation;
    } else if (allText.match(/\b(restaurant|food|meal|recipe|cooking|kitchen)\b/)) {
      categoryCompetitors = competitorSets.food;
    } else if (allText.match(/\b(travel|trip|hotel|flight|vacation|booking)\b/)) {
      categoryCompetitors = competitorSets.travel;
    } else if (allText.match(/\b(fitness|workout|exercise|gym|training|health)\b/)) {
      categoryCompetitors = competitorSets.fitness;
    } else if (allText.match(/\b(ai|artificial intelligence|ml|machine learning|gpt)\b/)) {
      categoryCompetitors = competitorSets.ai;
    } else if (allText.match(/\b(email|inbox|mail)\b/)) {
      categoryCompetitors = competitorSets.email;
    } else if (allText.match(/\b(task|project|productivity|workflow)\b/)) {
      categoryCompetitors = competitorSets.productivity;
    } else if (allText.match(/\b(code|developer|github|git)\b/)) {
      categoryCompetitors = competitorSets.developer;
    } else if (allText.match(/\b(design|ui|ux|wireframe)\b/)) {
      categoryCompetitors = competitorSets.design;
    } else if (allText.match(/\b(ecommerce|shop|store|sell)\b/)) {
      categoryCompetitors = competitorSets.ecommerce;
    } else if (allText.match(/\b(payment|fintech|bank|finance)\b/)) {
      categoryCompetitors = competitorSets.fintech;
    } else if (allText.match(/\b(security|auth|password)\b/)) {
      categoryCompetitors = competitorSets.security;
    } else if (allText.match(/\b(analytics|tracking|metrics)\b/)) {
      categoryCompetitors = competitorSets.analytics;
    } else if (allText.match(/\b(crm|sales|customer)\b/)) {
      categoryCompetitors = competitorSets.crm;
    } else if (allText.match(/\b(chat|messaging|communication|video)\b/)) {
      categoryCompetitors = competitorSets.communication;
    } else {
      categoryCompetitors = competitorSets.saas;
    }

    // Shuffle and pick 3 unique competitors
    const shuffled = [...categoryCompetitors].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);

    // Generate realistic strengths and weaknesses
    const strengthTemplates = [
      'Market leader with extensive enterprise customer base and $XM ARR',
      'Strong brand recognition and Y-year track record in the market',
      'Comprehensive feature set with robust API and integration ecosystem',
      'Excellent user experience and high customer satisfaction (4.5+ rating)',
      'Well-funded ($XM Series Y) with aggressive expansion strategy',
      'Dominant market share (X%) and network effects from large user base'
    ];

    const weaknessTemplates = [
      'Premium pricing ($X+/month) excludes small businesses and startups',
      'Complex setup requiring technical expertise and lengthy onboarding',
      'Limited customization options and rigid workflow structure',
      'Slow to innovate, relying on legacy architecture and acquisition strategy',
      'Poor customer support response times and high churn in SMB segment',
      'Bloated feature set causing confusion and steep learning curve'
    ];

    selected.forEach((name, _i) => {
      const strengthIdx = Math.floor(Math.random() * strengthTemplates.length);
      const weaknessIdx = Math.floor(Math.random() * weaknessTemplates.length);
      
      let strength = strengthTemplates[strengthIdx]
        .replace('X', String(Math.floor(Math.random() * 500) + 50))
        .replace('Y', String(Math.floor(Math.random() * 5) + 3));
        
      let weakness = weaknessTemplates[weaknessIdx]
        .replace('X', String(Math.floor(Math.random() * 200) + 50));

      competitors.push({
        name,
        strength,
        weakness
      });
    });

    return competitors;
  }

  private calculateReadinessScore(
    description: string,
    tags: string[],
    sentiment: number,
    complexity: number
  ): number {
    let score = 50; // Base score

    // Length of description indicates thought investment
    const words = description.split(/\s+/).length;
    if (words > 30) score += 10;
    if (words > 60) score += 10;

    // Tags indicate market awareness
    score += Math.min(tags.length * 5, 15);

    // Sentiment affects readiness
    score += (sentiment - 0.5) * 20;

    // Some complexity is good
    score += complexity * 10;

    return Math.min(95, Math.max(60, Math.round(score)));
  }

  private generateGrowthMetrics(marketSize: number): Array<{ year: number; value: number }> {
    const currentYear = new Date().getFullYear();
    const baseValue = marketSize * 100; // Convert to millions
    const metrics = [];

    for (let i = 0; i < 4; i++) {
      const year = currentYear + i;
      // Growth rate between 30-60% annually
      const growthRate = 1 + (0.3 + Math.random() * 0.3);
      const value = Math.round(baseValue * Math.pow(growthRate, i));
      
      metrics.push({
        year,
        value
      });
    }

    return metrics;
  }

  private generateActionPlan(keywords: string[], tags: string[], readinessScore: number): string[] {
    const actions: string[] = [];
    const allText = [...keywords, ...tags.map(t => t.replace('#', ''))].join(' ').toLowerCase();

    // Research phase - contextual based on readiness
    if (readinessScore < 75) {
      actions.push('Conduct 30+ customer discovery interviews to validate problem-solution fit');
      actions.push('Create detailed customer personas and map user journey pain points');
    } else {
      actions.push('Refine value proposition and test pricing models with early adopters');
    }

    // Development phase - tech-specific
    const hasTech = tags.some(t => ['#SaaS', '#AI', '#App', '#Software', '#Platform'].includes(t));
    if (hasTech) {
      if (allText.includes('ai') || allText.includes('automation')) {
        actions.push('Build AI-powered MVP focusing on core automation workflow, target 3-month timeline');
      } else {
        actions.push('Develop feature-complete MVP with analytics dashboard and API integrations');
      }
    } else {
      actions.push('Create interactive prototype and conduct usability testing with 15+ users');
    }

    // Market strategy - varies by audience
    if (allText.includes('enterprise') || allText.includes('b2b') || allText.includes('business')) {
      actions.push('Execute targeted LinkedIn outreach to 100+ decision makers in target verticals');
      if (readinessScore > 80) {
        actions.push('Build proof of concept with 3 design partners, negotiate pilot contracts');
      }
    } else if (allText.includes('consumer') || allText.includes('b2c')) {
      actions.push('Launch Product Hunt campaign and build waitlist of 1,000+ early users');
      if (readinessScore > 80) {
        actions.push('Create viral marketing content and leverage influencer partnerships');
      }
    } else {
      actions.push('Identify and engage with 5 potential early adopter communities and forums');
    }

    // Funding strategy
    if (readinessScore > 85) {
      actions.push('Prepare investor pitch deck and warm introductions to 10+ seed funds');
    } else if (readinessScore > 75) {
      actions.push('Bootstrap to MVP using savings, explore accelerator programs and grants');
    }

    return actions.slice(0, 5);
  }

  private determineKeyTrend(tags: string[], keywords: string[]): string {
    const allText = [...keywords, ...tags.map(t => t.replace('#', ''))].join(' ').toLowerCase();
    const currentYear = new Date().getFullYear();
    
    const trends = [
      { keywords: ['ai', 'intelligence', 'automation', 'learning', 'gpt', 'llm'], trend: `AI adoption in enterprise grew 67% in ${currentYear}, GenAI tools reaching 82% market penetration` },
      { keywords: ['remote', 'distributed', 'virtual', 'async', 'hybrid'], trend: 'Hybrid work solutions market expanding 41% annually, $85B by 2027' },
      { keywords: ['sustainable', 'green', 'eco', 'climate', 'carbon'], trend: `Climate tech funding reached $70B in ${currentYear}, 3x growth in corporate ESG mandates` },
      { keywords: ['blockchain', 'crypto', 'web3', 'decentralized', 'nft'], trend: 'Enterprise blockchain adoption up 53%, major banks launching digital asset services' },
      { keywords: ['health', 'wellness', 'mental', 'fitness', 'medical'], trend: 'Digital health valuations surged 34%, telemedicine becoming standard care delivery' },
      { keywords: ['data', 'analytics', 'insights', 'intelligence', 'reporting'], trend: 'Real-time analytics market growing 38% YoY, AI-powered insights now table stakes' },
      { keywords: ['security', 'privacy', 'protection', 'safe', 'cyber'], trend: 'Cybersecurity spending hit $215B globally, zero-trust architecture now enterprise standard' },
      { keywords: ['developer', 'code', 'api', 'software', 'platform'], trend: 'Low-code/no-code platforms growing 44% annually, dev productivity tools booming' },
      { keywords: ['ecommerce', 'retail', 'shop', 'marketplace'], trend: 'Social commerce exploding with 58% growth, live shopping becoming mainstream' },
      { keywords: ['fintech', 'payment', 'banking', 'finance'], trend: 'Embedded finance market reaching $230B, banking-as-a-service transforming industries' },
      { keywords: ['education', 'learning', 'training', 'course'], trend: 'EdTech investments surged 49%, personalized learning AI adoption accelerating' },
      { keywords: ['productivity', 'workflow', 'efficiency', 'collaboration'], trend: 'Workflow automation spend up 52%, AI copilots becoming enterprise standard' },
    ];

    for (const { keywords: kws, trend } of trends) {
      if (kws.some(kw => allText.includes(kw))) {
        return trend;
      }
    }

    return 'Digital transformation investments up 45% across industries, cloud-first strategies now mainstream';
  }
}
