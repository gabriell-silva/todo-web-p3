import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Template from "../../containers/Template";
import { useAuth } from "../../hooks/useAuth";

import styles from "./SignUp.module.scss";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value.trim();
    const age = ageInputRef.current.value.trim();
    const email = emailInputRef.current.value.trim();
    const password = passwordInputRef.current.value.trim();
    const confirmation = passwordConfirmationInputRef.current.value.trim();

    if ( !name 
        || !age
        || !email
        || !password
        || !confirmation
      ) {
        return toast.error("Preencha todos os campos");
      }

    if (password !== confirmation) {
      return toast.error("As senhas não conferem");
    }

    if (password.length < 8) {
      return toast.error("A senha deve ter no mínimo 8 caracteres");
    }

    try {
      const dataUser = { name, age, email, password };
      await signUp(dataUser);
      toast.success("Usuário cadastrado com sucesso");
      navigate("/");
    } catch (error) {
      return toast.error(error.message);
    }
  }

  return (
    <Template title="Cadastrar-se">
      <form className={styles.Form} onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          aria-describedby="name"
          placeholder="Digite seu nome"
          ref={nameInputRef}
        />
        <label htmlFor="age">Idade</label>
        <input
          type="number"
          id="age"
          min={0}
          aria-describedby="age"
          placeholder="Digite sua idade"
          ref={ageInputRef}
        />
        <label htmlFor="email">E-mail de Usuário</label>
        <input
          type="email"
          id="email"
          aria-describedby="email"
          placeholder="Digite seu email"
          ref={emailInputRef}
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          ref={passwordInputRef}
        />
        <label htmlFor="password_confirmation">Confirmação</label>
        <input
          type="password"
          id="password_confirmation"
          placeholder="Confirme sua senha"
          ref={passwordConfirmationInputRef}
        />
        <button type="submit">Cadastrar</button>
        <Link to="/"> voltar!</Link>
      </form>
    </Template>
  );
};

export default SignUp;
