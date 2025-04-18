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
        <div className='border border-gray-400 p-4 rounded-md mb-4'>
            <div className='grid grid-cols-5'>
                <div>
                    <p className='text-gray-500'>Nombre:</p>
                    <p className='font-semibold text-gray-700'>{user.name}</p>
                </div>

                <div>
                    <p className='text-gray-500'>Correo:</p>
                    <p className='font-semibold text-gray-700'>{user.email}</p>
                </div>
                <div>
                    <p className='text-gray-500'>Teléfono:</p>
                    <p className='font-semibold text-gray-700'>{user.phone}</p>
                </div>
                <div>
                    <p className='text-gray-500'>Tipo de usuario:</p>
                    <p className='font-semibold text-gray-700'>{validateRole(user.role.nombre)}</p>
                </div>

                <div className='flex justify-end items-center'>
                    {/* <button className="cursor-pointer rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-800 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Editar
                    </button> */}
                    <button onClick={handleDelete} className="cursor-pointer rounded-md border border-red-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-800 hover:border-red-800 focus:text-white focus:bg-red-800 focus:border-red-800 active:border-red-800 active:text-white active:bg-red-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserItem