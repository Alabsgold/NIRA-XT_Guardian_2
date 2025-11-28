import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smartphone, Wifi, ArrowRight, Apple, Smartphone as AndroidIcon, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export function MobileConnectModal() {
    const [ip, setIp] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchIp = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8000/api/v1/system/ip");
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error("Failed to fetch IP", error);
                setIp("127.0.0.1");
            } finally {
                setLoading(false);
            }
        };
        fetchIp();
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="cyber-outline" size="sm" className="gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span className="hidden sm:inline">Connect Device</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Wifi className="w-5 h-5 text-primary" />
                        Connect Your Mobile Device
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* IP Display */}
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Your Server IP Address</p>
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                        ) : (
                            <h2 className="text-3xl font-bold font-mono text-primary tracking-wider">{ip}</h2>
                        )}
                    </div>

                    <Tabs defaultValue="ios" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ios" className="gap-2">
                                <Apple className="w-4 h-4" /> iOS
                            </TabsTrigger>
                            <TabsTrigger value="android" className="gap-2">
                                <AndroidIcon className="w-4 h-4" /> Android
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="ios" className="space-y-4 mt-4">
                            <div className="space-y-3 text-sm">
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                                    <p>Go to <span className="font-semibold text-foreground">Settings {'>'} Wi-Fi</span> and tap the <span className="text-blue-400">(i)</span> icon next to your network.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                                    <p>Scroll down to <span className="font-semibold text-foreground">Configure DNS</span> and select <span className="font-semibold text-foreground">Manual</span>.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                                    <p>Tap <span className="font-semibold text-foreground">Add Server</span> and enter the IP address shown above.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                                    <p>Tap <span className="font-semibold text-foreground">Save</span>. Your device is now protected!</p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="android" className="space-y-4 mt-4">
                            <div className="space-y-3 text-sm">
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                                    <p>Go to <span className="font-semibold text-foreground">Settings {'>'} Network & Internet</span>.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                                    <p>Find <span className="font-semibold text-foreground">Private DNS</span> (often under Advanced).</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                                    <p>Select <span className="font-semibold text-foreground">Private DNS provider hostname</span>.</p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                                    <p>Note: Android requires a hostname. For IP-based blocking, use your Wi-Fi settings' <span className="font-semibold text-foreground">IP Settings {'>'} Static</span> and set DNS 1 to the IP above.</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}
