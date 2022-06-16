import { useNavigate } from "react-router-dom";
import { TaskForm } from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import Template from "../../containers/Template";
import { useAuth } from "../../hooks/useAuth";
import { GoSignOut } from "react-icons/go";
import Swal from "sweetalert2";

const Home = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    Swal.fire({
      title: `Deseja realmente sair ${user.name}?`,
      text: "Você será deslogado do sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair!",
      cancelButtonText: "Não, cancelar!",
    }).then( async (result) => {
      if (result.value) {
        await signOut();
        navigate("/");
      } else {
        Swal.fire("Cancelado", "Você continua logado!", "success");
      }
    });
  };
  return (
    <Template
      title="My Todo App"
      sideButton={
        <button type="button" onClick={handleLogout}>
          {user.name} <GoSignOut />
        </button>
      }
    >
      <TaskForm />
      <TaskList />
    </Template>
  );
};

export default Home;
