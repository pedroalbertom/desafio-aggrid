import { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getProducts, deleteProduct, createProduct, updateProduct } from './services/products';
import { getSuppliers, deleteSupplier, createSupplier, updateSupplier } from './services/suppliers';
import type { Product, Supplier } from './services/types';
import { Package, Truck, History, Trash2, Plus, Pencil } from "lucide-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function App() {
  const [view, setView] = useState<'products' | 'suppliers'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', supplierId: '', price: '' });
  const [editingItem, setEditingItem] = useState<Product | Supplier | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (view === 'products') {
        if (editingItem) {
          await updateProduct(editingItem.id, { name: formData.name, supplierId: Number(formData.supplierId), initialPrice: Number(formData.price) });
        } else {
          await createProduct({ name: formData.name, supplierId: Number(formData.supplierId), initialPrice: Number(formData.price) });
        }
      } else {
        if (editingItem) {
          await updateSupplier(editingItem.id, { name: formData.name, email: formData.email });
        } else {
          await createSupplier({ name: formData.name, email: formData.email });
        }
      }

      await loadData();
      setIsModalOpen(false);
      setEditingItem(null); // Importante limpar aqui também
      setFormData({ name: '', email: '', supplierId: '', price: '' });
    } catch (error) {
      alert("Erro ao salvar. Verifique os campos.");
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);

    setFormData({
      name: item.name || '',
      email: item.email || '',
      supplierId: item.supplier?.id ? String(item.supplier.id) : '',
      price: item.prices[0].value
    });

    setIsModalOpen(true);
  };

  const loadData = async () => {
    try {
      const [pRes, sRes] = await Promise.all([getProducts(), getSuppliers()]);
      setProducts(pRes.data);
      setSuppliers(sRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados do backend:", error);
    }
  };

  useEffect(() => { loadData(); }, []);

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

  const productCols = useMemo(() => [
    { field: 'name', headerName: 'Produto', flex: 1 },
    { field: 'supplier.name', headerName: 'Fornecedor', flex: 1 },
    {
      headerName: 'Preço Atual',
      valueGetter: (params: any) => {
        if (!params.data || !params.data.prices) return 0;
        return params.data.prices[0].value;
      },
      valueFormatter: (params: any) => `R$ ${params.value}`
    },
    {
      headerName: 'Ações',
      width: 180,
      cellRenderer: (params: any) => (
        <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
          <button onClick={() => handleEdit(params.data)} title="Editar" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
            <Pencil size={18} color="#059669" />
          </button>
          <button onClick={() => setSelectedProduct(params.data)} title="Ver Histórico" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
            <History size={18} color="#2563eb" />
          </button>
          <button onClick={() => handleDelete(params.data.id)} title="Deletar" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
            <Trash2 size={18} color="#dc2626" />
          </button>
        </div>
      )
    }
  ], [view, selectedProduct]);

  const supplierCols = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'E-mail', flex: 1 },
    {
      headerName: 'Ações',
      width: 100,
      cellRenderer: (params: any) => (
        <div style={{ paddingTop: '4px' }}>
          <button
            onClick={() => handleDelete(params.data.id)}
            style={{ cursor: 'pointer', border: 'none', background: 'none' }}
            title="Deletar"
          >
            <Trash2 size={18} color="#dc2626" />
          </button>
        </div>
      )
    }
  ], [view]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '1.25rem' }}>
          {view === 'products' ? <Package /> : <Truck />}
          Stock Manager
        </h1>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setView('products')}
            style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #cbd5e1', backgroundColor: view === 'products' ? '#0f172a' : 'white', color: view === 'products' ? 'white' : '#0f172a' }}
          >
            Produtos
          </button>
          <button
            onClick={() => setView('suppliers')}
            style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #cbd5e1', backgroundColor: view === 'suppliers' ? '#0f172a' : 'white', color: view === 'suppliers' ? 'white' : '#0f172a' }}
          >
            Fornecedores
          </button>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: '', email: '', supplierId: '', price: '' });
            setIsModalOpen(true);
          }
          }

          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          <Plus size={18} /> Novo {view === 'products' ? 'Produto' : 'Fornecedor'}
        </button>
      </header>

      <main>
        <div style={{ height: '500px', width: '100%', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <AgGridReact
            theme={themeQuartz}
            rowData={(view === 'products' ? products : suppliers) as (Product | Supplier)[]}
            columnDefs={(view === 'products' ? productCols : supplierCols) as any}
            animateRows={true}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50, 200]}
          />
        </div>

        {selectedProduct && (
          <div style={{ marginTop: '20px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Histórico de Preços: {selectedProduct.name}</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#64748b' }}
              >
                Fechar X
              </button>
            </div>

            <div style={{ height: '300px', width: '100%', padding: '10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedProduct.prices ? [...selectedProduct.prices].reverse() : []}
                  margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                  <XAxis
                    dataKey="createdAt"
                    tickFormatter={(tick) => new Date(tick).toLocaleDateString('pt-BR')}
                    minTickGap={30}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                  />

                  <YAxis
                    width={100}
                    tickFormatter={(val) => `R$ ${val.toFixed(2)}`}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    domain={['dataMin - 100', 'dataMax + 100']}
                    allowDataOverflow={false}
                  />

                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`R$ ${value}`, "Preço"]}
                    labelFormatter={(label) => `Data: ${new Date(label).toLocaleDateString('pt-BR')}`}
                  />

                  <Line
                    type="monotone"
                    dataKey="value"
                    key="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>

      {
        isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '20px' }}>{editingItem ? 'Editar' : 'Novo'} {view === 'products' ? 'Produto' : 'Fornecedor'}</h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                  placeholder="Nome"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />

                {view === 'products' ? (
                  <>
                    <select
                      required
                      value={formData.supplierId}
                      onChange={e => setFormData({ ...formData, supplierId: e.target.value })}
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="">Selecione o Fornecedor</option>
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <input
                      type="number"
                      placeholder="Preço Inicial (R$)"
                      required
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </>
                ) : (
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', background: 'white' }}>
                    Cancelar
                  </button>
                  <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#0f172a', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
}