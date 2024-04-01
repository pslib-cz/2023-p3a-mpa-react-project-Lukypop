import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Gameboard from './components/Game/Gameboard.tsx'
import Index from './components/Index/Index.tsx'
import Rules from './components/Rules/Rules.tsx'
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Index />} />
        <Route path="/game" element={<Gameboard/>} />
        <Route path="/rules" element={<Rules/>} />
        
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App