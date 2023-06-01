import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Habitos from './pages/Habitos/Habitos';
import Hoje from './pages/Hoje/Hoje';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = '97eVqU1AsszfPTccPmhDFe5m';

export default function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          {/*<Route path='/' element={<Login />} />*/}
          {/*<Route path='/' element={<Cadastro/>} />*/}
          <Route path='/' element={<Habitos />} />
          {/*{<Route path='/hoje' element={<Hoje />} />*/}
        </Routes>
    </BrowserRouter>
    </>
  )
}