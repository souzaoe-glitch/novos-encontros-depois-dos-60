'use client';

import { MotionConfig } from 'framer-motion';
import { createContext, useCallback, useContext, useRef, useState } from 'react';

type ToastCtx = { notify: (message: string) => void };
const ToastContext = createContext<ToastCtx>({ notify: () => {} });
export const useToast = () => useContext(ToastContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const notify = useCallback((msg: string) => {
    clearTimeout(timer.current);
    setMessage(msg);
    setVisible(true);
    timer.current = setTimeout(() => setVisible(false), 6000);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ToastContext.Provider value={{ notify }}>
        {children}
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none fixed inset-x-4 bottom-28 z-[70] mx-auto max-w-md rounded-2xl bg-forest-deep px-6 py-4 text-center text-base font-bold text-ivory shadow-soft transition-all duration-300 md:bottom-10 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {message}
        </div>
      </ToastContext.Provider>
    </MotionConfig>
  );
}
