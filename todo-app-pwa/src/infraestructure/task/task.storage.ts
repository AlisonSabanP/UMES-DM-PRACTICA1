import { openDB } from 'idb';
import type { DBSchema } from 'idb';
import type { Task } from "../../domain/task/task.types";

interface TodoDB extends DBSchema {
    tasks: {
        key: string;
        value: Task;
    };
}

const DB_NAME = 'todoDB';
const DB_VERSION = 1;
const STORE_NAME = 'tasks';

const openDBConnection = () => {
    return openDB<TodoDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        },
    });
};


export function saveTasks(tasks: Task[]): Promise<void> {
    return (async () => {
        const db = await openDBConnection();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);

    await store.clear();
    for (const task of tasks) {
        await store.put(task);
    }

    await tx.done;
    })();
}

export function loadTasks(): Promise<Task[]> {
    return (async () => {
        const db = await openDBConnection();
        const allTasks = await db.getAll(STORE_NAME);
        return allTasks;
    })();
}