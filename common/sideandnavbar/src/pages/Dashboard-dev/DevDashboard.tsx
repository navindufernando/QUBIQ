import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button/Button";

import ProjectsCard from "./ProjectsCard";
import SkillImprovementCard from "./SkillImprovementCard";
import CodeSuggestionCard from "./CodeSuggestionCard";
import CodeAnalysisCard from "./CodeAnalysisCard";
import TaskBoard from "./TaskBoard";
import Calendar from "./Components/Calendar";
import Activity from "./Components/Activity";

const DevDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleDateChange = (newDate: Dayjs) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="bg-[#E2DDFF] -m-6 p-6">
      <div className="flex">
        {/* Main Section */}
        <div className="flex-grow p-6 pt-0">
          <div className="grid grid-cols-2 gap-8">
            <ProjectsCard></ProjectsCard>
            <SkillImprovementCard></SkillImprovementCard>
            <CodeSuggestionCard></CodeSuggestionCard>
            <CodeAnalysisCard></CodeAnalysisCard>
          </div>
        </div>
        {/* Side Panel */}
        <div className="w-1/3 ">
          <div className="p-6 bg-[#D7C2F2] shadow-md rounded-xl h-auto">
            {/* Calendar */}
            <Calendar />

            {/* Activity List */}
            <Activity />
          </div>
        </div>
      </div>
      <TaskBoard></TaskBoard>
    </div>
  );
};

export default DevDashboard;
