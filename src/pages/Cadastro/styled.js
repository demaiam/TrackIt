import styled from "styled-components";

export const PageContainer = styled.div`
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        margin-top: 10px;
        border: none;
        background: none;
        color: #52B6FF;
        text-decoration-line: underline;
    }
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        box-sizing: border-box;
        width: calc(100vw - 10em);
        margin-top: 10px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        height: 3em;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        margin-top: 10px;
        width: 100%;
        height: 3em;
        border: none;
        border-radius: 3px;
        background: #52B6FF;
        color: #FFFFFF;
    }
`