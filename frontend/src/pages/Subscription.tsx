import { CreditCard, Check, ChevronRight, Shield, Zap, Globe, Users } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { StatusBadge } from "@/components/ui/status-badge";

const plans = [
  {
    name: "Personal",
    price: "Free",
    period: "",
    features: [
      "1 Network Location",
      "Basic Threat Protection",
      "Community Support",
      "Standard DNS Resolution",
    ],
    current: false,
  },
  {
    name: "Guardian",
    price: "$9.99",
    period: "/month",
    features: [
      "5 Network Locations",
      "Advanced Threat Protection",
      "Parental Controls",
      "Priority DNS Resolution",
      "Analytics Dashboard",
      "Email Support",
    ],
    current: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited Locations",
      "Enterprise-Grade Security",
      "Custom Block Lists",
      "API Access",
      "Dedicated Support",
      "SLA Guarantee",
    ],
    current: false,
  },
];

const invoices = [
  { id: "INV-001", date: "Jan 17, 2025", amount: "$9.99", status: "Paid" },
  { id: "INV-002", date: "Dec 17, 2024", amount: "$9.99", status: "Paid" },
  { id: "INV-003", date: "Nov 17, 2024", amount: "$9.99", status: "Paid" },
];

export default function Subscription() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-primary" />
            Subscription & Billing
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription plan and billing information
          </p>
        </div>

        {/* Current Plan */}
        <CyberCard variant="glow" hover={false}>
          <CyberCardHeader>
            <CyberCardTitle>Current Plan</CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-heading">Guardian Plan</h3>
                    <StatusBadge status="success">Active</StatusBadge>
                  </div>
                  <p className="text-muted-foreground">$9.99/month • Next billing: Feb 17, 2025</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="cyber-outline">Change Plan</Button>
                <Button variant="ghost" className="text-destructive hover:text-destructive">
                  Cancel
                </Button>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Network Locations</span>
                </div>
                <p className="text-2xl font-bold">3 / 5</p>
                <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                  <div className="h-full w-3/5 bg-primary rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Connected Devices</span>
                </div>
                <p className="text-2xl font-bold">12 / ∞</p>
                <p className="text-xs text-muted-foreground mt-2">Unlimited devices</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="text-sm text-muted-foreground">DNS Queries</span>
                </div>
                <p className="text-2xl font-bold">48K / ∞</p>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Available Plans */}
        <div>
          <h2 className="text-lg font-semibold font-heading mb-4">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <CyberCard
                key={plan.name}
                variant={plan.current ? "glow" : "default"}
                className={`relative animate-fade-in ${plan.current ? "border-primary/50" : ""}`}
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              >
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Current Plan
                  </div>
                )}

                <CyberCardHeader>
                  <CyberCardTitle>{plan.name}</CyberCardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold font-heading">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CyberCardHeader>

                <CyberCardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.current ? "cyber" : "cyber-outline"}
                    className="w-full"
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.price === "Custom" ? "Contact Sales" : "Upgrade"}
                  </Button>
                </CyberCardContent>
              </CyberCard>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <CyberCard variant="default" hover={false}>
          <CyberCardHeader>
            <CyberCardTitle>Billing History</CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="space-y-2">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-foreground">{invoice.amount}</span>
                    <StatusBadge status="success">{invoice.status}</StatusBadge>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Payment Method */}
        <CyberCard variant="default" hover={false}>
          <CyberCardHeader>
            <CyberCardTitle>Payment Method</CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded bg-gradient-to-r from-primary/50 to-secondary/50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="cyber-outline">Update</Button>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>
    </AppLayout>
  );
}
