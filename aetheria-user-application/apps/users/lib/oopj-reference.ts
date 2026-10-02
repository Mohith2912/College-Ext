export const oopjCourseSlug = 'object-oriented-programming-using-java';
export const oopjRepositoryUrl = 'https://github.com/mrithulavj/oopj';

export function oopjUnit(moduleSlug: string): number | undefined {
  const unit = /^oopj-unit-([1-5])$/.exec(moduleSlug)?.[1];
  return unit ? Number(unit) : undefined;
}

export function oopjEmbeddedUrl(moduleSlug: string): string | undefined {
  const unit = oopjUnit(moduleSlug);
  return unit ? `/OOPJ/index.html?unit=${unit}&embedded=course-v1` : undefined;
}

export function oopjStandaloneUrl(moduleSlug: string): string | undefined {
  const unit = oopjUnit(moduleSlug);
  return unit ? `/OOPJ/index.html?unit=${unit}` : undefined;
}
