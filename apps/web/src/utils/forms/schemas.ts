import { z } from 'zod';

const required_error = 'Field is required.';
const invalid_type_error = 'Field is invalid';

const signin = z.object({
  email: z.string({ required_error }).email('Enter an email valid.'),
  password: z.string({
    required_error,
  }),
});

const signup = signin.merge(
  z.object({
    surname: z.string({
      required_error,
    }),
    name: z.string({
      required_error,
    }),
  }),
);

const itemBill = z.object({
  amount: z.coerce
    .number({ required_error, invalid_type_error })
    .min(0, invalid_type_error),
  unit_price: z.coerce
    .number({ required_error, invalid_type_error })
    .min(0, invalid_type_error),
  price: z.coerce.number({ required_error, invalid_type_error }),
});

const newBill = z.object({
  file: z.string({ required_error }),
  energy: itemBill,
  compensed_energy: itemBill,
  public_lighting_contribution: z.coerce
    .number({ required_error, invalid_type_error })
    .min(0, invalid_type_error),
  energy_without_icms_value: itemBill,
  total_price: z.coerce
    .number({ required_error, invalid_type_error })
    .min(0, invalid_type_error),
  client: z
    .string({ required_error, invalid_type_error }),
  date: z.date({ required_error, invalid_type_error }),
  due_date: z.date({ required_error, invalid_type_error }),
});

export const schemas = {
  signin,
  newBill,
  itemBill,
  signup,
};
