"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { PeriodKey } from "@/lib/types";
import Modal from "@/components/ui/Modal";

export interface ModalState {
  title: string;
  body: ReactNode;
  confirmText: string;
  onConfirm: () => void;
}

interface AppContextValue {
  period: PeriodKey;
  setPeriod: (period: PeriodKey) => void;
  notifCount: number;
  setNotifCount: (count: number) => void;
  showToast: (message: string) => void;
  openModal: (state: ModalState) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<PeriodKey>("week1");
  const [notifCount, setNotifCount] = useState(3);
  const [toast, setToast] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const openModal = useCallback((state: ModalState) => setModal(state), []);
  const closeModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  return (
    <AppContext.Provider
      value={{
        period,
        setPeriod,
        notifCount,
        setNotifCount,
        showToast,
        openModal,
        closeModal,
      }}
    >
      {children}
      {modal && (
        <Modal
          title={modal.title}
          confirmText={modal.confirmText}
          onClose={closeModal}
          onConfirm={() => {
            modal.onConfirm();
            closeModal();
          }}
        >
          {modal.body}
        </Modal>
      )}
      <div
        className={`toast${toast ? " show" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast ?? ""}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}