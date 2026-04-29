import api from './api';
import type { Supplier, CreateSupplierDto, UpdateSupplierDto } from './types';

export const getSuppliers = async () => {
    return await api.get<Supplier[]>('/suppliers');
};

export const getSupplierById = async (id: number) => {
    return await api.get<Supplier>(`/suppliers/${id}`);
};

export const createSupplier = async (data: CreateSupplierDto) => {
    return await api.post<Supplier>('/suppliers', data);
};

export const updateSupplier = async (id: number, data: UpdateSupplierDto) => {
    return await api.patch<Supplier>(`/suppliers/${id}`, data);
};

export const deleteSupplier = async (id: number) => {
    return await api.delete<void>(`/suppliers/${id}`);
};