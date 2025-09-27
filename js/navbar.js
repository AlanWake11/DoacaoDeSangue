// js/navbar.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zyyrmedbihwyxmhgudvz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eXJtZWRiaWh3eXhtaGd1ZHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODYxMjgsImV4cCI6MjA3MTU2MjEyOH0.RZnBj4wjNbE3BsX15HW_hQZPncJp21Ns_3S29proWnA"; // sua key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * tenta atualizar o botão (retorna Promise<boolean> indicando se o botão já existia)
 */
async function updateAuthButton() {
  const authBtn = document.getElementById("auth-btn");
  if (!authBtn) {
    // ainda não injetaram o navbar no DOM
    return false;
  }

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) console.warn("supabase.getSession erro:", error);

    if (data?.session) {
      authBtn.textContent = "Conta";
      authBtn.onclick = () => (window.location.href = "./perfil.html");
    } else {
      authBtn.textContent = "Login";
      authBtn.onclick = () => (window.location.href = "./login.html");
    }

    // opcional: acessibilidade
    authBtn.setAttribute("aria-pressed", data?.session ? "true" : "false");

    return true;
  } catch (err) {
    console.error("updateAuthButton falhou:", err);
    return false;
  }
}

/**
 * garante que updateAuthButton seja executado assim que #auth-btn aparecer
 * (usa updateAuthButton primeiro — se não encontrar, usa MutationObserver como fallback)
 */
function ensureAuthButtonReady(timeoutMs = 7000) {
  // tenta imediatamente
  updateAuthButton().then(found => {
    if (found) return;

    // fallback: observa inserções no DOM até encontrar o #auth-btn
    const root = document.documentElement || document.body;
    const obs = new MutationObserver((mutations, observer) => {
      if (document.getElementById("auth-btn")) {
        observer.disconnect();
        updateAuthButton();
      }
    });

    obs.observe(root, { childList: true, subtree: true });

    // safety: desconecta após timeout
    setTimeout(() => obs.disconnect(), timeoutMs);
  });
}

// executa assim que o módulo carregar / DOM estiver pronto
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    ensureAuthButtonReady();
  });
} else {
  // DOM já pronto
  ensureAuthButtonReady();
}

// garante atualização quando usuário volta/avança no histórico (bfcache)
window.addEventListener("pageshow", (ev) => {
  // pageshow acontece também em navegação normal — chamamos o ensure
  ensureAuthButtonReady();
});

// quando aba volta a ficar visível (ex: ao trocar de aba)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") ensureAuthButtonReady();
});

// reage a mudanças de autenticação (login/logout)
supabase.auth.onAuthStateChange((_event, session) => {
  // atualiza o botão (pode ainda estar ausente, mas ensure cuida disso)
  ensureAuthButtonReady();
});

/* DEBUG helpers — descomente se quiser logs extras
setInterval(async () => {
  console.log('auth-btn exists?', !!document.getElementById('auth-btn'));
  const s = await supabase.auth.getSession();
  console.log('session:', s);
}, 5000);
*/
