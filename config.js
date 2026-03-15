/**
 * CONFIGURAÇÃO CENTRALIZADA - DON TASKO
 * 
 * ⚠️ IMPORTANTE: Este é o ÚNICO lugar onde precisa colar URLs e configurações!
 * Todos os arquivos HTML importam este ficheiro.
 * 
 * Como usar:
 * 1. Cole o URL do Google Apps Script abaixo (SCRIPT_URL)
 * 2. Verifique o SHEET_ID e API_KEY do Google Sheets
 * 3. Faça commit no GitHub
 * 4. Todos os HTML vão usar automaticamente as novas configurações
 * 
 * ✅ Quando fizer nova implementação no Apps Script:
 *    - Copie o novo URL
 *    - Cole em SCRIPT_URL abaixo
 *    - Commit + Push
 *    - Pronto! Todos os ficheiros atualizam automaticamente
 */

const CONFIG = {
  // ========== GOOGLE APPS SCRIPT URL ==========
  // Cole aqui o URL da implementação do Google Apps Script
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwXoIQQ1wGv7JV0NvFV4v2QFSi3b2q5l7j-WW4QAHEOyJZIta_geraZRAPJLdrs0xI/exec",
  
  // ========== GOOGLE SHEETS CONFIG ==========
  // ID da Google Sheet (para menu e bebidas)
  SHEET_ID: "1xjJzNJvhLnoISLsP0qHNQ9HvqrEUZpxwbIdIjGsn3uA",
  
  // API Key do Google (para acesso público à Sheet)
  API_KEY: "AIzaSyBNw0g2aBy2vyKfCCvApwrkbiLyeR7vqbI",
  
  // ========== INFO DA APLICAÇÃO ==========
  APP_NAME: "Don Tasko",
  VERSION: "4.4",
  
  // ========== CONFIGURAÇÕES OPCIONAIS ==========
  DEBUG: false, // Ativar logs detalhados no console
  CACHE_ENABLED: true // Usar cache de configurações
};

// ========== EXPORTAR PARA COMPATIBILIDADE ==========
// Para que o código existente continue a funcionar
const URL_SCRIPT = CONFIG.SCRIPT_URL;

// ========== FUNÇÃO AUXILIAR PARA API REQUESTS ==========
/**
 * Faz um request para o Google Apps Script
 * @param {string} action - Nome da ação (ex: 'getConfigs', 'listarReservas')
 * @param {object} data - Dados adicionais para enviar
 * @returns {Promise} Response JSON
 */
async function apiRequest(action, data = {}) {
  try {
    if (CONFIG.DEBUG) {
      console.log(`📡 API Request: ${action}`, data);
    }
    
    const response = await fetch(CONFIG.SCRIPT_URL, {
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
console.log(`%c✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION}`, 'color: #27ae60; font-weight: bold; font-size: 14px;');
console.log(`%c📡 Script URL configurado`, 'color: #3498db;');
console.log(`%c📊 Google Sheets ID: ${CONFIG.SHEET_ID.substring(0, 20)}...`, 'color: #95a5a6;');

if (CONFIG.DEBUG) {
  console.log('%c🔧 Modo DEBUG ativado', 'color: #f39c12; font-weight: bold;');
  console.log('CONFIG completo:', CONFIG);
}
