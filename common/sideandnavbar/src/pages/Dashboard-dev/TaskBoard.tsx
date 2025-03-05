import React from "react";
import TaskSection from "./TaskSection";

const TaskBoard = () => {
  const tasksInProgress = [
    {
      taskName: "User Role Management",
      assignees: ["img1.jpg", "img2.jpg"],
      dueDate: "Tomorrow",
      priority: "High",
      status: "IN_PROGRESS",
    },
    {
      taskName: "Implement Dark Mode",
      assignees: ["img3.jpg"],
      dueDate: "3 days ago",
      priority: "Low",
      status: "IN_PROGRESS",
    },
  ];

  const tasksToDo = [
    {
      taskName: "Build Authentication System",
      assignees: ["img4.jpg"],
      dueDate: "",
      priority: "Medium",
      status: "TO_DO",
    },
    {
      taskName: "Testing Payment Module",
      assignees: ["img5.jpg"],
      dueDate: "2 days ago",
      priority: "",
      status: "TO_DO",
    },
    {
      taskName: "Testing Payment Module",
      assignees: ["img5.jpg"],
      dueDate: "2 days ago",
      priority: "Urgent",
      status: "TO_DO",
    },
  ];

  return (
    <div className="px-12 space-y-10 mb-8">
      <TaskSection tasks={tasksInProgress} inProgress={true} />
      <TaskSection tasks={tasksToDo} inProgress={false} />
    </div>
  );
};

export default TaskBoard;
