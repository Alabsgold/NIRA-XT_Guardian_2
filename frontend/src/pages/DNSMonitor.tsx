import { useState, useEffect } from "react";
import { Activity, Filter, Download, Pause, Play, Search, Globe, Shield, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";

interface DNSQuery {
  id: string;
  timestamp: string;
  domain: string;
  type: string;
  device: string;
  status: "allowed" | "blocked" | "cached";
  responseTime: number;
}

const generateQuery = (id: number): DNSQuery => {
  const domains = [
    "api.github.com",
    "cdn.cloudflare.com",
    "analytics.google.com",
    "ads.doubleclick.net",
    "tracker.fb.com",
    "api.stripe.com",
    "fonts.googleapis.com",
    "malware.badsite.xyz",
    "phishing.scam.net",
    "cdn.jsdelivr.net",
  ];
  const devices = ["MacBook Pro", "iPhone 14", "iPad Air", "Smart TV", "Gaming PC"];
  const types = ["A", "AAAA", "CNAME", "MX", "TXT"];

  const domain = domains[Math.floor(Math.random() * domains.length)];
  const isMalicious = domain.includes("malware") || domain.includes("phishing") || domain.includes("tracker") || domain.includes("ads");

  return {
    id: `query-${id}-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    domain,
    type: types[Math.floor(Math.random() * types.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
    status: isMalicious ? "blocked" : Math.random() > 0.3 ? "allowed" : "cached",
    responseTime: Math.floor(Math.random() * 50) + 5,
  };
};

export default function DNSMonitor() {
  const [queries, setQueries] = useState<DNSQuery[]>(() =>
    Array.from({ length: 10 }, (_, i) => generateQuery(i))
  );
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState<"all" | "blocked" | "allowed">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setQueries((prev) => {
        const newQuery = generateQuery(prev.length);
        return [newQuery, ...prev.slice(0, 99)];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredQueries = queries.filter((query) => {
    if (filter !== "all" && query.status !== filter) return false;
    if (searchTerm && !query.domain.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: queries.length,
    blocked: queries.filter((q) => q.status === "blocked").length,
    allowed: queries.filter((q) => q.status === "allowed").length,
    cached: queries.filter((q) => q.status === "cached").length,
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              DNS Live Monitor
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time DNS query streaming and analysis
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={isPaused ? "success" : "cyber-outline"}
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              )}
            </Button>
            <Button variant="cyber-outline">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Queries</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-success">{stats.allowed}</p>
                <p className="text-xs text-muted-foreground">Allowed</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-destructive">{stats.blocked}</p>
                <p className="text-xs text-muted-foreground">Blocked</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-secondary">{stats.cached}</p>
                <p className="text-xs text-muted-foreground">Cached</p>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Filters */}
        <CyberCard variant="default" hover={false}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Button
                variant={filter === "all" ? "cyber" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "allowed" ? "success" : "ghost"}
                size="sm"
                onClick={() => setFilter("allowed")}
              >
                Allowed
              </Button>
              <Button
                variant={filter === "blocked" ? "destructive" : "ghost"}
                size="sm"
                onClick={() => setFilter("blocked")}
              >
                Blocked
              </Button>
            </div>
          </div>
        </CyberCard>

        {/* Live Table */}
        <CyberCard variant="glow" hover={false}>
          <CyberCardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CyberCardTitle className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-warning" : "bg-success animate-pulse"}`} />
                Live DNS Stream
              </CyberCardTitle>
              <span className="text-sm text-muted-foreground">
                {filteredQueries.length} queries
              </span>
            </div>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Device
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Response
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredQueries.slice(0, 20).map((query, index) => (
                    <tr
                      key={query.id}
                      className="hover:bg-muted/30 transition-colors dns-row-animate"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="py-3 px-4 text-sm text-muted-foreground font-mono">
                        {query.timestamp}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        {query.domain}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded bg-muted text-xs font-mono text-muted-foreground">
                          {query.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {query.device}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge
                          status={
                            query.status === "blocked"
                              ? "danger"
                              : query.status === "allowed"
                              ? "success"
                              : "active"
                          }
                        >
                          {query.status}
                        </StatusBadge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground font-mono">
                        {query.responseTime}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>
    </AppLayout>
  );
}
