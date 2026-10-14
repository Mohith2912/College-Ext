import Link from 'next/link';
import { ArrowRight, BrainCircuit, GitBranch, LineChart, Network, Scale, Sparkles } from 'lucide-react';

type Module = { slug: string; title: string; description: string; estimatedMinutes: number };

const unitThemes = [
  { eyebrow: 'CO1 · Foundations', icon: BrainCircuit, color: 'violet', concepts: 'Agents · PEAS · BFS · DFS · UCS · A*' },
  { eyebrow: 'CO2 · Reasoning', icon: GitBranch, color: 'blue', concepts: 'Logic · Inference · Games · Bayes' },
  { eyebrow: 'CO3 · Learning', icon: LineChart, color: 'green', concepts: 'Data · Regression · Classification · Generalisation' },
  { eyebrow: 'CO4 · Structure', icon: Network, color: 'amber', concepts: 'K-means · DBSCAN · PCA · Validation' },
  { eyebrow: 'CO5 · Evaluation', icon: Scale, color: 'rose', concepts: 'Features · Metrics · Cross-validation · Tuning' },
] as const;

export function FaimlConceptMap({ courseSlug, modules }: { courseSlug: string; modules: Module[] }) {
  return <section className="faiml-map" aria-labelledby="faiml-map-title">
    <div className="faiml-map__intro">
      <div>
        <span className="eyebrow"><Sparkles size={13} aria-hidden="true" /> Concept map</span>
        <h2 id="faiml-map-title">A five-step path from intelligent agents to evaluated models.</h2>
        <p>Each unit adds one layer: define a problem, represent what is known, learn from data, discover structure, then test whether the result is trustworthy.</p>
      </div>
      <div className="faiml-map__legend"><span className="faiml-map__legend-dot" /> Follow the course in order</div>
    </div>
    <div className="faiml-map__rail">
      {modules.slice(0, 5).map((module, index) => {
        const theme = unitThemes[index];
        const Icon = theme.icon;
        return <Link className={`faiml-map__unit faiml-map__unit--${theme.color}`} href={`/notes/${courseSlug}/${module.slug}`} key={module.slug}>
          <span className="faiml-map__number">{String(index + 1).padStart(2, '0')}</span>
          <span className="faiml-map__body"><span className="faiml-map__eyebrow">{theme.eyebrow}</span><strong>{module.title.replace(/^Unit [1-5]:\s*/i, '')}</strong><span>{theme.concepts}</span></span>
          <span className="faiml-map__icon"><Icon size={18} aria-hidden="true" /></span>
          <ArrowRight className="faiml-map__arrow" size={16} aria-hidden="true" />
        </Link>;
      })}
    </div>
  </section>;
}
