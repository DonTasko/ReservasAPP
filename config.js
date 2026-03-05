// ═══════════════════════════════════════════════════════════════════
// config.js — Configuração Central Don Tasko
// Usado por: admin.html, admin-completo.html, HACCP.html, Faturas.html
// ═══════════════════════════════════════════════════════════════════

// ── URL DO APPS SCRIPT DO RESTAURANTE (reservas, HACCP, ocupação) ──
// Usado por admin.html, admin-completo.html, HACCP.html
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbyDD_p_5eEm32oJYebOfn_4t8cEEoH8TXqWPFmbhXT5Zkw8bj_R9yZIatVHZErqK7jh/exec";

// ── CONFIGURAÇÃO DA APP DE FATURAS ────────────────────────────────
// Usado por Faturas.html
const APP_CONFIG = {

  // URL do Apps Script das FATURAS
  // Se as faturas estiverem numa sheet separada, muda este URL
  // Se estiverem na mesma sheet do restaurante, deixa igual ao URL_SCRIPT
  SHEETS_URL: "https://script.google.com/macros/s/AKfycbyDD_p_5eEm32oJYebOfn_4t8cEEoH8TXqWPFmbhXT5Zkw8bj_R9yZIatVHZErqK7jh/exec",

  // Negócio
  BUSINESS_NAME: "Maria Helena Afonso, Lda",
  BUSINESS_NIF:  "516763482",

  // Utilizador
  USER_NAME:     "Luis Afonso",
  USER_INITIALS: "LA",

  // Contabilidade
  ACCOUNTANT_EMAIL: "dontasko.geral@gmail.com",

  // Câmara (environment = traseira, user = frontal)
  DEFAULT_CAMERA: "environment",

  // Resolução scan — Android: 640 / iPhone ou PC: 1280
  SCAN_WIDTH:  640,
  SCAN_HEIGHT: 480,
};
