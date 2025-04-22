import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService';

const LogOutButton = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("¿Desea cerrar sesión?")) {
            authService.logout();
        }
        navigate("/login");
    }

    return (
        <button
            onClick={handleLogout}
            className='cursor-pointer hover:text-green-500 transition-colors'
            title='Cerrar sesión'
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
        </button>
    )
}

export default LogOutButton