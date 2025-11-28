import { useState } from "react";
import { ListChecks, Plus, Trash2, Search, Shield, Ban, Check } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DomainEntry {
  id: string;
  domain: string;
  addedAt: string;
  note?: string;
}

const initialBlockList: DomainEntry[] = [
  { id: "1", domain: "malware-site.xyz", addedAt: "2025-01-15", note: "Known malware distribution" },
  { id: "2", domain: "phishing.scam.net", addedAt: "2025-01-14", note: "Phishing attempt" },
  { id: "3", domain: "ads.tracker.com", addedAt: "2025-01-12", note: "Aggressive tracking" },
  { id: "4", domain: "spam.domain.io", addedAt: "2025-01-10" },
];

const initialAllowList: DomainEntry[] = [
  { id: "1", domain: "api.trusted-service.com", addedAt: "2025-01-16", note: "Required for work app" },
  { id: "2", domain: "cdn.legitimate.net", addedAt: "2025-01-14", note: "False positive fix" },
];

export default function BlockAllowList() {
  const [blockList, setBlockList] = useState(initialBlockList);
  const [allowList, setAllowList] = useState(initialAllowList);
  const [newDomain, setNewDomain] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("block");

  const addDomain = (list: "block" | "allow") => {
    if (!newDomain.trim()) return;

    const entry: DomainEntry = {
      id: Date.now().toString(),
      domain: newDomain.trim(),
      addedAt: new Date().toISOString().split("T")[0],
    };

    if (list === "block") {
      setBlockList((prev) => [entry, ...prev]);
    } else {
      setAllowList((prev) => [entry, ...prev]);
    }
    setNewDomain("");
  };

  const removeDomain = (id: string, list: "block" | "allow") => {
    if (list === "block") {
      setBlockList((prev) => prev.filter((d) => d.id !== id));
    } else {
      setAllowList((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const filteredBlockList = blockList.filter((d) =>
    d.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAllowList = allowList.filter((d) =>
    d.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
              <ListChecks className="w-8 h-8 text-primary" />
              Block/Allow List Manager
            </h1>
            <p className="text-muted-foreground mt-1">
              Customize domain filtering rules for your network
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Ban className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{blockList.length}</p>
                <p className="text-xs text-muted-foreground">Blocked Domains</p>
              </div>
            </div>
          </CyberCard>

          <CyberCard variant="stats" className="p-4" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{allowList.length}</p>
                <p className="text-xs text-muted-foreground">Allowed Domains</p>
              </div>
            </div>
          </CyberCard>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="block" className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive">
                <Ban className="w-4 h-4 mr-2" />
                Block List
              </TabsTrigger>
              <TabsTrigger value="allow" className="data-[state=active]:bg-success/20 data-[state=active]:text-success">
                <Shield className="w-4 h-4 mr-2" />
                Allow List
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Add Domain Input */}
          <CyberCard variant="default" hover={false} className="p-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter domain (e.g., example.com)"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addDomain(activeTab as "block" | "allow")}
                className="flex-1 h-10 px-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              />
              <Button
                variant={activeTab === "block" ? "destructive" : "success"}
                onClick={() => addDomain(activeTab as "block" | "allow")}
              >
                <Plus className="w-4 h-4" />
                Add to {activeTab === "block" ? "Block" : "Allow"} List
              </Button>
            </div>
          </CyberCard>

          <TabsContent value="block" className="mt-0">
            <CyberCard variant="glow" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle className="flex items-center gap-2">
                  <Ban className="w-5 h-5 text-destructive" />
                  Blocked Domains
                </CyberCardTitle>
                <p className="text-sm text-muted-foreground">
                  These domains are blocked across all your devices
                </p>
              </CyberCardHeader>
              <CyberCardContent>
                {filteredBlockList.length === 0 ? (
                  <div className="text-center py-12">
                    <Ban className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No blocked domains found</p>
                    <p className="text-sm text-muted-foreground/70">Add domains above to start blocking</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredBlockList.map((entry, index) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all dns-row-animate"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                            <Ban className="w-4 h-4 text-destructive" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{entry.domain}</p>
                            <p className="text-xs text-muted-foreground">
                              Added {entry.addedAt}
                              {entry.note && ` • ${entry.note}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeDomain(entry.id, "block")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CyberCardContent>
            </CyberCard>
          </TabsContent>

          <TabsContent value="allow" className="mt-0">
            <CyberCard variant="glow" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Allowed Domains
                </CyberCardTitle>
                <p className="text-sm text-muted-foreground">
                  These domains bypass all filtering rules
                </p>
              </CyberCardHeader>
              <CyberCardContent>
                {filteredAllowList.length === 0 ? (
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No allowed domains found</p>
                    <p className="text-sm text-muted-foreground/70">Add domains above to whitelist them</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredAllowList.map((entry, index) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all dns-row-animate"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                            <Check className="w-4 h-4 text-success" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{entry.domain}</p>
                            <p className="text-xs text-muted-foreground">
                              Added {entry.addedAt}
                              {entry.note && ` • ${entry.note}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeDomain(entry.id, "allow")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CyberCardContent>
            </CyberCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
