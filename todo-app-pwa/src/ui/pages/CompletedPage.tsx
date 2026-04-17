import useTaskActions from '../../application/task/useTaskActions';
import { selectCompletedTasks } from '../../application/task/useTaskSelectors';
import TaskList from '../components/task/TaskList';

const CompletedPage = () => {
  const { tasks, onComplete, onDelete, onDeleteFile } = useTaskActions();
  const completedTasks = selectCompletedTasks(tasks);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tareas Completadas</h1>
      <TaskList tasks={completedTasks} addTask={() => {}} onComplete={onComplete} onDelete={onDelete} onDeleteFile={onDeleteFile} />
    </div>
  );
};

export default CompletedPage;