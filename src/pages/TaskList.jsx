/* Pagina che mostra l'elenco dei Task */
import { useTasksContext } from '../context/TasksContext'

function TaskList() {
    const { tasks } = useTasksContext();
    console.log("Lista task: ", tasks)

    /*************
        RENDER 
    *************/
    return (
        <h1>TaskList</h1>
    )
}

export default TaskList;