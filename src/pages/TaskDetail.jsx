// Componente che mostra i dettagli di un task
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTasksContext } from '../context/TasksContext'
import { useState } from "react";
import Modal from "../components/Modal";


function TaskDetail() {

    // Destructuring
    const { id } = useParams();
    const numericId = parseInt(id);
    const { tasks, removeTask } = useTasksContext();

    // Recupero task
    const taskClicked = tasks.find(task => task.id === numericId);   
    
    if (!taskClicked) {
        return <h2>Task non trovata</h2>;
    } 

    /************
        HOOK
    *************/
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    /************
        RENDER
    *************/
    return (
        <>
            {/* Task */}
            <article>
                <h1>{taskClicked.title}</h1>

                <p>{taskClicked.description}</p>

                <p>
                    <strong>Stato:</strong> {taskClicked.status}
                </p>

                <p>
                    <strong>Data di creazione:</strong>{" "}
                    <time dateTime={taskClicked.createdAt}>
                        {new Date(taskClicked.createdAt).toLocaleDateString()}
                    </time>
                </p>
            </article>

            {/* Bottone */}
            <button onClick = {() => setShowModal(true)}>
                Elimina Task
            </button>

            {/* Modale */}
            <Modal
                show={showModal}
                title = {"Conferma Eliminazione"}
                content = {`Sei sicuro di voler eliminare "${taskClicked.title}"?`}
                onConfirm = {onConfirm}
                onClose={onClose}
            />
            
        </>
    );

    /**************
        FUNZIONI
    ***************/

    // Chiamata funzione per eliminare un Task
    async function onConfirm() {

        try {
            await removeTask(numericId);
            alert("Task eliminata con successo!");
            navigate("/");
            
        }
        catch(error) {
            alert(error.message);
        }
    }

    function onClose() {
        setShowModal(false);
    }
}

export default TaskDetail;