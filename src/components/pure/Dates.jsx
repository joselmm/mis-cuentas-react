import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import '../../constants/luxon.config';
import { DateTime } from 'luxon';
//import

//setDefaultLocale('es',es)
import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Dates = ({ fieldKey, setFieldValue, startTime = new Date() }) => {
  const initialValue = typeof startTime ==="string" ? new Date(startTime) : startTime;
  const [startDate, setStartDate] = useState(initialValue);

  function handle(date) {
    setStartDate(date);
    const d = DateTime.local(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    setFieldValue(fieldKey, d.toString());

    console.log('valor a guardar: ' + d.toString());
  }

  return <DatePicker selected={startDate} onChange={handle} />;
};

export default Dates;
