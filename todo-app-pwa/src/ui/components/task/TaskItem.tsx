import type { Task } from "../../../domain/task/task.types"

type Props = {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteFile: (id: string) => void;
}

export default function TaskItem({task, onComplete, onDelete, onDeleteFile}: Props) {

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-white rounded shadow mb-4">
      <div className="flex items-center w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task.id)}
          className="mr-4 h-5 w-5 text-green-500 rounded focus:ring-green-400"
        />
        <div className="flex-grow">
          {
            task.completed ? (
              <span className="text-gray-800 line-through">{task.title}</span>
            ) : (
              <span className="text-gray-800">{task.title}</span>
            )
          }
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full mt-2">
        {task.file && (
          <div className="flex items-center gap-2">
            <span className="badge badge-outline text-xs">
              📎 {task.file.name}
            </span>
            <button
              onClick={() => onDeleteFile(task.id)}
              className="btn btn-xs btn-ghost"
              title="Eliminar adjunto"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex flex-row gap-2">
          <button 
            type="button" 
            onClick={() => onComplete(task.id)}
            className="bg-green-200 hover:bg-green-400 p-2 text-green-500 hover:text-green-700 rounded"
          >
            {task.completed ? 'Desmarcar' : 'Completar'}
          </button>
          <button 
            type="button"
            onClick={() => onDelete(task.id)}
            className="bg-red-200 hover:bg-red-400 p-2 text-red-500 hover:text-red-700 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}