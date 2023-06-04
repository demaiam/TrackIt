import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Topo, Footer } from './styled';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Context';

export default function Hoje() {
    const [info] = useContext(Context);

    return (
        <>
            <ScreenContainer>
                <HeaderContainer>
                    <Header>
                    <div data-test="header">
                        <a>Trackit</a>
                        <img src={info.data.image} alt="pfp" data-test="avatar"/>
                    </div>
                    </Header>
                </HeaderContainer>

                <HabitosContainer>
                    <Topo>
                        <a>Histórico</a>
                        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                    </Topo>
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