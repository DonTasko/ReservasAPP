/**
 * DON TASKO - CONFIGURAÇÃO CENTRAL v6.0
 * Configuração unificada para todo o sistema
 */

const CONFIG = {
  // URL do Apps Script (ÚNICO - todos os módulos estão integrados)
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyDWw0AJWMw2iLr7dFR8JwQpErC1gaOYgMKUHMeCr2fdXQVAVPJd-gMQGgwsFy4Wb-3/exec',
  
  // Informação da app
  APP_NAME: 'Don Tasko',
  VERSION: '6.0',
  
  // Debug
  DEBUG: true,
  
  // Cache
  CACHE_ENABLED: true,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
};

// ========== FUNÇÃO API COM CORS CORRIGIDO ==========
async function apiRequest(action, data = {}) {
  const url = CONFIG.SCRIPT_URL;
  
  try {
    if (CONFIG.DEBUG) {
      console.log(`📤 API Request [${action}]:`, data);
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...data }),
      mode: 'cors', // IMPORTANTE: modo CORS
      redirect: 'follow'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (CONFIG.DEBUG) {
      console.log(`📥 API Response [${action}]:`, result);
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Erro na API [${action}]:`, error);
    
    // Mensagem de erro amigável
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
    
    throw error;
  }
}

// ========== CACHE SIMPLES ==========
const cache = {
  data: {},
  
  set(key, value, duration = CONFIG.CACHE_DURATION) {
    if (!CONFIG.CACHE_ENABLED) return;
    
    this.data[key] = {
      value: value,
      expiry: Date.now() + duration
    };
  },
  
  get(key) {
    if (!CONFIG.CACHE_ENABLED) return null;
    
    const item = this.data[key];
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      delete this.data[key];
      return null;
    }
    
    return item.value;
  },
  
  clear() {
    this.data = {};
  }
};

// ========== HELPERS ==========
function formatarData(data) {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleDateString('pt-PT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
}

function formatarDataISO(data) {
  if (!data) return '';
  const d = new Date(data);
  return d.toISOString().split('T')[0];
}

function formatarHora(hora) {
  if (!hora) return '';
  return hora.substring(0, 5); // HH:MM
}

function mostrarErro(mensagem, container = 'body') {
  const div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;';
  div.innerHTML = `
    <strong>❌ Erro:</strong> ${mensagem}
    <button type="button" class="close" onclick="this.parentElement.remove()">
      <span>&times;</span>
    </button>
  `;
  document.querySelector(container).appendChild(div);
  
  setTimeout(() => div.remove(), 5000);
}

function mostrarSucesso(mensagem, container = 'body') {
  const div = document.createElement('div');
  div.className = 'alert alert-success';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;';
  div.innerHTML = `
    <strong>✅ Sucesso:</strong> ${mensagem}
    <button type="button" class="close" onclick="this.parentElement.remove()">
      <span>&times;</span>
    </button>
  `;
  document.querySelector(container).appendChild(div);
  
  setTimeout(() => div.remove(), 3000);
}

// ========== LOG DE INICIALIZAÇÃO ==========
if (CONFIG.DEBUG) {
  console.log(`✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION}`);
  console.log(`📡 API URL: ${CONFIG.SCRIPT_URL}`);
}
