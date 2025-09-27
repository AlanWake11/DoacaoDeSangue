import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://zyyrmedbihwyxmhgudvz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eXJtZWRiaWh3eXhtaGd1ZHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODYxMjgsImV4cCI6MjA3MTU2MjEyOH0.RZnBj4wjNbE3BsX15HW_hQZPncJp21Ns_3S29proWnA";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadRG(file) {
  // pega o usuário logado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    window.alert("Usuário não autenticado")
  }


  // define o caminho: rg/<user.id>/nome-do-arquivo.png
  const filePath = `${user.id}/${file.name}`

  const { data, error } = await supabase.storage
    .from("rg")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true // substitui caso já exista
    })

  if (error) {
    console.error("Erro no upload:", error.message)
    return null
  }

  console.log("Arquivo enviado:", data.path)
  return data.path
}


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

// Executa sempre ao carregar a página
verificarSessao();


export {uploadRG}
export {verificarSessao}