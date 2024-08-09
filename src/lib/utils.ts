import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deleteProduct = async (productId: number) => {
  try {
    await axios.delete(
      `https://interview.t-alpha.com.br/api/products/delete-product/${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
    alert('Produto deletado com sucesso!');
    window.location.reload();
  } catch (error) {
    console.error('Erro ao deletar o produto:', error);
    alert('Falha ao deletar o produto.');
  }
};
