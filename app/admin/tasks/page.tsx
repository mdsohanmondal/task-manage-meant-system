'use client';
import TaskCard from '@/app/components/cards/TaskCard';
import TaskForm from '@/app/components/forms/TaskForm';
import { EPriority } from '@/app/components/status/Priority';
import { EWorkingStatus } from '@/app/components/status/WorkingStatus';
import getTasksAdmin from '@/app/utils/getTasksAdmin';
import { Button } from '@/components/ui/button';
import { TaskWithRelations } from '@/types/task';
import { Task } from '@prisma/client';
import { format } from 'date-fns';
import { ArrowDownZA, Funnel, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Tasks = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskData, setTaskData] = useState<TaskWithRelations[]>([]);

  useEffect(() => {
    const getTaskData = async function () {
      const data = await getTasksAdmin({
        comments: 'true',
        members: 'true',
        subTask: 'true',
      });
      setTaskData(data);
    };
    getTaskData();
  }, []);
  useEffect(() => {
    console.log(taskData);
  }, [taskData]);

  return (
    <div className="w-full text-black">
      {isFormOpen && <TaskForm setIsFormOpen={setIsFormOpen} />}
      <div className="w-full flex items-center justify-between">
        <h1>All Tasks</h1>
        {/* filter section  */}
        {/* <div className="filter-section flex items-center justify-center gap-5">
          <Funnel size={18} />
          <select className="filter flex items-center justify-center gap-2 cursor-pointer bg-gray-200 px-2 py-1 rounded-2xl">
            <option value="">Status</option>
            <option value=""></option>
            <option value="">Status</option>
            <option value="">Status</option>
          </select>
          <div className="sort flex items-center justify-center gap-2 cursor-pointer bg-gray-200 px-2 py-1 rounded-2xl">
            <ArrowDownZA size={18} />
            <span>Sort</span>
          </div>
        </div> */}

        {/* action section */}
        <Button
          onClick={() => setIsFormOpen(true)}
          size="sm"
          className="cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2 cursor-pointer" />
          New Task
        </Button>
      </div>

      {/* task cards */}
      <div className="flex items-baseline justify-start gap-5 flex-wrap mt-10">
        {taskData &&
          taskData.map(
            ({
              comments,
              created_at,
              description,
              due_date,
              id,
              priority,
              title,
              is_complete,
              subTask,
              status,
              user_id,
              updated_at,
              created_by,
              attchment,
            }) => (
              <TaskCard
                key={id}
                comments={comments}
                creator={created_by}
                description={description}
                due={format(created_at, 'PPP')}
                priority={EPriority[priority]}
                subTask={subTask}
                title={title}
                workSts={EWorkingStatus[status]}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Tasks;
