import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toString } from 'mdast-util-to-string';
import type { Root } from 'mdast';

export type TocItem = { id: string; text: string; depth: number };

export function getTableOfContents(markdown: string): TocItem[] {
  const tree = unified().use(remarkParse).parse(markdown) as Root;
  const slugger = new GithubSlugger();
  return tree.children.flatMap(node => {
    if (node.type !== 'heading') return [];
    const text = toString(node);
    const id = `user-content-${slugger.slug(text)}`;
    return node.depth === 2 || node.depth === 3 ? [{ id, text, depth: node.depth }] : [];
  });
}
