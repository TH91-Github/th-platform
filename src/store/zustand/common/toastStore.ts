import { create } from 'zustand';

export type ToastType = 'base' | 'success' | 'error';

export interface ToastItemType {
  id: number;
  visible: boolean;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: ToastItemType[];
  nextId: number;
  addToast: (
    message?: string, // text
    type?: ToastType, // 'base' | 'success' | 'error'
    timer?: number,   // 자동 닫기
  ) => void;
  removeToast: (id: number) => void;
  clearToasts: () => void;
}

const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  nextId: 1,

  addToast: (message = 'success!', type = 'base', timer = 2000) => {
    const id = get().nextId;
    const newToast: ToastItemType = {
      id,
      visible: true,
      message,
      type,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
      nextId: state.nextId + 1,
    }));

    // hide
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((t) =>
          t.id === id ? { ...t, visible: false } : t
        ),
      }));
    }, timer);

    // remove
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, timer + 300);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),
}));

export const useToastList = () => useToastStore((state) => state.toasts);
export const useAddToast = () => useToastStore((state) => state.addToast);
export const useRemoveToast = () => useToastStore((state) => state.removeToast);
export const useClearToasts = () => useToastStore((state) => state.clearToasts);
