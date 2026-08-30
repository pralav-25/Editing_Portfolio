'use client';

import { useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  Play,
  Sparkles,
} from 'lucide-react';

const tracks = [
  { label: 'V1', clips: ['INT. NIGHT', 'HARD CUT', 'CLOSE UP'] },
  { label: 'V2', clips: ['SPEED RAMP', 'MATCH CUT'] },
  { label: 'A1', clips: ['DIALOGUE', 'IMPACT', 'RISE'] },
];

const projects = [
  {
    index: '01',
    position: 'P1',
    title: 'The Overtake',
    type: 'Short-form / Sports edit',
    note: 'Momentum built frame by frame—hard transitions, controlled speed ramps, and a finish that lands on impact.',
    href: 'https://www.instagram.com/reel/DPmZmWJE9JM/',
    embed: 'https://www.instagram.com/reel/DPmZmWJE9JM/embed',
  },
  {
    index: '02',
    position: 'P2',
    title: 'Desert Storm',
    type: 'Social / Narrative cut',
    note: 'A compact story shaped through contrast, musical timing, and purposeful restraint between high-energy beats.',
    href: 'https://www.instagram.com/p/DTUwNT_k-5J/',
    embed: 'https://www.instagram.com/p/DTUwNT_k-5J/embed',
  },
];

