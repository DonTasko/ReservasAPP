/**
 * DON TASKO v7.0 - JSONP (SEM CORS)
 * Configuração unificada
 */

const CONFIG = {
  SCRIPT_URL: 'COLE_AQUI_O_URL_DO_APPS_SCRIPT_DEPOIS_DE_IMPLEMENTAR',
  APP_NAME: 'Don Tasko',
  VERSION: '7.0',
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
      console.log(`📤 JSONP [${action}]:`, data);
    }
    
    // Timeout
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Timeout: servidor não respondeu'));
    }, 30000);
    
    // Callback global
    window[callbackName] = (response) => {
      cleanup();
      
      if (CONFIG.DEBUG) {
        console.log(`📥 Response [${action}]:`, response);
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

function mostrarErro(mensagem) {
  const div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;animation:slideIn 0.3s;box-shadow:0 8px 24px rgba(0,0,0,0.2);';
  div.innerHTML = `
    <strong>❌ Erro:</strong> ${mensagem}
    <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

function mostrarSucesso(mensagem) {
  const div = document.createElement('div');
  div.className = 'alert alert-success';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;animation:slideIn 0.3s;box-shadow:0 8px 24px rgba(0,0,0,0.2);';
  div.innerHTML = `
    <strong>✅ Sucesso:</strong> ${mensagem}
    <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

function mostrarLoading(show = true) {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = show ? 'flex' : 'none';
  }
}

if (CONFIG.DEBUG) {
  console.log(`✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION} - JSONP`);
}
