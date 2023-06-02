import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import perfil from '../.././assets/perfil.jpg';
import ItemHabito from './ItemHabito';
import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Habito, Topo, Botoes, BotaoDiaAdd, BotoesSubmit, Footer } from './styled';

export default function Habitos() {

    const [habitos, setHabitos] = useState([]);
    const [novoHabito, setNovoHabito] = useState('');
    const [botoesSelecionados, setBotoesSelecionados] = useState([]);
    const [adicionar, setAdicionar] = useState(false);

    const semana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    
    const testehabito = [
        {texto: "Ler livro", dias: [1, 3, 5]},
        {texto: "Jogar", dias: [2, 5, 6]},
        {texto: "Dormir", dias: [3, 4, 5]}
    ];

    /*
    useEffect(() => {
        const requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', token);
        requisicao.then(resposta => setHabitos(resposta.data))
        requisicao.catch(resposta => alert(resposta.response.data.message));
    }, []);
    */


    function enviarHabito(event) {
        event.preventDefault();
        const obj = {
            name: novoHabito,
            days: botoesSelecionados
        }
        /*
        const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', token);
        */
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

    function adicionarHabito() {
        setAdicionar(!adicionar);
    }

    function deletarHabito() {
        console.log('deletado')
    }

    function apagarForm() {
        setNovoHabito('');
        setBotoesSelecionados([]);
    }

    return (
        <>
            <ScreenContainer>
                <HeaderContainer>
                    <Header>
                        <a>Trackit</a>
                        <img src={perfil} alt="pfp" />
                    </Header>
                </HeaderContainer>

                <HabitosContainer>
                    <Topo>
                        <a>Meus hábitos</a>
                        <button onClick={() => adicionarHabito()}>+</button>
                    </Topo>

                    {adicionar
                        &&
                        (
                        <Habito>
                        <form onSubmit={enviarHabito} onReset={apagarForm}>
                            <input type="text"
                                value={novoHabito}
                                onChange={e => setNovoHabito(e.target.value)}
                                placeholder='nome do habito'/>
                            <br />
                            <Botoes>
                                {semana.map((dia, index) =>
                                    <BotaoDiaAdd indice={index} selecionado={botoesSelecionados} key={index}>
                                        <button type="button" onClick={() => selecionarDia(index)}>
                                            {dia}
                                        </button>
                                    </BotaoDiaAdd>)}
                            </Botoes>
                            <BotoesSubmit>
                                <button type="reset">Cancelar</button>
                                <button type="submit">Salvar</button>
                            </BotoesSubmit>
                        </form>
                        </Habito>
                        )}

                    {habitos.map((h, index) => (
                        <ItemHabito texto={h.texto} dias={h.dias} hey={index}/>
                    ))}


                    <Habito>
                        <h1>Fazer almoço</h1>
                        <a>Sequência atual: </a>
                        <a>Seu recorde: </a>
                        <h2>✓</h2>
                    </Habito>
                </HabitosContainer>
                <Footer>
                    <a>Hábitos</a>
                    <Link to={`/hoje`}>
                        <div className='hoje'>Hoje</div>
                    </Link>
                    <a>Histórico</a>
                </Footer>
            </ScreenContainer>
        </>

    );
}