import { createContext, useCallback, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { toast } from "react-toastify";
import TaskService from "../services/task.service";

export const TasksContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [ tasks, setTasks ] = useState([]);

  const axiosInstance = useAxios();

  const getTasks = useCallback(async () => {
    try {
      const taskService = new TaskService(axiosInstance);
      const taskList = await taskService.getAll();
      setTasks(taskList);
    } catch (error) {}
  }, [axiosInstance]);

  const addTask = useCallback(
    async (task) => {
      const tasksCopy = [...tasks];
      try {
        const taskService = new TaskService(axiosInstance);
        const newTask = await taskService.add(task);
        tasksCopy.push(newTask);
        setTasks(tasksCopy);
        toast.success("Tarefa adicionada com sucesso");
      } catch (error) {
        toast.error("Não foi possível adicionar a tarefa");
      }
    }, [axiosInstance, tasks]);

  const updateTask = useCallback(
    async (task) => {
      const tasksCopy = [...tasks];
      const index = tasksCopy.findIndex((t) => t._id === task._id);
      if (index === -1) {
        return;
      }
      try {
        const taskService = new TaskService(axiosInstance);
        await taskService.update(task);
        Object.assign(tasksCopy[index], task);
        setTasks(tasksCopy);
      } catch (error) {
        toast.error("Não foi possível atualizar a tarefa");
      }
    },
    [axiosInstance, tasks]
  );

  const removeTask = useCallback(
    async (id) => {
      const tasksCopy = [...tasks];
      const index = tasksCopy.findIndex((t) => t._id === id);
      if (index === -1) {
        return;
      }
      try {
        const taskService = new TaskService(axiosInstance);
        await taskService.delete(id);
        tasksCopy.splice(index, 1);
        setTasks(tasksCopy);
      } catch (error) {
        toast.error("Não foi possível remover a tarefa");
      }
    },
    [axiosInstance, tasks]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        addTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
