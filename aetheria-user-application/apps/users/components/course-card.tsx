import Link from 'next/link';
import { ArrowUpRight, BarChart3, BookOpen, Boxes, BriefcaseBusiness, Code2, Globe2, Landmark, Leaf, Megaphone, MessageSquare, Network, PieChart, Rocket } from 'lucide-react';
import type { LibraryCourse } from '@/lib/library';

function courseIcon(title: string) {
  if (/statistics/i.test(title)) return BarChart3;
  if (/communication/i.test(title)) return MessageSquare;
  if (/entrepreneur/i.test(title)) return Rocket;
  if (/financial/i.test(title)) return PieChart;
  if (/micro/i.test(title)) return Landmark;
  if (/macro/i.test(title)) return Globe2;
  if (/website|web development/i.test(title)) return Code2;
  if (/marketing/i.test(title)) return Megaphone;
  if (/operations/i.test(title)) return Boxes;
  if (/sustainab/i.test(title)) return Leaf;
  if (/network/i.test(title)) return Network;
  return BriefcaseBusiness;
}

export function CourseCard({ course }: { course: LibraryCourse }) {
  const Icon = courseIcon(course.title);
  return <Link href={`/notes/${course.slug}`} className="course-card">
    <div className="course-card-top"><Icon className="course-icon" strokeWidth={1.4} aria-hidden="true" /><span className="course-code">{course.code ?? course.subject}</span></div>
    <h2>{course.title}</h2><p>{course.description}</p>
    <div className="course-card-bottom"><span><BookOpen size={12} aria-hidden="true" />{course._count.modules} modules{course.offerings[0] ? ` · Term ${course.offerings[0].term.number}` : ''}</span><span className="course-open">Explore course <ArrowUpRight size={14} aria-hidden="true" /></span></div>
  </Link>;
}
