'use client';

import { useEffect, useState } from 'react';
import TaskList from '../../components/TaskList'
import { getTasks } from '@/lib/taskService';


export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  const fetchTasks = async () => {
    try{
      const res = await getTasks()
      setTasks(res);
    }catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error al obtener las tareas');
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [updateFlag]);

  
  const handleChildChange = () => {
    setUpdateFlag((prev) => !prev); // cambiar el valor para que se dispare el useEffect
  };

  return (
    <div>
      <TaskList tasks={tasks} onChange={handleChildChange}/> 
    </div>
  );
}