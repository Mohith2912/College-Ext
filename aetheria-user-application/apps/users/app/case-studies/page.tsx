import { BriefcaseBusiness } from 'lucide-react';

export const metadata = {
  title: 'Case studies',
  description: 'Case studies for Beyond Syllabus are being updated.',
};

export default function Cases() {
  return <>
    <div className="page-heading">
      <div>
        <p className="eyebrow">PRACTICE THROUGH DECISIONS</p>
        <h1>Case studies.</h1>
        <p>This section is being updated with new practice material.</p>
      </div>
    </div>
    <div className="empty-state">
      <BriefcaseBusiness size={32} strokeWidth={1.3} aria-hidden="true" />
      <h2>New case studies are coming soon.</h2>
      <p>The previous examples have been removed while this section is refreshed.</p>
    </div>
  </>;
}
