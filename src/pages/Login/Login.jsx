import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../.././assets/logo.svg';
import loading from '../.././assets/loading.gif';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState(<img className="load" src={loading} />);
    const [statusRequest, setStatusRequest] = useState('');


    function fazerLogin(event) {
        console.log('login');
        /*
        event.preventDefault();
        const obj = {
            email: email,
            pasword: password
        }
        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', obj);
        requisicao.then(resposta => {
            console.log(resposta);
        });
        */
    }

    function mudar() {
        setContent('Entrar');
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
                        <button type="submit" disabled={statusRequest}>{content}</button>
                    </form>
                    <Link to={`/cadastro`}>
                        <p>Não tem uma conta? Cadastre-se!</p>
                    </Link>
                </FormContainer>
            </PageContainer>
        </>
    );
}

const PageContainer = styled.div`
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        box-sizing: border-box;
        width: calc(100vw - 10em);
        margin-top: 10px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        height: 3em;
    }
    button {
        margin-top: 10px;
        width: 100%;
        height: 3em;
        border: none;
        border-radius: 3px;
        background: #52B6FF;
        color: #FFFFFF;
    }
    p {
        color: #52B6FF;
        text-decoration-line: underline;
    }
    .load {
        width: 30px;
        height: 25px;
    }
`