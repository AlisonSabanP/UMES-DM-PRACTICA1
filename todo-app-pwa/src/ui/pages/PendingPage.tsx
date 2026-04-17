import useTaskActions from '../../application/task/useTaskActions';
import { selectPendingTasks } from '../../application/task/useTaskSelectors';
import TaskList from '../components/task/TaskList';

const PendingPage = () => {
  const { tasks, onComplete, onDelete, onDeleteFile } = useTaskActions();
  const pendingTasks = selectPendingTasks(tasks);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tareas Pendientes</h1>
      <TaskList tasks={pendingTasks} addTask={() => {}} onComplete={onComplete} onDelete={onDelete} onDeleteFile={onDeleteFile} />
    </div>
  );
};

export default PendingPage;