import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const revenueData = [
  { month: "Ene", ingresos: 4000, gastos: 2400 },
  { month: "Feb", ingresos: 3000, gastos: 1398 },
  { month: "Mar", ingresos: 2000, gastos: 9800 },
  { month: "Abr", ingresos: 2780, gastos: 3908 },
  { month: "May", ingresos: 1890, gastos: 4800 },
  { month: "Jun", ingresos: 2390, gastos: 3800 },
  { month: "Jul", ingresos: 3490, gastos: 4300 },
];

const salesData = [
  { category: "Producto A", ventas: 4000 },
  { category: "Producto B", ventas: 3000 },
  { category: "Producto C", ventas: 2000 },
  { category: "Producto D", ventas: 2780 },
  { category: "Producto E", ventas: 1890 },
];

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Ingresos y Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ingresos" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Ingresos"
              />
              <Line 
                type="monotone" 
                dataKey="gastos" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Gastos"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ventas por Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="ventas" fill="#3b82f6" name="Ventas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
