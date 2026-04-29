import api from './api';
import type { Product, CreateProductDto, UpdateProductDto } from './types';

export const getProducts = async () => {
  return await api.get<Product[]>('/products');
};

export const getProductById = async (id: number) => {
  return await api.get<Product>(`/products/${id}`);
};

export const createProduct = async (data: CreateProductDto) => {
  return await api.post<Product>('/products', data);
};

export const updateProduct = async (id: number, data: UpdateProductDto) => {
  return await api.patch<Product>(`/products/${id}`, data);
};

export const deleteProduct = async (id: number) => {
  return await api.delete<void>(`/products/${id}`);
};