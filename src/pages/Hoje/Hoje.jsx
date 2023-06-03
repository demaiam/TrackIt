import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Habito, Topo, Botoes, BotaoDiaAdd, BotoesSubmit, Footer } from './styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Context from '../../Context';
import { useContext } from 'react';
import axios from 'axios';

export default function Hoje() {
    const [info, setInfo] = useContext(Context);
    const [servidor, setServidor] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${info.data.token}`
            }
        }
        const requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
        requisicao.then(resposta =>
            setServidor(resposta.data));
        requisicao.catch(resposta =>
            alert(resposta.response.data.message));
    }, []);

    console.log(servidor);

    return (
        <>
            <ScreenContainer>
                <HeaderContainer>
                    <Header>
                        <a>Trackit</a>
                        <img src={info.data.image} alt="pfp" />
                    </Header>
                </HeaderContainer>

                <Footer>
                    <Link to={'/habitos'}>
                        <button data-test="habit-link">Hábitos</button>
                    </Link>
                    <Link to={'/hoje'}>
                        <div className='hoje' data-test="today-link">Hoje</div>
                    </Link>
                    <Link to={'/historico'}>
                        <button data-test="history-link">Histórico</button>
                    </Link>
                </Footer>
            </ScreenContainer>
        </>
    );
}