export interface TransitStage {
  id: number;
  title: string;
  subtitle: string;
  domain: string;
  pduLabel: string;
  physicalReality: string;
  engineeringMechanism: string;
  syllabusConcept: string;
  latencyBudget: string;
  statusText: string;
  schematicType: 'client' | 'slicing' | 'nfv' | 'vpc' | 'lb' | 'autoscaling' | 'spineleaf' | 'delivery';
}

export interface ComparisonItem {
  dimension: string;
  legacy: string;
  modern: string;
  advantage: string;
  layer: string;
}

export interface EncapsulationLayer {
  level: number;
  name: string;
  pdu: string;
  headerSize: string;
  fields: { name: string; value: string; desc: string }[];
  securityNote: string;
}

export interface DiagnosticCase {
  id: string;
  title: string;
  symptom: string;
  layer: string;
  command: string;
  rawOutput: string;
  rootCause: string;
  deduction: string;
  remediation: string;
  fixCommand: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
  whyWrong: Record<string, string>;
}

export interface MatchPair {
  id: string;
  concept: string;
  conceptDetail: string;
  mechanism: string;
  mechanismDetail: string;
}

export interface GuardrailCard {
  title: string;
  pedagogicalSimplification: string;
  productionReality: string;
  technicalDepth: string;
}
