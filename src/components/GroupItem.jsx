import React from 'react'

const GroupItem = ({ name, municipality, colony, adminName, email, phone }) => {
    return (
        <div className='border border-gray-300 p-4 rounded-md'>
            <p className='text-center font-semibold text-xl text-black'>{name}</p>
            <div className='flex flex-col mt-4'>
                <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Municipio: </span>{municipality}</p>
                <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Colonia: </span>{colony}</p>
                <div className='border-b-2 border-gray-300 my-4'></div>
                <div>
                    <p className='text-center font-semibold text-xl'>Administrador</p>
                    <div className='flex flex-col'>
                        <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Nombre: </span>{adminName}</p>
                        <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Email: </span>{email}</p>
                        <p className='text-gray-700 font-semibold'><span className='text-gray-500'>Teléfono: </span>{phone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupItem