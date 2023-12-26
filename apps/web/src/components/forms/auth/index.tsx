'use client';

import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { SignInInput, SignUpInput, User } from '@lumi/types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { signInService, signUpService } from '@/services/auth.services';

import { useAuthState } from '@/store/auth';
import { schemas } from '@/utils/forms/schemas';

import { AuthFormProps } from './model';
import { styles } from './styles';

export const AuthForm = ({ type }: AuthFormProps) => {
  const auth = useAuthState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const style = styles();

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(schemas[type]),
  });

  const {
    formState: { isValid },
    getValues,
  } = form;

  const onAuth = useCallback(async () => {
    if (type == 'signin') {
      const data = getValues() as SignInInput;

      const res = await signInService({ data });

      if (res) return res.SignIn;
    } else {
      const data = getValues() as SignUpInput;

      const res = await signUpService({ data });

      if (res) return res.SignUp;
    }
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const res = await onAuth();

    if (res) {
      auth.setUser(res as User);
      auth.setLogged(true);
      router.push('/');
    }

    setLoading(false);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={style.wrapper()}>
        <div className={style.fields()}>
          {type == 'signup' && (
            <div className={style.row()}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="given-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input autoComplete="family-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="current-password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={style.footer()}>
          <Button className={style.button()} disabled={!isValid} type="submit">
            {loading ? <BeatLoader color="white" size={10} /> : 'Continue'}
          </Button>

          <Separator className={style.separator()} />

          {type == 'signin' ? (
            <Link className={style.link()} href="/auth/signup">
              <Button className={style.button()} variant="outline">
                Sign Up
                <ArrowRightIcon />
              </Button>
            </Link>
          ) : (
            <Link className={style.link()} href="/auth/signin">
              <Button className={style.button()} variant="outline">
                Sign In
                <ArrowRightIcon />
              </Button>
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
};
