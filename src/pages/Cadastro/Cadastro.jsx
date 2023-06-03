import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { PageContainer, FormContainer } from './styled';
import logo from '../.././assets/logo.svg';
import axios from 'axios';

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [statusRequest, setStatusRequest] = useState(false);
    const [conteudoBotao, setConteudoBotao] = useState('Cadastrar');

    const navegar = useNavigate();

    function fazerCadastro(event) {
        event.preventDefault();
        setStatusRequest(true);
        setConteudoBotao(<ThreeDots height = "10" color = "white"/>);
        const obj = {
            email: email,
            name: nome,
            image: foto,
            password: password
        }
        console.log(obj);
    
        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', obj);
        requisicao.then(resposta => {
            navegar('/');
        });
        requisicao.catch(resposta => {
            alert(`Não foi possível fazer cadastro! ${resposta.response.data.message}`);
            setStatusRequest(false);
            setConteudoBotao('Cadastrar');
        });
    }

    return (
        <>
            <PageContainer>
                <img src={logo} alt="logo" />
                <FormContainer>
                    <form onSubmit={fazerCadastro}>
                        <input type="email"
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               placeholder="email"
                               disabled={statusRequest}
                               data-test="email-input"
                        />
                        <br/>
                        <input type="password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               placeholder="senha"
                               disabled={statusRequest}
                               data-test="password-input"
                        />
                        <br/>
                        <input type="text"
                               value={nome}
                               onChange={e => setNome(e.target.value)}
                               placeholder="nome"
                               disabled={statusRequest}
                               data-test="user-name-input"
                        />
                        <br/>
                        <input type="url"
                               value={foto}
                               onChange={e => setFoto(e.target.value)}
                               placeholder="foto"
                               disabled={statusRequest}
                               data-test="user-image-input"
                        />
                        <br/>
                        <button type="submit" disabled={statusRequest} data-test="signup-btn">{conteudoBotao}</button>
                    </form>
                </FormContainer>
                <button onClick={() => navegar('/')} disabled={statusRequest} data-test="login-link">Já tem uma conta? Faça login!</button>
            </PageContainer>
        </>
    );
}