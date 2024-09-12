import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formularios/FormCadProduto";
import Pagina from "../Templates/Pagina";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";


export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);

   
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
                        <TabelaProdutos listaDeProdutos={[]} setExibirTabela={setExibirTabela} /> :
                        <FormCadProdutos setExibirTabela={setExibirTabela} />
                }
            </Pagina>
        </div>
    );

}