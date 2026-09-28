import 'server-only';
import { prisma } from '@aetheria/database';
import { unstable_cache } from 'next/cache';
import { organizationScope } from './library';

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
  const visible = steps;
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

  const modules: InteractiveModule[] = [];
  for (const term of terms) {
    for (const offering of term.offerings) {
      const courseModules = offering.course.modules.filter(module => module.note);
      if (!courseModules.length) continue;
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
  return { terms: terms.map(term => ({ title: term.name, number: term.number })), modules };
}

export const getLearningStudio = unstable_cache(loadLearningStudio, ['aetheria-learning-studio-v6'], { revalidate: 300, tags: ['aetheria-curriculum'] });
