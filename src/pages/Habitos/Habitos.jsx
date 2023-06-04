import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Habito, Topo, Botoes, BotaoDiaAdd, BotaoDia, BotoesSubmit, Footer } from './styled';
import axios from 'axios';
import { useContext } from 'react';
import Context from '../../Context';
import lixeira from '../.././assets/lixeira.png';
import { ThreeDots } from 'react-loader-spinner';

export default function Habitos() {

    const [habitos, setHabitos] = useState([]);
    const [novoHabito, setNovoHabito] = useState('');
    const [botoesSelecionados, setBotoesSelecionados] = useState([]);
    const [adicionar, setAdicionar] = useState(false);
    const [habilitado, setHabilitado] = useState(false);
    const semana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];


    const [info] = useContext(Context);
    const token = info.data.token;

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        const requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
        requisicao.then(resposta =>
            setHabitos(resposta.data));
        requisicao.catch(resposta =>
            alert(resposta.response.data.message));
    }, []);

    function enviarHabito(event) {
        event.preventDefault();
        const obj = {
            name: novoHabito,
            days: botoesSelecionados
        }
        if (obj.name == '') {
            alert('Campo vazio!');
            return;
        }
        setHabilitado(true);
        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', obj, config);
        requisicao.then(() => {
            const requisicao2 = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
            requisicao2.then(resposta2 =>
                setHabitos(resposta2.data));
            requisicao2.catch(resposta2 =>
                alert(resposta2.response.data.message));
            setAdicionar(false);
        });
        requisicao.catch(resposta => {
            alert(resposta.data.message);
        })
        setHabilitado(false);
        setNovoHabito('');
        setBotoesSelecionados([]);
    }

    function selecionarDia(id) {
        if (botoesSelecionados.includes(id)) {
            const novoArr = [...botoesSelecionados];
            const posicao = novoArr.indexOf(id);
            novoArr.splice(posicao, 1);
            setBotoesSelecionados(novoArr);
        } else {
            const novoArr = [...botoesSelecionados, id];
            setBotoesSelecionados(novoArr);
        }
    }

    function deletarHabito(h) {
        if (confirm("Tem certeza que deseja apagar o hábito?") == true) {
            const requisicao = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${h.id}`, config);
            requisicao.then(resposta => {
                const requisicao2 = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
                requisicao2.then(resposta2 =>
                    setHabitos(resposta2.data));
                requisicao2.catch(resposta2 =>
                    alert(resposta2.response.data.message));
            });
            requisicao.catch(resposta => {
                alert(`Erro ao deletar Hábito! ${resposta.response.data.message}`);
            });
        }
    }

    console.log(habitos)

    if (habitos.length == 0) {
        return (
            <>
                <ThreeDots height="100vh" width="100vw" color="#52B6FF" />
            </>
        )

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
                    <Topo>
                        <div>
                            <a>Meus hábitos</a>
                            <button onClick={() => setAdicionar(!adicionar)} data-test="habit-create-btn">+</button>
                        </div>
                    </Topo>

                    {adicionar
                        &&
                        (
                            <div className="menu-add" data-test="habit-create-container">
                                <Habito>
                                    <form onSubmit={enviarHabito}>
                                        <input type="text"
                                            value={novoHabito}
                                            onChange={e => setNovoHabito(e.target.value)}
                                            placeholder="nome do habito"
                                            data-test="habit-name-input"
                                            disabled={habilitado}
                                        />
                                        <br />
                                        <Botoes>
                                            {semana.map((dia, index) =>
                                                <BotaoDiaAdd indice={index} selecionado={botoesSelecionados} key={index}>
                                                    <button type="button" onClick={() => selecionarDia(index)} disabled={habilitado} data-test="habit-day">
                                                        {dia}
                                                    </button>
                                                </BotaoDiaAdd>)}
                                        </Botoes>
                                        <BotoesSubmit>
                                            <button type="button" data-test="habit-create-cancel-btn" onClick={() => setAdicionar(!adicionar)} disabled={habilitado}>Cancelar</button>
                                            <button type="submit" data-test="habit-create-save-btn" disabled={habilitado}>Salvar</button>
                                        </BotoesSubmit>
                                    </form>
                                </Habito>
                            </div>
                        )}

                    {habitos.map((h, index) => (
                        <div className="container-habito" data-test="habit-container" key={h.id}>
                            <Habito>
                                <a data-test="habit-name">{h.name}</a>
                                <Botoes>
                                    {semana.map((dia, index) =>
                                        <BotaoDia indice={index} selecionado={h.days} key={index}>
                                            <button type="button" disabled={true} data-test="habit-day">
                                                {dia}
                                            </button>
                                        </BotaoDia>)}
                                </Botoes>
                                <img src={lixeira} alt="lixeira" onClick={() => deletarHabito(h, index)} data-test="habit-delete-btn" />
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