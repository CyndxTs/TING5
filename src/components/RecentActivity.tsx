import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

const activities = [
  {
    id: 1,
    transaction: "Venta #1234",
    customer: "Juan Pérez",
    amount: "$234.00",
    status: "completado",
    date: "2025-11-18",
  },
  {
    id: 2,
    transaction: "Venta #1235",
    customer: "María García",
    amount: "$567.00",
    status: "pendiente",
    date: "2025-11-18",
  },
  {
    id: 3,
    transaction: "Venta #1236",
    customer: "Carlos López",
    amount: "$123.00",
    status: "completado",
    date: "2025-11-17",
  },
  {
    id: 4,
    transaction: "Venta #1237",
    customer: "Ana Martínez",
    amount: "$890.00",
    status: "completado",
    date: "2025-11-17",
  },
  {
    id: 5,
    transaction: "Venta #1238",
    customer: "Pedro Sánchez",
    amount: "$345.00",
    status: "cancelado",
    date: "2025-11-16",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transacción</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.transaction}</TableCell>
                <TableCell>{activity.customer}</TableCell>
                <TableCell>{activity.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      activity.status === "completado"
                        ? "default"
                        : activity.status === "pendiente"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500">{activity.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
