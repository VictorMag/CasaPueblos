# Deploy Checklist — Casa de los Pueblos del Sur

**Stack:** Astro 5 estático → Hostinger (Apache)
**Sin CI, sin staging, sin DB, sin trackers de terceros**

> Consultar antes de cada deploy. Marcar con `[x]` lo verificado. Items con ⚠️ son los que se sabe pendientes en la última revisión.

---

## 🚦 Estado actual (auditoría 2026-05-08)

**Bloqueantes para producción** (no deploy hasta resolver):
1. ⚠️ **Placeholders visibles** en el HTML compilado: `[CORREO_GENERAL]` (3 páginas), `[DR. NOMBRE APELLIDO]` ×3, `[TEL_PEDIATRIA/NEUROLOGIA/ALZHEIMER]`, horarios `[ej: ...]` ×3 — el usuario final los vería como texto literal.
2. ⚠️ **Contenido del aviso de privacidad** sin redactar (LFPDPPP exige texto real).
3. ⚠️ **`/public/images/logo.png` no existe** — header muestra imagen rota.
4. ⚠️ **`site.url` confirmar dominio real** antes de generar build final (afecta JSON-LD, canonical, sitemap, OG).
5. ⚠️ **Activar HSTS redirect** en `.htaccess` después del primer deploy con HTTPS confirmado.

**Pasa la auditoría automática:**
- ✅ Sin trackers, cookies, localStorage o sessionStorage
- ✅ JSON-LD no filtra el teléfono de Casa Morada (solo el de oficina)
- ✅ Sitemap no contiene info sensible
- ✅ `.htaccess` con CSP corregida para Google Fonts (estaba con Fontshare)
- ✅ Referrer-Policy unificado a `no-referrer` (HTTP header + meta)
- ✅ Página `/aviso-de-privacidad` existe (estructura, falta contenido)
- ✅ ExitButton: Esc desde cualquier sección lo dispara, target 48×48, animación respeta `prefers-reduced-motion`
- ✅ Build limpio (4 páginas, sitemap, .htaccess copiado a dist)
- ✅ Sin `console.log`/TODO/FIXME en `src/`
- ✅ Todos los `<img>` tienen `alt`

**Nice-to-have (no bloqueantes):**
- `dist/index.html` = 56KB (target 50KB) — optimizable inlining menos estilos
- `hero-mural.png` → WebP/AVIF (ahorro ~70% peso, mejora LCP)
- 159KB de JS por las 2 islas React (Header + ExitButton) — migrar a Astro vanilla bajaría a ~10KB

---

## 🔐 Privacidad (NO-NEGOCIABLE — el riesgo más alto del proyecto)

- [x] ✅ Ninguna dirección de Casa Morada en código
- [x] ✅ Teléfono de emergencia NO aparece en `sitemap-0.xml` (verificado: 0 ocurrencias)
- [x] ✅ JSON-LD solo contiene oficina administrativa `+52 55 8558 3470` (4/4 páginas)
- [x] ✅ `<meta name="referrer" content="no-referrer">` en `BaseLayout.astro`
- [x] ✅ Cero trackers (verificado con grep)
- [x] ✅ Cero cookies, localStorage, sessionStorage
- [x] ✅ Página `/aviso-de-privacidad` existe (estructura)
- [x] ✅ `.htaccess` con HSTS, CSP, Referrer-Policy `no-referrer`, X-Content-Type-Options, X-Frame-Options DENY, Permissions-Policy

## 📝 Contenido — sin placeholders en producción

Buscar `[MAYÚSCULAS_CON_GUIONES]` en el sitio compilado debe dar **0 resultados**.

- [ ] ⚠️ `site.contactoGeneral.email = "[CORREO_GENERAL]"` — pendiente cliente
- [ ] ⚠️ `site.casaMorada.whatsapp = "[NUMERO_WHATSAPP_SIN_+]"` — pendiente (botón se oculta solo, pero confirmar)
- [ ] ⚠️ `site.salud.pediatria` / `neurologia` / `alzheimer` — todos los campos en placeholder
- [ ] ⚠️ `site.redes.facebook` / `instagram` — placeholders
- [ ] ⚠️ `site.mision` / `vision` — texto envuelto en `[MISIÓN — …]` y `[VISIÓN — …]`
- [ ] ⚠️ `site.url = "https://casadelospueblosdelsur.org"` — confirmar dominio real
- [ ] Revisar manualmente nombres incompletos en `sociosFundadores`: Poblete, Cristina UACM, Dr. José Luis UACM, Dra. Karen M, Pia (Univ. Monterrey FA)

## 🖼️ Assets

