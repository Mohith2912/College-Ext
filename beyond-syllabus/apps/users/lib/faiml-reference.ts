export const faimlCourseSlug = 'fundamentals-of-artificial-intelligence-and-machine-learning';
export const faimlRepositoryUrl = 'https://github.com/mrithulavj/faiml';

export function faimlUnit(moduleSlug: string): number | undefined {
  const unit = /^faiml-unit-([1-5])$/.exec(moduleSlug)?.[1];
  return unit ? Number(unit) : undefined;
}

export function faimlEmbeddedUrl(moduleSlug: string): string | undefined {
  const unit = faimlUnit(moduleSlug);
  return unit ? `/FAIML/index.html?unit=${unit}&embedded=course-v1` : undefined;
}

export function faimlStandaloneUrl(moduleSlug: string): string | undefined {
  const unit = faimlUnit(moduleSlug);
  return unit ? `/FAIML/index.html?unit=${unit}` : undefined;
}
