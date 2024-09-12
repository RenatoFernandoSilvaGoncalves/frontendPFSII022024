import { Button, Container, Table } from "react-bootstrap";

export default function TabelaCategorias(props) {
    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary"
                    onClick={() => {
                        props.setExibirTabela(false);
                    }}>
                    Adicionar
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        {
                            props?.listaDeCategorias?.map((categoria) => {
                                return (
                                    <tr key={categoria.codigo}>
                                        <td>{categoria.codigo}</td>
                                        <td>{categoria.descricao}</td>
                                        <td>
                                            <Button variant="warning">Editar</Button>
                                            { }
                                            <td><Button variant="warning">Excluir</Button></td>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}