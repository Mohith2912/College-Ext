import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Globe,
  Headphones,
  Heart,
  Lightbulb,
  Lock,
  Palette,
  PenLine,
  Sparkles,
  Sprout,
  Users,
} from 'lucide-react';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'About Beyond Syllabus',
  description:
    'Beyond Syllabus is an independent learning platform that turns course material into clear notes, interactive revision, and audio companions — built for curious minds.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="about-hero" aria-label="About Beyond Syllabus">
        <div className="about-hero__orbits" aria-hidden="true">
          <span className="about-orbit about-orbit--1" />
          <span className="about-orbit about-orbit--2" />
          <span className="about-orbit about-orbit--3" />
          <span className="about-dot about-dot--1" />
          <span className="about-dot about-dot--2" />
          <span className="about-dot about-dot--3" />
        </div>
        <div className="about-hero__content">
          <p className="about-kicker">
            <Sprout size={14} strokeWidth={1.8} aria-hidden="true" />
            ABOUT BEYOND SYLLABUS
          </p>
          <h1>Built for curious minds.</h1>
          <p className="about-hero__copy">
            An independent learning companion that organizes course material into
            clear notes, interactive practice, and audio companions — so you can
            focus on understanding, not searching.
          </p>
          <div className="about-hero__actions">
            <Link href="/notes" className="btn btn-primary">
              Explore courses <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/register" className="btn about-btn-outline">
              Create your study space
            </Link>
          </div>
        </div>
        <div className="about-hero__visual" aria-hidden="true">
          <div className="about-orb">
            <div className="about-orb__ring about-orb__ring--1" />
            <div className="about-orb__ring about-orb__ring--2" />
            <div className="about-orb__core">
              <Sparkles size={30} strokeWidth={1.2} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission statement ─── */}
      <section className="about-mission" aria-label="Our mission">
        <div className="about-mission__icon">
          <Heart size={22} strokeWidth={1.4} aria-hidden="true" />
        </div>
        <div>
          <h2>Learning should feel like thinking, not scrambling.</h2>
          <p>
            We believe great study tools don&apos;t just display information — they
            help you understand it. Beyond Syllabus is designed to make the
            journey from confusion to clarity feel natural, one concept at a time.
          </p>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="about-values" aria-label="What we stand for">
        <div className="about-section-header">
          <p className="about-kicker">
            <Lightbulb size={13} strokeWidth={1.8} aria-hidden="true" />
            OUR VALUES
          </p>
          <h2>What shapes Beyond Syllabus.</h2>
          <p>Every decision we make comes back to these principles.</p>
        </div>
        <div className="about-values__grid">
          {[
            {
              icon: PenLine,
              title: 'Original explanations',
              body: 'Every note is written to explain, not just repeat. We aim for clarity that complements your official material.',
            },
            {
              icon: BrainCircuit,
              title: 'Active recall over passive reading',
              body: 'Quizzes, flashcards, and written recall prompts turn reading into practice — the way learning actually sticks.',
            },
            {
              icon: Globe,
              title: 'Open access first',
              body: "Published notes are available to everyone. You don\u2019t need an account to start learning \u2014 only to save your progress.",
            },
            {
              icon: Lock,
              title: 'Privacy by default',
              body: 'No trackers, no ads. Your reading preferences stay on your device, and your study data stays private.',
            },
            {
              icon: Palette,
              title: 'Thoughtful design',
              body: 'Light, sepia, and dark themes. Adjustable reading sizes. Keyboard navigation. Learning should be comfortable.',
            },
            {
              icon: Sprout,
              title: 'Independent and growing',
              body: 'This is an independent project — not affiliated with any institution. We grow through feedback and genuine curiosity.',
            },
          ].map((value) => (
            <article key={value.title} className="about-value-card">
              <div className="about-value-card__icon">
                <value.icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── What learners get ─── */}
      <section className="about-features" aria-label="What learners get">
        <div className="about-section-header">
          <p className="about-kicker">
            <BookOpen size={13} strokeWidth={1.8} aria-hidden="true" />
            THE EXPERIENCE
          </p>
          <h2>Everything you need to study well.</h2>
          <p>One place for notes, practice, and understanding.</p>
        </div>
        <div className="about-features__grid">
          {[
            {
              icon: BookOpen,
              title: 'Structured course notes',
              desc: 'Organized by unit and module, with a table of contents, KaTeX math rendering, and a reader you can customise.',
              accent: 'var(--accent)',
            },
            {
              icon: BrainCircuit,
              title: 'Learn for a Test',
              desc: 'Multiple-choice quizzes, 3D flashcards, and authored recall prompts — all sourced from real question banks.',
              accent: '#6366f1',
            },
            {
              icon: Headphones,
              title: 'Course podcasts',
              desc: 'Unit-by-unit audio companions with seeking, speed control, and downloads — learn while you commute.',
              accent: '#0891b2',
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="about-feature-card"
              style={{ '--feature-accent': feature.accent } as React.CSSProperties}
            >
              <div className="about-feature-card__icon">
                <feature.icon size={22} strokeWidth={1.4} aria-hidden="true" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Philosophy quote ─── */}
      <section className="about-philosophy" aria-label="Philosophy">
        <blockquote>
          <p>
            "A little understanding, every day. Good learning starts with
            curiosity. Take it one concept at a time."
          </p>
        </blockquote>
        <span className="about-philosophy__author">
          — The Beyond Syllabus philosophy
        </span>
      </section>

      {/* ─── Independent project notice ─── */}
      <section className="about-independence" aria-label="Independent project">
        <div className="about-independence__badge">
          <Users size={18} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div>
          <h3>Independent by design</h3>
          <p>
            Beyond Syllabus is an independent educational project. It is not
            affiliated with, endorsed by, or an official platform of any
            university or institution. Institutional course names are used for
            identification only and do not imply endorsement.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-cta" aria-label="Get started">
        <div className="about-cta__glow" aria-hidden="true" />
        <h2>Start with a question.</h2>
        <p>
          Explore published notes as a guest, or create a free account to unlock
          your personal study space and saved progress.
        </p>
        <div className="about-cta__actions">
          <Link href="/notes" className="btn btn-primary">
            Browse courses <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/register" className="btn btn-secondary">
            Create an account
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
