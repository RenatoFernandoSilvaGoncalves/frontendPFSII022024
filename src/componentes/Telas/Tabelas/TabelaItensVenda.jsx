import { Button, Container, Table } from "react-bootstrap";
import { useState } from "react";

export default function TabelaItensVenda(props) {
    var totalVendas = 0;
    return (
        <Container className="m-3 border">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Código do Item</th>
                    <th>Descrição do Produto</th>
                    <th>Preço</th>
                    <th>Qtd</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.listaItens?.map((item, indice) => {
                        totalVendas+= parseFloat(item.subtotal);
                        //props.setVenda({...props.dadosVenda, totalPedido: totalVendas});
                        return <tr key={indice}>
                            <td>{item.codigo}</td>
                            <td>{item.descricao}</td>
                            <td>{item.precoUnitario}</td>
                            <td>{item.quantidade}</td>
                            <td>{item.subtotal}</td>
                            <td>
                                <Button onClick={()=>{
                                    const lista = props.listaItens.filter((prod) => prod.codigo !== item.codigo); 
                                    props.setVenda({...props.dadosVenda, itens:lista});
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-dash" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <p>Total da Venda: {totalVendas}</p>
        </Container>
    )
}