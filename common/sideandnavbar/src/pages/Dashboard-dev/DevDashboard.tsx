import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import Calendar from "./Components/Calendar";
import Activity from "./Components/Activity";
import { Grid2 } from "@mui/material";
import DashboardTabs from "./Components/DashboardTabs";

const DevDashboard = () => {
  return (
    <div className="bg-[#E2DDFF] -m-6 p-2">
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <DashboardTabs />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Calendar />
          <Activity />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default DevDashboard;
