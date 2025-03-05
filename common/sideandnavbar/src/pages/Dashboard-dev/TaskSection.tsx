import React from "react";
import TaskItem from "./TaskItem";

// type Status = "IN_PROGRESS" | "COMPLETED" | "TODO";

interface Task {
  taskName: String;
  assignees: String[]; // if the images are URLs (change later if necessary)
  dueDate: String;
  priority: String;
  statusType: String; // change this later
}

interface TaskListProps {
  tasks: Task[];
}

const TaskSection: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center">
          <div className="text-xs me-2 text-[#FFA500]">🟡</div>
          <div>In Progress</div>
          <span className="inline-flex items-center justify-center w-4 h-4 ms-8 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            2
          </span>
        </div>
        <div className="flex">
          <span className="inline-flex items-center justify-center w-6 h-6 ms-8 text-sm font-semibold text-[#FFA500] bg-[#F7E5C4] rounded-sm pb-[3px]">
            +
          </span>
        </div>
      </div>
      <hr className="w-226 h-1 my-4 mx-auto bg-[#FFA500] border-0 rounded-sm"></hr>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Assignee</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>
      <div>
        {tasks.map((task, i) => (
          <TaskItem key={i} {...task} />
        ))}
      </div>
    </div>
  );
};

export default TaskSection;
