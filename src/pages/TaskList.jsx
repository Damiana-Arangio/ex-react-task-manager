/* Pagina che mostra l'elenco dei Task */
import { useTasksContext } from '../context/TasksContext'
import { memo } from 'react';
import TaskRow from '../components/TaskRow';

function TaskList() {
    const { tasks } = useTasksContext();

    /*************
        RENDER 
    *************/
    return (

        <>
            {/* Tabella task */ }
            <table>

                {/* Header */}
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TaskList;