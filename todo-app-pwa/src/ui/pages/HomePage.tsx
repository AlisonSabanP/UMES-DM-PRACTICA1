import useTaskActions from '../../application/task/useTaskActions';
import TaskList from '../components/task/TaskList';

const HomePage = () => {
  const { tasks, loading, addTask, onComplete, onDelete, onDeleteFile } = useTaskActions();

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="text-lg">Cargando tareas...</div></div>;
  }

  return <TaskList tasks={tasks} addTask={addTask} onComplete={onComplete} onDelete={onDelete} onDeleteFile={onDeleteFile} />;
};

export default HomePage;