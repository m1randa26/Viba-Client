import React from 'react'
import { useNavigate } from 'react-router-dom';

const GroupItem = ({ group, onDelete, button = false, isGroupAdmin = false }) => {

    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm("¿Desea eliminar el grupo?")) {
            onDelete(group.idGroup);
        }
    }

    const handleAssign = () => {
        navigate("/member-assignment", {
            state: { groupId: group.idGroup }
        });
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            {/* Encabezado con nombre del grupo y ubicación */}
            <div className="bg-green-50 p-4 border-b border-gray-200">
                <h3 className="font-bold text-xl text-green-800">{group.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{group.municipality}, {group.colony}</span>
                </div>
            </div>

            {/* Información del administrador */}
            <div className="p-4">
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Administrador</h4>
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-700 font-bold text-lg">{group.groupAdmin.name.charAt(0)}</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{group.groupAdmin.name}</p>
                            <div className="flex items-center text-xs text-gray-600 mt-1">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span>{group.groupAdmin.email}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600 mt-1">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <span>{group.groupAdmin.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Miembros */}
                <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Miembros</h4>
                    <div className="border-l-2 border-gray-200 pl-3 py-1 space-y-3">
                        {group.members && group.members.length > 0 ? (
                            group.members.map((member) => (
                                <div key={member.user.idUser}>
                                    <p className="text-sm font-medium text-gray-900">{member.user.name}</p>
                                    <div className="flex items-center text-xs text-gray-600 mt-1">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{member.user.email}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-600 mt-1">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>{member.user.phone}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No hay miembros asignados todavía.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Botón de eliminar */}
            {button && (
                <div className="px-4 pb-4">
                    <button
                        onClick={handleDelete}
                        className="w-full flex items-center justify-center rounded-md border border-red-300 py-2 px-4 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                        type="button"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Eliminar
                    </button>
                </div>
            )}
            {isGroupAdmin && (
                <div className="px-4 pb-4">
                    <button
                        onClick={handleAssign}
                        className="w-full flex items-center justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                        Asignar miembros
                    </button>
                </div>
            )}
        </div>
    )
}

export default GroupItem