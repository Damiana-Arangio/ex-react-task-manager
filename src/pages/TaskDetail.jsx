// Componente che mostra i dettagli di un task
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTasksContext } from '../context/TasksContext'
import { useState } from "react";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


function TaskDetail() {

    // Destructuring
    const { id } = useParams();
    const numericId = parseInt(id);
    const { tasks, removeTask, updateTask } = useTasksContext();

    // Recupero task
    const taskClicked = tasks.find(task => task.id === numericId);   
    
    if (!taskClicked) {
        return <h2>Task non trovata</h2>;
    } 

    /************
        HOOK
    *************/
    const navigate = useNavigate();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

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

            {/* Bottoni */}
                <button onClick={() => setShowModalUpdate(true)}>
                    Modifica Task
                </button>

                <button onClick={() => setShowModalDelete(true)}>
                    Elimina Task
                </button>

            {/* Modale Eliminazione */}
            <Modal
                show={showModalDelete}
                title = {"Conferma Eliminazione"}
                content = {`Sei sicuro di voler eliminare "${taskClicked.title}" ?`}
                onConfirm={handleDelete}
                onClose={() => setShowModalDelete(false)}
            />

            {/* Modale Aggiornamento */}
            <EditTaskModal
                show={showModalUpdate}
                onClose={() => setShowModalUpdate(false)}
                task={taskClicked}
                onSave={handleUpdate}
            />
            
        </>
    );

    /**************
        FUNZIONI
    ***************/

    // Funzione che gestisce l'eliminazione di un task
    async function handleDelete() {

        try {
            await removeTask(numericId);
            alert("Task eliminata con successo!");
            setShowModalDelete(false);
            navigate("/");
            
        }
        catch(error) {
            alert(error.message);
        }
    }

    // Funzione che gestisce la modifica di un task
    async function handleUpdate(updatedTask) {
        try {
            await updateTask(updatedTask);
            alert("Task modificata con successo!");
            setShowModalUpdate(false);
            navigate("/");

        } catch (error) {
            alert(error.message);
        }
    }
}

export default TaskDetail;