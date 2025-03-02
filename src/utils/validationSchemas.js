import * as Yup from 'yup';

export const bookingFormValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  date: Yup.date().min(new Date(), 'Date cannot be in the past').nullable(),
});

export const searchBoxValidationSchema = Yup.object({
  brand: Yup.string(),
  rentalPrice: Yup.number().positive('Price must be positive'),
  mileageFrom: Yup.number().positive('Mileage must be positive'),
  mileageTo: Yup.number().positive('Mileage must be positive'),
});
