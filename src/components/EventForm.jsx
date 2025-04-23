import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "./Input";


const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    status: "Próximamente",
    eventType: "",
    group: ""
  });

  const [eventTypes, setEventTypes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const typesResponse = await axios.get("http://localhost:8080/api/event-types/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEventTypes(typesResponse.data.data);

        const groupsResponse = await axios.get("http://localhost:8080/api/groups/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroups(groupsResponse.data.data);

        if (isEditMode) {
          const eventResponse = await axios.get(`http://localhost:8080/api/events/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const eventData = eventResponse.data.data;
          setFormData({
            title: eventData.title,
            date: eventData.date,
            status: eventData.status,
            eventType: eventData.eventType.id_event_type,
            group: eventData.group.idGroup
          });
          
          
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const eventTypeId = eventTypes[0]?.id_event_type;
      const groupId = groups[0]?.idGroup;


      const payload = {
        title: formData.title,
        date: formData.date,
        status: formData.status,
        eventType: { id_event_type: eventTypeId },
        group: { idGroup: groupId }
      };

<<<<<<< HEAD
=======
      if (!/^[\w\sáéíóúÁÉÍÓÚñÑ.,()-]+$/.test(formData.title)) {
        return Swal.fire({
          icon: "warning",
          title: "Título inválido",
          text: "El título solo debe contener letras, números y signos permitidos como (, . -).",
          confirmButtonColor: "#F59E0B", // amarillo
        });
      }
  
>>>>>>> origin/Eliam
      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/events/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        await Swal.fire({
          icon: "success",
          title: "¡Evento actualizado!",
          text: "El evento se actualizó correctamente.",
          confirmButtonColor: "#10B981", // verde
        });
      } else {
        await axios.post("http://localhost:8080/api/events/", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        await Swal.fire({
          icon: "success",
          title: "¡Evento creado!",
          text: "El evento se creó correctamente.",
          confirmButtonColor: "#10B981",
        });
      }

      navigate("/dashboard-group");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Ocurrió un error inesperado.",
        confirmButtonColor: "#EF4444", // rojo
      });
    }
  };



  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-semibold text-3xl mb-5">
        {isEditMode ? "Editar Evento" : "Crear Nuevo Evento"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título del Evento
            </label>
            <Input
              max={20}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Fecha del Evento
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            >
              <option value="Próximamente">Próximamente</option>
              <option value="En ejecución">En ejecución</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
              Tipo de Evento
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            >
              <option value="">Selecciona un tipo</option>
              {eventTypes.map((type) => (
                <option key={type.id_event_type} value={type.id_event_type}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="group" className="block text-sm font-medium text-gray-700">
              Grupo
            </label>
            <select
              id="group"
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            >
              <option value="">Selecciona un grupo</option>
              {groups.map((group) => (
                <option key={group.idGroup} value={group.idGroup}>{group.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard-group")}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {isEditMode ? "Actualizar Evento" : "Crear Evento"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;