# Datos pendientes — Casa de los Pueblos del Sur

> Lista de información que el cliente debe proveer antes de subir el sitio a producción. Cada item indica **dónde se va a usar** y el **archivo** que se debe modificar.

---

## 🔴 Bloqueantes (sin esto el sitio no debe publicarse)

### 1. Correo de contacto general
- **Placeholder actual:** `[CORREO_GENERAL]`
- **Dónde se usa:** Footer, JSON-LD SEO, sección "Apoyo Migrante" (CTA "Solicitar información"), página /aviso-de-privacidad, página /quienes-somos (CTA "Escríbenos")
- **Archivo:** `src/config/site.ts` → `contactoGeneral.email`
- **Ejemplo:** `"contacto@casadelospueblosdelsur.org"`

### 2. Aviso de privacidad — contenido legal completo
- **Estado:** Estructura de la página existe en `/aviso-de-privacidad/`, contenido es placeholder
- **Quién:** Debe redactarlo un abogado conforme a **Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)**.
- **Archivo:** `src/pages/aviso-de-privacidad.astro`
- **Debe incluir:**
  - Identidad y domicilio del responsable del tratamiento
  - Datos personales recabados y finalidades del tratamiento
  - Transferencias de datos a terceros, si las hay
  - Mecanismos para ejercer derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
  - Mecanismo para revocar el consentimiento
  - Uso de cookies o tecnologías de rastreo (el sitio NO usa cookies — mencionarlo explícitamente)
  - Procedimiento de cambios al aviso de privacidad

### 3. Logo en imagen
- **Estado:** El header muestra imagen rota porque el archivo no está en disco.
- **Archivo a crear:** `public/images/logo.png` (versión transparente que ya entregaron)
- **Opcional:** `public/images/logo-blanco.png` (versión sobre fondo blanco para footer morado)

### 4. Dominio real del sitio
- **Placeholder actual:** `"https://casadelospueblosdelsur.org"` (asumido)
- **Dónde se usa:** JSON-LD, canonical URLs, sitemap, Open Graph
- **Archivo:** `src/config/site.ts` → `url`
- **Confirmar:** ¿el dominio es exactamente `casadelospueblosdelsur.org` con HTTPS?

### 5. Misión y visión — texto real
- **Placeholder actual:** Texto envuelto en `[MISIÓN — …]` y `[VISIÓN — …]`
- **Dónde se usa:** Página /quienes-somos
- **Archivo:** `src/config/site.ts` → `mision`, `vision`

---

## 🟡 Sección Salud — clínica comunitaria (3 especialidades)

Cada especialidad necesita 3 datos. Si alguna especialidad **no aplica**, dímelo y la oculto en lugar de mostrar placeholders.

### Pediatría
- Doctor responsable: nombre + grado académico
- Horario de consulta
- Teléfono de citas
- **Placeholders actuales:** `[DR. NOMBRE APELLIDO]`, `[ej: Lunes a viernes, 9:00–14:00]`, `[TEL_PEDIATRIA]`

### Neurología
- Doctor responsable
- Horario
- Teléfono
- **Placeholders:** mismas claves con sufijo `_NEUROLOGIA`

### Alzheimer
- Doctor responsable
- Horario
- Teléfono
- **Placeholders:** mismas claves con sufijo `_ALZHEIMER`

**Archivo:** `src/config/site.ts` → `salud.pediatria`, `salud.neurologia`, `salud.alzheimer`

---

## 🟢 Redes sociales (opcional — si no se entregan, los íconos se ocultan automáticamente)

- **Facebook URL completa:** `[URL_FACEBOOK]` — ej: `https://facebook.com/casadelospueblosdelsur`
- **Instagram URL completa:** `[URL_INSTAGRAM]` — ej: `https://instagram.com/casapueblosdelsur`
- **Archivo:** `src/config/site.ts` → `redes.facebook`, `redes.instagram`

---

## 🟢 WhatsApp de emergencia (opcional)

- **Estado:** Si no se provee, el botón verde de WhatsApp en la sección Casa Morada permanece oculto. El teléfono fijo sigue siendo el principal contacto de emergencia.
- **Formato:** Número con código de país **sin el signo +**. Ejemplo: `5215554150664` (52 = México, 1 = celular CDMX, número).
- **Archivo:** `src/config/site.ts` → `casaMorada.whatsapp`

---

## 🟢 Imagen Open Graph (preview de Facebook/WhatsApp)

- **Archivo a crear:** `public/images/og.jpg`
- **Especificaciones:**
  - Dimensiones: **1200×630 px**
  - Peso: **<150 KB** (idealmente JPG con compresión 80)
  - Contenido: imagen representativa de la organización con el nombre legible
- **Para qué:** Cuando alguien comparte el link en redes/WhatsApp, esta imagen es la que aparece como preview.

---

## 🟢 Confirmaciones sobre la lista de socios fundadores

Hay **5 nombres incompletos en el manual original** que probablemente necesiten ser corregidos:

| # | Tal como aparece | Sospechoso |
|---|---|---|
| 38 | "Pia" — Univ. Monterrey FA | Falta apellido |
| 40 | "Poblete" | Solo apellido |
| 45 | "Dr. José Luis" — UACM | Falta apellido |
| 46 | "Cristina" — UACM | Solo nombre |
| 47 | "Dra. Karen M" | "M" parece abreviatura |

**Archivo:** `src/config/site.ts` → `sociosFundadores` (revisar entries con esos IDs)

---

## Cómo entregar los datos

**Opción 1 — más simple:** Llenar una hoja con cada item arriba y enviarla. Yo los meto al código.

**Opción 2 — directo:** Editar `src/config/site.ts` directamente reemplazando los `"[PLACEHOLDER]"` por valores reales. **No tocar nada más** del archivo.

---

## Verificación final antes de deploy

Una vez con los datos cargados, ejecutar en la raíz del proyecto:

```bash
# Build de producción
npm run build

# Confirmar que NO quedan placeholders en el HTML compilado
grep -roE '\[[A-Z_][A-Z_ ]*\]' dist/ --include="*.html"
```

Si esa búsqueda devuelve resultados, **hay placeholders sin reemplazar** y no se debe deployar.
