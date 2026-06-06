# Casa de los Pueblos del Sur — Sitio Web

Sitio web estático para la organización comunitaria **Casa de los Pueblos del Sur**,
construido con Astro 5 + Tailwind CSS v4. Genera HTML estático puro, sin servidor Node.

---

## Requisitos

- **Node.js** v20.3.0 o superior (recomendado: v20.x LTS)
- **npm** v10 o superior

---

## Instalación y desarrollo local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (abre http://localhost:4321)
npm run dev
```

---

## Generar el sitio para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con todo el sitio estático listo para subir.
No es necesario ningún servidor Node en producción; Hostinger sirve los archivos directamente.

---

## Subir a Hostinger

### Opción A — File Manager (más sencillo)

1. Inicia sesión en [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Ve a **Hosting → Administrar → File Manager**
3. Navega a la carpeta `public_html/`
4. Sube **todo el contenido** de la carpeta `dist/` (no la carpeta `dist/` en sí, sino su contenido)
5. Asegúrate de que `index.html` quede directamente en `public_html/`
6. Sube también el archivo `.htaccess` que está en `public/` — Hostinger lo necesita para los headers de seguridad

### Opción B — FTP

1. En Hostinger, ve a **Hosting → Administrar → FTP Accounts** y copia las credenciales
2. Usa FileZilla u otro cliente FTP
3. Conéctate al servidor con las credenciales obtenidas
4. Navega a `public_html/` en el servidor
5. Sube todo el contenido de `dist/`

---

## Activar HTTPS en Hostinger (obligatorio)

1. En hPanel, ve a **Hosting → Administrar → SSL**
2. Selecciona el dominio y activa **Let's Encrypt SSL** (es gratuito)
3. Espera 5-10 minutos para que se emita el certificado
4. Una vez activo, en el mismo panel activa **Forzar HTTPS**
5. Verifica en el `.htaccess` que las líneas de HSTS estén descomentadas (ver el archivo)

> **Importante:** Activa HTTPS *antes* de descomentar el bloque HSTS en `.htaccess`.
> Si activas HSTS sin HTTPS funcionando, el sitio puede quedar inaccesible.

---

## Configurar el dominio

1. En Hostinger, ve a **Dominios → Administrar → DNS**
2. Agrega un registro `A` apuntando a la IP de tu servidor Hostinger
3. Si usas un subdominio `www`, agrega también un registro `CNAME www → @`

---

## Reemplazar placeholders — Lista completa

Edita **únicamente** el archivo `src/config/site.ts`. Cada campo tiene un comentario explicativo.

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `site.url` | URL completa del sitio en producción | `https://casadelospueblosdelsur.org` |
| `site.contactoGeneral.email` | Correo administrativo público | `contacto@casadelospueblosdelsur.org` |
| `site.contactoGeneral.telefono` | Teléfono de oficina | `+52 951 234 5678` |
| `site.contactoGeneral.direccion` | Dirección de oficina pública (NO de Casa Morada) | `Calle X, Oaxaca` |
| `site.casaMorada.telefonoFijo` | Línea de emergencia 24/7 — aparece grande y prominente | `+52 951 000 0000` |
| `site.casaMorada.whatsapp` | Número WhatsApp sin el `+` | `529510000000` |
| `site.redes.facebook` | URL completa de Facebook | `https://facebook.com/casapueblos` |
| `site.redes.instagram` | URL completa de Instagram | `https://instagram.com/casapueblos` |
| `site.salud.pediatria.doctor` | Nombre del médico pediatra | `Dra. María González` |
| `site.salud.pediatria.horario` | Días y horario de consulta | `Lunes a viernes, 9:00–14:00` |
| `site.salud.pediatria.telefono` | Teléfono para citas de pediatría | `+52 951 111 2222` |
| `site.salud.neurologia.*` | Igual que pediatría, para neurología | — |
| `site.salud.alzheimer.*` | Igual que pediatría, para prevención de Alzheimer | — |

Además de `site.ts`, reemplaza las imágenes en `public/images/` (ver `INSTRUCCIONES.txt`).

---

## Estructura del proyecto

```
/
├── public/
│   ├── images/           ← Imágenes del sitio (reemplazar; ver INSTRUCCIONES.txt)
│   ├── .htaccess         ← Headers de seguridad Apache para Hostinger
│   ├── robots.txt
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cintillo.astro
│   │   ├── Header.tsx        ← Isla React (menú móvil + pill de emergencia)
│   │   ├── ExitButton.tsx    ← Isla React (botón salida rápida + listener Esc)
│   │   ├── Hero.astro
│   │   ├── CasaMorada.astro
│   │   ├── Migrantes.astro
│   │   ├── Musica.astro
│   │   ├── Salud.astro
│   │   └── Footer.astro
│   ├── config/
│   │   └── site.ts           ← ÚNICO ARCHIVO QUE EL CLIENTE EDITA
│   ├── layouts/
│   │   └── BaseLayout.astro  ← SEO, fonts, JSON-LD, skip-link
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro
│   └── styles/
│       └── tokens.css        ← Variables CSS de color y tipografía
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Privacidad y seguridad

Este sitio no usa:
- Google Analytics ni ningún tracker de terceros
- Meta Pixel, Hotjar, Clarity ni similares
- Cookies (no hay banner de cookies porque no hay nada que consentir)
- Chats en vivo de terceros

Las usuarias en situación de riesgo pueden visitar el sitio con mayor privacidad.
Se recomienda siempre usar el modo incógnito del navegador si hay riesgo de vigilancia.

---

## Comandos de referencia

| Comando | Acción |
|---------|--------|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `http://localhost:4321` |
| `npm run build` | Genera `dist/` para producción |
| `npm run preview` | Previsualiza el build antes de subir |
