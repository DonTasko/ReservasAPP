# 🍽️ Sistema de Gestão de Reservas para Restaurantes

Solução completa e automatizada para gestão de reservas (almoço/jantar), integrada com **Google Sheets** (Base de dados), **Google Calendar** (Agenda) e **Gmail** (Confirmações). 

Desenvolvido para ser leve, responsivo e de custo zero de manutenção através do ecossistema Google Apps Script.

## ✨ Funcionalidades

- **Reserva Inteligente:** Atribuição automática de mesas baseada na configuração do espaço.
- **Proteção de Mesa Especial:** Lógica configurada para manter a **Mesa 9** disponível até última necessidade.
- **Gestão de Grupos:** Bloqueio automático para grupos > 8 pessoas, redirecionando para WhatsApp.
- **Painel Administrativo:** Acesso via password para visualização de reservas e dashboard de ocupação.
- **Dashboard Visual:** Gráfico de ocupação por turno para os próximos 7 dias.
- **Notificações:** Envio automático de e-mails com política de tolerância de 15 minutos.
- **Mobile First:** Interface otimizada para telemóveis e desktop.

## 🚀 Como Instalar

### 1. Preparar a Google Sheet
1. Crie uma nova folha de cálculo no Google Sheets.
2. No menu superior, vá a **Extensões > Apps Script**.
3. Apague o código padrão e cole o conteúdo do ficheiro `src/Code.gs` (e outros módulos presentes neste repo).

### 2. Configuração Inicial
1. No editor do Apps Script, selecione a função `setupSistema` e clique em **Executar**. 
   - Isto criará as abas `Config`, `Mesas` e `Reservas` automaticamente.
2. Na aba **Config** da sua folha de cálculo, preencha:
   - `ADMIN_PASSWORD`: A sua senha de acesso.
   - `WHATSAPP_URL`: O link direto para o seu número.
   - `CALENDAR_ID`: O e-mail do calendário onde as reservas devem aparecer.

### 3. Personalização
- Substitua o ficheiro `assets/logo.png` pelo logótipo do seu restaurante.
- Se usar o Google Apps Script direto, coloque o link da imagem na aba **Config**.

### 4. Publicação
1. No editor do Apps Script, clique em **Implementar > Nova Implementação**.
2. Tipo: **Aplicação Web**.
3. Quem pode aceder: **Qualquer pessoa**.
4. Copie o URL gerado — este é o link do seu sistema de reservas!

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Variáveis modernas), JavaScript (Vanilla).
- **Backend:** Google Apps Script (JavaScript V8).
- **Base de Dados:** Google Sheets API.
- **Integrações:** Google Calendar API, Gmail Service, Google Charts.

## 📐 Lógica de Atribuição de Mesas

O sistema utiliza um algoritmo de prioridade:
1. Encaixe exato por capacidade.
2. Divisão de mesas de 4 em 2 lugares se necessário.
3. Agrupamento de mesas para grupos até 8 pessoas.
4. **Regra de Ouro:** A Mesa 9 só é atribuída se a lotação for > 90%.

---
Desenvolvido com foco em eficiência operacional.