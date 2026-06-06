import { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X } from 'lucide-react';

interface HeaderProps {
  telefonoEmergencia: string;
}

const navLinks = [
  { href: '/',                 label: 'Inicio' },
  { href: '/quienes-somos',   label: 'Quiénes somos' },
  { href: '/#la-casa-morada', label: 'La Casa Morada' },
  { href: '/#migrantes',      label: 'Migrantes' },
  { href: '/#musica',         label: 'Música' },
  { href: '/#salud',          label: 'Salud' },
];

export default function Header({ telefonoEmergencia }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ position: 'absolute', top: 0, height: '1px', width: '100%' }} />

      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
        <div className="header-inner">

          {/* Logo — siempre visible */}
          <a href="/" className="header-logo" aria-label="Casa de los Pueblos del Sur — Inicio">
            <img
              src="/images/logo.png"
              alt="Casa de los Pueblos del Sur"
              className="header-logo-img"
              width="200"
              height="200"
              loading="eager"
              decoding="async"
            />
          </a>

          {/* Nav desktop — oculta en móvil */}
          <nav aria-label="Navegación principal" className="desktop-nav">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${currentPath === link.href ? ' nav-link--active' : ''}`}
                aria-current={currentPath === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Acciones desktop — ocultas en móvil */}
          <div className="header-actions desktop-actions">
            <a
              href={`tel:${telefonoEmergencia}`}
              className="emergency-pill"
              aria-label={`Llamar a la línea de emergencia: ${telefonoEmergencia}`}
            >
              <Phone size={14} aria-hidden="true" />
              <span>{telefonoEmergencia}</span>
            </a>
            <a href="/#la-casa-morada" className="btn btn-primary btn-sm">
              Necesito ayuda
            </a>
          </div>

          {/* Hamburguesa — solo en móvil */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="hamburger-btn"
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Menú móvil — siempre en DOM, animado con grid-template-rows */}
        <div
          className={`mobile-menu-wrapper${menuOpen ? ' mobile-menu-wrapper--open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav id="mobile-menu" aria-label="Menú móvil" className="mobile-menu">
            <div className="mobile-menu-inner">
              <ul className="mobile-nav-list">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`mobile-nav-link${currentPath === link.href ? ' mobile-nav-link--active' : ''}`}
                      aria-current={currentPath === link.href ? 'page' : undefined}
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mobile-actions">
                <a
                  href={`tel:${telefonoEmergencia}`}
                  className="emergency-pill emergency-pill--full"
                  aria-label={`Llamar a la línea de emergencia: ${telefonoEmergencia}`}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>Línea de emergencia: {telefonoEmergencia}</span>
                </a>
                <a
                  href="/#la-casa-morada"
                  className="btn btn-primary"
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  style={{ justifyContent: 'center' }}
                >
                  Necesito ayuda
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <style>{`
        /* ── Header base ── */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          box-shadow: none;
          transition: box-shadow 0.2s ease;
        }
        .site-header--scrolled {
          box-shadow: 0 2px 12px oklch(0% 0 0 / 0.08);
        }

        /* ── Barra interna ── */
        /* Usa ancho propio (más generoso que el .container global de 1200px)
           para que logo y acciones se separen visualmente en pantallas anchas. */
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding-block: 1rem;
          width: 100%;
          max-width: 1600px;
          margin-inline: auto;
          padding-inline: clamp(1.5rem, 4vw, 3.5rem);
        }

        /* ── Logo ── */
        .header-logo {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          line-height: 0;
          text-decoration: none;
          border-radius: 0.25rem;
        }
        .header-logo-img {
          height: clamp(48px, 5.5vw, 64px);
          width: auto;
          display: block;
          /* El logo trae su propio texto, así que se trata como elemento visual completo */
        }

        /* ── Nav desktop ── */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          justify-content: center;
        }
        .nav-link {
          position: relative;
          font-size: var(--fs-small);
          font-weight: 500;
          color: var(--color-text-muted);
          text-decoration: none;
          white-space: nowrap;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: var(--color-primary);
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: var(--color-text); }
        .nav-link:hover::after { width: 100%; }
        .nav-link--active { color: var(--color-text); }
        .nav-link--active::after { width: 100%; }

        /* ── Acciones desktop ── */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        /* ── Pill de emergencia ── */
        .emergency-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.375rem 0.875rem;
          background-color: color-mix(in oklch, var(--color-emergency) 10%, var(--color-bg));
          color: var(--color-emergency);
          border: 1px solid color-mix(in oklch, var(--color-emergency) 30%, transparent);
          border-radius: 999px;
          font-size: var(--fs-small);
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }
        .emergency-pill--full {
          border-radius: 0.25rem;
          padding: 0.75rem 1rem;
          font-size: var(--fs-body);
        }

        /* ── Botón pequeño para desktop ── */
        .btn-sm {
          padding: 0.5rem 1.125rem !important;
          font-size: var(--fs-small) !important;
        }

        /* ── Hamburguesa ── */
        .hamburger-btn {
          display: none;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: var(--color-text);
          min-width: 44px;
          min-height: 44px;
          border-radius: 0.25rem;
          flex-shrink: 0;
        }
        .hamburger-btn:hover {
          background-color: var(--color-surface-alt);
        }

        /* ── Menú móvil — animación grid-template-rows ── */
        .mobile-menu-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu-wrapper--open {
          grid-template-rows: 1fr;
        }
        /* nav es el hijo directo del grid; overflow:hidden es obligatorio para el truco */
        .mobile-menu {
          overflow: hidden;
        }
        /* el padding y el borde van en el inner para que no se vean con altura 0 */
        .mobile-menu-inner {
          padding: 1rem;
          border-top: 1px solid var(--color-border);
          background-color: var(--color-bg);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.22s ease 0.08s, transform 0.22s ease 0.08s;
        }
        .mobile-menu-wrapper--open .mobile-menu-inner {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-nav-list {
          list-style: none;
          margin: 0 0 1.25rem;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .mobile-nav-link {
          display: block;
          padding: 0.875rem 0.25rem;
          font-size: var(--fs-body);
          font-weight: 500;
          color: var(--color-text);
          text-decoration: none;
          border-bottom: 1px solid var(--color-border);
        }
        .mobile-nav-link--active {
          color: var(--color-primary);
          font-weight: 600;
        }
        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        /* ── Responsive ── */
        /* En anchos medios ocultamos el pill del teléfono — el botón "Necesito ayuda"
           lleva igual a la sección de emergencia. En mobile el teléfono vuelve en el menú. */
        @media (max-width: 1199px) and (min-width: 1024px) {
          .emergency-pill { display: none; }
        }

        /* Breakpoint mobile/tablet: hasta 1023px se muestra hamburguesa.
           A esos anchos no cabe el logo + 5 links + 2 acciones sin amontonarse. */
        @media (max-width: 1023px) {
          .desktop-nav   { display: none !important; }
          .desktop-actions { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .header-inner  { gap: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-link::after { transition: none; }
          .mobile-menu-wrapper { transition: none; }
          .mobile-menu-inner  { transition: none; opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
