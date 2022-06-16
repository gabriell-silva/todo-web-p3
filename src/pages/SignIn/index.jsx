import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../../containers/Template";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify" 

import styles from "./SignIn.module.scss";

const SignIn = () => {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) {
      return;
    }
    const email = emailInputRef.current.value.trim();
    const password = passwordInputRef.current.value.trim();

    try {
      await signIn({ email, password });
      toast.success("Bem vindo ao sistema!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      navigate("/home");
    } catch (error) {
      toast.warn("Dados em branco!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  };

  return (

    <Template title="Login">
      <form className={styles.Form} onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail de Usuário</label>
        <input
          type="email"
          id="email"
          aria-describedby="email"
          placeholder="Digite seu email"
          ref={emailInputRef}
        />
        <label htmlFor="Password">Senha</label>
        <input
          type="password"
          id="Password"
          placeholder="Digite sua senha"
          ref={passwordInputRef}
        />
        <button type="submit">Login</button>
        <Link to="/signUp">Não tem cadastro, crie sua conta!</Link>
      </form>
    </Template>
  );
};

export default SignIn;
