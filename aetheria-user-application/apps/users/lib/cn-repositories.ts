export const cnRepositories = ['CN-Unit', 'CN-Unit-two', 'CN-Unit-3', 'CN-unit-4', 'CN-Unit-5'] as const;

export function cnRepositoryUrl(moduleSlug: string): string | undefined {
  const unit = /^computer-networks-unit-([1-5])$/.exec(moduleSlug)?.[1];
  return unit ? `/${cnRepositories[Number(unit) - 1]}/index.html` : undefined;
}
