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
import type {
  PerformanceDataset,
  PerformanceSnapshot,
  PeriodKey,
  PeriodOption,
} from "@/lib/types";
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
  periods: PeriodOption[];
  snapshot: PerformanceSnapshot | null;
  isPerformanceLoading: boolean;
  performanceError: string | null;
  refreshPerformance: () => Promise<void>;
  notifCount: number;
  setNotifCount: (count: number) => void;
  showToast: (message: string) => void;
  openModal: (state: ModalState) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod] = useState<PeriodKey>("");
  const [performance, setPerformance] = useState<PerformanceDataset | null>(null);
  const [isPerformanceLoading, setIsPerformanceLoading] = useState(true);
  const [performanceError, setPerformanceError] = useState<string | null>(null);
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

  const refreshPerformance = useCallback(async () => {
    setIsPerformanceLoading(true);
    setPerformanceError(null);
    try {
      const response = await fetch("/api/performance", { cache: "no-store" });
      const payload = (await response.json()) as PerformanceDataset & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Data spreadsheet belum dapat dimuat.");

      setPerformance(payload);
      setPeriod((currentPeriod) =>
        payload.periods.some((option) => option.key === currentPeriod)
          ? currentPeriod
          : payload.defaultPeriod
      );
    } catch (error) {
      setPerformanceError(
        error instanceof Error ? error.message : "Data spreadsheet belum dapat dimuat."
      );
    } finally {
      setIsPerformanceLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void refreshPerformance();
    }, 0);
    return () => window.clearTimeout(loadTimer);
  }, [refreshPerformance]);

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
        periods: performance?.periods ?? [],
        snapshot: period ? performance?.snapshots[period] ?? null : null,
        isPerformanceLoading,
        performanceError,
        refreshPerformance,
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
