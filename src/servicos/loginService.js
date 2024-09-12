const urlBase = "http://localhost:4000/autenticacao";

export async function login(usuario, senha){
    const resposta = await fetch(urlBase + "/login", 
                                 { 
                                    method: "POST",
                                    credentials: 'include', 
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({usuario, senha})
                                });
    return await resposta.json();
}