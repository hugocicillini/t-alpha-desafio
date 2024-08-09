'use client';

import ShowProducts from '@/components/ShowProducts';
import { useEffect } from 'react';

const ProductsPage = () => {
  const tokenIsValid = localStorage.getItem('token');

  useEffect(() => {
    if (!tokenIsValid) {
      window.location.replace('/');
    }
  }, [tokenIsValid]);

  if (!tokenIsValid) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-[1420px] mx-auto">
      <h1 className="text-3xl text-center p-12 uppercase">Produtos</h1>
      <ShowProducts />
    </div>
  );
};

export default ProductsPage;
