import Link from 'next/link';
import { BookOpen } from 'lucide-react';
export default function NotFound() { return <div className="empty-state"><BookOpen size={34} aria-hidden="true" /><h1>This page isn’t in the library.</h1><p>The course or note may have moved, been archived, or be waiting for publication. Explore the current course library to keep learning.</p><Link className="btn btn-primary" href="/notes">Return to course notes</Link></div>; }
