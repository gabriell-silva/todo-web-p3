import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTasks } from "../../../hooks/useTasks";
import styles from "./TaskItem.module.scss";

const TaskItem = ({ task }) => {
  const { removeTask, updateTask } = useTasks();
  const { _id, description, completed } = task;
  const [name, setName] = useState(description);

  const [edit, setEdit] = useState(false);

  const handleCheckboxChange = () => {
    const modifiedTask = { ...task, completed: !completed };
    updateTask(modifiedTask);
    if (!completed) {
      toast.success(`${modifiedTask.description} concluído!`);
    }
    else {
      toast.info(`${modifiedTask.description} não finalizada!`);
     }
  }

  const handleRemove = () => {

    Swal.fire({
      title: "Excluir task?",
      text: "Você não poderá recuperar essa task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir task!",
      }).then((result) => {
        if (result.value) {
          removeTask(_id)
          Swal.fire("Excluir!", "Seu arquivo foi excluído.", "success");
        } else {
          Swal.fire("Cancelado", "Seu arquivo não foi excluído.", "success");
        }
      }
    );
  };

  const handleSave = () => {
    const modifiedTask = { ...task, description: name };
    updateTask(modifiedTask);
    setEdit(false);
    toast.success("Task atualizada com sucesso!");
  };

  const renderDescription = () => {
    if (edit) {
      return (
        <>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <button onClick={handleSave}>💾</button>
        </>
      );
    }
    return (
      <>
        <span className={completed ? styles.marked : ""}>{description}</span>
        <button onClick={() => setEdit(true)}>✒️</button>
      </>
    );
  };

  return (
    <li className={styles.Item}>
      <input
        type="checkbox"
        name={`task-${_id}`}
        checked={completed}
        onChange={handleCheckboxChange}
      />
      {renderDescription()}
      <button onClick={handleRemove}>🗑️</button>
    </li>
  );
};

export default TaskItem;
