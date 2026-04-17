import { useState, useEffect } from "react";
import type { Task } from "../../domain/task/task.types";
import validateTaskTitle from "../../domain/task/task.validators";
import generateId from "../../shared/generateId.util";
import { saveTasks, loadTasks } from "../../infraestructure/task/task.storage";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function useTaskActions() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const loadedTasks = await loadTasks();
        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (title: string, file?: File) => {
    if (!validateTaskTitle(title)) return;

    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      addedAt: new Date(),
    };

    if (file) {
      try {
        const base64Data = await fileToBase64(file);
        newTask.file = {
          name: file.name,
          type: file.type,
          data: base64Data,
        };
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const onComplete = async (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const onDelete = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const onDeleteFile = async (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const { file: _, ...taskWithoutFile } = task;
        return taskWithoutFile;
      }
      return task;
    });
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  return {
    tasks,
    loading,
    addTask,
    onComplete,
    onDelete,
    onDeleteFile,
  };
}