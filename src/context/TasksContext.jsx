import { createContext, useState, useEffect, useContext } from "react";

// Creazione del contesto
const TasksContext = createContext();

// Fornitura del contesto
function TasksProvider({children}) {

    const [tasks, setTasks] = useState([]); 
    
    useEffect( () => {
        const apiUrl = import.meta.env.VITE_API_URL;

        fetch(`${apiUrl}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
}

// Hook personalizzato per il contesto
function useTasksContext() {
    const taskContext = useContext(TasksContext)
    return taskContext;
}


export { TasksProvider, useTasksContext };