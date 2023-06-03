import { ScreenContainer, HeaderContainer, Header, Footer } from './styled';
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