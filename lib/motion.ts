/** Mount decorative motion separately from the portfolio's content and players. */
export function mountPortfolioMotion(stage: HTMLElement | null, view: Window = window) {
  const root = view.document.documentElement;
  const media = view.matchMedia('(prefers-reduced-motion: reduce)');
  const sceneProperties = [
    '--scene-rx', '--scene-rz', '--scene-ry', '--scene-y', '--scene-scale',
    '--pointer-x', '--pointer-y',
  ];
  let frame = 0;

  const resetScene = () => {
    for (const property of sceneProperties) stage?.style.removeProperty(property);
  };
  const update = () => {
    frame = 0;
    const maxScroll = Math.max(root.scrollHeight - view.innerHeight, 1);
    root.style.setProperty('--page-progress', String(Math.max(0, Math.min(view.scrollY / maxScroll, 1))));
    if (!stage || media.matches) return;
    const progress = Math.max(0, Math.min(view.scrollY / (view.innerHeight * 1.05), 1));
    const baseScale = view.innerWidth <= 600 ? 0.76 : 1;
    stage.style.setProperty('--scene-rx', `${12 - progress * 8}deg`);
    stage.style.setProperty('--scene-rz', `${-6 + progress * 8}deg`);
    stage.style.setProperty('--scene-ry', `${-14 + progress * 22}deg`);
    stage.style.setProperty('--scene-y', `${-50 - progress * 7}%`);
    stage.style.setProperty('--scene-scale', String(baseScale * (1 - progress * 0.09)));
  };
  const schedule = () => {
    if (!frame) frame = view.requestAnimationFrame(update);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!stage || media.matches) return;
    const x = event.clientX / view.innerWidth - 0.5;
    const y = event.clientY / view.innerHeight - 0.5;
    stage.style.setProperty('--pointer-x', `${x * 8}deg`);
    stage.style.setProperty('--pointer-y', `${y * -6}deg`);
  };
  const onMotionChange = () => {
    if (media.matches) resetScene();
    schedule();
  };
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }),
    { threshold: 0.12 },
  );
  root.classList.add('motion-ready');
  view.document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  view.addEventListener('scroll', schedule, { passive: true });
  view.addEventListener('resize', schedule);
  view.addEventListener('pointermove', onPointerMove, { passive: true });
  media.addEventListener('change', onMotionChange);
  update();

  return () => {
    observer.disconnect();
    root.classList.remove('motion-ready');
    root.style.removeProperty('--page-progress');
    resetScene();
    view.removeEventListener('scroll', schedule);
    view.removeEventListener('resize', schedule);
    view.removeEventListener('pointermove', onPointerMove);
    media.removeEventListener('change', onMotionChange);
    if (frame) view.cancelAnimationFrame(frame);
  };
}
