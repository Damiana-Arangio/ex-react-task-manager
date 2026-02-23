import { createContext, useState, useEffect, useContext } from "react";
import useTasks from "../hooks/useTasks";

// Creazione del contesto
const TasksContext = createContext();

// Fornitura del contesto
function TasksProvider({children}) {

    // Recupero stato e funzioni dei task tramite il custom hook useTasks
    const tasksData = useTasks();

    /************
        RENDER
    ************/
    return (
        <TasksContext.Provider value={tasksData}>
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