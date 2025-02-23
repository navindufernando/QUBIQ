import React from "react";

const DevDashboard = () => {
  const cardStyle = {
    width: "300px",
    height: "400px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="row flex items-center container-fluid">
      {/* Main Section */}
      <div className="col-md-9 grid-items">
        <div className="row flex">
          <div className="col-md-6 mb-3">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h2 className="card-title">Projects</h2>
                <p className="card-text">Content for section 1.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-item">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h2 className="card-title">Projects</h2>
                <p className="card-text">Content for section 1.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row flex">
          <div className="col-md-6 grid-item">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h2 className="card-title">Projects</h2>
                <p className="card-text">Content for section 1.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-item">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h2 className="card-title">Projects</h2>
                <p className="card-text">Content for section 1.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Calender Section */}
      <div className="col-md-3">
        <h3>Hi this is the dev dashboard</h3>
      </div>
    </div>
  );
};

export default DevDashboard;
