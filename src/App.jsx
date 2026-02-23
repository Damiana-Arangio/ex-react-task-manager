import { BrowserRouter, Routes, Route } from 'react-router-dom'   // Libreria di Routing
import DefaultLayout from './layouts/Layout'                      // Layout principale
import TaskList from './pages/TaskList'                           // Pagina che mostra la lista dei task
import AddTask from './pages/AddTask'                             // Pagina per aggiungere un nuovo task
import { TasksProvider } from './context/TasksContext'            // Provider che rende disponibile il TasksContext a tutta l'app



function App() {

  return (

    <TasksProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<TaskList/>}/>
            <Route path='/add' element={<AddTask/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </TasksProvider>
  )
}

export default App
