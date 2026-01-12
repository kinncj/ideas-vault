# Ideas Vault - User Stories

## Overview
This document contains user stories following the standard format: "As a [user type], I want [goal] so that [benefit]". Each story includes acceptance criteria, story points (estimated effort), and priority.

---

## Story Points Reference
- **1 point**: Trivial (<2 hours)
- **2 points**: Simple (<4 hours)
- **3 points**: Moderate (<1 day)
- **5 points**: Complex (<3 days)
- **8 points**: Very complex (<1 week)
- **13 points**: Epic (>1 week, should be broken down)

---

## Epic 1: Idea Capture

### US-001: Text-Based Idea Capture
**As a** solo entrepreneur  
**I want** to quickly type out my startup idea in a form  
**So that** I can capture detailed thoughts while they're fresh in my mind

**Acceptance Criteria**:
- [ ] Given I'm on the dashboard, when I click "Add New Idea", then a modal opens with a text input form
- [ ] Given the modal is open, when I type a title (min 3 chars), then the title field is valid
- [ ] Given the modal is open, when I type a description (min 10 chars), then the description field is valid
- [ ] Given I enter valid title and description, when I click "Send to Vault", then the idea is saved to localStorage
- [ ] Given I submit an idea, when save is successful, then the modal closes and idea appears in dashboard
- [ ] Given I submit an idea, when save is successful, then idea status is "analyzing"

**Technical Notes**:
- Use controlled React components for form inputs
- Implement client-side validation before submission
- Display validation errors inline
- Clear form fields after successful submission

**Definition of Done**:
- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Form validation works correctly
- [ ] localStorage save verified
- [ ] Manual testing on Chrome, Safari, Firefox
- [ ] Responsive on mobile, tablet, desktop

**Story Points**: 3  
**Priority**: P0 (Must-have)

---

### US-002: Voice Note Capture
**As a** busy entrepreneur  
**I want** to speak my idea instead of typing  
**So that** I can capture ideas while walking, driving, or multitasking

**Acceptance Criteria**:
- [ ] Given I'm in the capture modal, when I click the "Voice" tab, then I see a microphone button
- [ ] Given I click the microphone button, when browser supports speech recognition, then recording starts
- [ ] Given recording is active, when I speak, then my words are transcribed in real-time
- [ ] Given recording is active, when I click the microphone again, then recording stops
- [ ] Given transcription is complete, when I review the text, then I can edit it before submitting
- [ ] Given browser doesn't support speech recognition, when I click microphone, then I see an error message

**Technical Notes**:
- Use Web Speech API (`webkitSpeechRecognition` or `SpeechRecognition`)
- Set `continuous: true` and `interimResults: true` for real-time transcription
- Handle microphone permission denials gracefully
- Support Chrome, Edge, Safari (not Firefox)

**Definition of Done**:
- [ ] Speech recognition working in supported browsers
- [ ] Real-time transcription displays correctly
- [ ] Microphone permissions handled properly
- [ ] Error states tested (no mic, permissions denied, no speech)
- [ ] Visual feedback during recording (pulsing animation)
- [ ] Transcription is editable before submission

**Story Points**: 5  
**Priority**: P0 (Must-have)

---

### US-003: Image Upload Capture
**As a** visual thinker  
**I want** to upload sketches, whiteboards, or inspiration photos  
**So that** I can reference visual ideas later and add context

**Acceptance Criteria**:
- [ ] Given I'm in the capture modal, when I click the "Image" tab, then I see an upload zone
- [ ] Given I have an image file, when I drag it onto the upload zone, then it previews
- [ ] Given I have an image file, when I click the upload zone, then file picker opens
- [ ] Given I select an image, when file size is >5MB, then I see an error message
- [ ] Given I select a file, when file is not an image, then I see an error message
- [ ] Given I upload an image, when I submit the idea, then image is stored as base64 in localStorage
- [ ] Given I have an uploaded image, when I view it in detail view, then image is displayed

