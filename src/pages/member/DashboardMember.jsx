import { useEffect, useState } from "react";
import LogOutButton from "../../components/LogOutButton";
import EventItem from "../../components/EventItem";
import { eventService } from "../../services/eventService";

const DashboardGroup = () => {
  const [activeTab, setActiveTab] = useState("Eventos");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["Eventos"];

  useEffect(() => {
    eventService.getEvents()
      .then((res) => {
        console.log("Respuesta de la API:", res.data); // 👈 mira aquí qué trae `res.data`
        setEvents(res.data.data);
      })
      .catch((err) => {
        console.error("Error al obtener eventos:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-3xl">{activeTab}</h1>
        <LogOutButton />
      </div>

      <div className="gap-3 mt-5 border-b-2 border-gray-300">
        {tabs.map((tab) => (
          <div key={tab}>
            <button
              className={`w-full text-left py-2 font-medium transition duration-200 cursor-pointer
                ${activeTab === tab
                  ? "border-b-2 border-green-500 text-green-600"
                  : "border-b-2 border-transparent hover:border-green-500"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "Eventos" && (
          <>
            {loading ? (
              <p className="text-gray-500">Cargando eventos...</p>
            ) : events.length === 0 ? (
              <p className="text-gray-500">No hay eventos disponibles.</p>
            ) : (
              events.map(event => (
                <EventItem key={event.id_event} event={event} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardGroup;
