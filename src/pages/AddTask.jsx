/* Pagina che consente di aggiungere un nuovo Task */
import { useMemo, useRef, useState } from "react";
import { useTasksContext } from "../context/TasksContext";

// Set di caratteri validi per la validazione di title
const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~`;

function AddTask() {

    const {addTask} = useTasksContext();

    /**********
        HOOK
    ***********/
    // Campi Controllati
    const [title, setTitle] = useState("");

    // Campi NON controllati
    const descriptionRef = useRef();
    const statusRef = useRef()

    /*****************
        VALIDAZIONI
    ******************/
    // Validazione titolo
    const isTitleValid = useMemo (() => {
        let isValid = true;

        // Controllo se title è vuoto
        if (title.trim().length === 0) {
            isValid = false;
        } else {
            // Controllo se title contiene simboli vietati
            const titleArray = title.split("");                     // Conversione stringa -> array
            isValid = titleArray.every(carattereTitolo => (
                !symbols.includes(carattereTitolo)
            ))
        }

        return isValid;

    }, [title]);

    /*************
        RENDER 
    *************/
    return(
        <form onSubmit={handleSubmit}>

            {/* Titolo */}
            <div>
                <label htmlFor="title"> Titolo </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>

            {/* Validazione titolo */}
            {
                title && (
                    <p className="error-color">
                        {!isTitleValid ? "Titolo non valido!" : ""}
                    </p>
                )
            }


            {/* Descrizione  */}
            <div>
                <label htmlFor="description"> Descrizione </label>
                <textarea
                    id="description"
                    name="description"
                    ref={descriptionRef}
                />
            </div>

            
            {/* Stato  */}
            <div>
                <label htmlFor="status"> Stato </label>
                <select 
                    id="status"
                    name="status"
                    ref={statusRef}
                    defaultValue="to-do"
                >
                    <option value="To do"> To do</option>
                    <option value="Doing"> Doing </option>
                    <option value="Done"> Done </option>
                </select>
            </div>

            {/* Bottone per aggiungere il nuovo task */}
            <button 
                type="submit"
                disabled={!isTitleValid}
            > 
                Aggiungi Task 
            </button>
                
        </form>
    )

    /**************
        FUNZIONI
    ***************/

    // Funzione che gestisce il submit del form
    async function handleSubmit(event) {
        event.preventDefault();


        // Creo nuovo task
        const newTask = {
            title: title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        // Chiamata funzione per aggiungere il nuovo Task
        try {
            await addTask(newTask);
            alert("Task creata con successo!");

            // Reset del form
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "";
        }
        catch(error) {
            alert(error.message);
        }
        
    }
}

export default AddTask;