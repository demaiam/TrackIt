import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Habito, Topo, Botoes, BotaoDiaAdd, BotoesSubmit, Footer } from './styled';
import { Link } from 'react-router-dom';
import perfil from '../.././assets/perfil.jpg';
export default function Hoje() {
    return (
        <>
                <ScreenContainer>
                <HeaderContainer>
                    <Header>
                        <a>Trackit</a>
                        <img src={perfil} alt="pfp" />
                    </Header>
                </HeaderContainer>

                <Footer>
                    <Link to={'/habitos'}>
                        <a>Hábitos</a>
                    </Link>
                    <div className='hoje'>Hoje</div>
                    <a>Histórico</a>
                </Footer>
            </ScreenContainer>
        </>
    );
}