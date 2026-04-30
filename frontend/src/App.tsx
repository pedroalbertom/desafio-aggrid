import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { deleteProduct, createProduct, updateProduct } from './services/products';
import { deleteSupplier, createSupplier, updateSupplier } from './services/suppliers';
import type { Product, Supplier } from './services/types';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import { useStock } from './hooks/useStock';
import { Header } from './components/Header';
import { PriceChart } from './components/PriceChart';
import { StockModal } from './components/StockModal';
import { getColumnDefs } from './components/GridConfig';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function App() {
  const [view, setView] = useState<'products' | 'suppliers'>('products');

  const { products, suppliers, loadData } = useStock();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [productForm, setProductForm] = useState({ name: '', supplierId: '', price: '' });
  const [supplierForm, setSupplierForm] = useState({ name: '', email: '' });
  const [editingItem, setEditingItem] = useState<Product | Supplier | null>(null);

  const resetForms = () => {
    setProductForm({ name: '', supplierId: '', price: '' });
    setSupplierForm({ name: '', email: '' });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (view === 'products') {
        const payload = {
          name: productForm.name,
          supplierId: Number(productForm.supplierId),
          initialPrice: Number(productForm.price)
        };

        if (editingItem) {
          await updateProduct(editingItem.id, payload);
        } else {
          await createProduct(payload);
        }
      } else {
        const payload = { name: supplierForm.name, email: supplierForm.email };
        if (editingItem) {
          await updateSupplier(editingItem.id, payload);
        } else {
          await createSupplier(payload);
        }
      }

      await loadData();

      if (editingItem && selectedProduct?.id === editingItem.id) {
        setSelectedProduct(null);
      }

      resetForms();
    } catch (error) {
      alert("Erro ao salvar. Verifique se o backend está criando o novo registro de preço.");
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    if (view === 'products') {
      setProductForm({
        name: item.name || '',
        supplierId: item.supplier?.id ? String(item.supplier.id) : '',
        price: item.prices?.[0]?.value !== undefined ? String(item.prices[0].value) : ''
      });
    } else {
      setSupplierForm({
        name: item.name || '',
        email: item.email || ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const message = view === 'products' ? 'Este produto?' : 'Este fornecedor?';
    if (!window.confirm(`Tem certeza que deseja excluir ${message}`)) return;

    try {
      if (view === 'products') {
        await deleteProduct(id);
        if (selectedProduct?.id === id) setSelectedProduct(null);
      } else {
        await deleteSupplier(id);
      }
      await loadData();
    } catch (error) {
      alert("Erro ao excluir item. Verifique se existem vínculos pendentes.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Header
        view={view}
        setView={(v) => { setView(v); resetForms(); }}
        onOpenModal={() => { resetForms(); setIsModalOpen(true); }}
      />

      <main>
        <div style={{ height: '500px', width: '100%', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <AgGridReact
            theme={themeQuartz}
            rowData={(view === 'products' ? products : suppliers) as any[]}
            columnDefs={getColumnDefs(view, {
              onEdit: handleEdit,
              onViewHistory: setSelectedProduct,
              onDelete: handleDelete
            })}
            animateRows={true}
            pagination={true}
            paginationPageSize={10}
          />
        </div>

        {selectedProduct && (
          <PriceChart
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </main>

      <StockModal
        isOpen={isModalOpen}
        view={view}
        editingItem={editingItem}
        productForm={productForm}
        supplierForm={supplierForm}
        suppliers={suppliers}
        setProductForm={setProductForm}
        setSupplierForm={setSupplierForm}
        onClose={resetForms}
        onSubmit={handleSubmit}
      />
    </div>
  );
}