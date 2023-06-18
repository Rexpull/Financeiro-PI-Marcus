import './App.css';
import Home from "./Pages/Home/Home";
import ContasPagar from "./Component/ContasPagar/ContasPagar";
import ContasReceber from "./Component/ContasReceber/ContasReceber";
import Login from './Pages/Login/Login';
import Fornecedor from './Component/Cadastros/Fornecedor/Fornecedor';
import Cliente from './Component/Cadastros/Clientes/Cliente';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/Cadastros/Fornecedor",
    element: <Fornecedor />,
  },
  {
    path: "/Cadastros/Cliente",
    element: <Cliente />,
  },
  {
    path: "/contasPagar",
    element: <ContasPagar />,
  },
  {
    path: "/contasReceber",
    element: <ContasReceber />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
