import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import { CopyHeadingLink } from '@/components/reader-controls';

const schema = {
  ...defaultSchema,
  attributes: { ...defaultSchema.attributes, code: [...(defaultSchema.attributes?.code ?? []), ['className', /^language-./, 'math-inline', 'math-display']] },
};

export function NoteMarkdown({ markdown }: { markdown: string }) {
  return <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeSlug, [rehypeSanitize, schema], [rehypeKatex, { trust: false, strict: 'warn' }]]} components={{
    h1: ({ children, id }) => <h2 id={id}>{children}{id && <CopyHeadingLink id={id} />}</h2>,
    h2: ({ children, id }) => <h2 id={id}>{children}{id && <CopyHeadingLink id={id} />}</h2>,
    h3: ({ children, id }) => <h3 id={id}>{children}{id && <CopyHeadingLink id={id} />}</h3>,
    table: ({ children }) => <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable note table"><table>{children}</table></div>,
    a: ({ href, children }) => <a href={href} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>,
  }}>{markdown}</Markdown>;
}
