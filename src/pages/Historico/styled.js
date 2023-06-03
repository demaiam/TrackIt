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
    display: flex;
    justify-content: space-between;
    width: 89%;
    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
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