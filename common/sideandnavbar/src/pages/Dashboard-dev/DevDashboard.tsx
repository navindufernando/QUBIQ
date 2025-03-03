import React, { useState } from "react";
import Calendar from "react-calendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button/Button";

import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import ProjectsCard from "./ProjectsCard";
import SkillImprovementCard from "./SkillImprovementCard";

const DevDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleDateChange = (newDate: Dayjs) => {
    setSelectedDate(newDate);
  };

  const cardStyle = {
    width: "300px",
    height: "400px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // 🔹 Styles
  const tileStyle = {
    width: "300px",
    height: "400px",
    backgroundColor: "#d7c2f2",
    borderRadius: "15px",
    padding: "15px",
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle = {
    margin: 0,
    color: "#5a4b81",
  };

  const fileCountStyle = {
    fontSize: "12px",
    color: "#5a4b81",
  };

  const dropdownStyle = {
    fontSize: "12px",
    color: "#5a4b81",
    cursor: "pointer",
  };

  const bodyStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    flexGrow: 1,
    marginTop: "10px",
  };

  return (
    // <div
    //   className="row flex items-center container-fluid px-6 pt-6"
    //   style={{ backgroundColor: "#E2DDFF", minHeight: "100vh" }}
    // >
    <div className="flex">
      {/* Main Section */}
      <div className="flex-grow p-6 pt-0">
        <div className="grid grid-cols-2 gap-8">
          <ProjectsCard></ProjectsCard>
          <SkillImprovementCard></SkillImprovementCard>
          {/* Tile 2 */}
          <div style={tileStyle}>
            <div style={headerStyle}>
              <h5 style={titleStyle}>Skills need to improve</h5>
              <span style={dropdownStyle}>This Week ▼</span>
            </div>
            <div style={bodyStyle}></div>
          </div>
          <div>02</div>
          <div>03</div>
          <div>04</div>
          <div>05</div>
        </div>
      </div>
      {/* Side Panel */}
      <div className="w-1/3 ">
        <div className="p-6 bg-[#D7C2F2] shadow-md rounded-xl h-auto">
          {/* Calendar */}
          <h2 className="text-lg font-semibold ml-3">Calendar</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate} onChange={handleDateChange} />
          </LocalizationProvider>

          {/* Activity List */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold ml-3">Activity</h2>
            {/* <div>View All</div> */}
            <Button href="#text-buttons" className="text-sm">
              View All
            </Button>
          </div>
          <div className="bg-white min-h-50 max-h-82 rounded-xl grow mx-2">
            <div>Project 1</div>
            <div>Project 2</div>
            <div>Project 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevDashboard;
