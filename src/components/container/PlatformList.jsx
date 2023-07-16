import React, { useState, useEffect } from 'react';
import Platform from '../pure/Platform';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
//import { copyToClipboard } from '../../constants/copyToClipboard';
const PlatformList = () => {
  const { platforms, payments } = useSelector((state) => state);
  const { clientSelected } = useSelector((state) => state.clients);
 
  //console.log(payments);
  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text);
  };

  function copyEmailOrPass(e) {
    var text = e.target.innerText;
    copyToClipboard(text)
      .then(() => {
        toast.success('Copiado al portapapeles!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000, // Duración de 3 segundos
        });
        console.log('Texto copiado al portapapeles:', text);
      })
      .catch((err) => {
        toast.error('Error, revisa en consola!');
        alert('Hubo un error al copiar el texto al portapapeles: ' + err);
      });
  }

  return (
    <div className="col-8 row h-auto">
      
        <div className="col-2 text-center">
          <i className="bi bi-collection-play-fill"></i>
          <div>{'Servicio'}</div>
        </div>
        <div className="col-3 text-center">
          <i className="bi bi-at"></i>
          <div>{'Corrreo'}</div>
        </div>
        <div className="col-2 text-center">
          <i className="bi bi-key"></i>
          <div>Contraseña</div>
        </div>
        <div className="col-2 text-center">
          <i className="bi bi-envelope"></i>
          <div>Contraseña</div>
        </div>
        <div className="col-2 text-center">
          <i className="bi bi-calendar-day"></i>
          <div>Vence</div>
        </div>
        <div className="col-1 text-center">
          <i>. ..</i>

          <div>Mas</div>
        </div>
        {clientSelected &&
        platforms.value.filter(
          (platform) => platform.clientId === clientSelected
        ).length > 0 ? (
          platforms.value
            .filter((platform) => platform.clientId === clientSelected)
            .map((platform) => {
              return (
                <Platform
                  copyEmailOrPass={copyEmailOrPass}
                  platform={platform}
                />
              );
            })
        ) : (
          <div
            style={{ margin: '100px auto' }}
            class="col-3 alert alert-primary text-center"
            role="alert"
          >
            Nada por aquí
          </div>
        )}
      
    </div>
  );
};
export default PlatformList;
