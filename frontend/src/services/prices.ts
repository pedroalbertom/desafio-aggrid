import api from './api';
import type { Price } from './types';

export interface CreatePriceDto {
    value: number;
    productId: number;
}

export const getPrices = async () => {
    return await api.get<Price[]>('/prices');
};

export const createPrice = async (data: CreatePriceDto) => {
    return await api.post<Price>('/prices', data);
};

export const deletePrice = async (id: number) => {
    return await api.delete<void>(`/prices/${id}`);
};