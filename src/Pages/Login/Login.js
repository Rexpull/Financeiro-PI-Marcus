import React, { useState, useEffect } from 'react';
import Logo from "../../Component/Icons/Logo.png";
import financas from "../../Component/Icons/finance.png";

import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmptyFields, setIsEmptyFields] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      // Exibir mensagem de campos vazios
      setIsEmptyFields(true);
      return;
    }

    if (email === "quintalbar@gmail.com" && password === "quintal1234") {
      // Redirecionar para a página "/Home" se o email e a senha estiverem corretos
      window.location.href = "/Home";
    } else {
      // Mostrar uma mensagem de alerta se o email ou a senha estiverem incorretos
      setError("Email ou senha incorretos.");
    }
  };

  useEffect(() => {
    if (email !== "" || password !== "") {
      setIsEmptyFields(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (email === "" || password === "") {
      setError(false);
    }
  }, [email, password]);

  return (
    <div className="container2">
      <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
      <div className="container-login">
      <div className="subContainer">
          <img className='logoStonks' src={Logo} alt="LOGO stonks" />
          <img className='imageFinanca' src={financas} alt="LOGO stonks" />
        </div>
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleLogin}>
            <span className="login-form-title">
              <h1 className='conectText'>Conecte-se</h1>
              <p className='conectText-subtitle'>Que bom te ver por aqui, seja bem vindo!</p>
            </span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
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

            {isEmptyFields && <div className="error">Por favor, preencha todos os campos.</div>}
            {error && <div className="error">{error}</div>}

            <div className="button">
              <button type="submit" className="button1">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
