/**
 * DON TASKO - config-supabase.js
 * Drop-in replacement for config.js usando Supabase REST API
 * Mantém a mesma interface: apiRequest(action, data)
 */

const CONFIG = {
  SUPABASE_URL: 'https://pqrqxvpzxqwblhxtmdns.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcnF4dnB6eHF3YmxoeHRtZG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MzA1OTEsImV4cCI6MjA4NTAwNjU5MX0.84XwHtn3XLph28DOHFEaM8pFZL_dvT60pSo8mOCaJkY',
  RESTAURANTE_ID: '04270fa5-28ce-4813-9735-1433375b5d68',
  APP_NAME: 'Don Tasko',
  VERSION: '8.0',
  DEBUG: false,
};

// ========== SUPABASE REST HELPER ==========
async function sbFetch(path, options = {}) {
  const url = `${CONFIG.SUPABASE_URL}/rest/v1/${path}`;
  const headers = {
    'apikey': CONFIG.SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': options.prefer || 'return=representation',
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error ${res.status}: ${err}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ========== MAPEAMENTO DE ACTIONS ==========
async function apiRequest(action, data = {}) {
  if (CONFIG.DEBUG) console.log(`📤 [${action}]`, data);

  // ── getConfigReservas ──────────────────────────────────────────────────────
  if (action === 'getConfigReservas') {
    const rows = await sbFetch(
      `configs?restaurante_id=eq.${CONFIG.RESTAURANTE_ID}&select=*`,
      { method: 'GET', prefer: '' }
    );
    if (!rows || rows.length === 0) return { status: 'error', message: 'Config não encontrada' };

    const c = rows[0];

    // Montar estrutura esperada pelo reservas.html
    // configReservas.dias.{segunda,...} = { aberto, almocoRestIni, almocoRestFim, almocoIni, almocoFim, jantarIni, jantarFim, maxPax, intervalo }
    // configReservas.motivoFechoSemanal
    // configReservas.maxConvidados

    const DIAS_SEMANA = ['domingo','segunda','terca','quarta','quinta','sexta','sabado'];
    const fechoSemanal = Array.isArray(c.fecho_semanal) ? c.fecho_semanal : [];
    const diasConfig = c.dias || {};

    // Construir objeto dias com defaults
    const diasObj = {};
    DIAS_SEMANA.forEach(dia => {
      const aberto = !fechoSemanal.includes(dia) ? 'SIM' : 'NÃO';
      const diaCustom = diasConfig[dia] || {};
      diasObj[dia] = {
        aberto,
        almocoRestIni:   diaCustom.almocoRestIni   || diaCustom.almocoIni   || '12:00',
        almocoRestFim:   diaCustom.almocoRestFim   || diaCustom.almocoFim   || '15:00',
        almocoIni:       diaCustom.almocoIni       || '12:00',
        almocoFim:       diaCustom.almocoFim       || '14:00',
        jantarIni:       diaCustom.jantarIni       || '20:00',
        jantarFim:       diaCustom.jantarFim       || '23:30',
        maxPax:          diaCustom.maxPax          || c.lotacao_max || 24,
        intervalo:       diaCustom.intervalo       || 30,
        ...diaCustom,
        aberto, // garantir aberto após spread
      };
    });

    const config = {
      dias: diasObj,
      maxConvidados: c.max_convidados || 6,
      lotacaoMaxima: c.lotacao_max || 24,
      motivoFechoSemanal: c.motivo_fecho_semanal || 'Encerrado',
    };

    if (CONFIG.DEBUG) console.log('📥 getConfigReservas:', config);
    return { status: 'success', config };
  }

  // ── getDiasFechados ────────────────────────────────────────────────────────
  if (action === 'getDiasFechados') {
    const rows = await sbFetch(
      `configs?restaurante_id=eq.${CONFIG.RESTAURANTE_ID}&select=fecho_semanal,datas_fecho`,
      { method: 'GET', prefer: '' }
    );
    if (!rows || rows.length === 0) return [];

    const c = rows[0];
    const dias = [];

    // Dias de fecho semanal como strings (ex: "segunda")
    if (Array.isArray(c.fecho_semanal)) {
      dias.push(...c.fecho_semanal);
    }

    // Datas específicas de fecho (ISO date strings)
    if (Array.isArray(c.datas_fecho)) {
      dias.push(...c.datas_fecho);
    }

    if (CONFIG.DEBUG) console.log('📥 getDiasFechados:', dias);
    return dias;
  }

  // ── reservaSite ───────────────────────────────────────────────────────────
  if (action === 'reservaSite') {
    const payload = {
      restaurante_id:   CONFIG.RESTAURANTE_ID,
      cliente_nome:     data.nome,
      cliente_email:    data.email      || null,
      cliente_telemovel: data.telemovel || null,
      data_reserva:     data.data,
      hora_reserva:     data.horario,
      pax:              parseInt(data.pax) || 1,
      status:           'pendente',
      detalhes:         data.obs ? { obs: data.obs } : null,
    };

    await sbFetch('reservas', {
      method: 'POST',
      body: JSON.stringify(payload),
      prefer: 'return=minimal',
    });

    if (CONFIG.DEBUG) console.log('📥 reservaSite: ok');
    return { status: 'success', message: 'Reserva registada com sucesso.' };
  }

  throw new Error(`Ação desconhecida: ${action}`);
}

// ========== HELPERS (mesmos do config.js) ==========
function formatarData(data) {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatarDataISO(data) {
  if (!data) return '';
  const d = new Date(data);
  return d.toISOString().split('T')[0];
}

function mostrarErro(mensagem) {
  const div = document.createElement('div');
  div.className = 'alert alert-danger';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;box-shadow:0 8px 24px rgba(0,0,0,0.2);';
  div.innerHTML = `<strong>❌ Erro:</strong> ${mensagem}
    <button type="button" onclick="this.parentElement.remove()" style="float:right;background:none;border:none;cursor:pointer;color:inherit;">✕</button>`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

function mostrarSucesso(mensagem) {
  const div = document.createElement('div');
  div.className = 'alert alert-success';
  div.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;max-width:400px;box-shadow:0 8px 24px rgba(0,0,0,0.2);';
  div.innerHTML = `<strong>✅ Sucesso:</strong> ${mensagem}
    <button type="button" onclick="this.parentElement.remove()" style="float:right;background:none;border:none;cursor:pointer;color:inherit;">✕</button>`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

if (CONFIG.DEBUG) console.log(`✅ ${CONFIG.APP_NAME} v${CONFIG.VERSION} - Supabase`);
