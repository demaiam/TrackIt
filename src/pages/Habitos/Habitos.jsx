import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import perfil from '../.././assets/perfil.jpg';
import lixeira from '../.././assets/lixeira.png';

export default function Habitos() {


    const [habitos, setHabitos] = useState('Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!');
    const [novoHabito, setNovoHabito] = useState('');
    const [botoesSelecionados, setBotoesSelecionados] = useState([]);
    const [adicionar, setAdicionar] = useState(false);

    const semana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    


    function enviarHabito(event) {
        event.preventDefault();
        const obj = {
            name: novoHabito,
            days: botoesSelecionados
        }
        console.log(obj);
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
                                    <BotaoDia indice={index} selecionado={botoesSelecionados} key={index}>
                                        <button type="button" onClick={() => selecionarDia(index)}>
                                            {dia}
                                        </button>
                                    </BotaoDia>)}
                            </Botoes>
                            <BotoesSubmit>
                                <button type="reset">Cancelar</button>
                                <button type="submit">Salvar</button>
                            </BotoesSubmit>
                        </form>
                        </Habito>
                        )}


                    <Habito>
                        <a>Ler 1 capítulo de livro</a>
                        <Botoes>
                            {semana.map((dia, index) =>
                                <BotaoDia indice={index} selecionado={botoesSelecionados} key={index}>
                                    <button type="button" disabled={true}>
                                        {dia}
                                    </button>
                                </BotaoDia>)}
                        </Botoes>
                        <img src={lixeira} alt="lixeira" />
                    </Habito>
                    <Habito>
                        <a>Assistir filme</a>
                        <Botoes>
                            {semana.map((dia, index) =>
                                <BotaoDia indice={index} selecionado={botoesSelecionados} key={index}>
                                    <button type="button" disabled={true}>
                                        {dia}
                                    </button>
                                </BotaoDia>)}
                        </Botoes>
                        <img src={lixeira} alt="lixeira" onClick={() => deletarHabito()}/>
                    </Habito>
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

const ScreenContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #F2F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px;
    padding: 0px;
    padding-bottom: 200px;
`

const HeaderContainer = styled.div`
    font-family: 'Playball', cursive;
    font-size: 40px;
    color: #FFFFFF;
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 89%;
    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
`

const HabitosContainer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    width: 90%;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Habito = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
    border: 1em solid white;
    background: #FFFFFF;
    border-radius: 5px;
    margin-top: 15px;
    input {
        font-size: 15px;
        width: 98%;
        height: 2em;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }
    input::placeholder {
        color: #DBDBDB;
    }
    a {
        color: #666666;
    }
    img {
        position: absolute;
        display: flex;
        align-self: flex-end;
        width: 13px;
        height: 15px;
    }
`

const Topo = styled.div`
    font-size: 22px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #126BA5;
    button {
        color: #FFFFFF;
        font-size: 30px;
        width: 40px;
        height: 35px;
        border-radius: 3px; 
        background: #52B6FF;
        border: none;
    }
`

const Botoes = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 5px;
`

const BotaoDia = styled.div`
    display: flex;
    button {
        height: 25px;
        width: 25px;
        border: ${props => props.selecionado.includes(props.indice) ? '1px solid #FFFFFF' : '1px solid #DBDBDB'};
        color: ${props => props.selecionado.includes(props.indice) ? '#FFFFFF' : '#DBDBDB'};
        background-color: ${props => props.selecionado.includes(props.indice) ? '#DBDBDB' : '#FFFFFF'};
    }
`

const BotoesSubmit = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
        cursor: pointer;
    }
    button:nth-child(1) {
        border: none;
        background-color: #FFFFFF;
        color: #52B6FF;
    }
    button:nth-child(2) {
        color: #FFFFFF;
        width: 5em;
        height: 2em;
        border: none;
        border-radius: 5px;
        background-color: #52B6FF;
    }
`

const Footer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    bottom: 0;
    left: 0;
    width: 100%;
    position: fixed;
    height: 65px;
    background-color: #FFFFFF;
    display: flex;
    gap: 25vw;
    align-items: center;
    justify-content: center;
    a {
        color: #52B6FF
    }
    .hoje {
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 25px;
        right: calc(50vw - 2em);
        position: absolute;
        border-radius: 50%;
        height: 5em;
        width: 5em;
        background-color: #52B6FF;
        color: #FFFFFF;
    }
`