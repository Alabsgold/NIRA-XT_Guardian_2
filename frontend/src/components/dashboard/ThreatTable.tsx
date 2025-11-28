import { AlertTriangle, Shield, ExternalLink } from "lucide-react";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

const threats = [
  {
    id: 1,
    domain: "malware-site.xyz",
    type: "Malware",
    severity: "danger" as const,
    time: "2 min ago",
    device: "iPhone 14",
  },
  {
    id: 2,
    domain: "phishing-attempt.net",
    type: "Phishing",
    severity: "danger" as const,
    time: "15 min ago",
    device: "MacBook Pro",
  },
  {
    id: 3,
    domain: "tracker.analytics.io",
    type: "Tracker",
    severity: "warning" as const,
    time: "32 min ago",
    device: "iPad Air",
  },
  {
    id: 4,
    domain: "ads.network.com",
    type: "Ads",
    severity: "muted" as const,
    time: "1 hour ago",
    device: "Smart TV",
  },
];

export function ThreatTable() {
  return (
    <CyberCard variant="default" hover={false}>
      <CyberCardHeader className="flex flex-row items-center justify-between">
        <div>
          <CyberCardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Recent Threats Blocked
          </CyberCardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Auto-protected in real-time
          </p>
        </div>
        <Button variant="cyber-outline" size="sm">
          View All
        </Button>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="space-y-3">
          {threats.map((threat, index) => (
            <div
              key={threat.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all duration-200 dns-row-animate"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{threat.domain}</p>
                  <p className="text-xs text-muted-foreground">
                    {threat.device} • {threat.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={threat.severity}>{threat.type}</StatusBadge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
