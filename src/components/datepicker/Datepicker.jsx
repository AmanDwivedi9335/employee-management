import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';

const Datepicker = ({ date, setDate }) => {
  const handleChange = (newValue) => {
    setDate(newValue);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          value={date}
          onChange={handleChange}
          label="Basic date picker"
        />
      </LocalizationProvider>
    </div>
  );
};

export default Datepicker;

