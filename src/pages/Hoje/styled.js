import styled from "styled-components";

export const ScreenContainer = styled.div`
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

export const HeaderContainer = styled.div`
    font-family: 'Playball', cursive;
    font-size: 40px;
    color: #FFFFFF;
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    z-index: 2;     
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`

export const Header = styled.div`
    width: 90%;
    div {
        display: flex;
        justify-content: space-between;
    }
    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
`

export const HabitosContainer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    width: 90%;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .habito-container {
        width: 100%;
    }
`

export const Habito = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
    border: 1em solid white;
    background: #FFFFFF;
    border-radius: 5px;
    margin-top: 15px;
    p:nth-child(1) {
        color: #666666;
        font-size: 20px;
    }
    p {
        color: #666666;
        font-size: 13px;
        line-height: 1px;
    }
`

export const BotaoCheck = styled.div`
    position: absolute;
    display: flex;
    align-self: flex-end;
    margin-top: 13px;
    button {
        color: #FFFFFF;
        font-size: 40px;
        width: 70px;
        height: 70px;
        background-color: ${ props => props.status ? '#8FC549' : '#EBEBEB'};
        border: none;
        border-radius: 5px;
    }
`

export const Topo = styled.div`
    font-size: 22px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    a:nth-child(1) {
        font-size: 23px;
        color: #126BA5;
    }
    a:nth-child(2) {
        font-size: 18px;
        color: ${props => props.status == 0 ? '#BABABA' : '#8FC549'};
    }
`

export const Botoes = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 5px;
`

export const BotaoDiaAdd = styled.div`
    display: flex;
    button {
        height: 25px;
        width: 25px;
        border: ${props => props.selecionado.includes(props.indice) ? '1px solid #FFFFFF' : '1px solid #DBDBDB'};
        color: ${props => props.selecionado.includes(props.indice) ? '#FFFFFF' : '#DBDBDB'};
        background-color: ${props => props.selecionado.includes(props.indice) ? '#DBDBDB' : '#FFFFFF'};
    }
`

export const BotaoDia = styled.div`
    display: flex;
    button {
        height: 25px;
        width: 25px;
    }
`

export const BotoesSubmit = styled.div`
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

export const Footer = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    bottom: 0;
    left: 0;
    width: 100%;
    position: fixed;
    height: 65px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
        display: flex;
        gap: 20vw;
    }
    button {
        background: none;
        border: none;
        color: #52B6FF;
        text-decoration: none;
        font-size: 16px;
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