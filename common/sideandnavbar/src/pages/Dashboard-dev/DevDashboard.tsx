import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

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
    <div
      className="row flex items-center container-fluid px-6 pt-6"
      style={{ backgroundColor: "#E2DDFF", minHeight: "100vh" }}
    >
      {/* Main Section */}
      <div className="col-md-9 grid-items">
        <div className="row flex">
          <div className="col-md-6 mb-3 mr-3 grid-item">
            {/* Tile 1 */}
            <div style={tileStyle}>
              <div style={headerStyle}>
                <h5 style={titleStyle}>Projects</h5>
                <span style={fileCountStyle}>📂 52 files</span>
              </div>
              <div style={bodyStyle}></div>
            </div>
          </div>
          <div className="col-md-6 grid-item">
            {/* Tile 2 */}
            <div style={tileStyle}>
              <div style={headerStyle}>
                <h5 style={titleStyle}>Skills need to improve</h5>
                <span style={dropdownStyle}>This Week ▼</span>
              </div>
              <div style={bodyStyle}></div>
            </div>
          </div>
        </div>
        <div className="row flex">
          <div className="col-md-6 mr-3 grid-item">
            {/* Tile 3 */}
            <div style={tileStyle}>
              <div style={headerStyle}>
                <h5 style={titleStyle}>Code Suggestions</h5>
                <span style={dropdownStyle}>This Week ▼</span>
              </div>
              <div style={bodyStyle}></div>
            </div>
          </div>
          <div className="col-md-6 grid-item">
            {/* Tile 4 */}
            <div style={tileStyle}>
              <div style={headerStyle}>
                <h5 style={titleStyle}>Code analysis</h5>
                <span style={dropdownStyle}>This Week ▼</span>
              </div>
              <div style={bodyStyle}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Calender Section */}
      <div className="col-md-3 ml-20">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#d7c2f2",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ justifyContent: "" }}>Calendar</h2>
          <Calendar value={date} />
        </div>
        <div
          style={{
            backgroundColor: "#d7c2f2",
            padding: "15px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "350px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5 style={{ margin: 0, color: "#5a4b81" }}>Activity</h5>
            <a
              href="#"
              style={{
                fontSize: "12px",
                color: "#5a4b81",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              View All
            </a>
          </div>

          {/* Empty Activity List Placeholder */}
          <div
            style={{
              marginTop: "10px",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              color: "#7a6c9e",
              fontSize: "14px",
              height: "250px",
            }}
          >
            No recent activity
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevDashboard;
