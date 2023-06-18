import React, { useState } from 'react';
import Logo from "../../Component/Icons/stonks.png";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();

    // Verificar as credenciais de login
    if (email === "quintalbar@gmail.com" && password === "quintal1234") {
      // Redirecionar para a página Home
    } else {
      // Exibir alerta de erro
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    <div className="container2">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleLogin}>
            <span className="login-form-title">
              <img src={Logo} alt="LOGO stonks" />
            </span>
            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Usuário"></span>
            </div>
            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>
            <div className="button">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
