import React, { useEffect, useState } from 'react'
import { bitacoraService } from '../services/bitacoraService';
import AuditLogTable from './AuditLogTable';

const Bitacora = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await bitacoraService.getRequests();

      setRequests(response.data.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registros de Auditoría</h1>
      <AuditLogTable auditLogs={requests} />
    </div>
  )
}

export default Bitacora