import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formularios/FormCadProduto";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { consultarTodos } from "../../servicos/produtoService";
import { ContextoUsuarioLogado } from "../../App";


export default function TelaCadastroProduto(props) {
    const [modoEdicao, setModoEdicao] = useState(false);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeProdutos, setListaDeProdutos] = useState([]);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        qtdEstoque: 0,
        dataValidade: "",
        categoria: {
            codigo: 0,
            descricao: ""
        }
    });
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            if (resposta.status) {
                setListaDeProdutos(resposta.listaProdutos);
            }
        })
    }, [exibirTabela, atualizarTela]); //willMount //willUpdate
   
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
                        <TabelaProdutos 
                            listaDeProdutos={listaDeProdutos} 
                            setExibirTabela={setExibirTabela} 
                            setProdutoSelecionado={setProdutoSelecionado}
                            produtoSelecionado={produtoSelecionado}
                            setModoEdicao={setModoEdicao}
                            setAtualizarTela={setAtualizarTela}
                            /> :
                        <FormCadProdutos 
                            setProdutoSelecionado={setProdutoSelecionado}
                            produtoSelecionado={produtoSelecionado}
                            setExibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao} />
                }
            </Pagina>
        </div>
    );

}