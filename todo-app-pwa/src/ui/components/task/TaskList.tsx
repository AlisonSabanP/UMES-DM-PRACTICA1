import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

interface TaskListProps {
  tasks: any[];
  addTask: (title: string, file?: File) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteFile: (id: string) => void;
}

const TaskList = ({ tasks, addTask, onComplete, onDelete, onDeleteFile }: TaskListProps) => {

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todas las Tareas</h1>
      <TaskForm addTask={addTask} />
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              onDeleteFile={onDeleteFile}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay tareas aún. ¡Añade una para empezar!
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;