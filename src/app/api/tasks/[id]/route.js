import { supabase } from '@/lib/supabaseClient';
import { Task } from '@/models/Task';

// GET /api/tasks/[id]
export async function GET(request, { params }) {
  const id = request.nextUrl.pathname.split('/').pop();
  
  const { data, error } = await supabase
    .from('Task') 
    .select('*')
    .eq('id', id)
    .single(); // devuelve un solo objeto en vez de array

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const task = new Task(data.id, data.title, data.description, data.completed, data.createdAt);

  return new Response(JSON.stringify(task), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// DELETE /api/tasks/[id]
export async function DELETE(request) {
  const id = request.nextUrl.pathname.split('/').pop();

  const { error } = await supabase
    .from('Task') 
    .delete()
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: 'Tarea eliminada correctamente' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
// PUT /api/tasks/[id]
export async function PUT(request) {
  const id = request.nextUrl.pathname.split('/').pop();

  const body = await request.json(); // lo que llega del frontend
  const { title, description, completed, createdAt } = body;

  const { data, error } = await supabase
    .from('Task')
    .update({ title, description, completed, createdAt })
    .eq('id', id)
    .select()
    .single();  

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}