const urlBase = "http://localhost:4000/categoria";

export async function gravar(categoria, token) {
    const resposta = await fetch(urlBase,
        {
            method: "POST",
            headers: { 
                        "Content-Type": "application/json",
                        "Authorization": token
                     },
            body: JSON.stringify(categoria)
        });
    return await resposta.json();
}

export async function alterar(categoria, token) {
    const resposta = await fetch(urlBase,
        {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
             },
            body: JSON.stringify(categoria)
        });
    return await resposta.json();
}

export async function excluir(categoria, token) {
    const resposta = await fetch(urlBase,
        {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
             },
            body: JSON.stringify(categoria)
        });
    return await resposta.json();
}

export async function consultarTodos(token) {
    const resposta = await fetch(urlBase, 
        {
            method: "GET",
            headers: { 
                "Access-Control-Allow-Origin":"http://localhost:3000",
                "Authorization": token
             },
        });
    return await resposta.json();
}