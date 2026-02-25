// Componente che mostra i dettagli di un task
import { useParams } from "react-router-dom";

function TaskDetail() {

    // Recupero id dall'url
    const {id} = useParams();

    return(
        <h1>id del tak: {id }</h1>
    )
}

export default TaskDetail;