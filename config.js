/**
 * DON TASKO v6.2 - JSONP
 * SEM CORS, SEM FETCH
 */

const CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzX14WZe7GxcSf17lWyffniher2tmpTd_RTaZhYkZmvlcvg5RMwId7PIV80FneIrDOH/exec',
  APP_NAME: 'Don Tasko',
  VERSION: '6.2',
  DEBUG: true,
  CACHE_ENABLED: true,
  CACHE_DURATION: 5 * 60 * 1000,
};

// ========== JSONP (SEM CORS) ==========
let jsonpCounter = 0;

function apiRequest(action, data = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${++jsonpCounter}`;
    
    // Criar parâmetros
    const params = new URLSearchParams({ action, callback: callbackName, ...data });
    const url = `${CONFIG.SCRIPT_URL}?${params.toString()}`;
    
    if (CONFIG.DEBUG) {
      console.log(`📤 JSONP Request [${action}]:`, data);
      console.log(`🔗 URL: ${url}`);
    }
    
    // Timeout
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout: servidor não respondeu'));
    }, 30000); // 30 segundos
    
    // Callback global
    window[callbackName] = (response) => {
      cleanup();
      
      if (CONFIG.DEBUG) {
        console.log(`📥 JSONP Response [${action}]:`, response);
      }
      
      resolve(response);
    };
    
    // Cleanup
    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }
    
    // Criar script tag
    const script = document.createElement('script');
    script.src = url;
    script.onerror = () => {
      cleanup();
      reject(new Error('Erro ao carregar script'));
    };
    
    document.head.appendChild(script);
  });
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
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
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
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
  div.innerHTML = `
    <strong>✅ Sucesso:</strong> ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// ========== LOADING ==========
function mostrarLoading(show = true) {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = show ? 'flex' : 'none';
  }
}

// ========== INIT ==========
if (CONFIG.DEBUG) {
  console.log(`✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION} - JSONP Mode`);
  console.log(`📡 API URL: ${CONFIG.SCRIPT_URL}`);
}
