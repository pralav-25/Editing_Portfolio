import test from 'node:test';
import assert from 'node:assert/strict';
import { mountPortfolioMotion } from '../lib/motion.ts';

function fixture(t, reduced = false) {
  const listeners = new Map();
  const mediaListeners = new Set();
  const frames = new Map();
  let nextFrame = 1;
  let disconnected = false;
  const element = () => ({
    style: new Map(),
    classList: new Set(),
  });
  const root = element();
  const stage = element();
  for (const node of [root, stage]) {
    node.style.setProperty = (key, value) => node.style.set(key, value);
    node.style.removeProperty = (key) => node.style.delete(key);
    node.classList.remove = (key) => node.classList.delete(key);
  }
  root.scrollHeight = 3000;
  const media = {
    matches: reduced,
    addEventListener: (_name, fn) => mediaListeners.add(fn),
    removeEventListener: (_name, fn) => mediaListeners.delete(fn),
  };
  const view = {
    document: { documentElement: root, querySelectorAll: () => [] },
    innerWidth: 1200, innerHeight: 1000, scrollY: 0,
    matchMedia: () => media,
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
    requestAnimationFrame: (fn) => { const id = nextFrame++; frames.set(id, fn); return id; },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  const original = globalThis.IntersectionObserver;
  globalThis.IntersectionObserver = class {
    observe() {}
    disconnect() { disconnected = true; }
  };
  t.after(() => {
    if (original === undefined) delete globalThis.IntersectionObserver;
    else globalThis.IntersectionObserver = original;
  });
  const dispose = mountPortfolioMotion(stage, view);
  return {
    root, stage, view, listeners, mediaListeners, frames, dispose,
    disconnected: () => disconnected,
    flush() {
      const current = [...frames.values()];
      frames.clear();
      current.forEach((fn) => fn());
    },
    reduce(value) {
      media.matches = value;
      mediaListeners.forEach((fn) => fn());
    },
    pointer() { listeners.get('pointermove')?.({ clientX: 1200, clientY: 1000 }); },
    scroll(y) { view.scrollY = y; listeners.get('scroll')?.(); },
  };
}

test('changing reduced-motion while open clears parallax and suppresses future pointer/scroll motion', (t) => {
  const app = fixture(t);
  t.after(app.dispose);
  app.pointer();
  assert.equal(app.stage.style.get('--pointer-x'), '4deg');
  app.reduce(true);
  app.pointer();
  app.scroll(800);
  app.flush();
  assert.equal(app.stage.style.size, 0);
  assert.equal(app.root.style.get('--page-progress'), '0.4');
  app.reduce(false);
  app.flush();
  assert.ok(app.stage.style.has('--scene-rx'));
  app.pointer();
  assert.equal(app.stage.style.get('--pointer-x'), '4deg');
});

test('an initially reduced preference starts without scene transforms', (t) => {
  const app = fixture(t, true);
  t.after(app.dispose);
  app.pointer();
  app.scroll(100);
  app.flush();
  assert.equal(app.stage.style.size, 0);
});

test('overscroll progress stays bounded and repeated scroll events share one frame', (t) => {
  const app = fixture(t);
  t.after(app.dispose);
  app.scroll(-100);
  app.scroll(-200);
  assert.equal(app.frames.size, 1);
  app.flush();
  assert.equal(app.root.style.get('--page-progress'), '0');
  app.scroll(5000);
  app.flush();
  assert.equal(app.root.style.get('--page-progress'), '1');
});

test('unmount removes listeners, observer, pending frame and owned styles', (t) => {
  const app = fixture(t);
  app.scroll(100);
  assert.equal(app.frames.size, 1);
  app.dispose();
  assert.equal(app.frames.size, 0);
  assert.equal(app.listeners.size, 0);
  assert.equal(app.mediaListeners.size, 0);
  assert.equal(app.stage.style.size, 0);
  assert.equal(app.root.style.size, 0);
  assert.equal(app.root.classList.has('motion-ready'), false);
  assert.equal(app.disconnected(), true);
});
