import lixeira from '../.././assets/lixeira.png';
import { Habito, Botoes, BotaoDia } from './styled';
import { useContext } from 'react';
import Context from '../../Context';
import axios from 'axios';
import { useState } from 'react';

export default function ItemHabito(props) {
    const semana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const [info, setInfo] = useContext(Context);
    const token = info.data.token;
    const [habitos, setHabitos] = useState(props);

    console.log(habitos)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    console.log(habitos)
    
    function deletarHabito(id) {
        const requisicao = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        requisicao.then(resposta => {
            console.log(resposta);
        });
        requisicao.catch(resposta => {
            alert(`Erro ao deletar Hábito! ${resposta.response.data.message}`);
        });
    }

    return (
        <>
            <Habito>
                <a>{props.texto}</a>
                <Botoes>
                    {semana.map((dia, index) =>
                        <BotaoDia indice={index} selecionado={props.dias} key={index}>
                            <button type="button" disabled={true}>
                                {semana[index]}
                            </button>
                        </BotaoDia>)}
                </Botoes>
                <img src={lixeira} alt="lixeira" onClick={() => deletarHabito(props.id)}/>
            </Habito>
        </>
    )
}