import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Gameboard from './components/Game/Gameboard.tsx'
import Index from './components/Index/Index.tsx'
import Rules from './components/Rules/Rules.tsx'
import Settings from './components/Settings/Settings.tsx'
import EndScreen from './components/EndScreen.tsx'
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Index />} />
        <Route path="/game" element={<Gameboard/>} />
        <Route path="/rules" element={<Rules/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/end" element={<EndScreen/>} />

        
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App
