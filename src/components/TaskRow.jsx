// Componente che rappresenta una singola riga della tabella dei task
import { memo } from 'react';

function TaskRow(props) {

    const { task } = props;

    /************
        RENDER
    ************/
    return(
        <tr>
            <td>{task.title}</td>
            <td>
                <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>
                    {task.status}
                </span>
            </td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default memo(TaskRow);