import React, { useRef, useEffect } from 'react';

import Dates from '../Dates';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//config locale

//classes
import Platform from '../../../models/platform.class';

//enums
import FORM_TYPES from '../../../constants/formType.enum';
import PAYMENT_METHODS from '../../../constants/payments.enum';
import PAYMENT_STATUSES from '../../../constants/paymentStatuses.enum';

import { useSelector } from 'react-redux';
import PLATFORMS from '../../../constants/platforms.enum';

const PlatformForm = () => {
  const passworRef = useRef();
  const additionalInfoCheckbox = useRef();

  const clientsObject = useSelector((state) => state.clients);
  const clients = clientsObject.value;

  const initialValues = new Platform({
    clientId: 'I1Vpwuty2rPgumYPxmbO',
    withCredentials: true,
    active: true,
    paymentMethod: 'BANCOLOMBIA',
    platformName: 'NETFLIX',
    email: 'j@gmail.com',
    price: 8000,
    password: 'jose5432',
    emailPassword: 'jose5432',
    usageTime: 30,
    paymentStatus: 'PAID',
    parcialPayment: 2000,
    additionalInfo: '',
  });
  useEffect(() => {
    if (initialValues.additionalInfo !== '') {
      additionalInfoCheckbox.current.click();
    }
  }, []);
  const schema = Yup.object().shape({
    clientId: Yup.string().required('Selecciona o agrega un client'),
    platformName: Yup.string().required(
      'Selecciona o agrega el nombre de la plataforma'
    ),
    active: Yup.boolean()
      .oneOf([true, false], null)
      .required('Selecciona si la plataforma esta activa'),
    withCredentials: Yup.boolean()
      .oneOf([true, false], null)
      .required('Escoge si le entregastes correo y contraseña al cliente'),
    email: Yup.string()
      .email('Email no valido')
      .required('Ingresa un email por favor'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('Ingresa la contraseña de la plataforma'),
    emailPassword: Yup.string()
      .min(7, 'La contraseña debe tener al menos 7 caracteres')
      .required('Ingresa la contraseña del email'),
    paymentMethod: Yup.string().required(
      'Selecciona o agrega un metodo de pago'
    ),
    paymentStatus: Yup.string().required('Escoge el estado del pago'),
    price: Yup.number().required('Pon el precio de la venta'),
    parcialPayment: Yup.number(),
    additionalInfo: Yup.string(),
    usageTime: Yup.number()
      .min(1, 'El tiempo de uso debe ser mayor que cero')
      .required('Indica por cuantos dias se usara la plataforma'),
    lastBillingDate: Yup.string().required('Selecciona un fecha de inicio'),
    nextBillingDate: Yup.string().required('Se requiere numero dias'),
  });

  async function onSubmit(values) {
    //await new Promise(resolve=>setTimeout(resolve,1000))
    console.log(values);
  }

  //const formFor = "Update"
  const formFor = FORM_TYPES.UPDATE;
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ touched, isSubmitting, errors, setFieldValue, values }) => {
          return (
            <Form>
              <h2>
                {formFor === FORM_TYPES.UPDATE
                  ? 'Actualizar'
                  : 'Agregar plataforma'}
              </h2>
              <div>
                <label htmlFor="clientId">Cliente</label>
                <Field
                  style={{ display: 'block' }}
                  id="clientId"
                  name="clientId"
                  as="select"
                >
                  <option value="">Selecciona</option>

                  {clients.map((client) => {
                    return (
                      <option value={client.id} key={client.id}>
                        {client.name} {`(${client.contact})`}
                      </option>
                    );
                  })}
                </Field>
                {touched.clientId && errors.clientId && (
                  <ErrorMessage component="div" name="clientId" />
                )}
              </div>
              <div>
                <Field
                  type="checkbox"
                  id="withCredentials"
                  name="withCredentials"
                />
                <label htmlFor="withCredentials">Con credenciales</label>

                {errors.withCredentials && (
                  <ErrorMessage component="div" name="withCredentials" />
                )}
              </div>

              <div>
                <label htmlFor="platformName">Nombre de plataforma</label>
                <Field
                  style={{ display: 'block' }}
                  id="platformName"
                  name="platformName"
                  as="select"
                >
                  <option value="">Selecciona</option>
                  {Object.keys(PLATFORMS).map((platform_name) => (
                    <option value={platform_name} key={platform_name}>
                      {platform_name.replaceAll(/_+/g, ' ')}
                    </option>
                  ))}
                </Field>
                {touched.platformName && errors.platformName && (
                  <ErrorMessage component="div" name="platformName" />
                )}
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Field
                  style={{ display: 'block' }}
                  type="email"
                  id="email"
                  name="email"
                />
                {touched.email && errors.email && (
                  <ErrorMessage component="div" name="email" />
                )}
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <Field
                  style={{ display: 'block' }}
                  type="text"
                  id="password"
                  name="password"
                />
                {touched.password && errors.password && (
                  <ErrorMessage component="div" name="password" />
                )}
              </div>

              <div>
                <label htmlFor="emailPassword">Contraseña del email</label>
                <div>
                  <Field type="text" id="emailPassword" name="emailPassword" />

                  {/*checkbox*/}
                  <input
                    id="same-password"
                    type="checkbox"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const passwordValue = e.target.form.password.value;
                      if (checked) {
                        setFieldValue('emailPassword', passwordValue);
                      } else {
                        setFieldValue('emailPassword', '');
                      }
                    }}
                  />
                  <label htmlFor="same-password">Misma</label>
                </div>
                {/*error control*/}
                {errors.emailPassword && (
                  <ErrorMessage component="div" name="emailPassword" />
                )}
              </div>
              <label htmlFor="paymentMethod">Metodo de pago</label>
              <div>
                <Field id="paymentMethod" name="paymentMethod" as="select">
                  <option value="">Selecciona</option>
                  {Object.keys(PAYMENT_METHODS).map((payment_method) => (
                    <option value={payment_method} key={payment_method}>
                      {payment_method}
                    </option>
                  ))}
                </Field>
                {/**TODO: crear un campo para agregar metodo de pago
                 * y que tenga un manejador en el estado global ue los actualice en la nube
                 */}
                <button>Agregar</button>
                {errors.paymentMethod && (
                  <ErrorMessage component="div" name="paymentMethod" />
                )}
              </div>
              <div>
                <label>Fecha inicio: </label>

                <Dates
                  startTime={values.lastBillingDate}
                  setFieldValue={setFieldValue}
                  fieldKey="lastBillingDate"
                />
              </div>
              <div>
                <label htmlFor="usageTime">Duracion: </label>
                <Field name="usageTime" id="usageTime" type="number" />

                <label>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('usageTime', 30);
                      } else {
                        e.target.form.usageTime.focus();
                        setFieldValue('usageTime', 0);
                      }
                    }}
                    type="checkbox"
                  ></input>
                  30 dias
                </label>
                {errors.usageTime && (
                  <ErrorMessage component="div" name="usageTime" />
                )}
              </div>
              <div>
                <label htmlFor="price">Precio: </label>
                <Field name="price" id="price" type="number" />

                <label>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('price', values.price * 1000);
                      } else {
                        e.target.form.price.focus();
                        if (values.price % 1000 === 0 && values.price > 0) {
                          setFieldValue('price', values.price / 1000);
                        }
                      }
                    }}
                    type="checkbox"
                  ></input>
                  Por mil
                </label>
                {errors.price && <ErrorMessage component="div" name="price" />}
              </div>
              <div>
                {/**TODO: cuando se cambie a parcialmente desocultar campo para agregar el abono */}
                <label htmlFor="paymentStatus">Estado de pago</label>
                <Field
                  style={{ display: 'block' }}
                  id="paymentStatus"
                  name="paymentStatus"
                  as="select"
                  onClick={(e) => {
                    if (e.target.value === PAYMENT_STATUSES.PARTIALLY_PAID) {
                      e.target.form.parcialPayment.parentNode.hidden = false;
                    } else {
                      e.target.form.parcialPayment.parentNode.hidden = true;
                      setFieldValue('parcialPayment', 0);
                    }
                  }}
                >
                  <option value="">Selecciona</option>

                  {Object.keys(PAYMENT_STATUSES).map((payment_status) => (
                    <option value={payment_status} key={payment_status}>
                      {(() => {
                        switch (payment_status) {
                          case PAYMENT_STATUSES.PAID:
                            return 'PAGO';
                          case PAYMENT_STATUSES.PENDING:
                            return 'PENDIENTE';
                          case PAYMENT_STATUSES.PARTIALLY_PAID:
                            return 'PARCIALMENTE';
                        }
                      })()}
                    </option>
                  ))}
                </Field>
                {errors.paymentStatus && (
                  <ErrorMessage component="div" name="paymentStatus" />
                )}
              </div>

              <div hidden={values.parcialPayment === 0}>
                <label>Abono: </label>
                <Field name="parcialPayment" type="number" />
                <label>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue(
                          'parcialPayment',
                          values.parcialPayment * 1000
                        );
                      } else {
                        e.target.form.parcialPayment.focus();
                        if (
                          values.parcialPayment % 1000 === 0 &&
                          values.parcialPayment > 0
                        ) {
                          setFieldValue(
                            'parcialPayment',
                            values.parcialPayment / 1000
                          );
                        }
                      }
                    }}
                    type="checkbox"
                  />
                  Por mil
                </label>
              </div>
              <div>
                <label>
                  <Field type="checkbox" name="active"></Field>
                  Cuenta activa
                </label>
              </div>
              <div>
                <label on>
                  <input
                    ref={additionalInfoCheckbox}
                    type="checkbox"
                    onClick={(e) => {
                      var checked = e.target.checked;
                      if (checked) {
                        e.target.form.additionalInfo.hidden = false;
                        e.target.form.additionalInfo.focus();
                        return;
                      }
                      e.target.form.additionalInfo.hidden = true;
                      setFieldValue('additionalInfo', '');
                    }}
                  />
                  Info adicional
                </label>
                <Field
                  hidden
                  as="textarea"
                  id="additionalInfo"
                  name="additionalInfo"
                ></Field>
                {errors.additionalInfo && (
                  <ErrorMessage component="div" name="additionalInfo" />
                )}
              </div>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Enviar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PlatformForm;
