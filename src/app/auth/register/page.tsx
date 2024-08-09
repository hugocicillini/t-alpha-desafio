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
  const RegisterSchema = z
    .object({
      name: z.string(),
      taxNumber: z.string(),
      mail: z.string().email(),
      phone: z.string(),
      password: z.string(),
    })
    .required();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = (data) => {
    axios
      .post('https://interview.t-alpha.com.br/api/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/auth/login';
      })
      .catch((error) => {
        console.error('Erro ao fazer cadastro:', error);
        alert('Falha ao fazer cadastro. Verifique suas credenciais.');
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-16 space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="flex items-center justify-center text-2xl">Register</h1>
        <FormField
          control={form.control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Nome
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
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
                  placeholder="XXX.XXX.XXX-XX"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mail"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@mail.com"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Telefone
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="(XX) XXXXX-XXXX"
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
                  placeholder="********"
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
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-500 flex justify-center"
        >
          Já tenho uma conta
        </Link>
      </form>
    </Form>
  );
};

export default Login;
