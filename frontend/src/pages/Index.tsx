import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Zap,
  Lock,
  Globe,
  Users,
  BarChart3,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react";
import heroImage from "@/assets/hero-shield.png";

const features = [
  {
    icon: Shield,
    title: "Real-Time DNS Protection",
    description:
      "Block malicious domains, phishing attempts, and malware at the DNS level before they reach your devices.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Resolution",
    description:
      "Experience blazing-fast DNS resolution with our globally distributed network infrastructure.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your browsing data stays private. We don't log, sell, or share your DNS queries with anyone.",
  },
  {
    icon: Users,
    title: "Parental Controls",
    description:
      "Protect your family with customizable content filtering and device-level controls.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Access our worldwide network of secure DNS servers for reliable protection anywhere.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Gain insights into your network activity with detailed analytics and threat reports.",
  },
];

const stats = [
  { value: "99.99%", label: "Uptime" },
  { value: "50M+", label: "Threats Blocked" },
  { value: "<15ms", label: "Avg Response" },
  { value: "180+", label: "Countries" },
];

const pricingPlans = [
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
    cta: "Get Started",
    popular: false,
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
    cta: "Start Free Trial",
    popular: true,
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
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-heading">
              X-DNS <span className="text-primary">Guardian+</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/dashboard">
                Get Protected
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 cyber-grid opacity-30" />

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary">
                <Zap className="w-4 h-4" />
                NIRA-XT 2025 Hackathon Project
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Secure Your Digital
                <span className="block text-gradient">DNS Protection</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Enterprise-grade DNS security for everyone. Block malware,
                phishing, and unwanted content at the network level with
                real-time threat intelligence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/dashboard">
                    Start Free Protection
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 border-2 border-background"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">10,000+</span>{" "}
                  networks protected worldwide
                </p>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <img
                  src={heroImage}
                  alt="X-DNS Guardian+ Security Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-card/90 backdrop-blur-sm border border-border shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Threats Blocked Today
                    </p>
                    <p className="text-xl font-bold text-success">1,247</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-3xl md:text-4xl font-bold font-heading text-gradient">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Complete DNS Security Suite
            </h2>
            <p className="text-muted-foreground">
              Everything you need to protect your network, privacy, and family
              from online threats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-float neon-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground">
              Choose the plan that fits your security needs. All plans include
              our core protection features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-xl border transition-all duration-300 card-float animate-fade-in ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/10 to-card border-primary/50 shadow-[0_0_30px_hsl(211_100%_52%/0.2)]"
                    : "bg-card border-border hover:border-primary/30"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold font-heading mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-heading">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "cyber-outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/dashboard">
                    {plan.cta}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 lg:p-16 bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30">
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Ready to Secure Your Network?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who trust X-DNS Guardian+ for their
                network security. Start protecting your devices today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/dashboard">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold font-heading">
                X-DNS Guardian+
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 X-DNS Guardian+. Built for NIRA-XT Hackathon.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
