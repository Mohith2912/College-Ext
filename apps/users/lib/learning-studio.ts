import 'server-only';
import { prisma } from '@aetheria/database';
import { unstable_cache } from 'next/cache';
import { organizationScope } from './library';

export type DialogueTurn = { speaker: 'Mira' | 'Arun'; text: string };
export type PodcastEpisode = {
  id: string;
  term: string;
  termNumber: number;
  course: string;
  courseCode: string;
  description: string;
  minutes: number;
  dialogue: DialogueTurn[];
};
export type InteractiveStep = {
  label: string;
  title: string;
  description: string;
  details: string[];
  challenge: { question: string; options: string[]; answer: number; explanation: string };
};
export type InteractiveModule = {
  id: string;
  term: string;
  termNumber: number;
  course: string;
  courseCode: string;
  courseSlug: string;
  module: string;
  moduleSlug: string;
  steps: InteractiveStep[];
};

function plain(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shortSummary(markdown: string, fallback: string) {
  const content = plain(markdown.replace(/^#.*$/gm, ''));
  const sentence = content.match(/^(.{35,260}?[.!?])(?:\s|$)/)?.[1];
  return sentence?.trim() || content.slice(0, 220) || fallback;
}

function dialogueFor(course: string, modules: { title: string; markdown: string }[]): DialogueTurn[] {
  const turns: DialogueTurn[] = [
    { speaker: 'Mira', text: `Welcome to our ${course} study conversation. We are going to connect the main ideas across this semester course.` },
    { speaker: 'Arun', text: `And we will keep it practical. I will challenge the ideas while you explain why they matter, Mira.` },
  ];
  modules.forEach((module, index) => {
    const summary = shortSummary(module.markdown, `This part introduces ${module.title}.`);
    turns.push({ speaker: 'Mira', text: `Let us begin with ${module.title}. ${summary}` });
    turns.push({ speaker: 'Arun', text: index === modules.length - 1
      ? `So the useful question is: how would you apply ${module.title} alongside the earlier ideas when the situation changes?`
      : `How does that connect to the next topic, and what should a learner watch for when applying it?` });
  });
  turns.push({ speaker: 'Mira', text: `That is the thread through ${course}: understand each idea, test the assumptions, and connect the modules before making a decision.` });
  turns.push({ speaker: 'Arun', text: `Pause here and choose one module to revisit. Explain it in your own words before continuing.` });
  return turns;
}

function stepsFor(markdown: string, moduleTitle: string): InteractiveStep[] {
  const sections = markdown.split(/\n(?=##\s+)/).map(section => section.trim()).filter(Boolean);
  const steps = sections.map((section, index) => {
    const heading = section.match(/^#{1,3}\s+(.+)$/m)?.[1]?.trim() || (index === 0 ? moduleTitle : `Concept ${index + 1}`);
    const body = section.replace(/^#{1,3}\s+.+$/m, '').trim();
    const bullets = [...body.matchAll(/^[-*]\s+(.+)$/gm)].map(match => plain(match[1] ?? '')).filter(Boolean).slice(0, 5);
    const description = shortSummary(body, `Explore the central idea behind ${heading}.`);
    const details = bullets.length ? bullets : plain(body).split(/(?<=[.!?])\s+/).filter(item => item.length > 25).slice(1, 5);
    return { label: `STEP ${index + 1} · PUBLISHED COURSE CONTENT`, title: heading, description, details: details.length ? details : [`Connect this idea to ${moduleTitle}.`, 'Describe one practical example in your own words.'] };
  });
  const visible = steps.slice(0, 8);
  return visible.map((step, index) => {
    const alternatives = visible.filter((_, other) => other !== index).map(other => `A different topic: ${other.title} — ${other.description}`);
    const options = [
      `${step.title}: ${step.description}`,
      alternatives[0] ?? 'This idea is not part of the published module.',
      alternatives[1] ?? 'This idea describes an unrelated responsibility not covered by the module.',
    ];
    const answer = index % options.length;
    const ordered = options.map((_, optionIndex) => options[(optionIndex - answer + options.length) % options.length] ?? options[0] ?? '');
    return {
      ...step,
      challenge: {
        question: `Which summary best matches “${step.title}”?`,
        options: ordered,
        answer,
        explanation: `The published explanation says: ${step.description}`,
      },
    };
  });
}

async function loadLearningStudio() {
  const terms = await prisma.academicTerm.findMany({
    where: { deletedAt: null, organization: organizationScope },
    orderBy: { number: 'asc' },
    include: {
      offerings: {
        where: { deletedAt: null, course: { status: 'PUBLISHED', deletedAt: null } },
        orderBy: { position: 'asc' },
        include: {
          course: {
            include: {
              modules: {
                where: { status: 'PUBLISHED', deletedAt: null, note: { status: 'PUBLISHED', deletedAt: null } },
                orderBy: { position: 'asc' },
                include: { note: true },
              },
            },
          },
        },
      },
    },
  });

  const episodes: PodcastEpisode[] = [];
  const modules: InteractiveModule[] = [];
  for (const term of terms) {
    for (const offering of term.offerings) {
      const courseModules = offering.course.modules.filter(module => module.note);
      if (!courseModules.length) continue;
      const dialogue = dialogueFor(offering.course.title, courseModules.map(module => ({ title: module.title, markdown: module.note?.markdown ?? '' })));
      episodes.push({
        id: `${term.id}-${offering.course.id}`,
        term: term.name,
        termNumber: term.number,
        course: offering.course.title,
        courseCode: offering.course.code ?? 'COURSE',
        description: offering.course.description,
        minutes: Math.max(4, Math.ceil(dialogue.reduce((count, turn) => count + turn.text.split(/\s+/).length, 0) / 135)),
        dialogue,
      });
      for (const module of courseModules) {
        modules.push({
          id: module.id,
          term: term.name,
          termNumber: term.number,
          course: offering.course.title,
          courseCode: offering.course.code ?? 'COURSE',
          courseSlug: offering.course.slug,
          module: module.title,
          moduleSlug: module.slug,
          steps: stepsFor(module.note?.markdown ?? '', module.title),
        });
      }
    }
  }
  return { terms: terms.map(term => ({ title: term.name, number: term.number })), episodes, modules };
}

export const getLearningStudio = unstable_cache(loadLearningStudio, ['aetheria-learning-studio-v3'], { revalidate: 300, tags: ['aetheria-curriculum'] });
