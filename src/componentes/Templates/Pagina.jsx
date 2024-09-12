import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";
import Rodape from "./Rodape";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Sistema de controle Gerencial" />
                <Menu />
                {
                    props.children
                }
                <Rodape informacoes="Rua X, 123, Centro, Presidente Prudente/SP.   -   (18) 99999-9999   -    renatogoncalves@unoeste.edu.br" />
            </Container>
        </>

    );
}