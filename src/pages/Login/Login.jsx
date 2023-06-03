import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { PageContainer, FormContainer } from './styled';
import logo from '../.././assets/logo.svg';
import axios from 'axios';
import Context from '../../Context';
import { useContext } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusRequest, setStatusRequest] = useState(false);
    const [conteudoBotao, setConteudoBotao] = useState('Entrar');
    const [info, setInfo] = useContext(Context);

    const navegar = useNavigate();

    function fazerLogin(event) {
        event.preventDefault();
        setStatusRequest(true);
        setConteudoBotao(<ThreeDots height="10" color="white" />);

        const obj = {
            email: email,
            password: password
        }

        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', obj);
        requisicao.then(resposta => {
            setInfo(resposta);
            navegar('/hoje');
        });
        requisicao.catch(resposta => {
            alert(`Não foi possível fazer login! Erro ${resposta.response.data.message}`);
            setStatusRequest(false);
            setConteudoBotao('Entrar');
        });
    }

    return (
        <>
            <PageContainer>
                <img src={logo} alt="logo" />
                <FormContainer>
                    <form onSubmit={fazerLogin}>
                        <input type="email"
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               placeholder="email"
                               disabled={statusRequest}
                               data-test="email-input"
                        />
                        <br />
                        <input type="password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               placeholder="senha"
                               disabled={statusRequest}
                               data-test="passsword-input"
                        />
                        <br />
                        <button type="submit" disabled={statusRequest} data-test="login-btn">{conteudoBotao}</button>
                    </form>
                </FormContainer>
                <button onClick={() => navegar('/cadastro')} disabled={statusRequest} data-test="signup-link">Não tem uma conta? Cadastre-se!</button>
            </PageContainer>
        </>
    );
}