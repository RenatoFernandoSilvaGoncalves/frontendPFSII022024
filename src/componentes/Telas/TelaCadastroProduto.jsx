import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formularios/FormCadProduto";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { consultarTodos } from "../../servicos/produtoService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroProduto(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        categoria: {
            codigo: 0,
            descricao: ""
        },
        urlImagem: "",
        qtdEstoque: 0,
        dataValidade: "",
    });
    const [listaDeProdutos, setListaDeProdutos] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            setListaDeProdutos(resposta.listaProdutos);
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [atualizarTela, exibirTabela]);
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Produto
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaDeProdutos={listaDeProdutos} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setProdutoSelecionado={setProdutoSelecionado} 
                                        setAtualizarTela={setAtualizarTela}/> :
                        <FormCadProdutos setExibirTabela={setExibirTabela}
                                         setModoEdicao={setModoEdicao}
                                         modoEdicao={modoEdicao}
                                         setProdutoSelecionado={setProdutoSelecionado}
                                         produtoSelecionado={produtoSelecionado}
                                         setAtualizarTela={setAtualizarTela} />
                }
            </Pagina>
        </div>
    );

}