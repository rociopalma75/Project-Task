"use client";
import TaskForm from '@/components/TaskForm';
import { getTaskById } from '@/lib/taskService';
import { useEffect, useState } from 'react';

export default function Page({params}) {
  const [task, setTask] = useState(null);


  const fetchTask = async () => {
    const { id } = await params;
    try {
      const res = await getTaskById(id);
      setTask(res);
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Error al obtener la tarea');
    }
  };

  useEffect(() => {
    fetchTask();
  }, [params]);

  if (!task) return <p>Cargando...</p>;

  return <TaskForm task={task} isAlta={false}/>;
}
