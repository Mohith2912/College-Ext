import { createHash } from 'node:crypto';
import { prisma } from '../packages/database/src/index.ts';
import { computerNetworks } from '../packages/database/src/computer-networks.ts';
import { stableId } from '../packages/database/src/seed.ts';

const course = computerNetworks;
const checksum = (value: string) => createHash('sha256').update(value).digest('hex');

try {
  const organization = await prisma.organization.findUniqueOrThrow({ where: { slug: 'aetheria' } });
  const term = await prisma.academicTerm.findFirstOrThrow({ where: { organizationId: organization.id, number: course.term, deletedAt: null } });
  await prisma.$transaction(async (tx) => {
    const courseId = stableId(`course:${course.slug}`);
    await tx.course.upsert({ where: { id: courseId }, update: { title: course.title, description: course.description, subject: course.subject, code: course.code, status: 'PUBLISHED', deletedAt: null }, create: { id: courseId, organizationId: organization.id, slug: course.slug, title: course.title, description: course.description, subject: course.subject, code: course.code, status: 'PUBLISHED' } });
    await tx.courseOffering.upsert({ where: { id: stableId(`offering:${course.slug}`) }, update: { termId: term.id, deletedAt: null }, create: { id: stableId(`offering:${course.slug}`), organizationId: organization.id, courseId, termId: term.id, position: 5 } });
    const existingModules = await tx.module.findMany({ where: { courseId }, orderBy: { position: 'asc' }, include: { note: true } });
    // Keep administrator-authored outline entries intact. Seeded headings are
    // updated in place below; a content refresh must not erase custom sections
    // or other published modules.
    for (const [position, item] of course.modules.entries()) {
      const matchingModule = existingModules.find(existing => existing.slug === item.slug);
      const moduleId = matchingModule?.id ?? stableId(`module:${course.slug}:${item.slug}`);
      const noteId = matchingModule?.note?.id ?? stableId(`note:${moduleId}`);
      await tx.module.upsert({ where: { id: moduleId }, update: { slug: item.slug, title: item.title, description: item.description, position: position + 1, estimatedMinutes: Math.max(4, Math.ceil(item.markdown.split(/\s+/g).length / 180)), status: 'PUBLISHED', deletedAt: null }, create: { id: moduleId, organizationId: organization.id, courseId, slug: item.slug, title: item.title, description: item.description, position: position + 1, estimatedMinutes: Math.max(4, Math.ceil(item.markdown.split(/\s+/g).length / 180)), status: 'PUBLISHED' } });
      await tx.noteDocument.upsert({ where: { id: noteId }, update: { title: item.title, markdown: item.markdown, status: 'PUBLISHED', license: 'CC BY 4.0', provenance: 'Original Aetheria Computer Networks material. Examples are fictional teaching scenarios.', publishedAt: new Date(), deletedAt: null }, create: { id: noteId, organizationId: organization.id, moduleId, title: item.title, markdown: item.markdown, status: 'PUBLISHED', license: 'CC BY 4.0', provenance: 'Original Aetheria Computer Networks material. Examples are fictional teaching scenarios.', publishedAt: new Date() } });
      await tx.noteVersion.upsert({ where: { noteDocumentId_version: { noteDocumentId: noteId, version: 1 } }, update: { markdown: item.markdown, checksum: checksum(item.markdown) }, create: { id: stableId(`version:${noteId}:1`), noteDocumentId: noteId, version: 1, title: item.title, markdown: item.markdown, checksum: checksum(item.markdown), changeSummary: 'Original Computer Networks edition' } });
      const usedSectionSlugs = new Set<string>();
      for (const [sectionPosition, heading] of [...item.markdown.matchAll(/^## (.+)$/gm)].entries()) {
        const sectionTitle = heading[1];
        const sectionId = stableId(`section:${moduleId}:${sectionPosition}`);
        const baseSlug = sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const sectionSlug = usedSectionSlugs.has(baseSlug) ? `${baseSlug}-${sectionPosition + 1}` : baseSlug;
        usedSectionSlugs.add(sectionSlug);
        await tx.moduleSection.upsert({ where: { id: sectionId }, update: { title: sectionTitle, position: sectionPosition + 1 }, create: { id: sectionId, moduleId, slug: sectionSlug, title: sectionTitle, position: sectionPosition + 1 } });
        await tx.topic.upsert({ where: { id: stableId(`topic:${sectionId}`) }, update: { title: sectionTitle }, create: { id: stableId(`topic:${sectionId}`), sectionId, slug: sectionSlug, title: sectionTitle, position: 1 } });
      }
    }
  }, { timeout: 120000 });
  console.log('Computer Networks course published.');
} finally {
  await prisma.$disconnect();
}
