import { Calendar, Users } from 'lucide-react';
import Priority, { EPriority } from '../status/Priority';
import WorkingStatus, { EWorkingStatus } from '../status/WorkingStatus';
import getUsers from '@/app/utils/getUserAdmin';
import { Comment, SubTask } from '@prisma/client';
import { useEffect, useState } from 'react';
type TaskCardProps = {
  title: string;
  description: string;
  workSts: EWorkingStatus;
  priority: EPriority;
  due: string;
  creator: string;
  comments: Comment[];
  subTask: SubTask[];
};

type UserData = {
  id: string;
  username: string;
  email: string;
};
const TaskCard = ({
  workSts,
  priority,
  title,
  due,
  description,
  creator,
  comments,
  subTask,
}: TaskCardProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const isCmSubTsk = 10;
  useEffect(() => {
    (async function () {
      const creatorData = await getUsers({ userId: creator });
      setUser(creatorData);
    })();
  }, []);

  return (
    <div className="w-72 border border-red-400 min-h-96 rounded-2xl px-5 py-2">
      {/* title here...  */}
      <h1 className="text-lg font-medium tracking-tighter text-gray-800">
        {title}
      </h1>
      {/* description here...  */}
      <p className="text-sm mt-2">{description}</p>
      {/* status  */}
      <div className="flex items-center justify-start gap-5 mt-15">
        <Priority status={EPriority[priority]} />
        <WorkingStatus status={EWorkingStatus[workSts]} />
      </div>
      {/* due date section  */}
      <div className="flex items-center justify-start gap-2 mt-5">
        <Calendar size={16} />
        <p className="text-sm text-zinc-500">Due {due}</p>
      </div>
      {/* if have subtask then show the subtask complete */}

      <div className="mt-5">
        <div className="flex items-center justify-between mb-1">
          <h3>Sub tasks</h3>
          <h3>{23 + '/' + isCmSubTsk}</h3>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-xl overflow-hidden">
          <div
            style={{ width: 100 / (35 / isCmSubTsk) + '%' }}
            className="h-2 bg-blue-400 rounded-xl "
          ></div>
        </div>
      </div>

      {/* members section*/}
      <div className="mt-5 flex items-center justify-start gap-2">
        <Users size={16} />
        <div className="users flex items-center justify-start -space-x-2">
          <div className="user w-6 h-6 border border-zinc-800 rounded-full bg-blue-500"></div>
          <div className="user w-6 h-6 border border-zinc-800 rounded-full bg-green-500"></div>
          <div className="user w-6 h-6 border border-zinc-800 rounded-full bg-red-500"></div>
          <div className="user w-6 h-6 border border-zinc-800 rounded-full bg-yellow-500"></div>
        </div>
      </div>
      {/* created by name  */}
      <div className="mt-2">
        <p className="text-[13px] text-gray-700">Created by {user?.username}</p>
      </div>

      {/* if comments the show  */}
      {comments.length > 0 && (
        <div>
          <h1 className="text-sm text-gray-600 mt-2">
            Comments {comments?.length}
          </h1>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
