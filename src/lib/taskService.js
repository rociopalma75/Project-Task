//PUT /api/tasks/:id
export async function updateTask(id, taskData) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Error al actualizar la tarea');
  }

  return await res.json();
}
//POST /api/tasks
export async function postTask(taskData) {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Error al crear la tarea');
  }

  return await res.json();
}
//DELETE /api/tasks/:id
export async function deleteTask(id) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Error al eliminar la tarea');
  }

  return await res.json();
}

//GET /api/tasks
export async function getTasks() {
  const res = await fetch('/api/tasks');

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Error al obtener las tareas');
  }

  return await res.json();
}

//GET /api/tasks/:id
export async function getTaskById(id) {
  const res = await fetch(`/api/tasks/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || 'Error al obtener la tarea');
  }

  return await res.json();
}