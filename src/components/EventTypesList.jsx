import { useEffect, useState } from "react"
import EventTypeItem from "./EventTypeItem"
import { eventService } from "../services/eventService"
import LoadingSpinner from "./LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";

const EventTypesList = () => {

  const [eventTypes, setEventTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await eventService.getEventTypes();
        setEventTypes(response.data.data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEventTypes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await eventService.deleteGroup(id);
      toast.success("Eliminado correctamente");
      setEventTypes(prevEventTypes => prevEventTypes.filter(eventType => eventType.id_event_type !== id));
    } catch (error) {
      console.log("Error: ", error);
      console.log(eventTypes[0])
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      {(!eventTypes || eventTypes.length === 0) &&
        <p className='text-center font-semibold text-gray-700 text-2xl col-span-3'>No hay tipos de eventos que mostrar</p>
      }
      {eventTypes && eventTypes.map(eventType => (
        <EventTypeItem key={eventType.id_event_type} eventType={eventType} onDelete={handleDelete} />
      ))}
      <ToastContainer theme="colored" />
    </div>
  )
}

export default EventTypesList