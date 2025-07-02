import TaskItem from '@/components/TaskItem';
import React from 'react';

export default async function Page({ params }) {
  const {id} = await params;  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`);
  const task = await res.json();

  return (
    <div>
      <TaskItem id={task.id} description={task.description} title={task.title} createdAt={task.createdAt} completed={task.completed}/>
    </div>
  );
}