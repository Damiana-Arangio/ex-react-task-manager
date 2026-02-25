import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function useTasks() {

    /***********
        HOOK
    ***********/
    const [tasks, setTasks] = useState([]); 
    
    // Chiamata API per recuperare la lista dei Tasks
    useEffect( () => {

        fetch(`${apiUrl}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error));
    }, []);


    /**************
        FUNZIONI
    ***************/

    // Funzione per aggiungere un nuovo task
    async function addTask(newTask) {

        // Chiamata API per aggiungere un nuovo task
        const response = await fetch(`${apiUrl}/tasks`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            })
        const data = await response.json();

        // Controllo se success è true/false
        if (data.success) {
            setTasks(currTasks => [...currTasks, data.task ]);
        }
        else {
            throw new Error(data.message);
        }
    }

    // Funzione per rimuovere un task
    async function removeTask(id) {
        const response = await fetch(`${apiUrl}/tasks/${id}`,
            { method: "DELETE" });
        const data = await response.json();

        // Controllo se success è true/false
        if(data.success) {

            setTasks(currTasks => (
                currTasks.filter(task => task.id !== id)
            ));
        }
        else{
            throw new Error(data.message);
        }
    }
    
    // Funzione per modificare un task
    function updateTask() {

    }


    return { tasks, addTask, removeTask, updateTask};
}

export default useTasks;