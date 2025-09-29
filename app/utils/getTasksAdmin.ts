import { TaskWithRelations } from '@/types/task';

interface IQuerySearch {
  members?: string;
  subTask?: string;
  comments?: string;
}
async function getTasksAdmin(
  query: IQuerySearch = {}
): Promise<TaskWithRelations[]> {
  const params = new URLSearchParams();
  if (query.comments) params.append('comments', query.comments);
  if (query.members) params.append('members', query.members);
  if (query.subTask) params.append('subTask', query.subTask);

  const res = await fetch(
    `http://localhost:3000/api/admin/tasks${
      params.toString() ? '?' + params.toString() : ''
    }`
  );
  const { tasks } = await res.json();

  return tasks;
}
export default getTasksAdmin;

// ?${members}=true&${subTask}=true&${comments}=true
