'use client';

import { useEffect } from 'react';

export function ContentProtection({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for copy, paste, save, print, etc.
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl/Cmd + C, V, A, S, P, U, I, J, Shift+F10, F12
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'a', 's', 'p', 'u', 'i', 'j'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        return false;
      }

      // Disable F12 (DevTools), Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.key.toLowerCase() === 'u')
      ) {
        e.preventDefault();
        return false;
      }

      // Disable Shift+F10 (context menu)
      if (e.shiftKey && e.key === 'F10') {
        e.preventDefault();
        return false;
      }
    };

    // Disable print
    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeprint', handleBeforePrint);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, []);

  return (
    <div className="select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {children}
    </div>
  );
}
