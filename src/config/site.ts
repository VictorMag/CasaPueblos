// Centro único de configuración. El cliente edita SOLO este archivo.
// Busca todos los valores entre corchetes [MAYÚSCULAS] y reemplázalos.

export const site = {
  nombre: "Casa de los Pueblos del Sur",
  descripcion: "Apoyo integral a mujeres, migrantes y familias del sur de la Ciudad de México",
  url: "https://casadelospueblosdelsur.org", // REEMPLAZAR con el dominio real

  // ── Contacto administrativo público (aparece en footer y JSON-LD) ──────
  // NUNCA uses aquí datos de Casa Morada — son confidenciales.
  contactoGeneral: {
    email:     "[CORREO_GENERAL]",      // ej: contacto@casadelospueblosdelsur.org
    telefono:  "+52 55 8558 3470",      // teléfono de oficina administrativa pública
    direccion: "Sanahcat 65A, Héroes de Padierna, Tlalpan, 14200, CDMX",   // dirección administrativa pública (NO de Casa Morada)
  },

  // ── Casa Morada — datos de emergencia ───────────────────────────────────
  // Estos datos aparecen solo en la sección #la-casa-morada y el header.
  casaMorada: {
    telefonoFijo: "+52 55 5415 0664",                   // ej: +52 951 234 5678
    whatsapp:     "[NUMERO_WHATSAPP_SIN_+]",            // formato: 529512345678 (sin el signo +)
  },

  // ── Redes sociales ───────────────────────────────────────────────────────
  redes: {
    facebook:  "[URL_FACEBOOK]",   // ej: https://facebook.com/casadelospueblosdelsur
    instagram: "[URL_INSTAGRAM]",  // ej: https://instagram.com/casapueblosdelsur
  },

  // ── Clínica comunitaria ──────────────────────────────────────────────────
  // Cada especialidad: nombre del doctor, horario de consulta y teléfono de citas.
  salud: {
    pediatria: {
      doctor:  "[DR. NOMBRE APELLIDO]",
      horario: "[ej: Lunes a viernes, 9:00–14:00]",
      telefono: "[TEL_PEDIATRIA]",
    },
    neurologia: {
      doctor:  "[DR. NOMBRE APELLIDO]",
      horario: "[ej: Martes y jueves, 10:00–16:00]",
      telefono: "[TEL_NEUROLOGIA]",
    },
    alzheimer: {
      doctor:  "[DR. NOMBRE APELLIDO]",
      horario: "[ej: Miércoles, 9:00–13:00]",
      telefono: "[TEL_ALZHEIMER]",
    },
  },

  // ── Misión y visión ──────────────────────────────────────────────────────
  mision: "[MISIÓN — Acompañar a mujeres, migrantes y familias del sur de la Ciudad de México con servicios gratuitos de protección, asesoría legal, salud y educación, desde un enfoque comunitario y de dignidad humana.]",

  vision: "[VISIÓN — Ser una red comunitaria de referencia en el sur de la Ciudad de México, donde ninguna persona se quede sin apoyo por falta de recursos, información o un lugar seguro al cual acudir.]",

  // ── Socios fundadores ────────────────────────────────────────────────────
  // Lista extraída del Manual de Operaciones original. Algunos nombres están
  // incompletos en el manual y aparecen igual aquí (revisar con el cliente).
  // El campo `telefono` se eliminó por ahora — el cliente no tiene los datos.
  // Cuando se obtengan, agregar el campo y restaurar el toggle "Ver contacto"
  // en `src/pages/quienes-somos.astro`. Cada teléfono requiere consentimiento
  // firmado del titular (Ley Federal de Protección de Datos Personales).
  sociosFundadores: [
    { id:  1, nombre: "María Cristina Cruz Ulloa",           titulo: "Abogada" },
    { id:  2, nombre: "Ing. Carlos Carrasco",                titulo: "Ingeniero" },
    { id:  3, nombre: "Juan Oyarzun Vaccaro",                titulo: "Profesor" },
    { id:  4, nombre: "Dr. Favio Moraga Villa",              titulo: "" },
    { id:  5, nombre: "Nelly Cartes",                        titulo: "" },
    { id:  6, nombre: "Aníbal Uribe Vildoso",                titulo: "Contador Público" },
    { id:  7, nombre: "Juan Eduardo Esquivel",               titulo: "Poeta" },
    { id:  8, nombre: "Eugenia Urqueta",                     titulo: "" },
    { id:  9, nombre: "Dr. Fernando Shultz",                 titulo: "" },
    { id: 10, nombre: "Dr. Darío Salinas Figueredo",         titulo: "" },
    { id: 11, nombre: "Dra. Carolina Tetelboim",             titulo: "" },
    { id: 12, nombre: "Eduardo Santibáñez Olivares",         titulo: "DDHH" },
    { id: 13, nombre: "Jorge Cocom Poch",                    titulo: "Poeta" },
    { id: 14, nombre: "Alejandro Poch",                      titulo: "" },
    { id: 15, nombre: "Vadim Aleman",                        titulo: "Arquitecto" },
    { id: 16, nombre: "Dra. Ximena Salinas Urqueta",         titulo: "" },
    { id: 17, nombre: "Dra. Kena (Eugenia) Salinas Urqueta", titulo: "" },
    { id: 18, nombre: "Beatriz Torres",                      titulo: "UACM" },
    { id: 19, nombre: "Roxana \"Rincón chileno\"",           titulo: "" },
    { id: 20, nombre: "Ana María Galdames",                  titulo: "" },
    { id: 21, nombre: "María Inés Bussi",                    titulo: "Periodista" },
    { id: 22, nombre: "Dr. Claudio Palma",                   titulo: "" },
    { id: 23, nombre: "Dr. Eduardo Missoni",                 titulo: "MD, Pediatra Investigador" },
    { id: 24, nombre: "Israel Moreno",                       titulo: "Dir. Cine UNAM" },
    { id: 25, nombre: "Gabriel Palma",                       titulo: "Hx" },
    { id: 26, nombre: "Ivonne Szasz",                        titulo: "" },
    { id: 27, nombre: "Mariel Labra Illanes",                titulo: "" },
    { id: 28, nombre: "Manuelito Labra Illanes",             titulo: "Dir. Pilates" },
    { id: 29, nombre: "Fernando Arancibia",                  titulo: "" },
    { id: 30, nombre: "Dra. Kemy Oyarzun Vaccaro",           titulo: "" },
    { id: 31, nombre: "Olga Gómez",                          titulo: "" },
    { id: 32, nombre: "Irene Luengo",                        titulo: "" },
    { id: 33, nombre: "Dr. Raúl Contreras Román",            titulo: "" },
    { id: 34, nombre: "Rosa Mayorga Salces",                 titulo: "" },
    { id: 35, nombre: "Dra. Pia Ramírez",                    titulo: "UNAM Educación" },
    { id: 36, nombre: "Miriam Urzúa",                        titulo: "Arquitecta" },
    { id: 37, nombre: "Juan Carlos Cruz Ulloa",              titulo: "" },
    { id: 38, nombre: "Pia",                                 titulo: "Univ. Monterrey FA" },
    { id: 39, nombre: "María Luisa Muñoz",                   titulo: "" },
    { id: 40, nombre: "Poblete",                             titulo: "" },
    { id: 41, nombre: "Emiliano Illescas",                   titulo: "" },
    { id: 42, nombre: "Arturo Navarro Oyarzun",              titulo: "Cónsul" },
    { id: 43, nombre: "Dra. Cristina Vaccaro Cruz",          titulo: "" },
    { id: 44, nombre: "David Sangines Sayavedra",            titulo: "" },
    { id: 45, nombre: "Dr. José Luis",                       titulo: "UACM" },
    { id: 46, nombre: "Cristina",                            titulo: "UACM" },
    { id: 47, nombre: "Dra. Karen M",                        titulo: "" },
  ],
};
