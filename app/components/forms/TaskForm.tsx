'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type TaskFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskForm: React.FC<TaskFormProps> = ({ setIsFormOpen }) => {
  return (
    <div className="w-full min-h-screen fixed inset-0 backdrop-blur-lg bg-[#00000038] flex items-start justify-center z-40">
      {/* form section */}
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40vw] mt-20 relative border px-5 py-3 bg-white text-zinc-900 shadow-2xl rounded-md">
        <div className="flex items-baseline justify-between">
          <h1 className="text-start text-xl font-semibold mb-5">
            Create New Task
          </h1>
          <div
            title="close this create task form popup"
            onClick={() => setIsFormOpen(false)}
            className="bg-gray-100 rounded-full p-1 hover:bg-gray-200 cursor-pointer"
          >
            <X />
          </div>
        </div>

        {/* form section */}
        <div className="w-full flex flex-col gap-3">
          {/* title */}
          <div className="flex flex-col gap-2 px-3 w-full">
            <label htmlFor="title">Task Title*</label>
            <input
              className="w-full px-3 py-1 rounded-xl border bg-zinc-100"
              type="text"
              placeholder="title..."
              name="title"
              id="title"
            />
          </div>

          {/* description */}
          <div className="flex flex-col gap-2 px-3 w-full">
            <label htmlFor="description">Task Description*</label>
            <textarea
              className="w-full px-3 py-1 rounded-xl border bg-zinc-100"
              placeholder="description..."
              name="description"
              id="description"
            ></textarea>
          </div>

          {/* priority and date */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* priority */}
            <div className="flex flex-col gap-2 px-3 w-full">
              <label htmlFor="priority">Priority*</label>
              <select
                className="w-full px-3 py-1 rounded-xl border bg-gray-100 border-gray-300"
                name="priority"
                id="priority"
              >
                <option value="HEIGH">Heigh</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            {/* date */}
            <div className="flex flex-col gap-2 px-3 w-full">
              <label htmlFor="dueDate">Due Date*</label>
              <input
                className="w-full px-3 py-1 rounded-xl border bg-gray-100 border-gray-300"
                type="datetime-local"
                name="dueDate"
                id="dueDate"
              />
            </div>
          </div>

          {/* assign members */}
          <div className="w-full bg-white rounded-2xl shadow-lg p-4 space-y-4 border">
            <h1>Assign members*</h1>
            <div className="members flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
              {/* demo user */}
              <div className="user flex h-7 items-center gap-2 w-full sm:w-48 bg-[#CCE5FF] px-2 rounded-sm">
                <div className="avatar w-4 h-4 bg-green-500 rounded-full overflow-hidden">
                  <Image
                    src={'/avatar.webp'}
                    alt="avatar"
                    width={50}
                    height={50}
                  />
                </div>
                <span className="text-sm truncate">Sohan Mondal</span>
                <X size={18} className="ml-auto cursor-pointer" />
              </div>
            </div>

            {/* search input */}
            <div className="input-section">
              <input
                type="text"
                placeholder="Search member by username or email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* suggested members */}
            <div className="suggest-people bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
              <h1>Suggest member</h1>
              <div className="flex items-center gap-2 p-2 bg-white hover:bg-gray-200 cursor-pointer">
                <div className="avatar w-8 h-8 bg-blue-500 rounded-full overflow-hidden">
                  <Image
                    src={'/avatar.webp'}
                    alt="avatar"
                    width={50}
                    height={50}
                  />
                </div>
                <span className="text-gray-700 font-medium text-sm truncate">
                  Sohan Mondal
                </span>
              </div>
            </div>
          </div>

          {/* action buttons */}
          <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-2">
            <Button
              onClick={() => setIsFormOpen(false)}
              className="w-full sm:w-52 cursor-pointer"
              variant={'outline'}
            >
              Cancel
            </Button>
            <Button className="w-full sm:w-52 cursor-pointer">Create</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
