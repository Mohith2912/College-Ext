import items from './question-bank-data.json';

export type QuestionBankItem = {
  id: string;
  unit: number;
  unitTitle: string;
  part: 'A';
  number: number;
  question: string;
  answer: string;
};

export const questionBankSource = 'Final III Sem QB 2321CSC301T Computer Networks for all Computing dept.pdf';
export const computerNetworksQuestionBank = items as QuestionBankItem[];
