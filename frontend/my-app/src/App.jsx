import { Routes, Route, BrowserRouter } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NotesDetails from './pages/NotesDetails'
import EditPage from './pages/EditPage';

function App() {
  return (
    <BrowserRouter>
      {/* This wrapper applies DaisyUI theme styles */}
      <div  className="min-h-screen bg-green-400  text-green-900 p-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/notes/:id" element={<NotesDetails />} />
          <Route path="/update/:id" element={<EditPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App
