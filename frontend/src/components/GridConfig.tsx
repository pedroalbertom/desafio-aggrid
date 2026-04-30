import { Pencil, History, Trash2 } from "lucide-react";

export const getColumnDefs = (
    view: 'products' | 'suppliers',
    actions: {
        onEdit: (data: any) => void;
        onViewHistory: (data: any) => void;
        onDelete: (id: number) => void;
    }
) => {
    if (view === 'products') {
        return [
            { field: 'name', headerName: 'Produto', flex: 1 },
            { field: 'supplier.name', headerName: 'Fornecedor', flex: 1 },
            {
                headerName: 'Preço Atual',
                valueGetter: (params: any) => params.data.prices[0].value,
                valueFormatter: (params: any) => `R$ ${Number(params.value).toFixed(2)}`
            },
            {
                headerName: 'Ações',
                width: 180,
                cellRenderer: (params: any) => (
                    <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
                        <button onClick={() => actions.onEdit(params.data)} title="Editar" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                            <Pencil size={18} color="#059669" />
                        </button>
                        <button onClick={() => actions.onViewHistory(params.data)} title="Ver Histórico" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                            <History size={18} color="#2563eb" />
                        </button>
                        <button onClick={() => actions.onDelete(params.data.id)} title="Deletar" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                            <Trash2 size={18} color="#dc2626" />
                        </button>
                    </div>
                )
            }
        ];
    }

    return [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Nome', flex: 1 },
        { field: 'email', headerName: 'E-mail', flex: 1 },
        {
            headerName: 'Ações',
            width: 120,
            cellRenderer: (params: any) => (
                <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
                    <button onClick={() => actions.onEdit(params.data)} title="Editar" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                        <Pencil size={18} color="#059669" />
                    </button>
                    <button onClick={() => actions.onDelete(params.data.id)} title="Deletar" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                        <Trash2 size={18} color="#dc2626" />
                    </button>
                </div>
            )
        }
    ];
};