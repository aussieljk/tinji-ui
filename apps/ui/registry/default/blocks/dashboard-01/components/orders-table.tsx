import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

type OrderStatus = "Paid" | "Pending" | "Refunded";

const statusVariant: Record<OrderStatus, "success" | "warning" | "error"> = {
  Paid: "success",
  Pending: "warning",
  Refunded: "error",
};

const orders: {
  amount: string;
  customer: string;
  date: string;
  email: string;
  id: string;
  initials: string;
  status: OrderStatus;
}[] = [
  {
    amount: "$250.00",
    customer: "Olivia Martin",
    date: "Jun 12, 2026",
    email: "olivia@acme.com",
    id: "#3210",
    initials: "OM",
    status: "Paid",
  },
  {
    amount: "$150.00",
    customer: "Jackson Lee",
    date: "Jun 11, 2026",
    email: "jackson@acme.com",
    id: "#3209",
    initials: "JL",
    status: "Pending",
  },
  {
    amount: "$350.00",
    customer: "Isabella Nguyen",
    date: "Jun 10, 2026",
    email: "isabella@acme.com",
    id: "#3208",
    initials: "IN",
    status: "Paid",
  },
  {
    amount: "$45.00",
    customer: "William Kim",
    date: "Jun 9, 2026",
    email: "will@acme.com",
    id: "#3207",
    initials: "WK",
    status: "Refunded",
  },
  {
    amount: "$540.00",
    customer: "Sofia Davis",
    date: "Jun 8, 2026",
    email: "sofia@acme.com",
    id: "#3206",
    initials: "SD",
    status: "Paid",
  },
];

export function OrdersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent orders</CardTitle>
        <CardDescription>Your store made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardPanel className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="ps-6">Customer</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pe-6 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="ps-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{order.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{order.customer}</span>
                      <span className="text-muted-foreground text-xs">
                        {order.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground tabular-nums">
                  {order.id}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.date}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="pe-6 text-right font-medium tabular-nums">
                  {order.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardPanel>
    </Card>
  );
}
