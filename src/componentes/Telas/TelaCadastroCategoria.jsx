import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
import { consultarTodos } from "../../servicos/categoriaService";
import { ContextoUsuarioLogado } from "../../App";
export default function TelaCadastroCategoria(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState({ codigo: 0, descricao: "" });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaDeCategorias, setListaDeCategorias] = useState([]);
    
    useEffect(() => {
        consultarTodos(contextoUsuario.usuarioLogado.token).then((resposta) => {
            if (resposta.status){
                setListaDeCategorias(resposta.listaCategorias);
            }
            else{
                alert(resposta.mensagem);
            }
        })
    }, [listaDeCategorias]);

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categorias
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias listaDeCategorias={listaDeCategorias} 
                                          setExibirTabela={setExibirTabela} 
                                          categoriaSelecionada={categoriaSelecionada}
                                          setCategoriaSelecionada={setCategoriaSelecionada}
                                          setModoEdicao={setModoEdicao}/> :
                        <FormCadCategorias setExibirTabela={setExibirTabela}
                                           categoriaSelecionada={categoriaSelecionada}
                                           setCategoriaSelecionada={setCategoriaSelecionada}
                                           setModoEdicao={setModoEdicao} 
                                           modoEdicao={modoEdicao}/>
                }
            </Pagina>
        </div>
    );
}