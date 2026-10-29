export const esdCourseSlug = 'embedded-system-design';
export const esdRepositoryUrl = 'https://github.com/mrithulavj/ESD1';

export function esdUnit(moduleSlug: string): number | undefined {
  const unit = /^esd-unit-([1-5])$/.exec(moduleSlug)?.[1];
  return unit ? Number(unit) : undefined;
}

export function esdEmbeddedUrl(moduleSlug: string): string | undefined {
  const unit = esdUnit(moduleSlug);
  return unit ? `/ESD1/index.html?unit=${unit}&embedded=course-v1` : undefined;
}

export function esdStandaloneUrl(moduleSlug: string): string | undefined {
  const unit = esdUnit(moduleSlug);
  return unit ? `/ESD1/index.html?unit=${unit}` : undefined;
}
