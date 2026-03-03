/**
 * CONFIGURAÇÃO CENTRALIZADA - DON TASKO
 * 
 * IMPORTANTE: Este é o ÚNICO lugar onde precisa colar o URL do script!
 * Todos os arquivos HTML importam este ficheiro.
 * 
 * Como usar:
 * 1. Cole o URL do Google Apps Script abaixo
 * 2. Faça commit no GitHub
 * 3. Todos os HTML vão usar automaticamente o novo URL
 */

const CONFIG = {
  // ========== COLE O URL DO GOOGLE APPS SCRIPT AQUI ==========
  SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwLWYOiyK_1KXoVXiwSh4pFFHgMS44yAQr_1nW6fRcdHo91PtUykxfpo8LmLDw4QCo/exec",
  
  // Outras configurações que podem ser úteis
  APP_NAME: "Don Tasko",
  VERSION: "4.4",
  
  // Google Sheets IDs (opcional)
  SHEET_ID: "1xjJzNJvhLnoISLsP0qHNQ9HvqrEUZpxwbIdIjGsn3uA",
  API_KEY: "AIzaSyBNw0g2aBy2vyKfCCvApwrkbiLyeR7vqbI"
};

// Exportar URL_SCRIPT para compatibilidade com código existente
const URL_SCRIPT = CONFIG.SCRIPT_URL;

// Função auxiliar para fazer requests (opcional, mas útil)
async function apiRequest(action, data = {}) {
  try {
    const response = await fetch(CONFIG.SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action, ...data })
    });
    return await response.json();
  } catch (error) {
    console.error(`Erro na API (${action}):`, error);
    throw error;
  }
}

// Log de inicialização
console.log(`✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION} - Config carregado`);
console.log(`📡 Script URL: ${CONFIG.SCRIPT_URL.substring(0, 50)}...`);
