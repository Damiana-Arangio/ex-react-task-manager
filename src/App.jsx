import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'   // Libreria di Routing
import DefaultLayout from './layouts/Layout'                      // Layout principale
import TaskList from './pages/TaskList'                           // Pagina che mostra la lista dei task
import AddTask from './pages/AddTask'                             // Pagina per aggiungere un nuovo task



function App() {

  return (
      <BrowserRouter>
        <Routes>

          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<TaskList/>}/>
            <Route path='/add' element={<AddTask/>} />
          </Route>

        </Routes>
      </BrowserRouter>
  )
}

export default App
