import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { bookingFormValidationSchema } from '../../utils/validationSchemas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../../components/Loader/Loader';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    date: null,
    comment: '',
  };

  const onSubmit = (values, { resetForm }) => {
    setIsSubmitting(true);
    console.log('Form data', values);
    setSuccessMessage('Your booking was successful!');
    resetForm();
    setIsSubmitting(false);
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
        validationSchema={bookingFormValidationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
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
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formField}>
              <Field name="date">
                {({ field, form }) => (
                  <DatePicker
                    {...field}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={date => setFieldValue(field.name, date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    placeholderText="Booking date"
                    className={styles.dateInput}
                  />
                )}
              </Field>
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
              <button
                className={styles.buttonSend}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <Loader loading={isSubmitting} />
    </div>
  );
};

export default BookingForm;
