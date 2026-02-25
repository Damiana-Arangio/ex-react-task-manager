// Componente che mostra i dettagli di un task
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useTasksContext } from '../context/TasksContext'

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

    // Hook
    const navigate = useNavigate();

    /************
        RENDER
    *************/
    return (
        <>
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

            <button onClick={handleClick}>
                Elimina Task
            </button>
        </>
    );

    /**************
        FUNZIONI
    ***************/

    // Chiamata funzione per eliminare un Task
    async function handleClick() {

        try {
            await removeTask(numericId);
            alert("Task eliminata con successo!");
            navigate("/");
            
        }
        catch(error) {
            alert(error.message);
        }
    }
}

export default TaskDetail;