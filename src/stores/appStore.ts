import { create } from 'zustand'

/** ids: project slug, or 'resume' | 'experience' | 'techstack' */
interface AppState {
  activeWindow: string | null
  openWindow: (id: string) => void
  closeWindow: () => void
}

export const useAppStore = create<AppState>()((set) => ({
  activeWindow: null,
  openWindow: (id) => set({ activeWindow: id }),
  closeWindow: () => set({ activeWindow: null }),
}))
