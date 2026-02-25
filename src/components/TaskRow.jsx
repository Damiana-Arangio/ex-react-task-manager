// Componente che rappresenta una singola riga della tabella dei task
import { memo } from 'react';
import { Link } from 'react-router-dom';

function TaskRow(props) {

    const { task } = props;

    /************
        RENDER
    ************/
    return(
        <tr>
            <td>
                <Link to={`/task/${task.id}`}>
                    {task.title}
                </Link>
            </td>
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