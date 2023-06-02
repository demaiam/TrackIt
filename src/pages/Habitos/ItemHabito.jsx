import lixeira from '../.././assets/lixeira.png';
import { Habito, Botoes, BotaoDia } from './styled';

export default function ItemHabito(props) {
    const semana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    /*
    function deletarHabito() {
        const requisicao = axios.delete('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/ID_DO_HABITO', token)
    }
    */

    return (
        <>
            <Habito>
                <a>{props.texto}</a>
                <Botoes>
                    {semana.map((dia, index) =>
                        <BotaoDia indice={index} key={index}>
                            <button type="button" disabled={true}>
                                {semana[index]}
                            </button>
                        </BotaoDia>)}
                </Botoes>
                <img src={lixeira} alt="lixeira" onClick={deletarHabito}/>
            </Habito>
        </>
    )
}

/*border: ${props => props.selecionado.includes(props.indice) ? '1px solid #FFFFFF' : '1px solid #DBDBDB'};
color: ${props => props.selecionado.includes(props.indice) ? '#FFFFFF' : '#DBDBDB'};
background-color: ${props => props.selecionado.includes(props.indice) ? '#DBDBDB' : '#FFFFFF'};*/