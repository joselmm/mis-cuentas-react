import React, { useState } from 'react';
import PAYMENT_STATUSES from '../../constants/paymentStatuses.enum';
import 'react-toastify/dist/ReactToastify.css';

import { parseISOFormatDate } from '../../constants/time.functions';

const Platform = ({ copyEmailOrPass, platform }) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => setExpand((pre) => !pre);
  const paymentStatusFlag = (value) => {
    switch (value) {
      case PAYMENT_STATUSES.PARTIALLY_PAID:
        return (
          <span style={{ color: 'orange' }}>
            <b>PAGO PARCIAL</b>
          </span>
        );
      case PAYMENT_STATUSES.PENDING:
        return (
          <span style={{ color: 'red' }}>
            <b>PAGO PENDIENTE</b>
          </span>
        );
      case PAYMENT_STATUSES.PAID:
        return (
          <span style={{ color: 'green' }}>
            <b>PAGADO</b>
          </span>
        );
    }
  };

  function parsedDate(ISOString) {
    var date = parseISOFormatDate(ISOString);
    if (new Date().getFullYear() === date.fullYear) {
      return `${date.date} ${date.month}`;
    }
    return `${date.date} ${date.month} ${date.fullYear}`;
  }
  return (
    <>
      <div
        className="col-2 text-left"
        onClick={toggleExpand}
        style={{ cursor: 'default' }}
      >
        <i
          class={expand ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'}
        ></i>
        {platform.platformName.replace('_', ' ')}
      </div>
      <div
        className="col-3 text-center cursor-pointer text-truncate"
        onClick={copyEmailOrPass}
      >
        {platform.email}
      </div>
      <div
        className="col-2 text-center cursor-pointer"
        onClick={copyEmailOrPass}
      >
        {platform.password}
      </div>
      <div
        className="col-2 text-center cursor-pointer"
        onClick={copyEmailOrPass}
      >
        {platform.emailPassword}
      </div>
      <div className="col-2 text-center">
        {parsedDate(platform.nextBillingDate)}
      </div>
      <div className="col-1 text-center">
        <i
          style={{ cursor: 'pointer', margin: '4px' }}
          className="bi bi-pencil-fill"
        ></i>
        <i
          style={{ cursor: 'pointer', margin: '4px' }}
          className="bi bi-trash"
        ></i>
      </div>
      <div hidden={!expand} className="col-12 container row">
        <div className="col-7  ml-2  mt-2">
          Info adicional:
          <div>{platform.additionalInfo}</div>
        </div>
        <div className="col-5 row mt-2">
          <div className="col-12">
            Ultima fecha de pago ({paymentStatusFlag(platform.paymentStatus)}
            ): {parsedDate(platform.lastBillingDate)}
          </div>
          {platform.paymentStatus === PAYMENT_STATUSES.PARTIALLY_PAID ? (
            <div className="col-6">ABONADO: {platform.parcialPayment}</div>
          ) : null}
          <div className="col-6">Duracion: {platform.usageTime} dias</div>
          <div className="col-6">Precio: {platform.price}</div>
        </div>
      </div>
    </>
  );
};

export default Platform;
