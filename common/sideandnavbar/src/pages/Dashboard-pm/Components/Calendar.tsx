import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Divider, Paper, Typography } from '@mui/material';

const Calendar = () => {
    return (
        <div>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom>
                    Calendar
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        sx={{
                            width: '100%',
                            '& .MuiPickersCalendarHeader-root': {
                                paddingLeft: 2.5,
                                paddingRight: 0.5
                            },
                            '& .MuiDayCalendar-weekContainer': {
                                justifyContent: 'space-around',
                                margin: 'auto'
                            },
                            '& .MuiDayCalendar-header': {
                                justifyContent: 'space-around',
                                margin: 'auto',
                                fontSize: '0.775rem'
                            },
                            '& .MuiPickersDay-root': {
                                height: 38,
                                fontSize: '0.775rem'
                            },

                        }}
                    />
                </LocalizationProvider>
            </Paper>
        </div>
    )
}

export default Calendar
