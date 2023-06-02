import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { PageContainer, FormContainer } from './styled';
import logo from '../.././assets/logo.svg';

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
            pasword: password,
            name: nome,
            image: foto
        }
        console.log(obj);
        /*
        



        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', obj);
        requisicao.then(resposta => {
            navegar('/');
        });
        requisicao.catch(resposta => {
            alert(`Não foi possível fazer cadastro! Erro ${resposta.response.data.message}`);
            setStatusRequest(false);
            setConteudoBotao('Cadastrar');
        });
        */
    }

    function irParaLogin() {
        navegar('/');
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
                        <button type="submit" disabled={statusRequest}>{conteudoBotao}</button>
                    </form>
                </FormContainer>
                <button onClick={irParaLogin} disabled={statusRequest}>Já tem uma conta? Faça login!</button>
            </PageContainer>
        </>
    );
}