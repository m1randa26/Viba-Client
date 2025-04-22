import React from 'react'

const UserItem = ({ user, onDelete }) => {

    const validateRole = (rol) => {
        let role = '';

        if (rol === 'ADMIN_GROUP_ROLE') {
            role = "Admin Grupo";
        } else if (rol === "ADMIN_ROLE") {
            role = "Admin general"
        } else if (rol === "MEMBER_ROLE") {
            role = "Miembro";
        }

        return role.toUpperCase();
    }

    const handleDelete = () => {
        if (window.confirm("¿Deseas eliminar el usuario?")) {
            onDelete(user.idUser);
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300 mb-4">
            <div className="flex items-center p-4">
                {/* Avatar del usuario */}
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-700 font-bold text-lg">{user.name.charAt(0)}</span>
                </div>

                {/* Información del usuario */}
                <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Nombre</p>
                        <div className="flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <p className="font-medium text-gray-800 truncate">{user.name}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Correo</p>
                        <div className="flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <p className="font-medium text-gray-800 truncate">{user.email}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Teléfono</p>
                        <div className="flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <p className="font-medium text-gray-800 truncate">{user.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Rol del usuario y acciones */}
                <div className="flex items-center space-x-4 ml-4">
                    <div className="mr-2">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tipo de usuario</p>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {validateRole(user.role.nombre)}
                        </div>
                    </div>

                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center rounded-md border border-red-300 py-1.5 px-3 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                        type="button"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserItem