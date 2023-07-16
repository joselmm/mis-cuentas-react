import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
//const config = new Settings();
import Platform from '../models/platform.class';
//console.log(Settings.locale)

//import { update } from '../features/client';

const Actualizar = () => {
  const clients = useSelector((state) => state.clients.value);
  useEffect(() => {
    console.log(clients);
    const ms = Date.now();
    //const fecha = DateTime.fromMillis(ms,{ locale: 'co' });
    const fecha = DateTime.now();
    /**
     const fechaInicio = DateTime.fromISO('2022-03-08T00:00');
     *  */
    console.log(fecha); // Imprime  2022-03-08T12:00:00.000-05:00
    //console.log(state);

    const product = new Platform({});
    console.log(product);
  }, []);
  return (
    <div>
      {clients.map((client) => (
        <li>{JSON.stringify(client)}</li>
      ))}
    </div>
  );
};

export default Actualizar;
