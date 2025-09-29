// types/task.ts
import { Task, Comment, SubTask } from '@prisma/client';

export type TaskWithRelations = Task & {
  comments: Comment[];
  subTask: SubTask[];
};
