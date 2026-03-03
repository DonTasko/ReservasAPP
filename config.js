// ═══════════════════════════════════════════════════════════════════
// FaturaApp — Ficheiro de Configuração
// ───────────────────────────────────────────────────────────────────
// Preenche os valores abaixo e faz upload deste ficheiro para o
// GitHub no mesmo repositório que o index.html
// ═══════════════════════════════════════════════════════════════════

const APP_CONFIG = {

  // ── 1. GOOGLE SHEETS ──────────────────────────────────────────────
  // URL do teu Google Apps Script (Web App)
  // Como obter:
  //   1. Abre o teu Google Sheets
  //   2. Extensões → Apps Script → cola o sheets-script.gs
  //   3. Implementar → Nova implementação → App Web
  //   4. Copia o URL que aparece (começa com https://script.google.com/macros/s/...)
  //
  // Exemplo: "https://script.google.com/macros/s/AKfycbxXXXXXXXXXX/exec"
  SHEETS_URL: "",

  // ── 2. IDENTIFICAÇÃO DO NEGÓCIO ───────────────────────────────────
  // Nome que aparece na sidebar e nos exports
  BUSINESS_NAME: "Maria Helena Afonso, Lda",

  // NIF do teu negócio (preenchido automaticamente no campo NIF Cliente)
  BUSINESS_NIF: "516763482",

  // Nome do utilizador (aparece no canto inferior esquerdo)
  USER_NAME: "Luis Afonso",

  // Iniciais do avatar (máx. 2 letras)
  USER_INITIALS: "LA",

  // ── 3. CONTABILIDADE ──────────────────────────────────────────────
  // Email do contabilista (pré-preenchido no ecrã de Envio)
  ACCOUNTANT_EMAIL: "dontasko.geral@gmail.com",

  // ── 4. CÂMARA ─────────────────────────────────────────────────────
  // Câmara a usar por defeito
  // "environment" = câmara traseira (recomendado para faturas)
  // "user"        = câmara frontal
  DEFAULT_CAMERA: "environment",

  // Resolução do scan (menor = mais rápido, maior = mais preciso)
  // Recomendado para Android: 640
  // Recomendado para iOS/desktop: 1280
  SCAN_WIDTH: 640,
  SCAN_HEIGHT: 480,

};
