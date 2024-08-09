'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { useEffect } from 'react';

type Product = {
  productId: number;
};

const EditProducts = ({ productId }: Product) => {
  useEffect(() => {
    axios
      .get(
        `https://interview.t-alpha.com.br/api/products/get-one-product/${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        const { product } = response.data.data;
        form.reset(product);
      });
  }, []);

  const ProductsSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.preprocess((value) => Number(value), z.number().positive()),
    stock: z.preprocess((value) => Number(value), z.number().positive()),
  });

  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof ProductsSchema>> = (data) => {
    axios
      .patch(
        `https://interview.t-alpha.com.br/api/products/update-product/${productId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        alert('Produto editado com sucesso!');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao editar o produto:', error);
        alert('Falha ao editar o produto.');
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="flex justify-center text-2xl">Editar</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Nome
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Descrição
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Estoque
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">
                Preço
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
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
          Editar
        </Button>
      </form>
    </Form>
  );
};

export default EditProducts;
