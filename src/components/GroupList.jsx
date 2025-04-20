import React, { useEffect, useState } from 'react'
import GroupItem from './GroupItem'
import { groupService } from '../services/groupService';
import LoadingSpinner from './LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';

const GroupList = () => {

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await groupService.getGroups();
        setGroups(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroups();
  }, []);

  const handleDelete = async (id) => {
    try {
      await groupService.deleteGroup(id);
      toast.success("Grupo eliminado");
      setGroups(prevGroups => prevGroups.filter(group => group.idGroup !== id));
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='grid grid-cols-3 gap-4'>
      {(!groups || groups.length === 0) &&
        <p className='text-center font-semibold text-gray-700 text-2xl col-span-3'>No hay grupos que mostrar</p>
      }
      {groups && groups.map(group => (
        <GroupItem
          key={group.id}
          group={group}
          onDelete={handleDelete}
        />
      ))}
      <ToastContainer theme='colored' />
    </div>
  )
}

export default GroupList