import { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../.././assets/logo.svg';

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');

    function fazerCadastro(event) {
        event.preventDefault();
        const obj = {
            email: email,
            pasword: password,
            name: nome,
            image: foto
        }
        console.log(obj);
        /*
        



        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', obj);
        requisicao.then(resposta => {
            console.log(resposta);
        });
        */
    }

    return (
        <>
            <PageContainer>
                <img src={logo} alt="logo" />
                <FormContainer>
                    <form onSubmit={fazerCadastro}>
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
                        <input type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder='nome' 
                        />
                        <br/>
                        <input type="url"
                            value={foto}
                            onChange={e => setFoto(e.target.value)}
                            placeholder='foto' 
                        />
                        <br/>
                        <button type="submit">Cadastrar</button>
                    </form>
                    <Link to={`/`}>
                        <p>Já tem uma conta? Faça login!</p>
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
`