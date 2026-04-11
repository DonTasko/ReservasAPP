/**
 * CONFIGURAÇÃO CENTRALIZADA - DON TASKO
 */

const CONFIG = {
  // ========== GOOGLE APPS SCRIPT URLS ==========
  // URL direta do Apps Script (mantida para referência)
  SCRIPT_MENUS_DIRECT: "https://script.google.com/macros/s/AKfycbykmTu-gk-_EhWpbIaDsoWk4jAcPJeKIMZufLQjaBtVKyVBEn8w6acC0mbLMIU9WqEU/exec",
  
  // URL do PROXY PHP (para resolver CORS) - IMPORTANTE: use o caminho correto do seu servidor
  // SCRIPT_RESERVAS: "/proxy.php",  // se estiver na mesma pasta que o HTML
  // SCRIPT_RESERVAS: "https://dontasko.pt/proxy.php",  // alternativa com URL completo
  SCRIPT_RESERVAS: "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbykmTu-gk-_EhWpbIaDsoWk4jAcPJeKIMZufLQjaBtVKyVBEn8w6acC0mbLMIU9WqEU/exec",
  // URL PRINCIPAL (aponta para o proxy)
  SCRIPT_URL: "https://dontasko.pt/proxy.php",
  
  // ========== GOOGLE SHEETS CONFIG ==========
  SHEET_ID: "1xjJzNJvhLnoISLsP0qHNQ9HvqrEUZpxwbIdIjGsn3uA",
  API_KEY: "AIzaSyDLIi7p9KpWhvZfPRbgtCfm-_eboLxqkik",
  
  // ========== INFO DA APLICAÇÃO ==========
  APP_NAME: "Don Tasko",
  VERSION: "4.5",
  
  DEBUG: true,  // Ative para ver logs detalhados
  CACHE_ENABLED: true
};

// Para compatibilidade com código antigo
const URL_SCRIPT = CONFIG.SCRIPT_RESERVAS;

// Função auxiliar (substitui a anterior para funcionar com proxy)
async function apiRequest(action, data = {}, endpoint = null) {
  try {
    const scriptUrl = endpoint || CONFIG.SCRIPT_RESERVAS;
    if (CONFIG.DEBUG) console.log(`📡 API Request: ${action}`, data, "→", scriptUrl);
    
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...data })
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    if (CONFIG.DEBUG) console.log(`✅ API Response: ${action}`, result);
    return result;
  } catch (error) {
    console.error(`❌ Erro na API (${action}):`, error);
    throw error;
  }
}

console.log(`%c✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION} - Modo Proxy`, 'color: #27ae60; font-weight: bold;');
console.log(`%c📡 Scripts configurados: MENUS (direto) | RESERVAS (proxy)`, 'color: #3498db;');
