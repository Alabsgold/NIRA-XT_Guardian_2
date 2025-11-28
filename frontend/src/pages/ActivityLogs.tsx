import { useState } from "react";
import { FileText, Download, Filter, Calendar, Search, AlertTriangle, Shield, Globe } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "threat" | "block" | "allow" | "system";
  title: string;
  description: string;
  severity: "danger" | "warning" | "success" | "muted";
  device?: string;
}

const logs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2025-01-17 14:32:15",
    type: "threat",
    title: "Malware Domain Blocked",
    description: "malware-distribution.xyz was blocked - known malware hosting site",
    severity: "danger",
    device: "MacBook Pro",
  },
  {
    id: "2",
    timestamp: "2025-01-17 14:28:03",
    type: "threat",
    title: "Phishing Attempt Blocked",
    description: "fake-bank-login.com was blocked - phishing attempt detected",
    severity: "danger",
    device: "iPhone 14",
  },
  {
    id: "3",
    timestamp: "2025-01-17 14:15:42",
    type: "block",
    title: "Ad Tracker Blocked",
    description: "ads.tracking-network.io was blocked by custom rule",
    severity: "warning",
    device: "iPad Air",
  },
  {
    id: "4",
    timestamp: "2025-01-17 13:58:21",
    type: "allow",
    title: "Domain Whitelisted",
    description: "api.work-tool.com was allowed - user whitelist",
    severity: "success",
    device: "Gaming PC",
  },
  {
    id: "5",
    timestamp: "2025-01-17 13:45:00",
    type: "system",
    title: "System Update Complete",
    description: "Threat database updated with 1,247 new signatures",
    severity: "muted",
  },
  {
    id: "6",
    timestamp: "2025-01-17 12:30:15",
    type: "threat",
    title: "Cryptominer Script Blocked",
    description: "miner.crypto-pool.io was blocked - cryptomining script",
    severity: "danger",
    device: "Smart TV",
  },
  {
    id: "7",
    timestamp: "2025-01-17 11:22:08",
    type: "block",
    title: "Social Media Blocked",
    description: "instagram.com was blocked - parental control rule",
    severity: "warning",
    device: "Kids iPad",
  },
  {
    id: "8",
    timestamp: "2025-01-17 10:15:33",
    type: "system",
    title: "Device Connected",
    description: "New device 'Smart Speaker' joined the network",
    severity: "muted",
  },
];

export default function ActivityLogs() {
  const [filterType, setFilterType] = useState<"all" | "threat" | "block" | "allow" | "system">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter((log) => {
    if (filterType !== "all" && log.type !== filterType) return false;
    if (searchTerm && !log.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !log.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "threat":
        return <AlertTriangle className="w-5 h-5" />;
      case "block":
        return <Shield className="w-5 h-5" />;
      case "allow":
        return <Globe className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getIconBg = (severity: LogEntry["severity"]) => {
    switch (severity) {
      case "danger":
        return "bg-destructive/10 text-destructive";
      case "warning":
        return "bg-warning/10 text-warning";
      case "success":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              Activity & Threat Logs
            </h1>
            <p className="text-muted-foreground mt-1">
              Review security events and system activity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="cyber-outline">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
            <Button variant="hero">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{logs.filter((l) => l.type === "threat").length}</p>
                <p className="text-xs text-muted-foreground">Threats Blocked</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{logs.filter((l) => l.type === "block").length}</p>
                <p className="text-xs text-muted-foreground">Custom Blocks</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{logs.filter((l) => l.type === "allow").length}</p>
                <p className="text-xs text-muted-foreground">Allowed</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{logs.length}</p>
                <p className="text-xs text-muted-foreground">Total Events</p>
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
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {(["all", "threat", "block", "allow", "system"] as const).map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "cyber" : "ghost"}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CyberCard>

        {/* Logs List */}
        <CyberCard variant="glow" hover={false}>
          <CyberCardHeader>
            <CyberCardTitle>Event Timeline</CyberCardTitle>
            <p className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {logs.length} events
            </p>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="space-y-3">
              {filteredLogs.map((log, index) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all dns-row-animate"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getIconBg(log.severity)}`}>
                    {getIcon(log.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-foreground">{log.title}</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {log.description}
                        </p>
                      </div>
                      <StatusBadge status={log.severity} className="shrink-0">
                        {log.type}
                      </StatusBadge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="font-mono">{log.timestamp}</span>
                      {log.device && (
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {log.device}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>
    </AppLayout>
  );
}
