/**
 * DON TASKO v6.1 - CORS FIX
 * Usa GET para evitar CORS preflight
 */

const CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbweDS9LFFklFnLwpqTuTZGaMe33eVuJzZV2WkFlv1GIcF566cy5Qv-XGBbX90POMBuC/exec',
  APP_NAME: 'Don Tasko',
  VERSION: '6.1',
  DEBUG: true,
  CACHE_ENABLED: true,
  CACHE_DURATION: 5 * 60 * 1000,
};

// ========== API REQUEST (GET SIMPLES - SEM CORS PREFLIGHT) ==========
async function apiRequest(action, data = {}) {
  try {
    if (CONFIG.DEBUG) {
      console.log(`📤 API Request [${action}]:`, data);
    }
    
    // Construir URL com parâmetros
    const params = new URLSearchParams({ action, ...data });
    const url = `${CONFIG.SCRIPT_URL}?${params.toString()}`;
    
    if (CONFIG.DEBUG) {
      console.log(`🔗 URL: ${url}`);
    }
    
    // USAR GET EM VEZ DE POST (evita CORS preflight)
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (CONFIG.DEBUG) {
      console.log(`📥 API Response [${action}]:`, result);
    }
    
    return result;
    
  } catch (error) {
    console.error(`❌ Erro na API [${action}]:`, error);
    
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
    
    throw error;
  }
}

// ========== API REQUEST PARA POST (dados grandes) ==========
async function apiRequestPOST(action, data = {}) {
  try {
    if (CONFIG.DEBUG) {
      console.log(`📤 API POST [${action}]:`, data);
    }
    
    const response = await fetch(CONFIG.SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action, ...data }),
      redirect: 'follow'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    if (CONFIG.DEBUG) {
      console.log(`📥 API Response [${action}]:`, result);
    }
    
    return result;
    
  } catch (error) {
    console.error(`❌ Erro POST [${action}]:`, error);
    throw error;
  }
}

// ========== CACHE ==========
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
    day: '2-digit', month: '2-digit', year: 'numeric' 
  });
}

function formatarDataISO(data) {
  if (!data) return '';
  const d = new Date(data);
  return d.toISOString().split('T')[0];
}

function formatarHora(hora) {
  if (!hora) return '';
  return hora.substring(0, 5);
}

function mostrarErro(mensagem) {
  const div = document.createElement('div');
  div.className = 'alert alert-danger alert-dismissible fade show';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;';
  div.innerHTML = `
    <strong>❌ Erro:</strong> ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

function mostrarSucesso(mensagem) {
  const div = document.createElement('div');
  div.className = 'alert alert-success alert-dismissible fade show';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;';
  div.innerHTML = `
    <strong>✅ Sucesso:</strong> ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// ========== INIT ==========
if (CONFIG.DEBUG) {
  console.log(`✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION}`);
  console.log(`📡 API URL: ${CONFIG.SCRIPT_URL}`);
}
