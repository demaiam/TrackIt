import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Habito, Topo, Botoes, BotaoDiaAdd, BotaoDia, BotoesSubmit, BotaoCheck, Footer } from './styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Context from '../../Context';
import { useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { ThreeCircles } from 'react-loader-spinner';

export default function Hoje() {
    const [info] = useContext(Context);
    const [habitos, setHabitos] = useState([]);
    const [concluidos, setConcluidos] = useState('Nenhum hábito concluído ainda');
    const token = info.data.token;
    const [qtdConcluidos, setQtdConcluidos] = useState(0);

    let diaSemana = dayjs().day();
    let diaMes = dayjs().date();
    let mes = dayjs().month();

    if (diaMes < 10)
        diaMes = diaMes.toString().padStart(2, 0);
    if (mes < 10)
        mes = mes.toString().padStart(2, 0);


    switch (diaSemana) {
        case 0:
            diaSemana = 'Domingo';
            break;
        case 1:
            diaSemana = 'Segunda';
            break;
        case 2:
            diaSemana = 'Terça';
            break;
        case 3:
            diaSemana = 'Quarta';
            break;
        case 4:
            diaSemana = 'Quinta';
            break;
        case 5:
            diaSemana = 'Sexta';
            break;
        case 6:
            diaSemana = 'Sábado';
            break;
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
        requisicao.then(resposta => {
            let qtd = 0;
            for (let i = 0; i < resposta.data.length; i++) {
                if (resposta.data[i].done == true)
                    qtd += 1;
            }
            if (qtd != 0) {
                const porcentagem = Math.round(qtd * 100 / resposta.data.length);
                setQtdConcluidos(qtd);
                setConcluidos(`${porcentagem}% dos hábitos concluidos`);
            }
            setHabitos(resposta.data);
        });
        requisicao.catch(resposta =>
            alert(resposta.response.data.message));
    }, []);


    function habitoFeito(id, done, indice) {
        const body = {};
        if (!done) {
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config);
            requisicao.then(() => {
                auxFunc(1, indice);
            });
            requisicao.catch(resposta =>
                alert(`Não foi possível marcar o hábito! ${resposta.response.data.message}`));
        } else {
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config);
            requisicao.then(() => {
                auxFunc(-1, indice);
            });
            requisicao.catch(resposta =>
                alert(`Não foi possível marcar o hábito! ${resposta.response.data.message}`));
        }
    }

    function auxFunc(num, indice) {
        const novoArr = [...habitos];
        novoArr[indice].done = !(novoArr[indice].done);
        setHabitos(novoArr);
        setQtdConcluidos(qtdConcluidos + num);
        const porcentagem = Math.round(qtdConcluidos * 100 / habitos.length);
        setConcluidos(`${porcentagem}% dos hábitos concluidos`);
    }

    return (
        <>
            <ScreenContainer>
                <HeaderContainer>
                    <Header>
                    <div data-test="header">
                        <a>Trackit</a>
                        <img src={info.data.image} alt="pfp" data-test="avatar"/>
                    </div>
                    </Header>
                </HeaderContainer>

                <HabitosContainer>

                    <Topo status={qtdConcluidos}>
                        <a data-test="today">{diaSemana}, {diaMes}/{mes}</a>
                        <a data-test="today-counter">{concluidos}</a>
                    </Topo>

                    {habitos.map((h, index) => (
                        <div className="habito-container" data-test="today-habit-container" key={index}>
                            <Habito recorde={h.highestSequence} sequencia={h.currentSequence}>
                                <p data-test="today-habit-name">{h.name}</p>
                                <p data-test="today-habit-sequence">Sequência atual: <span>{h.currentSequence}</span></p>
                                <p data-test="today-habit-record">Seu recorde: <span>{h.highestSequence}</span></p>
                                <BotaoCheck status={h.done}>
                                    <button onClick={() => habitoFeito(h.id, h.done, index)} data-test="today-habit-check-btn">✓</button>
                                </BotaoCheck>
                            </Habito>
                        </div>
                    ))}

                </HabitosContainer>

                <Footer>
                    <div data-test="menu">
                        <Link to={'/habitos'}>
                            <button data-test="habit-link">Hábitos</button>
                        </Link>
                        <Link to={'/hoje'}>
                            <div className='hoje' data-test="today-link">Hoje</div>
                        </Link>
                        <Link to={'/historico'}>
                            <button data-test="history-link">Histórico</button>
                        </Link>
                    </div>
                </Footer>
            </ScreenContainer>
        </>
    );
}