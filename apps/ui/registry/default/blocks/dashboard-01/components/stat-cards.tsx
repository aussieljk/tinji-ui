import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

const stats = [
  {
    change: "+12.5%",
    description: "Total revenue",
    icon: DollarSignIcon,
    trend: "up" as const,
    value: "$45,231.89",
  },
  {
    change: "+8.2%",
    description: "New customers",
    icon: UsersIcon,
    trend: "up" as const,
    value: "2,350",
  },
  {
    change: "-3.1%",
    description: "Active subscriptions",
    icon: CreditCardIcon,
    trend: "down" as const,
    value: "12,234",
  },
  {
    change: "+19.0%",
    description: "Sales this month",
    icon: DollarSignIcon,
    trend: "up" as const,
    value: "573",
  },
];

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.description}>
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <stat.icon aria-hidden="true" className="size-4" />
              {stat.description}
            </CardDescription>
            <CardTitle className="text-2xl tabular-nums">
              {stat.value}
            </CardTitle>
            <div className="col-start-2 row-span-2 row-start-1 self-start">
              <Badge variant={stat.trend === "up" ? "success" : "error"}>
                {stat.trend === "up" ? (
                  <ArrowUpRightIcon aria-hidden="true" />
                ) : (
                  <ArrowDownRightIcon aria-hidden="true" />
                )}
                {stat.change}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
