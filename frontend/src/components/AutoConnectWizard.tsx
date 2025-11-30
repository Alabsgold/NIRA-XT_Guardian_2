import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Check, AlertTriangle } from 'lucide-react';
import { checkDeviceStatus } from '@/lib/api';
import api from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";

export function AutoConnectWizard({ onConnected }: { onConnected: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'checking' | 'unlinked' | 'linked' | 'error'>('checking');
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        try {
            const data = await checkDeviceStatus();
            setIp(data.ip);
            if (!data.linked && !data.error) {
                setStatus('unlinked');
                setIsOpen(true); // Only open if unlinked
            } else {
                setStatus('linked');
            }
        } catch (error) {
            console.error("Failed to check device status", error);
        }
    };

    const handleAutoConnect = async () => {
        setLoading(true);
        try {
            // Auto-generate a name based on OS/Browser would be cool, but for now generic
            const deviceName = `Device (${new Date().toLocaleDateString()})`;
            await api.post('/devices/link', { name: deviceName });

            toast({
                title: "Protection Enabled",
                description: `Your device (${ip}) is now secured.`,
                variant: "default", // Success style
            });

            setIsOpen(false);
            onConnected();
        } catch (err: any) {
            toast({
                title: "Connection Failed",
                description: err.response?.data?.detail || "Could not link device.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-gray-900 border-cyan-500/30 text-white sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto bg-cyan-500/20 p-3 rounded-full mb-4 w-fit">
                        <Shield className="w-8 h-8 text-cyan-400" />
                    </div>
                    <DialogTitle className="text-center text-xl text-cyan-400">Enable Network Protection?</DialogTitle>
                    <DialogDescription className="text-center text-gray-400">
                        We detected this device is not yet protected.
                        <br />
                        Grant permission to link your IP <strong>{ip}</strong> to your secure dashboard?
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-2">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Filter harmful content</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Block ads & trackers</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Real-time analytics</span>
                    </div>
                </div>

                <DialogFooter className="sm:justify-center gap-2 mt-4">
                    <Button
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        Skip for Now
                    </Button>
                    <Button
                        onClick={handleAutoConnect}
                        disabled={loading}
                        className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold min-w-[140px]"
                    >
                        {loading ? 'Activating...' : 'Yes, Protect Me'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
