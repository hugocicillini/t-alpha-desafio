'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const Login = () => {
  const LoginSchema = z
    .object({
      taxNumber: z.string(),
      password: z.string(),
    })
    .required();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    axios
      .post('https://interview.t-alpha.com.br/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const { token } = response.data.data;
        localStorage.setItem('token', token);
        window.location.href = '/products';
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
        alert('Falha ao fazer login. Verifique suas credenciais.');
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-16 space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="flex justify-center text-2xl">Login</h1>
        <FormField
          control={form.control}
          name="taxNumber"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                CPF/CNPJ
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="CPF/CNPJ"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          rules={{ required: true }}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Senha
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </Button>
        <p>
          <Link
            href="/auth/register"
            className="text-indigo-600 hover:text-indigo-500 flex justify-center"
          >
            Não tenho uma conta
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Login;
