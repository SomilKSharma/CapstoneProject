import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/Login";
import Register from './pages/Register';
import Home from './pages/Home';
import SingleMovie from './pages/SingleMovie';
import Admin from './pages/Admin';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/movie/:id" element={
            <ProtectedRoute>
              <SingleMovie />
            </ ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
