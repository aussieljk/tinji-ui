import { CheckIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";

const tiers = [
  {
    cta: "Get started",
    description: "For individuals just getting started.",
    features: [
      "Up to 3 projects",
      "1 team member",
      "Community support",
      "1 GB storage",
    ],
    featured: false,
    name: "Hobby",
    price: "$0",
    priceSuffix: "/month",
  },
  {
    cta: "Start free trial",
    description: "For growing teams that need more power.",
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "Priority email support",
      "100 GB storage",
      "Advanced analytics",
    ],
    featured: true,
    name: "Pro",
    price: "$29",
    priceSuffix: "/month",
  },
  {
    cta: "Contact sales",
    description: "For large organizations with custom needs.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Dedicated support",
      "Unlimited storage",
      "SSO & audit logs",
    ],
    featured: false,
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "",
  },
];

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <Badge variant="secondary">Pricing</Badge>
        <h1 className="font-semibold text-3xl tracking-tight sm:text-4xl">
          Plans for teams of every size
        </h1>
        <p className="text-balance text-muted-foreground">
          Start for free and scale as you grow. Switch plans or cancel anytime.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
        {tiers.map((tier) => (
          <Card
            className={
              tier.featured
                ? "border-primary shadow-md lg:-translate-y-2"
                : undefined
            }
            key={tier.name}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {tier.name}
                {tier.featured ? <Badge>Most popular</Badge> : null}
              </CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-semibold text-3xl tracking-tight">
                  {tier.price}
                </span>
                {tier.priceSuffix ? (
                  <span className="text-muted-foreground text-sm">
                    {tier.priceSuffix}
                  </span>
                ) : null}
              </div>
            </CardHeader>
            <CardPanel>
              <Separator />
              <ul className="mt-6 flex flex-col gap-3 text-sm">
                {tier.features.map((feature) => (
                  <li className="flex items-center gap-2" key={feature}>
                    <CheckIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-success-foreground"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardPanel>
            <CardFooter>
              <Button
                className="w-full"
                variant={tier.featured ? "default" : "outline"}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
