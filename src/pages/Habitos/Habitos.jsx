import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Habito, Topo, Botoes, BotaoDiaAdd, BotaoDia, BotoesSubmit, Footer } from './styled';
import axios from 'axios';
import { useContext } from 'react';
import Context from '../../Context';
import lixeira from '../.././assets/lixeira.png';

export default function Habitos() {

    const [habitos, setHabitos] = useState([]);
    const [novoHabito, setNovoHabito] = useState('');
    const [botoesSelecionados, setBotoesSelecionados] = useState([]);
    const [adicionar, setAdicionar] = useState(false);
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
        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', obj, config);
        requisicao.then(resposta => {
            setAdicionar(false);
            const novoArr = [...habitos];
            novoArr.push(resposta.data);
            setHabitos(novoArr);
        });
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

    function apagarForm() {
        setNovoHabito('');
        setBotoesSelecionados([]);
    }

    function deletarHabito(h, indice) {
        if (confirm("Tem certeza que deseja apagar o hábito?") == true) {
            const requisicao = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${h.id}`, config);
            requisicao.then(resposta => {
                const novoArr = [...habitos];
                delete novoArr[indice];
                setHabitos(novoArr);
            });
            requisicao.catch(resposta => {
                alert(`Erro ao deletar Hábito! ${resposta.response.data.message}`);
            });
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
                    <Topo>
                        <div data-test="habit-create-container">
                            <a>Meus hábitos</a>
                            <button onClick={() => setAdicionar(!adicionar)} data-test="habit-create-btn">+</button>
                        </div>
                    </Topo>

                    {adicionar
                        &&
                        (
                            <Habito>
                                <form onSubmit={enviarHabito} onReset={apagarForm}>
                                    <input type="text"
                                        value={novoHabito}
                                        onChange={e => setNovoHabito(e.target.value)}
                                        placeholder="nome do habito"
                                        data-test="habit-name-input"
                                    />
                                    <br />
                                    <Botoes>
                                        {semana.map((dia, index) =>
                                            <BotaoDiaAdd indice={index} selecionado={botoesSelecionados} key={index}>
                                                <button type="button" onClick={() => selecionarDia(index)} data-test="habit-day">
                                                    {dia}
                                                </button>
                                            </BotaoDiaAdd>)}
                                    </Botoes>
                                    <BotoesSubmit>
                                        <button type="reset" data-test="habit-create-cancel-btn">Cancelar</button>
                                        <button type="submit" data-test="habit-create-save-btn">Salvar</button>
                                    </BotoesSubmit>
                                </form>
                            </Habito>
                        )}

                    {habitos.map((h, index) => (
                        <div className="container-habito" data-test="habit-container" key={index}>
                            <Habito>
                                <a data-test="habit-name">{h.name}</a>
                                <Botoes>
                                    {semana.map((dia, index) =>
                                        <BotaoDia indice={index} selecionado={h.days} key={index}>
                                            <button type="button" disabled={true} data-test="habit-day">
                                                {semana[index]}
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