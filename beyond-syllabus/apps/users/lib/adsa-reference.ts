export const adsaCourseSlug = 'advanced-data-structures-and-algorithms';
export const adsaRepositoryUrl = 'https://github.com/mrithulavj/adsa';

export function adsaUnit(moduleSlug: string): number | undefined {
  const unit = /^adsa-unit-([1-5])$/.exec(moduleSlug)?.[1];
  return unit ? Number(unit) : undefined;
}

export function adsaEmbeddedUrl(moduleSlug: string): string | undefined {
  const unit = adsaUnit(moduleSlug);
  return unit ? `/ADSA/index.html?unit=${unit}&embedded=course-v1` : undefined;
}

export function adsaStandaloneUrl(moduleSlug: string): string | undefined {
  const unit = adsaUnit(moduleSlug);
  return unit ? `/ADSA/index.html?unit=${unit}` : undefined;
}

