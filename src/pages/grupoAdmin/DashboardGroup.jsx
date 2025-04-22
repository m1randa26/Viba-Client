import { useState } from "react";
import LogOutButton from "../../components/LogOutButton";
import { Link } from "react-router-dom";
import GroupList from "../../components/GroupList";

const DashboardGroup = () => {

  const [activeTab, setActiveTab] = useState("Grupos");

  const tabs = ["Grupos", "Eventos"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-3xl">{activeTab}</h1>
        <LogOutButton />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5 border-b-2 border-gray-300">
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
        {/* {activeTab === "Grupos" && (
          <Link to="/register">
            <button className="cursor-pointer mb-5 rounded-md border border-green-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-green-600 hover:text-white hover:bg-green-800 hover:border-green-800 focus:text-white focus:bg-green-800 focus:border-green-800 active:border-green-800 active:text-white active:bg-green-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              Agregar usuario
            </button>
          </Link>
        )}
        {activeTab === "Eventos" && (
          <Link to="/register-group">
            <button className="cursor-pointer mb-5 rounded-md border border-green-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-green-600 hover:text-white hover:bg-green-800 hover:border-green-800 focus:text-white focus:bg-green-800 focus:border-green-800 active:border-green-800 active:text-white active:bg-green-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              Crear grupo
            </button>
          </Link>
        )} */}

        {activeTab === "Grupos" && <GroupList isGroupAdmin={true} />}
        {activeTab === "Eventos" && <p>Mis eventos</p>}
      </div>
    </div>
  )
}

export default DashboardGroup