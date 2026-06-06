import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

function exitSite() {
  window.open('https://weather.com', '_blank', 'noopener,noreferrer');
  window.location.replace('https://www.google.com');
}

export default function ExitButton() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') exitSite();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <button
      onClick={exitSite}
      aria-label="Salir rápidamente y abrir Google"
      title="Salir rápidamente y abrir Google (también puedes presionar Esc)"
      className="exit-btn"
    >
      <ExternalLink size={16} aria-hidden="true" />
      <span className="exit-label">Salir del sitio</span>

      <style>{`
        .exit-btn {
          position: fixed;
          z-index: 9999;
          bottom: 1rem;
          left: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background-color: var(--color-emergency);
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: var(--fs-small);
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          min-width: 48px;
          min-height: 48px;
          animation: pulse-ring 2.8s ease-in-out infinite;
        }
        .exit-btn:hover {
          filter: brightness(0.9);
          animation: none;
          box-shadow: 0 6px 20px oklch(0% 0 0 / 0.3);
        }
        @media (max-width: 767px) {
          .exit-btn {
            bottom: 1rem;
            left: auto;
            right: 1rem;
          }
          .exit-label { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .exit-btn { animation: none; box-shadow: 0 4px 16px oklch(0% 0 0 / 0.25); }
        }
      `}</style>
    </button>
  );
}
