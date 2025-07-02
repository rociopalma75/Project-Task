import { supabase } from '@/lib/supabaseClient';
import { Task } from '@/models/Task';


// GET /api/tasks
export async function GET() {
  const { data , error } = await supabase.from('Task').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Mapear a objetos de clase Task
   const tasks = data.map(
   (t) => new Task(t.id, t.title,t.description, t.completed, t.createdAt)
   );

  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
// POST /api/tasks
export async function POST(request) {
  const body = await request.json();
  const { title, description, completed, createdAt } = body;

  const { data, error } = await supabase
    .from('Task')
    .insert([
      {
        title,
        description,
        completed,
        createdAt,
      },
    ])
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}