// src/hooks/useStock.ts
import { useState, useEffect } from 'react';
import { getProducts } from '../services/products';
import { getSuppliers } from '../services/suppliers';
import type { Product, Supplier } from '../services/types';

export function useStock() {
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const loadData = async () => {
        try {
            const [pRes, sRes] = await Promise.all([getProducts(), getSuppliers()]);
            setProducts(pRes.data);
            setSuppliers(sRes.data);
        } catch (error) {
            console.error("Erro ao carregar dados do backend:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return { products, suppliers, loadData };
}