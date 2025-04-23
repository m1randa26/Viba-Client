import { useNavigate } from "react-router-dom"

const Unauthorized = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-48 h-48 mx-auto mb-6"
        >
          <circle cx="100" cy="100" r="95" fill="#fef3c7" stroke="#f59e0b" strokeWidth="10" />
          <path d="M60 130c10-10 70-10 80 0" stroke="#b91c1c" strokeWidth="8" strokeLinecap="round" />
          <circle cx="70" cy="80" r="8" fill="#000" />
          <circle cx="130" cy="80" r="8" fill="#000" />
          <text x="100" y="180" textAnchor="middle" fontSize="18" fill="#b91c1c" fontWeight="bold">401</text>
        </svg>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Acceso no autorizado</h1>
        <p className="text-gray-600 mb-6">
          Parece que no tienes los permisos necesarios para ver esta página. 🚫
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default Unauthorized