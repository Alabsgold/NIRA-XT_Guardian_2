import { useState } from "react";
import { Users, Smartphone, Clock, Shield, Plus, Settings, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { Switch } from "@/components/ui/switch";

const devices = [
  {
    id: 1,
    name: "Kids iPad",
    type: "tablet",
    user: "Emma",
    status: "active" as const,
    filters: ["adult", "social", "gaming"],
    screenTime: { used: 2.5, limit: 4 },
    lastActive: "5 min ago",
  },
  {
    id: 2,
    name: "Gaming PC",
    type: "desktop",
    user: "Jake",
    status: "warning" as const,
    filters: ["adult", "gambling"],
    screenTime: { used: 3.8, limit: 4 },
    lastActive: "Active now",
  },
  {
    id: 3,
    name: "Smart TV",
    type: "tv",
    user: "Family",
    status: "muted" as const,
    filters: ["adult"],
    screenTime: { used: 1, limit: 6 },
    lastActive: "2 hours ago",
  },
];

const categories = [
  { id: "adult", name: "Adult Content", enabled: true },
  { id: "social", name: "Social Media", enabled: true },
  { id: "gaming", name: "Gaming Sites", enabled: false },
  { id: "gambling", name: "Gambling", enabled: true },
  { id: "streaming", name: "Streaming", enabled: false },
  { id: "shopping", name: "Shopping", enabled: false },
];

export default function ParentalControl() {
  const [categoryStates, setCategoryStates] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.enabled }), {} as Record<string, boolean>)
  );

  const toggleCategory = (id: string) => {
    setCategoryStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Parental Controls
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage content filtering and screen time for family devices
            </p>
          </div>

          <Button variant="hero">
            <Plus className="w-4 h-4" />
            Add Device
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Device List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold font-heading">Managed Devices</h2>

            {devices.map((device, index) => (
              <CyberCard
                key={device.id}
                variant="default"
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{device.name}</h3>
                        <StatusBadge status={device.status}>
                          {device.status === "active" ? "Protected" : device.status === "warning" ? "Near Limit" : "Offline"}
                        </StatusBadge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {device.user} • {device.lastActive}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Screen Time Progress */}
                    <div className="min-w-[140px]">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Screen Time</span>
                        <span className="font-medium">
                          {device.screenTime.used}h / {device.screenTime.limit}h
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            device.screenTime.used / device.screenTime.limit > 0.9
                              ? "bg-destructive"
                              : device.screenTime.used / device.screenTime.limit > 0.7
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                          style={{
                            width: `${Math.min((device.screenTime.used / device.screenTime.limit) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <Button variant="ghost" size="icon">
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Active Filters */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Active Filters
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {device.filters.map((filter) => (
                      <span
                        key={filter}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                      >
                        {categories.find((c) => c.id === filter)?.name || filter}
                      </span>
                    ))}
                  </div>
                </div>
              </CyberCard>
            ))}
          </div>

          {/* Category Controls */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold font-heading">Content Categories</h2>

            <CyberCard variant="glow" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Filter Settings
                </CyberCardTitle>
                <p className="text-sm text-muted-foreground">
                  Toggle categories to block across all devices
                </p>
              </CyberCardHeader>
              <CyberCardContent className="space-y-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">
                        {category.name}
                      </span>
                    </div>
                    <Switch
                      checked={categoryStates[category.id]}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                  </div>
                ))}
              </CyberCardContent>
            </CyberCard>

            {/* Schedule Card */}
            <CyberCard variant="default" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  Bedtime Schedule
                </CyberCardTitle>
              </CyberCardHeader>
              <CyberCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Weekdays</span>
                    <span className="text-sm font-medium text-foreground">9:00 PM - 7:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Weekends</span>
                    <span className="text-sm font-medium text-foreground">10:00 PM - 8:00 AM</span>
                  </div>
                  <Button variant="cyber-outline" size="sm" className="w-full mt-2">
                    Edit Schedule
                  </Button>
                </div>
              </CyberCardContent>
            </CyberCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
