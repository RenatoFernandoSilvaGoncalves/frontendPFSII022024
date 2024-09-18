import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import CaixaSelecao from '../../busca/CaixaSelecao';
import { ContextoUsuarioLogado } from '../../../App';
import { useContext, useState } from 'react';
import { gravar, alterar } from '../../../servicos/produtoService';

export default function FormCadProdutos(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado)
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(props.produtoSelecionado.categoria);

    const [validado, setValidado] = useState(false);
    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            produto.categoria = categoriaSelecionada;
            if(!props.modoEdicao){
                gravar(produto, contextoUsuario.usuarioLogado.token).then((resposta) => {
                    if (resposta.status) {
                        alert(resposta.mensagem);
                        props.setExibirTabela(true);
                    }
                    else{
                        alert(resposta.mensagem);
                    }
                }).catch((erro) =>{
                    alert("Erro ao enviar a requisicao: " + erro.message);
                })
            }
            else{
                alterar(produto, contextoUsuario.usuarioLogado.token).then((resposta)=>{
                    if (resposta.status){
                        alert(resposta.mensagem);
                        props.setModoEdicao(false);
                        setProduto({
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
                        })
                    }
                    else{
                        alert(resposta.mensagem)
                    }
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                })
            }
        }
        else{
            setValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        setProduto({ ...produto, [evento.target.name]: evento.target.value });
    }

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={produto.codigo}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={produto.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Custo:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="precoCusto"
                            name="precoCusto"
                            aria-describedby="precoCusto"
                            required
                            onChange={manipularMudanca}
                            value={produto.precoCusto}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o preço de custo!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Venda:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="precoVenda">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="precoVenda"
                            name="precoVenda"
                            aria-describedby="precoVenda"
                            required
                            onChange={manipularMudanca}
                            value={produto.precoVenda}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o preço de venda!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Label>Qtd em estoque:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="qtdEstoque">+</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="qtdEstoque"
                            name="qtdEstoque"
                            aria-describedby="qtdEstoque"
                            required
                            onChange={manipularMudanca}
                            value={produto.qtdEstoque}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a quantidade em estoque!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" >
                    <Form.Label>Válido até:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="dataValidade"
                        name="dataValidade"
                        value={produto.dataValidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="8">
                    <Form.Label>Categoria:</Form.Label>
                    <CaixaSelecao enderecoFonteDados={"http://localhost:4000/categoria"}
                                  campoChave="codigo"
                                  campoExibicao="descricao"
                                  funcaoSelecao={setCategoriaSelecionada}
                                  localLista={"listaCategorias"}
                                  token={contextoUsuario.usuarioLogado.token}/>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type='submit'>{props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>
                </Col>
                <Col md={{offset:1}}>
                    <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>

    );
}