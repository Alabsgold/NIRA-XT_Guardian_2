import { Shield, Activity, Ban, Globe, Clock, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { ThreatTable } from "@/components/dashboard/ThreatTable";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchStats, fetchDevices } from "@/lib/api";

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    refetchInterval: 5000,
  });

  const { data: devices } = useQuery({
    queryKey: ['devices'],
    queryFn: fetchDevices,
    refetchInterval: 5000,
  });

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading">
              Security Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your network protection status in real-time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status="success" pulse>
              All Systems Protected
            </StatusBadge>
            <Button variant="cyber">
              <Activity className="w-4 h-4" />
              Run Scan
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total DNS Queries"
            value={stats?.total_queries || "..."}
            change="+12.5% from yesterday"
            changeType="positive"
            icon={Globe}
            iconColor="text-primary"
          />
          <StatsCard
            title="Threats Blocked"
            value={stats?.threats_blocked || "..."}
            change="+8.2% from yesterday"
            changeType="positive"
            icon={Shield}
            iconColor="text-success"
          />
          <StatsCard
            title="Domains Blocked"
            value={stats?.domains_blocked || "..."}
            change="Custom block list"
            changeType="neutral"
            icon={Ban}
            iconColor="text-warning"
          />
          <StatsCard
            title="Avg Response Time"
            value={stats?.avg_response_time || "..."}
            change="-3ms from average"
            changeType="positive"
            icon={Clock}
            iconColor="text-secondary"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>

          {/* Device List */}
          <CyberCard variant="default" hover={false}>
            <CyberCardHeader>
              <CyberCardTitle>Connected Devices</CyberCardTitle>
              <p className="text-sm text-muted-foreground">
                {devices?.length || 0} devices on network
              </p>
            </CyberCardHeader>
            <CyberCardContent className="space-y-3">
              {devices?.map((device: any, index: number) => (
                <div
                  key={device.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors dns-row-animate"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {device.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {device.queries.toLocaleString()} queries
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={device.status}>
                    {device.status === "active"
                      ? "Online"
                      : device.status === "warning"
                        ? "High Traffic"
                        : "Idle"}
                  </StatusBadge>
                </div>
              ))}
            </CyberCardContent>
          </CyberCard>
        </div>

        {/* Threats Table */}
        <ThreatTable />

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="cyber-outline"
            className="h-auto py-4 flex-col gap-2"
            asChild
          >
            <a href="/dns-monitor">
              <Activity className="w-5 h-5" />
              <span>Live DNS Monitor</span>
            </a>
          </Button>
          <Button
            variant="cyber-outline"
            className="h-auto py-4 flex-col gap-2"
            asChild
          >
            <a href="/parental-control">
              <Shield className="w-5 h-5" />
              <span>Parental Controls</span>
            </a>
          </Button>
          <Button
            variant="cyber-outline"
            className="h-auto py-4 flex-col gap-2"
            asChild
          >
            <a href="/block-allow">
              <Ban className="w-5 h-5" />
              <span>Block/Allow Lists</span>
            </a>
          </Button>
          <Button
            variant="cyber-outline"
            className="h-auto py-4 flex-col gap-2"
            asChild
          >
            <a href="/logs">
              <AlertTriangle className="w-5 h-5" />
              <span>Activity Logs</span>
            </a>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
