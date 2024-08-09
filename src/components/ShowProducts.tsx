'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EditProducts from './EditProducts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Dialog, DialogContent } from './ui/dialog';
import { Input } from './ui/input';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { deleteProduct } from '@/lib/utils';
import CreateProducts from './CreateProducts';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

const ShowProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`https://interview.t-alpha.com.br/api/products/get-all-products/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const { products } = res.data.data;
        setProducts(products);
      })
      .catch((error) => {
        console.error('Erro ao buscar os produtos:', error);
        alert('Falha ao buscar os produtos');
      });
  };

  const handleSearch = (value: string) => {
    setSearch(value);

    if (value.trim() === '') {
      fetchProducts();
    } else {
      axios
        .get(
          `https://interview.t-alpha.com.br/api/products/get-one-product/${value}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          const { product } = res.data.data;
          setProducts([product]);
        })
        .catch((error) => {
          console.log('Erro ao buscar o produto:', error);
          alert('Falha ao buscar o produto');
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center"
            >
              Criar ➕
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreateProducts />
          </DialogContent>
        </Dialog>
        <Button
          variant="destructive"
          className="flex items-center justify-center"
          onClick={() => localStorage.removeItem('token')}
        >
          <Link href="/">Logout</Link>
        </Button>
      </div>
      <Input
        type="text"
        name="searchProduct"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(String(e.currentTarget.value));
          }
        }}
        placeholder="Pesquisar por ID"
        className="w-[340px] flex flex-col text-center items-center m-auto border-black"
      />
      <div className="flex flex-wrap gap-4 mt-8">
        {products.map((product: Product) => (
          <Card className="w-[340px] flex flex-col text-center items-center m-auto">
            {product.id}
            <CardHeader key={product.id}>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Image
                src="https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="image"
                width={200}
                height={200}
                className="rounded-md shadow-md"
              ></Image>
              <p>Estoque: {product.stock}</p>
              <p>R$: {product.price.toLocaleString('pt-BR')}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">✏️</Button>
                </DialogTrigger>
                <DialogContent>
                  <EditProducts productId={product.id} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">❌</Button>
                </DialogTrigger>
                <DialogContent>
                  <p>Tem certeza que deseja deletar esse produto?</p>
                  <Button
                    type="submit"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Deletar
                  </Button>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
