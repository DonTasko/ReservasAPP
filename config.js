/**
 * CONFIGURAÇÃO CENTRALIZADA - DON TASKO
 * 
 * Agora com suporte para múltiplos Apps Scripts:
 *  - SCRIPT_MENUS → usado pelos menus e bebidas
 *  - SCRIPT_RESERVAS → usado pelo formulário de reservas
 */

const CONFIG = {
  // ========== GOOGLE APPS SCRIPT URL ==========
  // URL do Apps Script para MENUS
  SCRIPT_MENUS: "https://script.google.com/macros/s/AKfycbwXoIQQ1wGv7JV0NvFV4v2QFSi3b2q5l7j-WW4QAHEOyJZIta_geraZRAPJLdrs0xI/exec",

  // URL do Apps Script para RESERVAS
  SCRIPT_RESERVAS: "https://script.google.com/macros/s/AKfycbxpq1IjemVgcl30NKu1SW6wODzuEhN-Jk8BXBxcsxY36zj_BZSC-0sX6cjNom3ZCoo-/exec",

  // ========== GOOGLE SHEETS CONFIG ==========
  SHEET_ID: "1xjJzNJvhLnoISLsP0qHNQ9HvqrEUZpxwbIdIjGsn3uA",
  API_KEY: "AIzaSyDLIi7p9KpWhvZfPRbgtCfm-_eboLxqkik",

  // ========== INFO DA APLICAÇÃO ==========
  APP_NAME: "Don Tasko",
  VERSION: "4.5",

  // ========== CONFIGURAÇÕES OPCIONAIS ==========
  DEBUG: false,
  CACHE_ENABLED: true
};

// ========== FUNÇÃO AUXILIAR PARA API REQUESTS ==========
/**
 * Faz um request para o Google Apps Script correto
 * @param {string} action - Nome da ação (ex: 'getMenu', 'criarReserva')
 * @param {object} data - Dados adicionais
 * @param {string} endpoint - Qual script usar (menus ou reservas)
 * @returns {Promise} JSON
 */
async function apiRequest(action, data = {}, endpoint = CONFIG.SCRIPT_MENUS) {
  try {
    if (CONFIG.DEBUG) {
      console.log(`📡 API Request: ${action}`, data, "→", endpoint);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ action, ...data })
    });

    const result = await response.json();

    if (CONFIG.DEBUG) {
      console.log(`✅ API Response: ${action}`, result);
    }

    return result;
  } catch (error) {
    console.error(`❌ Erro na API (${action}):`, error);
    throw error;
  }
}

// ========== LOG DE INICIALIZAÇÃO ==========
console.log(`%c${CONFIG.APP_NAME} v${CONFIG.VERSION} iniciado`, 'color: #27ae60; font-weight: bold;');
console.log(`%c📡 Scripts configurados: MENUS + RESERVAS`, 'color: #3498db;');
