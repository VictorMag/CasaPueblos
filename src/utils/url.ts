// Helper para construir rutas internas respetando el `base` de Astro.
// En producción base = '/' → url('/quienes-somos') === '/quienes-somos'
// En preview   base = '/preview/' → url('/quienes-somos') === '/preview/quienes-somos'
//
// Usar para TODOS los enlaces internos y assets de /public referenciados a mano
// (favicons, imágenes, logo). Los assets que Astro gestiona (CSS/JS de _astro)
// ya se prefijan solos.

const BASE = import.meta.env.BASE_URL; // termina en '/' (ej: '/' o '/preview/')

export function url(path: string): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
