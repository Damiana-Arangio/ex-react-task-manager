import { useState, useEffect } from "react";

function useTasks() {

    const [tasks, setTasks] = useState([]); 
    
    // Chiamata API per recuperare la lista dei Tasks
    useEffect( () => {
        const apiUrl = import.meta.env.VITE_API_URL;

        fetch(`${apiUrl}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error));
    }, []);

    // Funzione per aggiungere un nuovo task
    function addTask() {

    }

    // Funzione per rimuovere un task
    function removeTask() {

    }
    // Funzione per modificare un task
    function updateTask() {

    }


    return { tasks, addTask, removeTask, updateTask};
}

export default useTasks;