import { writeFile } from 'node:fs/promises';
import { unit1PartA, unit1PartB, unit1PartC } from '../../FAIML/src/data/units/unit1';
import { unit2PartA, unit2PartB, unit2PartC } from '../../FAIML/src/data/units/unit2';
import { unit3PartA, unit3PartB, unit3PartC } from '../../FAIML/src/data/units/unit3';
import { unit4PartA, unit4PartB, unit4PartC } from '../../FAIML/src/data/units/unit4';
import { unit5PartA, unit5PartB, unit5PartC } from '../../FAIML/src/data/units/unit5';

const units = [
  [unit1PartA, unit1PartB, unit1PartC],
  [unit2PartA, unit2PartB, unit2PartC],
  [unit3PartA, unit3PartB, unit3PartC],
  [unit4PartA, unit4PartB, unit4PartC],
  [unit5PartA, unit5PartB, unit5PartC],
];

const questions = units.flatMap((parts, unitIndex) => parts.flat().map((item) => ({
  id: `faiml-u${unitIndex + 1}-${item.part.toLowerCase()}-${item.qNo}`,
  unit: unitIndex + 1,
  unitTitle: `Unit ${unitIndex + 1}`,
  part: item.part,
  number: item.qNo,
  question: item.question,
  answer: item.answer,
})));

await writeFile(new URL('../apps/users/lib/faiml-question-bank-data.json', import.meta.url), `${JSON.stringify(questions, null, 2)}\n`);
