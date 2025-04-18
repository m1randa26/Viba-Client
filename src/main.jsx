import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Unauthorized from './pages/Unauthorized.jsx'
import PublicRoute from './components/PublicRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
        </Route>

        {/* Ruta accesible para cualquiera */}
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/* Rutas para admin general */}
        <Route element={<ProtectedRoute allowedRoles={[1]} />}>
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        {/* <Route path='/edit-user' element={<EditUser />} /> */}

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
