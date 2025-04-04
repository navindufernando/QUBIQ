import { Divider, Paper, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Calendar = () => {
  return (
    <>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom>
          Calendar
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{
              width: "100%",
              "& .MuiPickersCalendarHeader-root": {
                paddingLeft: 2.5,
                paddingRight: 2.5,
              },
              "& .MuiDayCalendar-weekContainer": {
                justifyContent: "space-around",
                margin: "auto",
              },
              "& .MuiDayCalendar-header": {
                justifyContent: "space-around",
                margin: "auto",
                fontSize: "0.775rem",
              },
              "& .MuiPickerDay-root": {
                height: 38,
                fontSize: "0.775rem",
              },
            }}
          />
        </LocalizationProvider>
      </Paper>
    </>
  );
};

export default Calendar;
