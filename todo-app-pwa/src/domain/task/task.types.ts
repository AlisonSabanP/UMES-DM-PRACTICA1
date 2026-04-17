export type Task = {
  id: string;
  title: string;
  completed: boolean;
  addedAt: Date;
  file?: { 
    name: string;
    type: string;
    data: string; 
  };
}