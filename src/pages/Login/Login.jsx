import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { PageContainer, FormContainer } from './styled';
import logo from '../.././assets/logo.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusRequest, setStatusRequest] = useState(false);
    const [conteudoBotao, setConteudoBotao] = useState('Entrar');

    const navegar = useNavigate();

    function fazerLogin(event) {
        event.preventDefault();
        console.log('login');
        setStatusRequest(true);
        setConteudoBotao(<ThreeDots height = "10" color = "white"/>);
/*
        const obj = {
            email: email,
            pasword: password
        }
 
            const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', obj);
            requisicao.then(resposta => {
                navegar('/hoje');
            });
            requisicao.catch(resposta => {
                alert(`Não foi possível fazer login! Erro ${resposta.response.data.message}`);
                setStatusRequest(false);
                setConteudoBotao('Entrar');
            });*/
    }

    function irParaCadastro() {
        navegar('/cadastro');
    }

    return (
        <>
            <PageContainer>
                <img src={logo} alt="logo" />
                <FormContainer>
                    <form onSubmit={fazerLogin}>
                        <input type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='email' 
                        />
                        <br/>
                        <input type="text"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='senha' 
                        />
                        <br/>
                        <button type="submit" disabled={statusRequest}> {conteudoBotao} </button>
                    </form>
                </FormContainer>
                <button onClick={(irParaCadastro)} disabled={statusRequest}>Não tem uma conta? Cadastre-se!</button>
            </PageContainer>
        </>
    );
}