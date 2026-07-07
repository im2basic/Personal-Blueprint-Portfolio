/**
 * Mutable singleton bridging GSAP (DOM scroll timeline) and R3F (camera/scene).
 * Kept outside React state on purpose — it updates every scrolled frame and
 * must never trigger re-renders. The 3D scene subscribes and calls invalidate().
 */
type Listener = () => void

export const scrollState = {
  /** 0 = top-down blueprint view, 1 = eye-level built site */
  progress: 0,
  /** normalized mouse position, -1..1 */
  mouseX: 0,
  mouseY: 0,
  listeners: new Set<Listener>(),
  notify() {
    for (const listener of this.listeners) listener()
  },
}