**Technical Notes**:
- Use File API for image reading
- Convert to base64 data URL for storage
- Implement drag-and-drop using `onDrop` and `onDragOver` events
- Validate file type (`file.type.startsWith('image/')`)
- Validate file size (max 5MB to prevent storage overflow)

**Definition of Done**:
- [ ] Drag-and-drop working on desktop
- [ ] File picker working on mobile
- [ ] File size validation working
- [ ] File type validation working
- [ ] Base64 encoding working
- [ ] Image displays correctly in detail view
- [ ] Remove image button works

**Story Points**: 5  
**Priority**: P0 (Must-have)

---

### US-004: Tag Ideas for Organization
**As a** serial ideator  
**I want** to add tags (like #SaaS, #FinTech) to my ideas  
**So that** I can categorize and filter them later

**Acceptance Criteria**:
- [ ] Given I'm in the capture modal, when I see the tags field, then it's optional
- [ ] Given I enter tags, when I type comma-separated values, then they're parsed correctly
- [ ] Given I submit without tags, when idea is saved, then it gets a default "#Uncategorized" tag
- [ ] Given I submit with tags, when idea is saved, then tags are displayed on the idea card
- [ ] Given I view an idea, when I see tags, then they're styled as colored pills
- [ ] Given I enter tags with leading/trailing spaces, when saved, then spaces are trimmed

**Technical Notes**:
- Parse tags: `tags.split(',').map(tag => tag.trim()).filter(Boolean)`
- Store as array: `['#SaaS', '#FinTech', '#B2B']`
- Render as pills with indigo background and border

**Definition of Done**:
- [ ] Tag input accepts comma-separated values
- [ ] Tags are trimmed of whitespace
- [ ] Empty tags are filtered out
- [ ] Default tag applied when none provided
- [ ] Tags display correctly on cards
- [ ] Tags display correctly in detail view

**Story Points**: 2  
**Priority**: P1 (Should-have)

---

## Epic 2: AI Analysis

### US-005: Automatic Market Research
**As a** non-technical founder  
**I want** AI to automatically research my idea after I submit it  
**So that** I get instant market validation without manual research

**Acceptance Criteria**:
- [ ] Given I submit an idea, when it's saved, then AI analysis starts automatically in the background
- [ ] Given analysis is running, when I view the dashboard, then idea card shows "Analyzing" status
- [ ] Given analysis completes, when I refresh or wait, then idea card shows "Ready" status
- [ ] Given analysis completes, when it's successful, then idea has a readiness score (0-100)
- [ ] Given analysis completes, when it's successful, then idea has market size estimate
- [ ] Given analysis completes, when it's successful, then idea has target audience description
- [ ] Given analysis completes, when it's successful, then idea has 3+ competitor analyses
- [ ] Given analysis completes, when it's successful, then idea has growth projections (4 years)
- [ ] Given analysis completes, when it's successful, then idea has key market trend
- [ ] Given analysis completes, when it's successful, then idea has 3-5 action plan steps

**Technical Notes**:
- Use WebLLM (Qwen2.5-3B-Instruct) if WebGPU supported
- Fallback to heuristic analysis if WebGPU not available
- Update localStorage with analysis results
- Trigger React state update to re-render card

**Definition of Done**:
- [ ] AI analysis completes successfully
- [ ] Heuristic fallback works when AI unavailable
- [ ] All analysis fields populated correctly
- [ ] localStorage updated with results
- [ ] UI updates from "analyzing" to "ready"
- [ ] Analysis takes <60s for first idea, <10s thereafter

**Story Points**: 8  
**Priority**: P0 (Must-have)

---

### US-006: Readiness Score Calculation
**As a** investor-pitching entrepreneur  
**I want** to see an objective 0-100 readiness score for my idea  
**So that** I can prioritize which ideas to pursue first

**Acceptance Criteria**:
- [ ] Given an idea is analyzed, when I view it, then I see a readiness score between 0-100
- [ ] Given score is 85-100, when I view interpretation, then it says "Excellent - Ready to execute"
- [ ] Given score is 70-84, when I view interpretation, then it says "Good - Minor refinements needed"
- [ ] Given score is <70, when I view interpretation, then it says "Fair - Requires more research"
- [ ] Given I have multiple ideas, when I compare scores, then they show meaningful variance (not all 75-80)

**Technical Notes**:
- Formula: Base(50) + Length(20) + Tags(15) + Sentiment(20) + Complexity(10)
- Ensure scores vary based on idea quality (no clustering)
- Display large in detail view (6xl font)
- Show in card preview after analysis

**Definition of Done**:
- [ ] Score calculated correctly
- [ ] Score interpretation displayed
- [ ] Score shows meaningful variance across ideas
- [ ] Visual design matches mockups (emerald color)
- [ ] Score visible in card preview
- [ ] Score prominent in detail view

**Story Points**: 3  
**Priority**: P0 (Must-have)

---

### US-007: Competitor Analysis Display
**As a** market-aware founder  
**I want** to see who my top 3 competitors are and their strengths/weaknesses  
**So that** I can understand the competitive landscape and my differentiation

**Acceptance Criteria**:
- [ ] Given an idea is analyzed, when I view details, then I see 3+ competitors listed
- [ ] Given competitors are displayed, when I view each, then I see: name, strength, weakness
- [ ] Given competitors are real companies, when I read about them, then the information is accurate and contextual
- [ ] Given I'm in a specific industry, when I see competitors, then they're relevant to my market (not generic)
- [ ] Given competitor has a strength, when I read it, then it includes specific details (e.g., "$500M ARR", "4.5+ rating")
- [ ] Given competitor has a weakness, when I read it, then it suggests my opportunity (e.g., "Premium pricing excludes SMBs")

**Technical Notes**:
- Match idea keywords to competitor database (120+ companies across 18 categories)
- Shuffle and select 3 unique competitors
- Generate strength/weakness from templates with realistic values
- Display with checkmark icon for strength, warning icon for weakness

**Definition of Done**:
- [ ] 3+ competitors displayed per idea
- [ ] Competitors are relevant to idea's industry
- [ ] Strengths include specific metrics
- [ ] Weaknesses suggest opportunities
- [ ] Icons displayed correctly (✓ and ⚠️)
- [ ] Responsive layout on mobile

**Story Points**: 5  
**Priority**: P0 (Must-have)

---

### US-008: Market Growth Projections
**As a** data-driven entrepreneur  
**I want** to see projected market growth over 4 years  
**So that** I can understand the market opportunity timeline

**Acceptance Criteria**:
- [ ] Given an idea is analyzed, when I view details, then I see a bar chart
- [ ] Given the chart is displayed, when I look at data, then I see 4 years of projections (current year + 3)
- [ ] Given the chart has data, when I hover over a bar, then I see a tooltip with exact value
- [ ] Given growth is positive, when I view chart, then bars increase in height year-over-year
- [ ] Given chart uses money values, when I read labels, then they're formatted as "$XXM"

**Technical Notes**:
- Use Recharts library for bar chart
- Calculate: Year N Value = Year 1 × (Growth Rate ^ N)
- Growth rate: 1.30 to 1.60 (30-60% annually)
- Gradient fill: Indigo to violet
- Responsive container

**Definition of Done**:
- [ ] Chart renders correctly on all screen sizes
- [ ] Data shows realistic growth (not flat or declining)
- [ ] Tooltip displays on hover
- [ ] Y-axis formatted as dollars
- [ ] X-axis shows years
- [ ] Gradient fill matches design system

**Story Points**: 3  
**Priority**: P1 (Should-have)

---

### US-009: Actionable Next Steps
**As a** execution-focused founder  
**I want** to see 3-5 concrete next steps for my idea  
**So that** I know exactly what to do to move forward

**Acceptance Criteria**:
- [ ] Given an idea is analyzed, when I view details, then I see 3-5 action steps
- [ ] Given action steps are displayed, when I read them, then they're specific and actionable (not vague)
- [ ] Given steps are numbered, when I see them, then they're in logical execution order
- [ ] Given my readiness score is low (<75), when I see steps, then they focus on research and validation
- [ ] Given my readiness score is high (>85), when I see steps, then they include funding and launch activities
- [ ] Given I'm in a specific industry, when I see steps, then they're contextual (not generic)

**Technical Notes**:
- Generate 3-5 steps based on:
  - Readiness score (research vs. execution focus)
  - Industry/tags (B2B vs. B2C strategies)
  - Keywords (AI, automation, etc.)
- Display as numbered cards in detail view
- Each step should be 15-30 words

**Definition of Done**:
- [ ] 3-5 steps generated per idea
- [ ] Steps are specific and actionable
- [ ] Steps vary based on readiness score
- [ ] Steps contextual to industry
- [ ] Numbered display works correctly
- [ ] Responsive on mobile

**Story Points**: 5  
**Priority**: P0 (Must-have)

---

## Epic 3: Dashboard & Viewing

### US-010: View All Ideas in Grid
**As a** serial ideator  
**I want** to see all my ideas in a visual grid layout  
**So that** I can quickly scan and select ideas to explore

**Acceptance Criteria**:
- [ ] Given I have ideas saved, when I open the dashboard, then I see all ideas in a grid
- [ ] Given I'm on desktop, when I view the grid, then I see 3 columns
- [ ] Given I'm on tablet, when I view the grid, then I see 2 columns
- [ ] Given I'm on mobile, when I view the grid, then I see 1 column
- [ ] Given ideas load, when they appear, then they animate in with stagger effect (50ms delay per card)
- [ ] Given I hover over a card, when cursor is on it, then card lifts up slightly (-4px)
- [ ] Given I have no ideas, when I view dashboard, then I see an empty state with "Add Your First Idea" CTA

**Technical Notes**:
- Use CSS Grid with responsive columns
- Framer Motion for stagger animation
- Empty state component when `ideas.length === 0`
- Sort ideas by `createdAt` DESC (newest first)

**Definition of Done**:
- [ ] Grid layout responsive on all screen sizes
- [ ] Stagger animation works smoothly
- [ ] Hover effect works correctly
- [ ] Empty state displays when no ideas
- [ ] Ideas sorted newest first
- [ ] Performance is smooth with 50+ ideas

**Story Points**: 3  
**Priority**: P0 (Must-have)

---

### US-011: View Idea Card Preview
**As a** idea manager  
**I want** to see key info on each idea card (title, description, tags, status, score)  
**So that** I can quickly understand an idea without opening it

**Acceptance Criteria**:
- [ ] Given an idea card is displayed, when I view it, then I see the title (max 2 lines)
- [ ] Given an idea card is displayed, when I view it, then I see description preview (max 3 lines)
- [ ] Given an idea card is displayed, when I view it, then I see all tags
- [ ] Given an idea card is displayed, when I view it, then I see status badge (Ready or Analyzing)
- [ ] Given an idea card is displayed, when I view it, then I see input type icon (text/voice/image)
- [ ] Given idea is ready, when I view card, then I see readiness score at bottom
- [ ] Given title/description is long, when it exceeds max lines, then it's truncated with ellipsis

**Technical Notes**:
- Use CSS `line-clamp` for truncation
- Status badge with pulse animation for "analyzing"
- Icons from Lucide React library
- Readiness score in emerald color

**Definition of Done**:
- [ ] All card elements display correctly
- [ ] Truncation works for long text
- [ ] Status badge animates when analyzing
- [ ] Input type icon displays correctly
- [ ] Readiness score shows only when ready
- [ ] Tags scroll horizontally if needed

**Story Points**: 3  
**Priority**: P0 (Must-have)

---

### US-012: Open Idea Detail View
**As a** detail-oriented entrepreneur  
**I want** to click an idea card to see full analysis  
**So that** I can review comprehensive market research and insights

**Acceptance Criteria**:
- [ ] Given I'm on the dashboard, when I click an idea card, then detail view opens
- [ ] Given detail view is open, when I view it, then URL changes to `/vault/idea/:id`
- [ ] Given detail view is open, when I view it, then I see full description (not truncated)
- [ ] Given detail view is open, when I view it, then I see all analysis sections (metrics, chart, competitors, actions)
- [ ] Given detail view is open, when I view it, then I can scroll to see all content
- [ ] Given I click "Back to Vault", when clicked, then I return to dashboard

**Technical Notes**:
- Use React Router for URL routing
- Pass idea ID in URL params
- Find idea by ID from state
- Render IdeaDetailView component
- Handle case where idea ID doesn't exist (404 state)

**Definition of Done**:
- [ ] Clicking card opens detail view
- [ ] URL updates correctly
- [ ] All sections render correctly
- [ ] Back button returns to dashboard
- [ ] 404 state handled gracefully
- [ ] Browser back button works

**Story Points**: 3  
**Priority**: P0 (Must-have)

---

### US-013: View Comprehensive Idea Analysis
**As a** research-hungry founder  
**I want** to see all analysis data in a structured layout  
**So that** I can make informed decisions about my idea

**Acceptance Criteria**:
- [ ] Given I'm in detail view, when I look at the layout, then I see clear sections: Concept, Metrics, Chart, Competitors, Score, Actions
- [ ] Given I'm on desktop, when I view it, then layout is 3 columns (2:1 ratio)
- [ ] Given I'm on mobile, when I view it, then layout is single column (stacked)
- [ ] Given an idea has an image, when I view concept section, then image is displayed
- [ ] Given I scroll down, when I reach each section, then it animates in smoothly
- [ ] Given I want to share, when I click share button, then sharing options appear (future feature)

**Technical Notes**:
- Responsive grid layout (lg:col-span-2 for left column)
- Framer Motion entrance animations with stagger
- Section components: MetricCard, CompetitorCard, etc.
- Sections: Concept, Key Metrics (2x2 grid), Growth Chart, Competitors, Readiness Score, Action Plan

**Definition of Done**:
- [ ] All sections render correctly
- [ ] Responsive layout works on all screens
- [ ] Images display when present
- [ ] Animations smooth (no jank)
- [ ] Visual hierarchy clear
- [ ] Information scannable

**Story Points**: 5  
**Priority**: P0 (Must-have)

---

## Epic 4: Data Management

### US-014: Persist Ideas in LocalStorage
**As a** user concerned about data loss  
**I want** my ideas automatically saved to browser storage  
**So that** they persist even after closing the browser

**Acceptance Criteria**:
- [ ] Given I submit an idea, when it's saved, then it's written to localStorage immediately
- [ ] Given I close and reopen browser, when I return, then all my ideas are still there
- [ ] Given localStorage has data, when I load the app, then ideas are read automatically
- [ ] Given I update an idea (status change), when updated, then localStorage is updated
- [ ] Given I delete an idea, when deleted, then it's removed from localStorage
- [ ] Given localStorage is full, when I try to save, then I see an error message

**Technical Notes**:
- Storage key: `ideasvault_ideas`
- Data format: JSON stringified array of Idea objects
- Dates stored as ISO strings, parsed back to Date objects on read
- Handle quota exceeded errors gracefully

**Definition of Done**:
- [ ] Ideas persist across browser sessions
- [ ] CRUD operations update localStorage correctly
- [ ] Dates serialize/deserialize correctly
- [ ] Error handling for storage quota
- [ ] Error handling for parse errors
- [ ] No data loss during normal operations

**Story Points**: 3  
**Priority**: P0 (Must-have)

---

### US-015: Delete Ideas
**As a** declutterer  
**I want** to delete ideas I no longer need  
**So that** I can keep my vault focused and organized

**Acceptance Criteria**:
- [ ] Given I'm in detail view, when I click delete button, then confirmation dialog appears
- [ ] Given confirmation is shown, when I confirm, then idea is deleted from localStorage
- [ ] Given idea is deleted, when I return to dashboard, then it's no longer visible
- [ ] Given confirmation is shown, when I cancel, then idea is not deleted
- [ ] Given idea is deleted, when deletion completes, then I'm redirected to dashboard

**Technical Notes**:
- Trash icon in detail view header
- Native `window.confirm()` for confirmation
- Call `storage.deleteIdea(id)`
- Navigate to `/vault` after deletion
- Optional: Undo feature (future)

**Definition of Done**:
- [ ] Delete button visible in detail view
- [ ] Confirmation dialog works
- [ ] Idea removed from localStorage
- [ ] UI updates (idea removed from dashboard)
- [ ] Redirect to dashboard works
- [ ] No console errors

**Story Points**: 2  
**Priority**: P1 (Should-have)

---

### US-016: Cache AI Model Locally
**As a** power user  
**I want** the AI model downloaded once and cached  
**So that** subsequent analyses are instant (not 2-3 minute wait each time)

**Acceptance Criteria**:
- [ ] Given I analyze my first idea, when AI initializes, then model downloads (2-3 minutes)
- [ ] Given model is downloading, when I see progress, then percentage is displayed (e.g., "Downloading: 45.3%")
- [ ] Given model finishes downloading, when complete, then it's cached in IndexedDB
- [ ] Given I analyze another idea, when AI loads, then it uses cached model (<10 seconds)
- [ ] Given model is cached, when I see status, then I'm told "Using cached model"
- [ ] Given I want to clear cache, when I go to DevTools, then I can manually clear the model

**Technical Notes**:
- WebLLM automatically uses IndexedDB for model caching
- Set localStorage flag `webllm_model_cached` with timestamp
- Check flag before initializing to know if cached
- Clear cache: Delete IndexedDB databases with name containing "webllm" or "mlc"

**Definition of Done**:
- [ ] Model downloads on first use
- [ ] Download progress displayed
- [ ] Model cached in IndexedDB
- [ ] Subsequent loads use cache (<10s)
- [ ] Cache status communicated to user
- [ ] Manual cache clear works in DevTools

**Story Points**: 5  
**Priority**: P0 (Must-have)

---

## Epic 5: User Experience

### US-017: Onboard First-Time Users
**As a** new user  
**I want** to see a welcome message with option to load example ideas  
**So that** I understand how the app works before adding my own ideas

**Acceptance Criteria**:
- [ ] Given I'm a first-time user, when I open the vault, then I see a welcome modal
- [ ] Given the welcome modal is shown, when I read it, then it explains the purpose of Ideas Vault
- [ ] Given I see two buttons, when I click "Start Fresh", then modal closes and I see empty dashboard
- [ ] Given I see two buttons, when I click "Load Examples", then 2 demo ideas are added
- [ ] Given I load examples, when they're added, then they're fully analyzed (not analyzing state)
- [ ] Given I dismiss onboarding, when I return later, then I don't see it again

**Technical Notes**:
- Check: `localStorage.getItem('onboarding_complete')`
- Trigger: `ideas.length === 0 && !onboarding.isComplete()`
- Demo ideas: AI Email Assistant, Marine Weather Forecasting
- Set flag: `localStorage.setItem('onboarding_complete', 'true')`

**Definition of Done**:
- [ ] Modal shows for first-time users only
- [ ] "Start Fresh" closes modal
- [ ] "Load Examples" adds 2 ideas
- [ ] Demo ideas are pre-analyzed (ready state)
- [ ] Flag persists in localStorage
- [ ] Onboarding doesn't show again

**Story Points**: 3  
**Priority**: P1 (Should-have)

---

### US-018: Responsive Mobile Experience
**As a** mobile user  
**I want** the app to work seamlessly on my phone  
**So that** I can capture ideas anywhere, anytime

**Acceptance Criteria**:
- [ ] Given I'm on mobile, when I view dashboard, then ideas display in 1 column
- [ ] Given I'm on mobile, when I open capture modal, then it's full-width with proper padding
- [ ] Given I'm on mobile, when I use voice capture, then microphone button is large enough (44x44px)
- [ ] Given I'm on mobile, when I view detail view, then sections stack vertically
- [ ] Given I'm on mobile, when I view charts, then they're responsive and readable
- [ ] Given I'm on mobile, when I tap buttons, then touch targets are appropriately sized (minimum 44x44px)

**Technical Notes**:
- Use Tailwind responsive breakpoints (sm, md, lg, xl)
- Mobile-first CSS (base styles for mobile, then desktop overrides)
- Touch-friendly button sizes
- Responsive typography (scale down on mobile)

**Definition of Done**:
- [ ] All features work on mobile
- [ ] Layout adapts correctly
- [ ] Touch targets appropriately sized
- [ ] No horizontal scrolling
- [ ] Charts readable on small screens
- [ ] Tested on iOS Safari and Android Chrome

**Story Points**: 5  
**Priority**: P0 (Must-have)

---

### US-019: Smooth Animations and Transitions
**As a** user who appreciates polish  
**I want** the app to have smooth, purposeful animations  
**So that** it feels premium and provides clear feedback

**Acceptance Criteria**:
- [ ] Given ideas load, when they appear, then they fade in with stagger effect
- [ ] Given I hover over a card, when cursor moves, then card lifts smoothly
- [ ] Given a modal opens, when it appears, then it scales and fades in
- [ ] Given a modal closes, when dismissed, then it scales and fades out
- [ ] Given I switch tabs, when clicking, then indicator slides smoothly
- [ ] Given status changes to "analyzing", when it does, then badge pulses continuously

**Technical Notes**:
- Use Framer Motion for all animations
- Duration: 200-400ms (feels instant)
- Easing: Smooth cubic-bezier curves
- GPU acceleration: Use `transform` and `opacity` only
- Respect `prefers-reduced-motion` media query (future)

**Definition of Done**:
- [ ] All animations smooth (60fps)
- [ ] No animation jank or stuttering
- [ ] Animations provide clear feedback
- [ ] Durations feel appropriate
- [ ] Tested on low-end devices
- [ ] Reduced motion preference respected (future)

**Story Points**: 3  
**Priority**: P1 (Should-have)

---

### US-020: Keyboard Accessibility
**As a** keyboard-only user  
**I want** to navigate the entire app with keyboard  
**So that** I can use it without a mouse

**Acceptance Criteria**:
- [ ] Given I press Tab, when navigating, then focus moves to next interactive element
- [ ] Given I press Shift+Tab, when navigating, then focus moves to previous element
- [ ] Given I focus a button, when I press Enter or Space, then button activates
- [ ] Given a modal is open, when I press Escape, then modal closes
- [ ] Given I focus an element, when focused, then visible focus indicator appears (2px outline)
- [ ] Given I'm in a form, when I press Tab, then focus moves through all form fields

**Technical Notes**:
- Use semantic HTML (button, input, etc.)
- Add tabIndex where needed
- Handle Escape key in modals
- Style :focus and :focus-visible states
- Test with keyboard only (hide mouse)

**Definition of Done**:
- [ ] Tab navigation works throughout app
- [ ] Focus indicators visible
- [ ] Escape closes modals
- [ ] Enter/Space activates buttons
- [ ] No keyboard traps
- [ ] Logical tab order

**Story Points**: 3  
**Priority**: P1 (Should-have)

---

## Epic 6: Developer Tools

### US-021: DevTools Panel for Debugging
**As a** developer or power user  
**I want** access to debugging tools and cache management  
**So that** I can troubleshoot issues and manage storage

**Acceptance Criteria**:
- [ ] Given I navigate to settings, when I open it, then I see a DevTools section
- [ ] Given DevTools is visible, when I view it, then I see AI model cache status
- [ ] Given I want to clear model cache, when I click button, then IndexedDB cache is cleared
- [ ] Given I want to see storage usage, when I view panel, then I see idea count and approximate size
- [ ] Given I want to export data, when I click export, then JSON file downloads
- [ ] Given I want to clear all data, when I click clear, then all ideas are deleted (with confirmation)

**Technical Notes**:
- Settings route: `/vault/settings`
- Cache check: `analyzer.isModelCached()`
- Cache clear: `analyzer.clearModelCache()` (deletes IndexedDB)
- Export: Generate JSON and trigger download
- Clear all: `storage.clearAll()` with `window.confirm()`

**Definition of Done**:
- [ ] Settings page accessible
- [ ] AI cache status displays correctly
- [ ] Cache clear works
- [ ] Export downloads JSON
- [ ] Clear all works with confirmation
- [ ] No data loss on export/import

**Story Points**: 5  
**Priority**: P2 (Nice-to-have)

---

## Future User Stories (Phase 2+)

### US-022: Export Ideas to PDF
**As a** idea presenter  
**I want** to export an idea as a formatted PDF report  
**So that** I can share it with investors or team members

**Story Points**: 8  
**Priority**: P1 (Q1 2026)

---

### US-023: Search Ideas by Keyword
**As a** vault with many ideas  
**I want** to search ideas by keyword in title or description  
**So that** I can quickly find relevant ideas

**Story Points**: 5  
**Priority**: P0 (Q1 2026)

---

### US-024: Filter Ideas by Tag
**As a** organized ideator  
**I want** to filter ideas by selecting one or more tags  
**So that** I can focus on specific categories (e.g., all #SaaS ideas)

**Story Points**: 5  
**Priority**: P0 (Q1 2026)

---

### US-025: Sort Ideas by Readiness Score
**As a** prioritizer  
**I want** to sort ideas by readiness score (high to low)  
**So that** I can focus on the most promising ideas first

**Story Points**: 2  
**Priority**: P1 (Q1 2026)

---

### US-026: Toggle Dark/Light Theme
**As a** user in bright environments  
**I want** to switch to a light theme  
**So that** I can comfortably use the app during daytime

**Story Points**: 5  
**Priority**: P1 (Q1 2026)

---

### US-027: Sync Ideas Across Devices
**As a** multi-device user  
**I want** my ideas synced via encrypted cloud storage  
**So that** I can access them on phone, tablet, and laptop

**Story Points**: 13 (Epic)  
**Priority**: P0 (Q2 2026)

---

### US-028: Share Idea with View-Only Link
**As a** collaborator  
**I want** to generate a shareable link for an idea  
**So that** I can get feedback from teammates or advisors

**Story Points**: 8  
**Priority**: P0 (Q2 2026)

---

### US-029: Comment on Shared Ideas
**As a** idea reviewer  
**I want** to add comments to shared ideas  
**So that** I can provide structured feedback

**Story Points**: 8  
**Priority**: P1 (Q2 2026)

---

### US-030: Request GPT-4 Deep Research
**As a** investor-pitching founder  
**I want** to pay for GPT-4 powered deep research  
**So that** I get a professional-grade 10-page analysis report

**Story Points**: 13 (Epic)  
**Priority**: P1 (Q3 2026)

---

## Story Backlog Summary

### Current Phase (MVP - Completed)
- **Total Stories**: 21
- **Total Points**: 87
- **Priority P0**: 15 stories (65 points)
- **Priority P1**: 5 stories (19 points)
- **Priority P2**: 1 story (5 points)

### Phase 2 (Q1 2026)
- **Planned Stories**: 5 (US-022 to US-026)
- **Estimated Points**: 25
- **Focus**: Export, search, filter, sort, themes

### Phase 3 (Q2 2026)
- **Planned Stories**: 3 (US-027 to US-029)
- **Estimated Points**: 29
- **Focus**: Cloud sync, sharing, collaboration

### Phase 4 (Q3 2026)
- **Planned Stories**: 1 (US-030)
- **Estimated Points**: 13
- **Focus**: Premium AI research

---

## Story Template (for future stories)

### US-XXX: [Story Title]
**As a** [user type]  
**I want** [goal]  
**So that** [benefit]

**Acceptance Criteria**:
- [ ] Given [context], when [action], then [expected outcome]
- [ ] Given [context], when [action], then [expected outcome]

**Technical Notes**:
- [Implementation details]
- [Technologies to use]
- [Edge cases to consider]

**Definition of Done**:
- [ ] Code implemented and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] Acceptance criteria verified

**Story Points**: [1, 2, 3, 5, 8, 13]  
**Priority**: [P0, P1, P2]

---

*Last Updated: January 12, 2026*
