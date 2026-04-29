export interface Supplier {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface Price {
    id: number;
    value: string;
    createdAt: string;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    supplier: Supplier;
    prices: Price[];
}

export interface CreateProductDto {
    name: string;
    description?: string;
    supplierId: number;
    initialPrice: number;
}

export interface CreateSupplierDto {
    name: string;
    email: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> { }
export interface UpdateSupplierDto extends Partial<CreateSupplierDto> { }