// Crea preview-site.zip con forward slashes garantizados
// Compatible con Node.js 20+ sin dependencias externas

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const outZip = path.join(__dirname, 'preview-site.zip');

// Recolectar todos los archivos
const files = [];
function walk(dir, base) {
  for (const e of fs.readdirSync(dir)) {
    const full = path.join(dir, e);
    // Siempre usamos forward slash para la ruta dentro del zip
    const rel = base ? `${base}/${e}` : e;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, rel);
    } else {
      files.push({ full, rel });
    }
  }
}
walk(distDir, '');

// Construir ZIP manualmente (formato ZIP estándar RFC 1950/1951)
// Usamos STORED (sin compresión) para simplificar — el servidor extrae igual
const parts = [];
const centralDir = [];

function uint16LE(n) {
  const b = Buffer.alloc(2); b.writeUInt16LE(n); return b;
}
function uint32LE(n) {
  const b = Buffer.alloc(4); b.writeUInt32LE(n >>> 0); return b;
}

// CRC-32
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (const b of buf) crc = CRC_TABLE[(crc ^ b) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

let offset = 0;

for (const { full, rel } of files) {
  const data = fs.readFileSync(full);
  const nameBytes = Buffer.from(rel, 'utf8'); // siempre forward slashes
  const crc = crc32(data);
  const size = data.length;

  // Local file header
  const localHeader = Buffer.concat([
    Buffer.from([0x50, 0x4B, 0x03, 0x04]), // signature
    uint16LE(20),          // version needed
    uint16LE(0),           // flags
    uint16LE(0),           // compression: STORED
    uint16LE(0),           // mod time
    uint16LE(0),           // mod date
    uint32LE(crc),
    uint32LE(size),        // compressed size
    uint32LE(size),        // uncompressed size
    uint16LE(nameBytes.length),
    uint16LE(0),           // extra field length
    nameBytes,
  ]);

  parts.push(localHeader, data);

  // Central directory entry
  centralDir.push(Buffer.concat([
    Buffer.from([0x50, 0x4B, 0x01, 0x02]), // signature
    uint16LE(20),          // version made by
    uint16LE(20),          // version needed
    uint16LE(0),           // flags
    uint16LE(0),           // compression: STORED
    uint16LE(0),           // mod time
    uint16LE(0),           // mod date
    uint32LE(crc),
    uint32LE(size),
    uint32LE(size),
    uint16LE(nameBytes.length),
    uint16LE(0),           // extra
    uint16LE(0),           // comment
    uint16LE(0),           // disk start
    uint16LE(0),           // internal attr
    uint32LE(0),           // external attr
    uint32LE(offset),      // relative offset
    nameBytes,
  ]));

  offset += localHeader.length + data.length;
}

const centralDirBuf = Buffer.concat(centralDir);
const cdSize = centralDirBuf.length;

// End of central directory record
const eocd = Buffer.concat([
  Buffer.from([0x50, 0x4B, 0x05, 0x06]),
  uint16LE(0),              // disk number
  uint16LE(0),              // disk with cd
  uint16LE(files.length),
  uint16LE(files.length),
  uint32LE(cdSize),
  uint32LE(offset),
  uint16LE(0),              // comment length
]);

fs.writeFileSync(outZip, Buffer.concat([...parts, centralDirBuf, eocd]));
console.log(`✓ preview-site.zip creado: ${(fs.statSync(outZip).size / 1024 / 1024).toFixed(1)} MB`);
console.log(`  ${files.length} archivos`);
// Verificar que _astro tiene forward slashes
const astroFiles = files.filter(f => f.rel.startsWith('_astro'));
console.log(`  Archivos _astro (${astroFiles.length}):`);
astroFiles.forEach(f => console.log(`    ${f.rel}`));
