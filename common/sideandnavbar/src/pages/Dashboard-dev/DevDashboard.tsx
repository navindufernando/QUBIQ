import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import ProjectsCard from "./ProjectsCard";
import SkillImprovementCard from "./SkillImprovementCard";

const DevDashboard = () => {
  const [date, setDate] = useState(new Date());

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
      <div className="flex-grow p-6">
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
      <div className="w-1/3 p-6"></div>
    </div>
  );
};

export default DevDashboard;
