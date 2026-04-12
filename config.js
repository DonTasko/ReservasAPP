/**
 * DON TASKO - CONFIGURAÇÃO CENTRAL
 * Versão 6.0 - Final
 */

const CONFIG = {
    // URL do Google Apps Script (NÃO ALTERAR - já está correto)
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyDWw0AJWMw2iLr7dFR8JwQpErC1gaOYgMKUHMeCr2fdXQVAVPJd-gMQGgwsFy4Wb-3/exec",
    
    // Informações da aplicação
    APP_NAME: "Don Tasko",
    VERSION: "6.0",
    
    // Configurações
    DEBUG: true,
    CACHE_ENABLED: true
};

// Para compatibilidade com código antigo
const URL_SCRIPT = CONFIG.SCRIPT_URL;

// Função auxiliar para requisições à API
async function apiRequest(action, data = {}) {
    try {
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, ...data })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const result = await response.json();
        
        if (CONFIG.DEBUG) {
            console.log(`📡 API [${action}]:`, result);
        }
        
        return result;
    } catch (error) {
        console.error(`❌ Erro na API [${action}]:`, error);
        throw error;
    }
}

// Log de inicialização
console.log(`✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION}`);
console.log(`📡 API URL: ${CONFIG.SCRIPT_URL}`);
