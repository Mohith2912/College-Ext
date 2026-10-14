export const faimlCourseSlug = 'fundamentals-of-artificial-intelligence-and-machine-learning';

export function faimlUnit(moduleSlug: string) {
  const match = /^faiml-unit-([1-5])$/.exec(moduleSlug);
  return match ? Number(match[1]) : undefined;
}

export function faimlEmbeddedUrl(moduleSlug: string) {
  return faimlUnit(moduleSlug) ? `/FAIML/index.html#unit-${faimlUnit(moduleSlug)}` : '/FAIML/';
}

export function faimlStandaloneUrl(moduleSlug: string) {
  return `https://github.com/mrithulavj/faiml/tree/main/src/data/units/${moduleSlug.replace('faiml-', '')}.ts`;
}
