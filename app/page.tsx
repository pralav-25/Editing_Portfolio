'use client';

import { useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  AtSign,
  Play,
} from 'lucide-react';

const projects = [
  {
    index: '01',
    title: 'Velocity Study',
    type: 'Sport / Short-form',
    note: 'A pace-first edit built around acceleration, interruption, and the split-second before impact.',
    href: 'https://www.instagram.com/reel/DPmZmWJE9JM/',
    embed: 'https://www.instagram.com/reel/DPmZmWJE9JM/embed',
    accent: 'blue',
  },
  {
    index: '02',
    title: 'Atmosphere Study',
    type: 'Story / Social',
    note: 'A compact visual narrative where contrast, music, and negative space do as much work as the cut.',
    href: 'https://www.instagram.com/p/DTUwNT_k-5J/',
    embed: 'https://www.instagram.com/p/DTUwNT_k-5J/embed',
    accent: 'coral',
  },
];

const method = [
  ['01', 'Listen', 'Find the pulse already hiding inside the footage.'],
  ['02', 'Shape', 'Build tension with rhythm, sound, and deliberate contrast.'],
  ['03', 'Finish', 'Remove the noise until only the feeling remains.'],
];

export default function Home() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stage = stageRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--page-progress', String(window.scrollY / maxScroll));

      if (stage && !reduced) {
        const progress = Math.min(window.scrollY / (window.innerHeight * 1.05), 1);
        const baseScale = window.innerWidth <= 600 ? 0.76 : 1;
        stage.style.setProperty('--scene-rx', `${12 - progress * 8}deg`);
        stage.style.setProperty('--scene-rz', `${-6 + progress * 8}deg`);
        stage.style.setProperty('--scene-ry', `${-14 + progress * 22}deg`);
        stage.style.setProperty('--scene-y', `${-50 - progress * 7}%`);
        stage.style.setProperty('--scene-scale', String(baseScale * (1 - progress * 0.09)));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!stage || reduced) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      stage.style.setProperty('--pointer-x', `${x * 8}deg`);
      stage.style.setProperty('--pointer-y', `${y * -6}deg`);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.12 },
    );

    root.classList.add('motion-ready');
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    update();

    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pointermove', onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="site-shell">
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <header className="studio-header">
        <a className="studio-mark" href="#top" aria-label="Sinister — back to top">
          SINISTER<span>/EDIT</span>
        </a>
        <p>INDEPENDENT VIDEO EDITOR · INDIA</p>
        <nav aria-label="Main navigation">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a className="studio-contact" href="#contact">Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <section className="studio-hero" id="top">
        <div className="studio-copy">
          <p className="studio-kicker"><span>04—26</span> SHORT FORM · SPORTS · STORY</p>
          <h1>
            CUT THE
            <span>EXPECTED.</span>
          </h1>
          <p className="studio-intro">
            Raw footage in. A sharper feeling out. I shape pace, sound, and
            motion into edits people stay for.
          </p>
          <div className="studio-actions">
            <a className="studio-primary" href="#work">
              See the cuts <ArrowDownRight size={17} />
            </a>
            <a className="studio-link" href="https://www.instagram.com/ig_sinisterrrr/" target="_blank" rel="noreferrer">
              <AtSign size={16} /> @ig_sinisterrrr
            </a>
          </div>
        </div>

        <div className="frame-stage" ref={stageRef} aria-label="Interactive three-dimensional film frames">
          <div className="frame-tag frame-tag-a">PACE / MOTION / FEEL</div>
          <div className="frame-tag frame-tag-b">FRAME 018</div>
          <div className="film-stack">
            <div className="film-frame film-frame-back"><span>RAW / 01</span></div>
            <div className="film-frame film-frame-mid">
              <div className="frame-noise" />
              <strong>MOVE</strong>
            </div>
            <div className="film-frame film-frame-front">
              <div className="frame-ui">
                <span>SINISTER / FINAL CUT</span>
                <span>00:00:18:24</span>
              </div>
              <div className="frame-screen">
                <div className="frame-play"><Play size={22} fill="currentColor" /></div>
                <div className="frame-word">FEEL</div>
              </div>
              <div className="frame-wave" aria-hidden="true">
                {Array.from({ length: 34 }, (_, index) => (
                  <i key={index} style={{ height: `${18 + ((index * 17) % 48)}%` }} />
                ))}
              </div>
              <div className="frame-footer"><span>PLAYBACK 1×</span><span>FULL RES</span></div>
            </div>
          </div>
        </div>

        <div className="studio-hero-footer">
          <span>SCROLL / SELECTED WORK</span>
          <span>CREATIVE DIRECTION · EDITING · RHYTHM</span>
          <span>2026 PORTFOLIO</span>
        </div>
      </section>

      <div className="signal-band" aria-label="Editing specialties">
        <div>PACE <i /> SOUND <i /> MOTION <i /> FEEL <i /> PACE <i /> SOUND <i /> MOTION <i /> FEEL <i /></div>
      </div>

      <section className="work-lab" id="work">
        <div className="work-heading" data-reveal>
          <p><span>02</span> SELECTED CUTS</p>
          <h2>WORK THAT<br /><em>DOESN&apos;T WAIT.</em></h2>
          <div>
            <ArrowDown size={19} />
            <span>Two edits. Two different energies.<br />Both designed to hold attention.</span>
          </div>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className={`lab-project lab-project-${project.accent}`} data-reveal key={project.title}>
              <div className="lab-media-stage">
                <span className="lab-index">PROJECT / {project.index}</span>
                <div className="lab-iframe-shell">
                  <iframe
                    src={project.embed}
                    title={`${project.title} Instagram edit`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
                <div className="lab-float-label">{index === 0 ? 'FAST / CONTROLLED' : 'QUIET / INTENTIONAL'}</div>
              </div>
              <div className="lab-project-copy">
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <span>{project.note}</span>
                <a href={project.href} target="_blank" rel="noreferrer">
                  Open on Instagram <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="method-section">
        <div className="method-heading" data-reveal>
          <p><span>03</span> HOW I WORK</p>
          <h2>EMOTION SETS<br />THE RHYTHM.</h2>
          <p className="method-lede">Everything else follows: the music, the movement, the cut, and the moment you choose to leave behind.</p>
        </div>
        <div className="method-grid">
          {method.map(([index, title, copy]) => (
            <article className="method-card" data-reveal key={index}>
              <span>{index}</span>
              <div className="method-disc"><i /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section" id="about">
        <div className="profile-label" data-reveal><span>04</span> THE EDITOR</div>
        <div className="profile-title" data-reveal>
          <p>EDITOR, NOT</p>
          <h2>DECORATOR.</h2>
        </div>
        <div className="profile-copy" data-reveal>
          <p>
            Sinister is an independent video editor focused on short-form,
            sports, and music-led stories. The goal is never more effects—it is
            a clearer feeling.
          </p>
          <p>
            Working in DaVinci Resolve, every decision starts with rhythm:
            when to build, when to break, and when to let a frame breathe.
          </p>
          <a href="https://www.instagram.com/ig_sinisterrrr/" target="_blank" rel="noreferrer">
            Follow the work <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="profile-tools" aria-label="Editing focus">
          {['DAVINCI RESOLVE', 'SHORT-FORM', 'SPORTS', 'MUSIC-LED', 'SOCIAL'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="contact-lab" id="contact">
        <p data-reveal>PROJECT WINDOW / OPEN</p>
        <h2 data-reveal>LET&apos;S MAKE<br /><em>THE NEXT FRAME.</em></h2>
        <a className="contact-pill" data-reveal href="https://www.instagram.com/ig_sinisterrrr/" target="_blank" rel="noreferrer">
          <span>Start on Instagram</span><ArrowUpRight size={22} />
        </a>
        <footer>
          <a className="studio-mark" href="#top">SINISTER<span>/EDIT</span></a>
          <span>INDIA · AVAILABLE REMOTELY</span>
          <span>© 2026</span>
        </footer>
      </section>

      <a className="back-to-top" href="#top" aria-label="Back to top"><ArrowUp size={17} /></a>
    </main>
  );
}
