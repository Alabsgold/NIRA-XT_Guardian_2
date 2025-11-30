import { useQuery } from "@tanstack/react-query";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { Users, Globe, Shield, Server } from "lucide-react";
import api from "@/lib/api";

const fetchAdminStats = async () => {
    const { data } = await api.get('/admin/stats');
    return data;
};

const fetchUsers = async () => {
    const { data } = await api.get('/admin/users');
    return data;
};

export default function AdminDashboard() {
    const { data: stats } = useQuery({ queryKey: ['adminStats'], queryFn: fetchAdminStats });
    const { data: users } = useQuery({ queryKey: ['adminUsers'], queryFn: fetchUsers });

    return (
        <AppLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-cyan-400">Admin Control Center</h1>

                {/* Global Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Total Users" value={stats?.total_users || 0} icon={Users} iconColor="text-cyan-400" />
                    <StatsCard title="Total Devices" value={stats?.total_devices || 0} icon={Server} iconColor="text-purple-400" />
                    <StatsCard title="Total Queries" value={stats?.total_queries || 0} icon={Globe} iconColor="text-green-400" />
                    <StatsCard title="Threats Blocked" value={stats?.blocked_threats || 0} icon={Shield} iconColor="text-red-400" />
                </div>

                {/* User Management */}
                <CyberCard>
                    <CyberCardHeader>
                        <CyberCardTitle>User Management</CyberCardTitle>
                    </CyberCardHeader>
                    <CyberCardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="text-xs uppercase bg-gray-800 text-gray-200">
                                    <tr>
                                        <th className="px-4 py-3">User ID</th>
                                        <th className="px-4 py-3">Devices</th>
                                        <th className="px-4 py-3">Total Queries</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user: any) => (
                                        <tr key={user.user_id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                            <td className="px-4 py-3 font-mono text-cyan-500">{user.user_id}</td>
                                            <td className="px-4 py-3">{user.devices.join(", ")}</td>
                                            <td className="px-4 py-3">{user.queries}</td>
                                            <td className="px-4 py-3 text-green-400">Active</td>
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
