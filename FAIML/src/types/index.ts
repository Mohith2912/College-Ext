/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BloomsLevel = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';

export interface QuestionItem {
  id: string;
  qNo: number;
  part: 'A' | 'B' | 'C';
  unitNumber: number;
  courseOutcome: string; // e.g. CO1, CO2, CO3, CO4, CO5
  bloomsLevel: BloomsLevel;
  bloomsLabel: string; // Remember, Understand, Apply, Analyze, Evaluate, Create
  question: string;
  answer: string;
  keyTakeaways?: string[];
  formula?: string;
  diagramAscii?: string;
  codeSnippet?: string;
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface UnitManifest {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  courseOutcome: string;
  coDescription: string;
  description: string;
  estimatedHours: number;
  imageAsset: string;
  topics: string[];
  partACount: number;
  partBCount: number;
  partCCount: number;
  visualizerId?: string;
  visualizerTitle?: string;
  caseStudyId?: string;
  caseStudyTitle?: string;
}

export interface InteractiveQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  bloomLevel: BloomsLevel;
  co: string;
  type?: 'mcq' | 'calculation' | 'scenario';
}

export interface AlgorithmTraceStep {
  stepNumber: number;
  description: string;
  currentElement?: string | number;
  dataState: any;
  highlightedLine?: number;
  stats?: Record<string, string | number>;
}

export interface LearningProgress {
  completedTopics: string[];
  completedQuestions: string[];
  quizScores: Record<string, number>; // unitId -> score percentage
  bookmarks: string[];
  lastVisitedUnitId: string;
  lastVisitedTab: string;
}
