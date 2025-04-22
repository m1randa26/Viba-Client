
const EventTypeItem = ({ eventType, onDelete }) => {

    const handleDelete = () => {
        if (window.confirm("¿Deseas eliminar el tipo de evento?")) {
            onDelete(eventType.id_event_type);
        }
    }

    return (
        <div className="flex border border-gray-400 rounded-md mb-4 overflow-hidden">
            <div className="w-1 bg-green-500"></div>
            <div className="w-full p-4 flex items-center justify-between">
                <p>{eventType.name}</p>
                <button
                    onClick={handleDelete}
                    className="cursor-pointer rounded-md border border-red-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-red-600 hover:text-white hover:bg-red-800 hover:border-red-800 focus:text-white focus:bg-red-800 focus:border-red-800 active:border-red-800 active:text-white active:bg-red-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default EventTypeItem