- [ ] ⚠️ `public/images/logo.png` — archivo no existe en disco (el header muestra imagen rota hasta agregarlo)
- [ ] `public/images/logo-blanco.png` (opcional, footer)
- [ ] ⚠️ `public/images/og.jpg` — 1200×630, <150KB (preview Open Graph en Facebook/WhatsApp)
- [ ] ⚠️ `public/favicon.ico` — reemplazar el default de Astro o aceptar el SVG ya hecho
- [ ] Optimizar `hero-mural.png` → convertir a WebP (~70% menos peso). En `Hero.astro` agregar `<picture>` con `<source srcset="hero-mural.webp" type="image/webp">`

## ⚡ Performance

- [ ] `npm run build` sin warnings de tamaño
- [ ] `dist/index.html` < 50KB
- [ ] LCP < 2.5s en 3G simulado (Lighthouse)
- [ ] Imagen del mural convertida a WebP/AVIF
- [ ] Google Fonts no bloquea render (ya hay `preconnect`)
- [ ] `content-visibility: auto` en secciones largas

## ♿ Accesibilidad

- [ ] Lighthouse → Accessibility ≥ 95
- [ ] Skip link funciona (Tab desde inicio → "Saltar al contenido principal")
- [ ] Contraste del headline morado sobre fondo crema (Hero/Header logo)
- [ ] ExitButton siempre alcanzable por teclado y Esc desde cualquier sección lo dispara
- [ ] Todos los `<img>` tienen `alt` apropiado
- [ ] Nav del header tiene `aria-current="page"`
- [ ] Menú móvil: focus se mueve al primer link al abrir, vuelve al botón al cerrar
- [ ] `prefers-reduced-motion`: animaciones desactivadas

## 🔍 SEO

- [ ] `<title>` único por página
- [ ] `<meta description>` único por página, < 160 chars
- [ ] JSON-LD válido — https://validator.schema.org
- [ ] `sitemap-index.xml` generado y referenciado en `<head>`
- [ ] `robots.txt` permite indexación
- [ ] Open Graph: verificar en https://opengraph.xyz/
- [ ] Canonical URL correcta en cada página

## 🧪 Funcionalidad — pruebas manuales

- [ ] Hero: animación de líneas en cascada fluida, texto legible
- [ ] Header: en 320, 768, 1024, 1280, 1600+ sin amontonamiento
- [ ] Menú móvil: abre/cierra con hamburguesa, Esc lo cierra, body scroll bloqueado
- [ ] Click en teléfono de emergencia → marca en móvil
- [ ] Click en "Necesito ayuda" → scroll a #la-casa-morada
- [ ] WhatsApp button oculto cuando placeholder, visible cuando número real
- [ ] ExitButton click → redirige a google.com
- [ ] Tecla Esc desde cualquier momento → dispara ExitButton
- [ ] Anchors internos (`#la-casa-morada`, etc.) hacen smooth scroll

## 🌐 Cross-browser / dispositivos

- [ ] Chrome desktop + Android
- [ ] Safari desktop + iOS (fonts, sticky header, `oklch()`)
- [ ] Firefox desktop
- [ ] Edge desktop
- [ ] Mobile real: tap targets ≥ 44×44px

## 🏗️ Build

- [x] ✅ `npm run build` sin errores (4 páginas + sitemap generados)
- [x] ✅ `dist/` completo (index 56KB, quienes-somos 45KB, aviso 31KB, 404 5.8KB)
- [ ] `npm run preview` funciona idéntico a dev (pendiente prueba manual)
- [x] ✅ No `console.log` en src
- [x] ✅ `.htaccess` se copia a `dist/.htaccess` (2375 bytes)

## 🚢 Deploy a Hostinger

- [ ] Backup del `public_html` actual antes de sobreescribir
- [ ] Subir **el contenido de `dist/`** (no la carpeta `dist`) vía FTP/SFTP o cPanel File Manager
- [ ] Permisos: archivos `644`, carpetas `755`
- [ ] HTTPS forzado por `.htaccess`
- [ ] Certificado SSL activo y renovación automática

## ✅ Post-deploy

- [ ] Abrir dominio real — sitio carga
- [ ] Lighthouse en producción: Performance ≥ 90, A11y ≥ 95, SEO = 100
- [ ] `/aviso-de-privacidad` no da 404
- [ ] `/quienes-somos` funciona
- [ ] Móvil real (no emulado)
- [ ] Llamar al teléfono de emergencia desde un móvil — conecta
- [ ] Buscar en Google `site:tudominio.com` tras 48h (indexación)

## 🔄 Rollback

**Si dentro de las primeras 24h:**
- 🚨 Teléfono de emergencia no funciona → rollback inmediato (riesgo de vida)
- 🚨 Datos confidenciales de Casa Morada aparecen visibles → rollback inmediato + rotar lo expuesto
- ⚠️ Sitio no carga en >5% de visitas → restaurar backup
- ⚠️ Lighthouse Performance cae <60 → investigar antes de revertir

**Cómo revertir:** restaurar backup de `public_html` desde File Manager de Hostinger o reupload del último `dist/` conocido como bueno.
