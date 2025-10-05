

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