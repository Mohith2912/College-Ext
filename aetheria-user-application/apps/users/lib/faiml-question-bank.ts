import items from './faiml-question-bank-data.json';
import type { QuestionBankItem } from './question-bank';

export const faimlQuestionBankSource = 'FAIML unit-wise question bank from mrithulavj/faiml';
export const faimlQuestionBank = items as QuestionBankItem[];
