import React, { useState } from 'react';
import { eventService } from '../services/eventService';

const EventItem = ({ event }) => {
  const [confirmed, setConfirmed] = useState(false); // Estado local

  const handleConfirmAttendance = (eventId) => {
    eventService.confirmAttendance(eventId)
      .then((response) => {
        alert('Asistencia confirmada');
        setConfirmed(true);
        localStorage.setItem(`confirmed-${eventId}`, 'true'); // Guardar confirmación
      })
      .catch((error) => {
        alert('Hubo un error al confirmar la asistencia');
      });
  };

  return (
    <div className="flex border border-gray-400 rounded-md mb-4 overflow-hidden">
      <div className="w-1 bg-green-500"></div>
      <div className="w-full p-4 flex flex-col">
        <h3 className="font-semibold text-xl">{event.title}</h3>
        <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Estado: {event.status === '1' ? 'Activo' : 'Inactivo'}</p>
        <p className="text-sm text-gray-500">Tipo de Evento: {event.eventType.name}</p>

        <div className="mt-2">
          <p className="font-semibold">Grupo:</p>
          <p className="text-sm text-gray-500">{event.group.name}</p>
          <p className="text-sm text-gray-500">{event.group.municipality}, {event.group.colony}</p>
        </div>

        <div className="flex space-x-2 mt-4">
          <button
            className="cursor-pointer rounded-md border border-green-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-green-600 hover:text-white hover:bg-green-800 hover:border-green-800 disabled:opacity-50"
            type="button"
            onClick={() => handleConfirmAttendance(event.id_event)}
            disabled={confirmed} // Deshabilitado si se confirmó
          >
            {confirmed ? 'Confirmado' : 'Confirmar'}
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default EventItem;
