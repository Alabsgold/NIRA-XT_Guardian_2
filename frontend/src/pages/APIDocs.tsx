import { AppLayout } from "@/components/layout/AppLayout";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { Button } from "@/components/ui/button";
import { Terminal, Code, Server, Shield, Copy, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function APIDocs() {
    const [copied, setCopied] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Copied to clipboard");
    };

    const handleGenerateKey = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/v1/auth/generate-api-key", {
                method: "POST",
            });
            if (!response.ok) throw new Error("Failed to generate key");
            const data = await response.json();
            setApiKey(data.api_key);
            toast.success("New API key generated successfully");
        } catch (error) {
            toast.error("Failed to generate API key. Is the backend running?");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
                        <Server className="w-8 h-8 text-primary" />
                        API Access
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Integrate X-DNS Guardian+ capabilities directly into your systems.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <CyberCard variant="glow" hover={false}>
                            <CyberCardHeader>
                                <CyberCardTitle className="flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-primary" />
                                    Quick Start
                                </CyberCardTitle>
                            </CyberCardHeader>
                            <CyberCardContent className="space-y-4">
                                <p className="text-muted-foreground">
                                    Our REST API allows you to programmatically manage DNS settings, retrieve logs, and configure security policies.
                                    All requests must be authenticated using your API key.
                                </p>

                                <div className="bg-muted/50 rounded-lg p-4 border border-border font-mono text-sm relative group">
                                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard("curl -X GET https://api.xdns-guardian.app/v1/status -H 'Authorization: Bearer YOUR_API_KEY'")}>
                                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                    <span className="text-primary">curl</span> -X GET https://api.xdns-guardian.app/v1/status \<br />
                                    &nbsp;&nbsp;-H <span className="text-secondary">'Authorization: Bearer YOUR_API_KEY'</span>
                                </div>
                            </CyberCardContent>
                        </CyberCard>

                        <CyberCard variant="default" hover={false}>
                            <CyberCardHeader>
                                <CyberCardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-primary" />
                                    Endpoints
                                </CyberCardTitle>
                            </CyberCardHeader>
                            <CyberCardContent className="space-y-4">
                                <div className="space-y-4">
                                    {[
                                        { method: "GET", path: "/v1/dns/stats", desc: "Get real-time DNS query statistics" },
                                        { method: "POST", path: "/v1/security/blocklist", desc: "Add a domain to the blocklist" },
                                        { method: "GET", path: "/v1/logs/audit", desc: "Retrieve system audit logs" },
                                        { method: "POST", path: "/v1/devices/register", desc: "Register a new device for protection" },
                                    ].map((endpoint, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                                    {endpoint.method}
                                                </span>
                                                <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                                            </div>
                                            <span className="text-sm text-muted-foreground">{endpoint.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </CyberCardContent>
                        </CyberCard>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <CyberCard variant="gradient" hover={false}>
                            <CyberCardHeader>
                                <CyberCardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    Authentication
                                </CyberCardTitle>
                            </CyberCardHeader>
                            <CyberCardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Your API keys grant full access to your account. Keep them secure.
                                </p>
                                <div className="p-3 rounded bg-background border border-border">
                                    <label className="text-xs text-muted-foreground block mb-1">Your API Key</label>
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm font-mono text-foreground">
                                            {apiKey || "No key generated"}
                                        </code>
                                        {apiKey && (
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => copyToClipboard(apiKey)}>
                                                <Copy className="w-3 h-3" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    className="w-full"
                                    variant="cyber-outline"
                                    onClick={handleGenerateKey}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        "Generate New Key"
                                    )}
                                </Button>
                            </CyberCardContent>
                        </CyberCard>

                        <CyberCard variant="default" hover={false}>
                            <CyberCardHeader>
                                <CyberCardTitle>Documentation</CyberCardTitle>
                            </CyberCardHeader>
                            <CyberCardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-primary hover:underline flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Full API Reference</a></li>
                                    <li><a href="#" className="text-primary hover:underline flex items-center gap-2"><ChevronRight className="w-3 h-3" /> SDKs & Libraries</a></li>
                                    <li><a href="#" className="text-primary hover:underline flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Rate Limits</a></li>
                                </ul>
                            </CyberCardContent>
                        </CyberCard>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
