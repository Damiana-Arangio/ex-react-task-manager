// Componente che rappresenta una singola riga della tabella dei task

function TaskRow(props) {

    const { task } = props;

    /************
        RENDER
    ************/
    return(
        <tr>
            <td>{task.title}</td>
            <td>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default TaskRow;