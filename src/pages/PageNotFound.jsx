import React from 'react'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
            <div className="max-w-md">
                <div className="mb-8">
                    {/* Ilustración graciosa */}
                    <svg
                        className="mx-auto w-48 h-48"
                        viewBox="0 0 512 512"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="256" cy="256" r="256" fill="#E2E8F0" />
                        <path d="M256 112c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 112 256 112zm0 264a120 120 0 110-240 120 120 0 010 240z" fill="#CBD5E0" />
                        <circle cx="208" cy="232" r="16" fill="#4A5568" />
                        <circle cx="304" cy="232" r="16" fill="#4A5568" />
                        <path d="M208 296c16 16 80 16 96 0" stroke="#4A5568" strokeWidth="8" strokeLinecap="round" />
                        <path d="M200 384c-8 16-32 16-40 0s-8-32 8-40" stroke="#A0AEC0" strokeWidth="8" strokeLinecap="round" />
                        <path d="M352 384c8 16 32 16 40 0s8-32-8-40" stroke="#A0AEC0" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-2">¡Uy! Página no encontrada</h1>
                <p className="text-gray-600 mb-6">
                    Parece que te perdiste en el ciberespacio... 🛸<br />
                    Esta página no existe (o fue abducida).
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                >
                    Volver atrás
                </button>
            </div>
        </div>
    );
}

export default PageNotFound