const process = [
  ['01', 'Find the pulse', 'Every sequence starts with the emotional beat—not the effect.'],
  ['02', 'Build pressure', 'Pacing, sound, and motion are layered to pull the viewer forward.'],
  ['03', 'Land the cut', 'The final frame earns its place. Nothing stays just because it looks good.'],
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
      const pageProgress = window.scrollY / maxScroll;
      root.style.setProperty('--page-progress', String(pageProgress));

      if (stage && !reduced) {
        const heroProgress = Math.min(window.scrollY / (window.innerHeight * 1.05), 1);
        const baseScale = window.innerWidth <= 600 ? 0.72 : 1;
        stage.style.setProperty('--scene-rx', `${56 - heroProgress * 25}deg`);
        stage.style.setProperty('--scene-rz', `${-27 + heroProgress * 19}deg`);
        stage.style.setProperty('--scene-ry', `${8 - heroProgress * 8}deg`);
        stage.style.setProperty('--scene-y', `${-50 - heroProgress * 7}%`);
        stage.style.setProperty('--scene-scale', String(baseScale * (1 - heroProgress * 0.1)));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!stage || reduced) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      stage.style.setProperty('--pointer-x', `${x * 7}deg`);
      stage.style.setProperty('--pointer-y', `${y * -5}deg`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.14 },
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

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sinister — back to top">
          SINISTER<span>®</span>
        </a>
        <p className="header-status">
          <span /> AVAILABLE FOR SELECT PROJECTS
        </p>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">Profile</a>
          <a className="nav-cta" href="#contact">Start a project</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> VIDEO EDITOR / VISUAL STORYTELLER</p>
          <h1>
            I CUT FOR
            <span>IMPACT.</span>
          </h1>
          <p className="hero-intro">
            Aggressive pacing. Precise storytelling. Edits engineered to make
            people stop, feel, and remember.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">
              <Play size={15} fill="currentColor" /> View selected work
            </a>
            <a className="text-link" href="https://www.instagram.com/ig_sinisterrrr/" target="_blank" rel="noreferrer">
              <AtSign size={17} /> Instagram <ArrowDownRight size={16} />
            </a>
          </div>
        </div>

        <div className="timeline-stage" ref={stageRef} aria-label="Animated three-dimensional editing timeline">
          <div className="orbit-label orbit-label-one">PACE / 98</div>
          <div className="orbit-label orbit-label-two">STORY / LOCKED</div>
          <div className="timeline-scene">
            <div className="timeline-topbar">
              <span className="window-controls"><i /><i /><i /></span>
              <strong>SINISTER_CUT_07</strong>
              <span>00:00:18:01</span>
            </div>
            <div className="preview-frame">
              <div className="preview-number">18</div>
              <div className="preview-play"><Play size={22} fill="currentColor" /></div>
              <span>PLAYBACK / FULL RES</span>
            </div>
            <div className="timeline-ruler">
              <span>00:00</span><span>00:08</span><span>00:16</span><span>00:24</span>
            </div>
            <div className="tracks">
              {tracks.map((track, trackIndex) => (
                <div className="track" key={track.label}>
                  <span className="track-label">{track.label}</span>
                  <div className="track-clips">
                    {track.clips.map((clip, clipIndex) => (
                      <span className={`clip clip-${trackIndex}-${clipIndex}`} key={clip}>
                        {clip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <span className="playhead" />
          </div>
          <div className="timeline-shadow" aria-hidden="true" />
        </div>

        <a className="scroll-cue" href="#work">
          <span>SCROLL TO ENTER THE CUT</span>
          <ArrowDownRight size={18} />
        </a>
        <p className="hero-index">© 2026 / SINISTER STUDIO</p>
      </section>

      <div className="kinetic-strip" aria-label="Editing values">
        <div>
          PRECISION <i /> PACING <i /> EMOTION <i /> PRECISION <i /> PACING <i /> EMOTION <i />
        </div>
      </div>

      <section className="work-section" id="work">
        <div className="section-kicker" data-reveal>
          <span>02 / SELECTED WORK</span>
          <p>Two cuts. Two rhythms. One standard: make every second earn attention.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, projectIndex) => (
            <article className={`project-card project-${projectIndex + 1}`} data-reveal key={project.title}>
              <div className="project-media-shell">
                <div className="project-media">
                  <iframe
                    src={project.embed}
                    title={`${project.title} Instagram edit`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
                <span className="position-badge">{project.position}</span>
                <span className="project-corner">CUT / {project.index}</span>
              </div>
              <div className="project-info">
                <p>{project.type}</p>
                <h2>{project.title}</h2>
                <span>{project.note}</span>
                <a href={project.href} target="_blank" rel="noreferrer">
                  Watch full edit <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-section">
        <div className="statement-orbit" aria-hidden="true">
          <span>FRAME</span><span>FEEL</span><span>FLOW</span>
        </div>
        <p className="section-number" data-reveal>03 / THE METHOD</p>
        <blockquote data-reveal>
          NO LIFT. NO COAST.
          <span>JUST THE RIGHT CUT AT THE RIGHT MOMENT.</span>
        </blockquote>
        <div className="process-grid">
          {process.map(([index, title, copy]) => (
            <div className="process-card" data-reveal key={index}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-heading" data-reveal>
          <p>04 / PROFILE</p>
          <h2>CALCULATED<br /><em>AGGRESSION.</em></h2>
        </div>
        <div className="about-copy" data-reveal>
          <div className="quote-mark">“</div>
          <p>
            I&apos;m <strong>Sinister</strong>. I edit with the aggression of a chase
            master and the precision of a qualifying lap: total focus,
            controlled risk, and no wasted movement.
          </p>
          <p>
            From high-tempo sports edits to compact visual narratives, I use
            DaVinci Resolve to turn raw footage into something that moves fast
            without losing the story.
          </p>
          <div className="setup-row">
            <span>PRIMARY TOOL</span><strong>DaVinci Resolve</strong>
          </div>
          <div className="setup-row">
            <span>DRIVING STYLE</span><strong>Rhythm first</strong>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p data-reveal><span /> PIT WINDOW OPEN / LET&apos;S MAKE SOMETHING MOVE</p>
        <h2 data-reveal>YOUR STORY.<br /><em>FULL SEND.</em></h2>
        <a className="contact-button" data-reveal href="https://www.instagram.com/ig_sinisterrrr/" target="_blank" rel="noreferrer">
          <span>Start a conversation</span>
          <span><AtSign size={18} /><ArrowUpRight size={19} /></span>
        </a>
        <footer>
          <a className="brand" href="#top">SINISTER<span>®</span></a>
          <p>VIDEO EDITOR / VISUAL STORYTELLER</p>
          <p>© 2026 / ALL RIGHTS RESERVED</p>
        </footer>
      </section>

      <a className="back-to-top" href="#top" aria-label="Back to top">
        <Sparkles size={15} /><ArrowDown size={15} />
      </a>
    </main>
  );
}
