import Pagina from "../Templates/Pagina";
import FormCadVenda from "./Formularios/FormCadVenda";
import TabelaVendas from "./Tabelas/TabelaVendas";
import { useState } from "react";

export default function TelaVenda(props){

    const [exibirTabela, setExibirTabela] = useState(true);

    return (
        <Pagina>
            <h1 className=" mb-02 text-center">Gestão de Vendas</h1>
            {
                exibirTabela ? 
                <TabelaVendas exibirTabela={exibirTabela} setExibirTabela={setExibirTabela}/> 
                : 
                <FormCadVenda exibirTabela={exibirTabela} setExibirTabela={setExibirTabela}/>
            }
        </Pagina>
    );
        
}