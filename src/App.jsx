import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Habitos from './pages/Habitos/Habitos';
import Hoje from './pages/Hoje/Hoje';
import Historico from './pages/Historico/Historico';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Context from './Context';
import { useState } from 'react';

axios.defaults.headers.common['Authorization'] = '97eVqU1AsszfPTccPmhDFe5m';

export default function App() {
  const [info, setInfo] = useState(Context);

  return (
    <>
    <Context.Provider value={ [info, setInfo] }>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/cadastro' element={<Cadastro/>} />
            <Route path='/habitos' element={<Habitos />} />
            <Route path='/hoje' element={<Hoje />} />
            <Route path='/historico' element={<Historico />} />
          </Routes>
      </BrowserRouter>
    </Context.Provider>
    </>
  )
}