import React from 'react'

const AuditLogTable = ({ auditLogs }) => {
    return (
        <div className="space-y-4">
            {auditLogs.map((log, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                    <div className="flex items-center p-4">
                        {/* Avatar/Iniciales del usuario */}
                        <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-blue-700 font-bold text-lg">
                                {log.username.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        {/* Información del registro de auditoría */}
                        <div className="flex-1 grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Endpoint
                                </p>
                                <div className="flex items-center">
                                    <svg
                                        className="w-3.5 h-3.5 mr-1.5 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    <p className="font-medium text-gray-800 truncate">
                                        {log.endpoint}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Método
                                </p>
                                <div className="flex items-center">
                                    <div
                                        className={`w-3.5 h-3.5 mr-1.5 rounded-full 
                      ${log.httpMethod === "GET" ? "bg-green-100" :
                                                log.httpMethod === "POST" ? "bg-blue-100" :
                                                    log.httpMethod === "PUT" ? "bg-yellow-100" :
                                                        log.httpMethod === "DELETE" ? "bg-red-100" : "bg-gray-100"
                                            }`}
                                    />
                                    <p
                                        className={`font-medium truncate
                      ${log.httpMethod === "GET" ? "text-green-800" :
                                                log.httpMethod === "POST" ? "text-blue-800" :
                                                    log.httpMethod === "PUT" ? "text-yellow-800" :
                                                        log.httpMethod === "DELETE" ? "text-red-800" : "text-gray-800"
                                            }`}
                                    >
                                        {log.httpMethod}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Usuario
                                </p>
                                <div className="flex items-center">
                                    <svg
                                        className="w-3.5 h-3.5 mr-1.5 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <p className="font-medium text-gray-800 truncate">
                                        {log.username}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fecha en la parte inferior */}
                    <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
                        <div className="flex items-center text-sm text-gray-500">
                            <svg
                                className="w-3.5 h-3.5 mr-1.5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {new Date(log.timestamp).toLocaleString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AuditLogTable