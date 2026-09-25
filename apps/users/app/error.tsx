'use client';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="empty-state"><BookOpen size={32} aria-hidden="true" /><h1>Your study space is temporarily unavailable.</h1><p>We couldn’t load the current information. Please try again in a moment.</p><button className="btn btn-primary" onClick={reset}>Try again</button><Link href="/about" className="btn btn-ghost">About this project</Link></div>; }
