import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EventList = ({ isGroupAdmin }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
  
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setEvents(events.filter((event) => event.id_event !== id));
  
        Swal.fire("¡Eliminado!", "El evento ha sido eliminado.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Hubo un problema al eliminar el evento.", "error");
      }
    }
  };
  
  const handleEdit = (id) => {
    navigate("/edit-event", {
      state: { event_id: id }
    });
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/events/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error al cargar eventos: {error}</p>;

  return (
    <div>
      {isGroupAdmin && (
        <Link to="/create-event">
          <button className="cursor-pointer mb-5 rounded-md border border-green-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-green-600 hover:text-white hover:bg-green-800 hover:border-green-800 focus:text-white focus:bg-green-800 focus:border-green-800 active:border-green-800 active:text-white active:bg-green-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Crear Evento
          </button>
        </Link>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
              {isGroupAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id_event}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.eventType?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.group?.name}</td>
                {isGroupAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link onClick={() => handleEdit(event.id_event)} className="text-green-600 hover:text-green-900 mr-3">Editar</Link>
                    <Link onClick={() => handleDelete(event.id_event)} className="text-red-600 hover:text-red-900 mr-3">Eliminar</Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;