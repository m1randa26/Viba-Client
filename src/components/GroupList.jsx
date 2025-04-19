import React, { useEffect, useState } from 'react'
import GroupItem from './GroupItem'
import { groupService } from '../services/groupService';
import LoadingSpinner from './LoadingSpinner';

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

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='grid grid-cols-3 gap-4'>
      {groups.map(group => (
        <GroupItem
          name={group.name}
          municipality={group.municipality}
          colony={group.colony}
          adminName={group.groupAdmin.name}
          email={group.groupAdmin.email}
          phone={group.groupAdmin.phone}
        />
      ))}
    </div>
  )
}

export default GroupList