import questionBank from '../../../aetheria-user-application/apps/users/lib/oopj-question-bank-data.json';
import { BloomsLevel, CourseOutcome, ExamQuestion, UnitId } from '../types/concept';

type SourceQuestion = {
  id: string;
  unit: number;
  part: 'A' | 'B' | 'C';
  number: number;
  question: string;
  answer: string;
  courseOutcome: string;
  bloomLevel: string;
  marks: number;
};

export const COMPLETE_EXAM_QUESTIONS: ExamQuestion[] = (questionBank as SourceQuestion[]).map(
  (question) => ({
    id: question.id,
    unit: `Unit-${question.unit}` as UnitId,
    part: `Part ${question.part}` as ExamQuestion['part'],
    questionNumber: `Q${question.number}`,
    questionText: question.question,
    co: question.courseOutcome as CourseOutcome,
    blooms: question.bloomLevel as BloomsLevel,
    marks: question.marks,
    markingScheme: [
      {
        item: 'Cover the source-locked answer and its key technical terms.',
        marks: question.marks,
      },
    ],
    modelAnswer: question.answer,
  }),
);
