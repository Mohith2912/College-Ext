export type UnitId = 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5';

export interface HardwarePart {
  id: string;
  name: string;
  type: 'Sensor' | 'Microcontroller / SoC' | 'Actuator' | 'Memory' | 'Communication' | 'Power' | 'Safety / Interlock';
  role: string;
  keyConcepts: string[];
  howItWorks: string;
  pinoutOrBus: string;
  associatedKeywords: {
    keyword: string;
    explanation: string;
  }[];
}

export interface ConceptItem {
  id: string;
  number: number;
  title: string;
  tagline: string;
  realLocation: string;
  deepDive: string;
  hardwareAnchor: string;
  codeSnippet?: string;
  keyTakeaway: string;
  category: 'Hardware' | 'Software' | 'Architecture' | 'Real-Time' | 'Networking' | 'AI / Edge';
}

export interface CheckpointQuestion {
  id: string;
  question: string;
  contextScenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  engineeringTakeaway: string;
  misconceptionAlert: string;
}

export interface WhatIfScenario {
  id: string;
  title: string;
  change: string;
  catastrophicOutcome: string;
  rootCause: string;
  engineeringRemedy: string;
}

export interface UnitData {
  id: UnitId;
  unitNumber: number;
  title: string;
  subtitle: string;
  realLifeStory: {
    title: string;
    persona: string;
    location: string;
    timeframe: string;
    scenario: string;
    keyMetric: string;
    keyMetricLabel: string;
    quote: string;
  };
  hardwareArchitecture: {
    diagramTitle: string;
    description: string;
    parts: HardwarePart[];
  };
  concepts: ConceptItem[];
  checkpoint: CheckpointQuestion;
  whatIfScenarios: WhatIfScenario[];
  simulatorInfo: {
    title: string;
    description: string;
    tags: string[];
  };
}

export interface SearchResult {
  unitId: UnitId;
  unitTitle: string;
  conceptTitle: string;
  snippet: string;
  conceptId: string;
}
