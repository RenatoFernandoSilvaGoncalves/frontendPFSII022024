import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto";
import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaLogin from "./componentes/Telas/TelaLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import TelaVenda from "./componentes/Telas/TelaVenda";

export const ContextoUsuarioLogado = createContext(null);

function App() {
  
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    logado: false,
    token: ""
  });

  return (
    !usuarioLogado.logado ? 
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <TelaLogin />
    </ContextoUsuarioLogado.Provider> :
    <div className="App">
      <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
        <BrowserRouter>
          <Routes>
            <Route path="/produto" element={<TelaCadastroProduto />} />
            <Route path="/categoria" element={<TelaCadastroCategoria />} />
            <Route path="/pedido" element={<TelaVenda />} />
            <Route path="/" element={<TelaMenu />} />
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </ContextoUsuarioLogado.Provider>
    </div>
  );
}

export default App;
