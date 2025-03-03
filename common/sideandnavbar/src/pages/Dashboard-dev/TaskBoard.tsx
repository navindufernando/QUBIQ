import React from "react";

const TaskBoard = () => {
  const tasksInProgress = [
    {
      taskName: "User Role Management",
      assignees: ["img1.jpg", "img2.jpg"],
      dueDate: "Tomorrow",
      priority: "⚠",
      statusType: "IN_PROGRESS",
    },
    {
      taskName: "Implement Dark Mode",
      assignees: ["img3.jpg"],
      dueDate: "3 days ago",
      priority: "⚠",
      statusType: "IN_PROGRESS",
    },
  ];

  const tasksToDo = [
    {
      taskName: "Build Authentication System",
      assignees: ["img4.jpg"],
      dueDate: "",
      priority: "⚠",
      statusType: "TO_DO",
    },
    {
      taskName: "Testing Payment Module",
      assignees: ["img5.jpg"],
      dueDate: "2 days ago",
      priority: "⚠",
      statusType: "TO_DO",
    },
  ];

  return <div></div>;
};

export default TaskBoard;
