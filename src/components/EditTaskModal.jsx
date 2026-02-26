import { useRef, useState } from "react";
import Modal from "./Modal";

function EditTaskModal(props) {

    // Destructuring delle props
    const { show, onClose, task, onSave} = props;

    /***********
        HOOK
    ************/

    // Campi Controllati del form
    const [formData, setFormData] = useState({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || ""
    })

    // Ref per ottenere accesso diretto al form
    const editFormRef = useRef();

    /************
        RENDER
    *************/
    return(

        <>
 

            {/* Modale */}
            <Modal
                show={show}
                onClose={onClose}
                title = "Modifica Task"
                confirmText="Salva"
                onConfirm = {onConfirm}
                content = {
                    <form onSubmit={handleSubmit} ref={editFormRef} >
                        {/* Titolo */}
                        <div>
                            <label htmlFor="title"> Nome Task:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleFormData}
                            />
                        </div>

                        {/* Descrizione */}
                        <div>
                            <label htmlFor="description"> Descrizione Task: </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleFormData}
                            />
                        </div>

                        {/* Stato */}
                        <div>
                            <label htmlFor="status"> Stato: </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleFormData}
                            >
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                    </form>
                }
            />
        </>
    )

    /**************
        FUNZIONI
    **************/

    // Funzione che gestisce l'aggiornamento dei campi del form
    function handleFormData(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Funzione che gestisce il submit del form
    function handleSubmit(event) {
        event.preventDefault();

        // Passaggio della task aggiornata
        onSave({
            ...task,
            ...formData
        });
    }

    // Funzione che attiva manualmente il submit del form
    function onConfirm() {
        editFormRef.current.requestSubmit();
    }
}

export default EditTaskModal;