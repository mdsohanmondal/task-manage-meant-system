interface IUserQuery {
  userId?: string;
  tasks?: string;
}
async function getUsers(query: IUserQuery = {}) {
  const params = new URLSearchParams();
  if (query.tasks) params.append('tasks', query.tasks);
  if (query.userId) params.append('userId', query.userId);
  const res = await fetch(
    `http://localhost:3000/api/admin/users${
      params.toString() ? '?' + params.toString() : ''
    }`
  );
  const { user } = await res.json();
  return user;
}

export default getUsers;
