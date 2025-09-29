'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/cards/Card';
import TaskCard from '@/app/components/cards/TaskCard';
import TaskForm from '@/app/components/forms/TaskForm';
import { EPriority } from '@/app/components/status/Priority';
import { EWorkingStatus } from '@/app/components/status/WorkingStatus';
import getTasksAdmin from '@/app/utils/getTasksAdmin';
import { Button } from '@/components/ui/button';
import { TaskWithRelations } from '@/types/task';
import {
  BarChart3,
  Bell,
  Calendar,
  CheckSquare,
  FunnelX,
  Plus,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch tasks client side
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasksAdmin({
          members: 'true',
          comments: 'true',
          subTask: 'true',
        });
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cardData = [
    {
      id: 'card-1',
      title: 'Total Tasks',
      total: tasks.length,
      content: 'Active projects and tasks',
      color: 'text-black',
      icon: <CheckSquare className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 'card-2',
      title: 'Completed',
      total: tasks.filter((t) => t.status === EWorkingStatus.COMPLETE).length,
      content: 'Successfully finished',
      color: 'text-green-500',
      icon: <BarChart3 className="h-4 w-4 text-green-600" />,
    },
    {
      id: 'card-3',
      title: 'In Progress',
      total: tasks.filter((t) => t.status === EWorkingStatus.IN_PROGRESS)
        .length,
      content: 'Currently active',
      color: 'text-blue-500',
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
    },
    {
      id: 'card-4',
      title: 'Overdue',
      total: tasks.filter((t) => new Date(t.due_date) < new Date()).length,
      content: 'Need attention',
      color: 'text-red-500',
      icon: <Bell className="h-4 w-4 text-red-600" />,
    },
  ];

  return (
    <div className="relative">
      {/* task form popup */}
      {isFormOpen && <TaskForm setIsFormOpen={setIsFormOpen} />}

      {/* cards */}
      <div className="flex items-start justify-baseline gap-5 flex-wrap">
        {cardData.map(({ icon, color, content, id, title, total }) => (
          <Card key={id} className=" min-w-52">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${color}`}>{total}</div>
              <p className="text-xs text-muted-foreground">{content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* filter + new task btn */}
      <div className="w-full flex items-center justify-between mt-10">
        <h3 className="title">Task Board</h3>
        <div className="flex items-center justify-between gap-5">
          <FunnelX />
          <Button
            onClick={() => setIsFormOpen(true)}
            size="sm"
            className="cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2 cursor-pointer" />
            New Task
          </Button>
        </div>
      </div>

      {/* tasks */}
      <div className="grid grid-cols-3 items-center gap-5 flex-wrap mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          tasks?.map(
            ({
              description,
              title,
              due_date,
              created_by,
              id,
              status,
              priority,
              comments,
              subTask,
            }) => (
              <TaskCard
                key={id}
                subTask={subTask}
                priority={EPriority[priority]}
                workSts={EWorkingStatus[status]}
                description={description}
                title={title}
                due={new Date(due_date)
                  .toString()
                  .split(' ')
                  .slice(0, 5)
                  .join(' ')}
                creator={created_by}
                comments={comments}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
