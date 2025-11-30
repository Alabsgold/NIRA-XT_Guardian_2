import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api, { fetchSystemIP } from '@/lib/api';
import { Laptop, Smartphone, Wifi } from 'lucide-react';

export function ConnectDeviceModal({ onDeviceConnected }: { onDeviceConnected: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [serverIP, setServerIP] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchSystemIP().then(data => setServerIP(data.ip)).catch(console.error);
        }
    }, [isOpen]);

    const handleConnect = async () => {
        setLoading(true);
        setError('');
        try {
            await api.post('/devices/link', { name });
            setIsOpen(false);
            onDeviceConnected();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to connect device');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                    <Laptop className="mr-2 h-4 w-4" /> Connect New Device
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-cyan-500/30 text-white sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-cyan-400">Connect a Device</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="this-device" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                        <TabsTrigger value="this-device">This Device</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile / Other</TabsTrigger>
                    </TabsList>

                    <TabsContent value="this-device" className="space-y-4 mt-4">
                        <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/20">
                            <p className="text-sm text-gray-300">
                                <strong>Option A: Automated Agent (Recommended)</strong><br />
                                Download our agent to automatically link your IP and configure your DNS settings.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full mt-3 border-cyan-500 text-cyan-400 hover:bg-cyan-950"
                                onClick={() => window.open('http://localhost:8000/assets/nira_agent.ps1')}
                            >
                                <Laptop className="mr-2 h-4 w-4" /> Download Agent (.ps1)
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-900 px-2 text-gray-400">Or Manual Setup</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Device Name</Label>
                            <Input
                                placeholder="e.g., Home Laptop"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <Button
                            onClick={handleConnect}
                            disabled={loading || !name}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
                        >
                            {loading ? 'Linking...' : 'Link IP Address'}
                        </Button>
                    </TabsContent>

                    <TabsContent value="mobile" className="space-y-4 mt-4">
                        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                            <div className="flex items-center gap-3 mb-3">
                                <Wifi className="w-5 h-5 text-cyan-400" />
                                <span className="font-bold text-lg text-white">{serverIP || "Loading..."}</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                This is your NIRA-XT Server IP. Configure your mobile device to use this as its DNS server.
                            </p>
                        </div>

                        <div className="space-y-3 text-sm text-gray-300">
                            <p className="font-bold text-cyan-400">How to connect (Android/iOS):</p>
                            <ol className="list-decimal pl-5 space-y-1">
                                <li>Go to <strong>Settings {'>'} Wi-Fi</strong>.</li>
                                <li>Tap the <strong>(i)</strong> or <strong>Gear</strong> icon next to your network.</li>
                                <li>Find <strong>DNS</strong> and switch to <strong>Manual</strong>.</li>
                                <li>Enter the IP above <strong>({serverIP})</strong> as the Primary DNS.</li>
                                <li>Save. Your phone is now protected!</li>
                            </ol>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
