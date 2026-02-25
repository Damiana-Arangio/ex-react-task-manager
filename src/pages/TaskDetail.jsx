// Componente che mostra i dettagli di un task
import { useParams } from "react-router-dom";
import { useTasksContext } from '../context/TasksContext'

function TaskDetail() {

    // Destructuring
    const { id } = useParams();
    const numericId = parseInt(id);

    const { tasks } = useTasksContext();

    // Recupero task
    const taskClicked = tasks.find(task => task.id === numericId);    
    console.log("taskClicked: ", taskClicked);

    if (!taskClicked) {
        return <h2>Task non trovata</h2>
    }
    /************
        RENDER
    *************/
    return(
        <>
            <article>
                <h1> {taskClicked.title} </h1>
                <p> {taskClicked.description}</p>
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

            <button onClick={()=> console.log("Elimino task", numericId)}> Elimina Task</button>
        </>
    )
}

export default TaskDetail;