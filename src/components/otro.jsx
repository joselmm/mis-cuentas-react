import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import '../constants/luxon.config';
const Otro = () => {
  useEffect(() => {
    console.log('hey ther');
    const fecha = DateTime.now();
    const sinHora = fecha.set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    })
    /**
     const fechaInicio = DateTime.fromISO('2022-03-08T00:00');
     *  */
    console.log(sinHora);
  }, []);

  return <div>Otro</div>;
};

export default Otro;
