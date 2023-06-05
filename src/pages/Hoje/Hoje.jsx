import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Habito, Topo, BotaoCheck, Footer } from './styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Context from '../../Context';
import { useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


export default function Hoje(props) {
    const [info] = useContext(Context);
    const [porcentagemInfo, setPorcentagemInfo] = useState(0);
    const [habitos, setHabitos] = useState([]);
    const [concluidos, setConcluidos] = useState('Nenhum hábito concluído ainda');
    const token = info.data.token;
    const [qtdConcluidos, setQtdConcluidos] = useState(0);
    const { setPercent } = props;

    let diaSemana = dayjs().day();
    let diaMes = dayjs().date();
    let mes = dayjs().month() + 1;

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
                setPorcentagemInfo(porcentagem);
                setPercent(porcentagem);
                setConcluidos(`${porcentagem}% dos hábitos concluidos`);
            }
            setHabitos(resposta.data);
        });
        requisicao.catch(resposta =>
            alert(resposta.response.data.message));
    }, []);

    function habitoFeito(id, done) {
        const body = {};
        if (!done) {
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config);
            requisicao.then(() => {
                const requisicao2 = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
                requisicao2.then(resposta2 => {
                    let qtd = 0;
                    for (let i = 0; i < resposta2.data.length; i++) {
                        if (resposta2.data[i].done == true)
                            qtd += 1;
                    }
                    if (qtd != 0) {
                        const porcentagem = Math.round(qtd * 100 / resposta2.data.length);
                        setQtdConcluidos(qtd);
                        setPorcentagemInfo(porcentagem);
                        setPercent(porcentagem);
                        setConcluidos(`${porcentagem}% dos hábitos concluidos`);
                    }
                    setHabitos(resposta2.data);
                });
                requisicao2.catch(resposta =>
                    alert(resposta.response.data.message));
            });
            requisicao.catch(resposta =>
                alert(resposta.response.data.message));
        } else {
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config);
            requisicao.then(() => {
                const requisicao2 = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
                requisicao2.then(resposta2 => {
                    let qtd = 0;
                    for (let i = 0; i < resposta2.data.length; i++) {
                        if (resposta2.data[i].done == true)
                            qtd += 1;
                    }
                    if (qtd != 0) {
                        const porcentagem = Math.round(qtd * 100 / resposta2.data.length);
                        setQtdConcluidos(qtd);
                        setPorcentagemInfo(porcentagem);
                        setPercent(porcentagem);
                        setConcluidos(`${porcentagem}% dos hábitos concluidos`);
                    } else {
                        setQtdConcluidos(0);
                        setConcluidos('Nenhum hábito concluído ainda');
                    }
                    setHabitos(resposta2.data);
                });
                requisicao2.catch(resposta =>
                    alert(resposta.response.data.message));
            });
            requisicao.catch(resposta =>
                alert(resposta.response.data.message));
        }
    }

    return (
        <>
            <ScreenContainer>
                <HeaderContainer>
                    <Header>
                        <div data-test="header">
                            <a>Trackit</a>
                            <img src={info.data.image} alt="pfp" data-test="avatar" />
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
                                    <button onClick={() => habitoFeito(h.id, h.done)} data-test="today-habit-check-btn">✓</button>
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
                            <div className="hoje" data-test="today-link">
                                <CircularProgressbar
                                    value={porcentagemInfo}
                                    text={'Hoje'}
                                    background={true}
                                    backgroundPadding={8}
                                    strokeWidth={6}
                                    styles={buildStyles({
                                        rotation: 0.25,
                                        strokeLinecap: 'butt',
                                        textSize: '16px',
                                        pathColor: '#FFFFFF',
                                        textColor: '#FFFFFF',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#52B6FF',
                                    })}
                                />
                            </div>
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