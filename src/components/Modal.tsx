'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export type ModalHandle = { open: () => void; close: () => void };

type Props = {
  labelledBy: string;
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

/**
 * Janela modal acessível baseada em <dialog>:
 * foco preso, fecha com Esc, clique fora e botão; devolve o foco ao controle de origem.
 */
const Modal = forwardRef<ModalHandle, Props>(function Modal({ labelledBy, className = '', children, onClose }, ref) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      const d = dialogRef.current;
      if (!d || d.open) return;
      returnFocus.current = document.activeElement as HTMLElement;
      d.showModal();
      d.scrollTop = 0;
      document.body.classList.add('modal-open');
    },
    close() {
      dialogRef.current?.close();
    },
  }));

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handleClose = () => {
      document.body.classList.remove('modal-open');
      onClose?.();
      const el = returnFocus.current;
      if (el && el.isConnected) el.focus({ preventScroll: true });
    };
    const handleClick = (e: MouseEvent) => {
      if (e.target !== d) return;
      const r = d.getBoundingClientRect();
      const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (outside) d.close();
    };
    d.addEventListener('close', handleClose);
    d.addEventListener('click', handleClick);
    return () => {
      d.removeEventListener('close', handleClose);
      d.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef} aria-labelledby={labelledBy} className={className}>
      {children}
    </dialog>
  );
});

export default Modal;

export function CloseButton({ onClick, label = 'Fechar' }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-2xl leading-none text-ivory transition hover:rotate-90 hover:bg-forest-deep"
    >
      <span aria-hidden="true">×</span>
    </button>
  );
}
