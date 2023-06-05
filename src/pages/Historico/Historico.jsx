import { ScreenContainer, HeaderContainer, Header, HabitosContainer, Topo, Footer } from './styled';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Context';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function Historico(props) {
    const [info] = useContext(Context);
    const { percent } = props;

    return (
        <>
            <ScreenContainer>
                <HeaderContainer>
                    <Header>
                        <div data-test="header">
                            <a>Trackit</a>
                            <img src={info.data.image} alt="pfp" data-test="avatar" />
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
                            <div className='hoje' data-test="today-link">
                                <CircularProgressbar
                                    value={percent}
                                    text={'Hoje'}
                                    background={true}
                                    backgroundPadding={8}
                                    strokeWidth={6}
                                    styles={buildStyles({
                                        rotation: 0.25,
                                        strokeLinecap: 'butt',
                                        textSize: '16px',
                                        pathColor: '#FFFFFF',
                                        textColor: '#FFFFFF',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#52B6FF',
                                    })}
                                />
                            </div>
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