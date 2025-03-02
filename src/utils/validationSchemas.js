import * as Yup from 'yup';

export const bookingFormValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  date: Yup.date().min(new Date(), 'Date cannot be in the past').nullable(),
});
