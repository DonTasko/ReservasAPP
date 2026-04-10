/**
 * CONFIGURAÇÃO CENTRALIZADA - DON TASKO
 * 
 * ⚠️ IMPORTANTE: Este é o ÚNICO lugar onde precisa colar URLs e configurações!
 * Todos os arquivos HTML importam este ficheiro.
 * 
 * Agora com suporte para múltiplos Apps Scripts:
 *  - SCRIPT_MENUS → usado pelos menus e bebidas
 *  - SCRIPT_RESERVAS → usado pelo formulário de reservas e admin
 */

const CONFIG = {
  // ========== GOOGLE APPS SCRIPT URLS ==========
  // URL do Apps Script para MENUS e BEBIDAS
  SCRIPT_MENUS: "https://script.google.com/macros/s/AKfycbyXs375Md6xc04Qv5EqDombNKCcGzner3DHHbefAlnujoR4zxq3r3q40R1yMzURckop/exec",
  
  // URL do Apps Script para RESERVAS e ADMIN
  SCRIPT_RESERVAS: "https://script.google.com/macros/s/AKfycbyXs375Md6xc04Qv5EqDombNKCcGzner3DHHbefAlnujoR4zxq3r3q40R1yMzURckop/exec",
  
  // URL PRINCIPAL (para compatibilidade com código antigo)
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyXs375Md6xc04Qv5EqDombNKCcGzner3DHHbefAlnujoR4zxq3r3q40R1yMzURckop/exec",
  
  // ========== GOOGLE SHEETS CONFIG ==========
  // ID da Google Sheet (para menu e bebidas via API)
  SHEET_ID: "1xjJzNJvhLnoISLsP0qHNQ9HvqrEUZpxwbIdIjGsn3uA",
  
  // API Key do Google (para acesso público à Sheet)
  API_KEY: "AIzaSyDLIi7p9KpWhvZfPRbgtCfm-_eboLxqkik",
  
  // ========== INFO DA APLICAÇÃO ==========
  APP_NAME: "Don Tasko",
  VERSION: "4.5",
  
  // ========== CONFIGURAÇÕES OPCIONAIS ==========
  DEBUG: false, // Ativar logs detalhados no console
  CACHE_ENABLED: true // Usar cache de configurações
};

// ========== EXPORTAR PARA COMPATIBILIDADE ==========
// Para que o código existente continue a funcionar
const URL_SCRIPT = CONFIG.SCRIPT_RESERVAS;

// ========== FUNÇÃO AUXILIAR PARA API REQUESTS ==========
/**
 * Faz um request para o Google Apps Script correto
 * @param {string} action - Nome da ação (ex: 'getMenu', 'criarReserva')
 * @param {object} data - Dados adicionais para enviar
 * @param {string} endpoint - Qual script usar (SCRIPT_MENUS ou SCRIPT_RESERVAS)
 * @returns {Promise} Response JSON
 */
async function apiRequest(action, data = {}, endpoint = null) {
  try {
    // Se não especificar endpoint, usa o de reservas por padrão
    const scriptUrl = endpoint || CONFIG.SCRIPT_RESERVAS;
    
    if (CONFIG.DEBUG) {
      console.log(`📡 API Request: ${action}`, data, "→", scriptUrl);
    }
    
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action, ...data })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
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
console.log(`%c📡 Scripts configurados: MENUS + RESERVAS`, 'color: #3498db;');
console.log(`%c📊 Google Sheets ID: ${CONFIG.SHEET_ID.substring(0, 20)}...`, 'color: #95a5a6;');

if (CONFIG.DEBUG) {
  console.log('%c🔧 Modo DEBUG ativado', 'color: #f39c12; font-weight: bold;');
  console.log('CONFIG completo:', CONFIG);
}
