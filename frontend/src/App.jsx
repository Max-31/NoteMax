import './App.css'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
// import ViewNotes from './components/ViewNotes'
import Home from './components/Home'
import Input from './components/Input'
import ReCheckPopup from './components/ReCheckPopup'
import FormComponent from './components/FormComponent'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router= createBrowserRouter(
  [
    {
      path: '/',
      element:
      <div>
        {/* <Navbar />
        <ViewNotes /> */}
        <Home />
      </div>
    },
    {
      path: '/create',
      element: 
      <div>
        <Navbar />
        <Input />
      </div>
    },
    {
      path: '/edit/:id',
      element: 
      <div>
        <Input />
      </div>
    },
    {
      path: '/delete/:id',
      element:
      <div>
        <ReCheckPopup />
      </div>
    },
    {
      path: '/login',
      element:
      <FormComponent />
    },
    {
      path: '/signUp',
      element:
      <FormComponent />
    }
  ]
)

function App() {
  return (
    
    <div className='app'>
      {/* <ViewNotes /> */}
      <RouterProvider router={router}/>
      <Toaster />
    </div>
  )
}

export default App