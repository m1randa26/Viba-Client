import React from 'react'

const GroupItem = ({ group, onDelete }) => {

    const handleDelete = () => {
        if (window.confirm("¿Desea eliminar el grupo?")) {
            onDelete(group.idGroup);
        }
    }

    return (
        <div className='border border-gray-300 p-4 rounded-md'>
            <p className='text-center font-semibold text-xl text-black'>{group.name}</p>
            <div className='flex flex-col mt-4'>
                <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Municipio: </span>{group.municipality}</p>
                <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Colonia: </span>{group.colony}</p>
                <div className='border-b-2 border-gray-300 my-4'></div>
                <div>
                    <p className='text-center font-semibold text-xl'>Administrador</p>
                    <div className='flex flex-col'>
                        <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Nombre: </span>{group.groupAdmin.name}</p>
                        <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Email: </span>{group.groupAdmin.email}</p>
                        <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Teléfono: </span>{group.groupAdmin.phone}</p>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="w-full mt-4 cursor-pointer rounded-md border border-red-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-800 hover:border-red-800 focus:text-white focus:bg-red-800 focus:border-red-800 active:border-red-800 active:text-white active:bg-red-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type='button'>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GroupItem