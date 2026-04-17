import { useState, useRef } from 'react';

type Props = {
  addTask: (title: string, file?: File) => void;
}

export default function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask(title, selectedFile || undefined);

    setTitle('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <form onSubmit={addTaskSubmit} className="w-full flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        value={title}
        placeholder="Detalle de tarea"
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
      />
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        ref={fileInputRef}
        className="file-input file-input-bordered w-full sm:w-auto"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
      >
        Guardar
      </button>
    </form>
  )
}