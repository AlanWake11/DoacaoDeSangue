import { supabase } from "./js/supabaseClient.js";

async function verificarSessao() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // Usuário não logado → redireciona para login
        window.location.href = "login.html";
    } else {
        console.log("Usuário logado:", session.user);
        // Aqui você pode buscar os dados extras da tabela usuarios
        // Exemplo:
        const { data: usuario } = await supabase
            .from("usuarios")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

        console.log("Dados completos:", usuario);
    }
}

// Disponibiliza no escopo global para uso em outros scripts ou no console
window.verificarSessao = verificarSessao;