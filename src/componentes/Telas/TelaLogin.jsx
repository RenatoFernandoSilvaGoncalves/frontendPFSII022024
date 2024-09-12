import { Container } from "react-bootstrap";
import FormLogin from "./Formularios/FormLogin";
import loginImg from '../../assets/imagens/login-icon.jpg';
export default function TelaLogin(props){
    return (
        <Container className='w-50 d-flex align-items-center  
                        justify-content-center vh-100'>
            <img className='w-25' src={loginImg} alt="Imagem Login" />
            <FormLogin />
        </Container>
    );
}