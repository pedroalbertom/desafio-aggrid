// src/components/Header.tsx
import { Package, Truck, Plus } from "lucide-react";

interface HeaderProps {
    view: 'products' | 'suppliers';
    setView: (view: 'products' | 'suppliers') => void;
    onOpenModal: () => void;
}

export const Header = ({ view, setView, onOpenModal }: HeaderProps) => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
        }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '1.25rem' }}>
                {view === 'products' ? <Package /> : <Truck />}
                Stock Manager
            </h1>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => setView('products')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: '1px solid #cbd5e1',
                        backgroundColor: view === 'products' ? '#0f172a' : 'white',
                        color: view === 'products' ? 'white' : '#0f172a'
                    }}
                >
                    Produtos
                </button>
                <button
                    onClick={() => setView('suppliers')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: '1px solid #cbd5e1',
                        backgroundColor: view === 'suppliers' ? '#0f172a' : 'white',
                        color: view === 'suppliers' ? 'white' : '#0f172a'
                    }}
                >
                    Fornecedores
                </button>
            </div>

            <button
                onClick={onOpenModal}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: '#0f172a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                <Plus size={18} /> Novo {view === 'products' ? 'Produto' : 'Fornecedor'}
            </button>
        </header>
    );
};