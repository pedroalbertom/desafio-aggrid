import type { Product, Supplier } from '../services/types';

interface StockModalProps {
    isOpen: boolean;
    view: 'products' | 'suppliers';
    editingItem: Product | Supplier | null;
    productForm: { name: string; supplierId: string; price: string };
    supplierForm: { name: string; email: string };
    suppliers: Supplier[];
    setProductForm: (form: any) => void;
    setSupplierForm: (form: any) => void;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const StockModal = ({
    isOpen,
    view,
    editingItem,
    productForm,
    supplierForm,
    suppliers,
    setProductForm,
    setSupplierForm,
    onClose,
    onSubmit
}: StockModalProps) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px' }}>
                    {editingItem ? 'Editar' : 'Novo'} {view === 'products' ? 'Produto' : 'Fornecedor'}
                </h2>

                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {view === 'products' ? (
                        <>
                            <input
                                placeholder="Nome"
                                required
                                value={productForm.name}
                                onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                            <select
                                required
                                value={productForm.supplierId}
                                onChange={e => setProductForm({ ...productForm, supplierId: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            >
                                <option value="">Selecione o Fornecedor</option>
                                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <input
                                type="number"
                                placeholder="Preço (R$)"
                                required
                                value={productForm.price}
                                onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                        </>
                    ) : (
                        <>
                            <input
                                placeholder="Nome"
                                required
                                value={supplierForm.name}
                                onChange={e => setSupplierForm({ ...supplierForm, name: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                required
                                value={supplierForm.email}
                                onChange={e => setSupplierForm({ ...supplierForm, email: e.target.value })}
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                        </>
                    )}

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', background: 'white' }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#0f172a', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};