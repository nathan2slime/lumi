import { z } from 'zod';

const signin = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Enter an email valid.'),
  password: z.string({
    required_error: 'Password is required.',
  }),
});

const signup = signin.merge(
  z.object({
    surname: z.string({
      required_error: 'Surname is required.',
    }),
    name: z.string({
      required_error: 'Name is required.',
    }),
  }),
);

export const schemas = {
  signin,
  signup,
};
