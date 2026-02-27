/* Pagina che mostra l'elenco dei Task */
import { useTasksContext } from '../context/TasksContext'
import TaskRow from '../components/TaskRow';
import { useCallback, useMemo, useState } from 'react';


function TaskList() {
    const { tasks } = useTasksContext();

    /*************
        HOOK 
    *************/
    const [sortBy, setSortBy] = useState("createdAt");          // criterio di ordinamento (title, status, createdAt).
    const [sortOrder, setSortOrder] = useState(1);              // direzione (1 per crescente, -1 per decrescente)
    const [searchQuery, setSearchQuery] = useState("")          // memorizzare il valore dell'input di ricerca

    // Chiamata funzione di debounce
    const funzioneRitardata = useCallback(
        debounce(setSearchQuery, 500),
        []);

    // Task ordinati
    const filteredAndSortedTasks = useMemo(() => {
        
        // Filtro di ricerca per titolo task
        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Copia array filtrato per ordinamento
        const tasksCopy = [...filteredTasks];

        // Ordinamento per titolo
        if (sortBy === "title") {
            tasksCopy.sort( (a,b) => {

                // Titolo crescente
                if (sortOrder === 1) {
                    return a.title.localeCompare(b.title);
                }

                // Titolo decrescente
                else{
                    return b.title.localeCompare(a.title);
                }
                
            } )
        }

        // Ordinamento per stato (numerico)
        if (sortBy === "status") {

            const statusOrder = {
                "To do": 0,
                "Doing": 1,
                "Done": 2
            };

            tasksCopy.sort((a, b) => {

                // Trasformo gli status in numeri
                const valueA = statusOrder[a.status];
                const valueB = statusOrder[b.status];

                // Stato crescente
                if (sortOrder === 1) {
                    return valueA - valueB;
                }

                // Stato decrescente
                else {
                    return valueB - valueA;
                }
            });
        }

        // Ordinamento per data
        if (sortBy === "createdAt") {

            tasksCopy.sort((a, b) => {

                // Trasformo le date in numeri (millisecondi trascorsi dal 1970)
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();

                // Data crescente
                if (sortOrder === 1) {
                    return dateA - dateB;
                } 

                // Data crescente
                else {
                    return dateB - dateA;
                }

            });
        }

        return tasksCopy;

    }, [tasks, sortBy, sortOrder, searchQuery]);


    /*************
        RENDER 
    *************/
    return (

        <>

            {/* Barra di ricerca */}
            <input 
                type="text"
                placeholder='Cerca un task...'
                onChange={e => funzioneRitardata(e.target.value)}
            />

            {/* Tabella task */ }
            <table>

                {/* Header */}
                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>Nome</th>
                        <th onClick={() => handleSort("status")}>Stato</th>
                        <th onClick={() => handleSort("createdAt")}> Data di creazione </th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {filteredAndSortedTasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </>
    )

    /*************
        FUNZIONI 
    *************/
    function handleSort(column) {

        // Se la colonna è già selezionata → inverto ordine (decrescente)
        if (sortBy === column) {
            setSortOrder(currNum => currNum * -1);
        } 

            // Se clicco una colonna diversa → imposto sortBy sulla nuova colonna e resetto l'ordine (crescente)
        else {
            setSortBy(column);
            setSortOrder(1);
        }
    }

    // Funzione di debounce generica
    function debounce(callback, delay) {
        let timer;

        // Funzione interna che verrà eseguita quando l'utente digita
        function funzioneRitardata(value) {

            // Se esiste già un timer attivo lo cancello
            clearTimeout(timer);

            // Creo un nuovo timer
            timer = setTimeout(function () {
                callback(value);
            }, delay);
        }

        // Restituisco la funzione interna
        return funzioneRitardata;
    }
}

export default TaskList;