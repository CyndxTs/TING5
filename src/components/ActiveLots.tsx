import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MoreVertical, TrendingUp, AlertCircle } from "lucide-react";

const lots = [
  {
    id: "L-2025-001",
    farm: "Granja Norte",
    galpon: "Galpón 1",
    birds: 5000,
    age: 42,
    weight: 2.85,
    mortality: 2.1,
    conversion: 1.65,
    stage: "Engorde",
    status: "Óptimo",
    harvest: "20 Nov 2025",
  },
  {
    id: "L-2025-002",
    farm: "Granja Norte",
    galpon: "Galpón 2",
    birds: 4980,
    age: 38,
    weight: 2.45,
    mortality: 2.4,
    conversion: 1.68,
    stage: "Engorde",
    status: "Óptimo",
    harvest: "24 Nov 2025",
  },
  {
    id: "L-2025-003",
    farm: "Granja Sur",
    galpon: "Galpón 1",
    birds: 5200,
    age: 35,
    weight: 2.18,
    mortality: 2.8,
    conversion: 1.72,
    stage: "Engorde",
    status: "Alerta",
    harvest: "28 Nov 2025",
  },
  {
    id: "L-2025-004",
    farm: "Granja Sur",
    galpon: "Galpón 3",
    birds: 4800,
    age: 28,
    weight: 1.52,
    mortality: 1.9,
    conversion: 1.58,
    stage: "Engorde",
    status: "Óptimo",
    harvest: "05 Dic 2025",
  },
  {
    id: "L-2025-005",
    farm: "Granja Este",
    galpon: "Galpón 1",
    birds: 5100,
    age: 21,
    weight: 0.92,
    mortality: 2.2,
    conversion: 1.42,
    stage: "Engorde",
    status: "Óptimo",
    harvest: "12 Dic 2025",
  },
  {
    id: "L-2025-006",
    farm: "Granja Este",
    galpon: "Galpón 2",
    birds: 4500,
    age: 14,
    weight: 0.48,
    mortality: 3.5,
    conversion: 1.15,
    stage: "Recría",
    status: "Alerta",
    harvest: "19 Dic 2025",
  },
  {
    id: "L-2025-007",
    farm: "Granja Norte",
    galpon: "Galpón 3",
    birds: 5300,
    age: 7,
    weight: 0.19,
    mortality: 1.8,
    conversion: 0.95,
    stage: "Recría",
    status: "Óptimo",
    harvest: "26 Dic 2025",
  },
  {
    id: "L-2025-008",
    farm: "Granja Sur",
    galpon: "Galpón 2",
    birds: 4900,
    age: 3,
    weight: 0.08,
    mortality: 1.2,
    conversion: 0.85,
    stage: "Recría",
    status: "Óptimo",
    harvest: "30 Dic 2025",
  },
];

export function ActiveLots() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Lotes Activos - Resultados en Tiempo Real</CardTitle>
        <Button variant="outline" size="sm">
          Ver Histórico
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lote</TableHead>
                <TableHead>Granja / Galpón</TableHead>
                <TableHead>Aves</TableHead>
                <TableHead>Edad (días)</TableHead>
                <TableHead>Peso Prom.</TableHead>
                <TableHead>Mortalidad</TableHead>
                <TableHead>Conv. Alim.</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Cosecha Est.</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lots.map((lot) => (
                <TableRow key={lot.id}>
                  <TableCell>
                    <span className="text-blue-600">{lot.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-slate-900">{lot.farm}</div>
                      <div className="text-slate-500">{lot.galpon}</div>
                    </div>
                  </TableCell>
                  <TableCell>{lot.birds.toLocaleString()}</TableCell>
                  <TableCell>{lot.age}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {lot.weight} kg
                      <TrendingUp className="w-3 h-3 text-green-600" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={lot.mortality > 3 ? "text-red-600" : "text-slate-900"}>
                      {lot.mortality}%
                    </span>
                  </TableCell>
                  <TableCell>{lot.conversion}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {lot.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={lot.status === "Óptimo" ? "default" : "destructive"}
                    >
                      {lot.status === "Alerta" && <AlertCircle className="w-3 h-3 mr-1" />}
                      {lot.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">{lot.harvest}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
