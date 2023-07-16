import React, { useState, useRef } from 'react';
import Client from '../pure/Client';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
//components import
import DeleteClientConfirm from '../pure/popup/DeleteClientConfirm';
import EditUserForm from '../pure/forms/EditUserForm';
import AddUserForm from '../pure/forms/AddUserForm';
//actions import

import { setSelectedClient,setClientToDeleteId, setClientToEditId, } from '../../features/clients';
import { showPopup } from '../../features/popupContainer';
//popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ClientList = () => {
  const dispatch = useDispatch();
  const [popupContent, setPopupContent] = useState(null);
  const editPopupRef = useRef(null);
  const deletePopupRef = useRef(null);
  const addPopupRef = useRef(null);
  
  const setCurrentlySelectedClient = (clientId) => {
    dispatch(setSelectedClient(clientId));
  };

  const deleteClient = (clientId) => {
    dispatch(setClientToDeleteId(clientId));
    deletePopupRef.current.open();
  };

  const openPopToAddCLient=()=>{
    addPopupRef.current.open()
  }

  const editClient = (clientId) => {
    console.log('id client: ', clientId);
    dispatch(setClientToEditId(clientId));
    //setPopupContent(EditUserForm);
    console.log(editPopupRef.current.className)
    editPopupRef.current.open();

    //setPopupContent(<div>PAPAPPAPPAP</div>);
    //dispatch(showPopup(EditUserForm));
  };

  const { clients } = useSelector((state) => state);

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text);
  };

  function copyClientContact(e) {
    var text = e.target.innerText;
    console.log('ooooo');
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
    <div className="col-2 h-auto">
      {/* TODO: poner algo para que se oculte */}
      <Popup
        ref={addPopupRef}
        position="right center"
        modal
        contentStyle={{
          background: 'transparent',
          border: 'none',
          width: 'auto',
        }}
      >
        {(close) => {
          return (
            <>
              <AddUserForm quit={close} />
            </>
          );
        }}
      </Popup>

      <Popup
        ref={editPopupRef}
        position="right center"
        modal
        contentStyle={{
          background: 'transparent',
          border: 'none',
          width: 'auto',
        }}
      >
        {(close) => {
          return (
            <>
              <EditUserForm quit={close} />
            </>
          );
        }}
      </Popup>

      <Popup
        ref={deletePopupRef}
        position="right center"
        modal
        contentStyle={{
          background: 'transparent',
          border: 'none',
          width: 'auto',
        }}
      >
        {(close) => {
          return (
            <>
              <DeleteClientConfirm quit={close} />
            </>
          );
        }}
      </Popup>
      <div className="text-center p-1">
        <h3 className="m-0">Clientes</h3>
        <i onClick={openPopToAddCLient} class="bi bi-plus-circle-fill cursor-pointer add-client-button"></i>
      </div>

      {clients.loading === false
        ? clients.value.map((client, key) => {
            return (
              <Client
              classActive={
                  client.id === clients.clientSelected ? 'client-selected rounded' : ''
                }
                key={key}
                client={client}
                copy={copyClientContact}
                setClient={setCurrentlySelectedClient}
                remove={deleteClient}
                edit={editClient}
              ></Client>
            );
          })
        : null}
    </div>
  );
};

export default ClientList;
