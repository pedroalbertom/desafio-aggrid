import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Product } from '../services/types';

interface PriceChartProps {
    product: Product;
    onClose: () => void;
}

export const PriceChart = ({ product, onClose }: PriceChartProps) => {
    return (
        <div style={{
            marginTop: '20px',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>Histórico de Preços: {product.name}</h3>
                <button
                    onClick={onClose}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#64748b' }}
                >
                    Fechar X
                </button>
            </div>

            <div style={{ height: '300px', width: '100%', padding: '10px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={product.prices ? [...product.prices].reverse() : []}
                        margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="createdAt"
                            tickFormatter={(t) => new Date(t).toLocaleDateString('pt-BR')}
                            minTickGap={30}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            dy={10}
                        />
                        <YAxis
                            width={100}
                            tickFormatter={(v) => `R$ ${Number(v).toFixed(2)}`}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            domain={[0, 'dataMax + 100']}
                        />
                        <Tooltip
                            formatter={(v) => [`R$ ${Number(v).toFixed(2)}`, "Preço"]}
                            labelFormatter={(l) => `Data: ${new Date(l).toLocaleDateString('pt-BR')}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#2563eb', stroke: '#fff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};