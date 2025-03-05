import React from "react";

interface Task {
  taskName: String;
  assignees: String[]; // if the images are URLs (change later if necessary)
  dueDate: String;
  priority: String;
  statusType: String; // change this later
}

const TaskItem = ({ taskName, assignees, dueDate, priority, statusType }) => {
  return (
    <div className="flex items-center justify-between">
      <span>{taskName}</span>
      <div className="flex">
        {assignees.map((assignee, i) => {
          <img
            key={i}
            src={assignee}
            alt="Assignee"
            className="w-6 h-6 rounded-full -ml-1"
          />;
        })}
      </div>
    </div>
  );
};

export default TaskItem;
