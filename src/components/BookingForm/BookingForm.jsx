import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const initialValues = {
    name: '',
    email: '',
    date: '',
    comment: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    date: Yup.date(),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log('Form data', values);
    setSuccessMessage('Your booking was successful!');
    resetForm();
  };

  return (
    <div className={styles.bookingForm}>
      <div className={styles.titles}>
        <h1>Book your car now</h1>
        <h2>Stay connected! We are always ready to help you.</h2>
      </div>

      {successMessage && <div className={styles.success}>{successMessage}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={styles.inputs}>
          <div className={styles.formField}>
            <Field type="text" id="name" name="name" placeholder="Name*" />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formField}>
            <Field type="email" id="email" name="email" placeholder="Email*" />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formField}>
            <Field
              type="date"
              id="date"
              name="date"
              placeholder="Booking date"
            />
            <ErrorMessage
              name="date"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formField}>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              placeholder="Comment"
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonSend} type="submit">
              Send
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
