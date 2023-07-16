import React, { useState } from 'react';

const Client = ({ client, copy, setClient, remove, edit, classActive }) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => setExpand((pre) => !pre);
  return (
    <div
      className={`${classActive} ${
        client.active === '1' ? 'active-client rounded' : 'no-active-client '
      }`}
      style={{ width: '90%' }}
    >
      <div>
        <i
          onClick={toggleExpand}
          className={
            expand ? 'bi bi-caret-down-fill' : 'bi bi-caret-right-fill'
          }
        ></i>
        <span
          style={{
            cursor: 'pointer',
            margin: '4px',
            display: 'inline-block',
            width: '60%',
          }}
          onClick={() => setClient(client.id)}
        >
          {client.name}
        </span>
        <span style={{ position: 'static', right: 0 }}>
          <i
            style={{ cursor: 'pointer', margin: '4px' }}
            className="bi bi-pencil-fill"
            onClick={() => edit(client.id)}
          ></i>
          <i
            style={{ cursor: 'pointer', margin: '4px' }}
            className="bi bi-trash"
            onClick={() => remove(client.id)}
          ></i>
        </span>
      </div>
      <div hidden={!expand} className="cursor-pointer" onClick={copy}>
        {client.contact}
      </div>
    </div>
  );
};

export default Client;
