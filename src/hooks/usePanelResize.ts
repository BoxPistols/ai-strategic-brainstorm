import { useState, useCallback, useEffect, useRef } from 'react';

const STORAGE_KEY = 'panelRatio';
const MIN = 20;
const MAX = 80;
const DEFAULT = 40;

export const PRESETS = {
  leftFocus:  70,
  equal:      50,
  rightFocus: 30,
} as const;

export function usePanelResize() {
  const [ratio, setRatio] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Math.max(MIN, Math.min(MAX, Number(saved))) : DEFAULT;
  });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const applyRatio = useCallback((r: number) => {
    const clamped = Math.max(MIN, Math.min(MAX, Math.round(r)));
    setRatio(clamped);
    localStorage.setItem(STORAGE_KEY, String(clamped));
  }, []);

  const startDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      applyRatio(pct);
    };

    const onUp = () => setIsDragging(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    // Prevent text selection while dragging
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, applyRatio]);

  const activePreset = Object.entries(PRESETS).find(
    ([, v]) => Math.abs(ratio - v) <= 3
  )?.[0] as keyof typeof PRESETS | undefined;

  return { ratio, applyRatio, startDrag, isDragging, containerRef, activePreset };
}
