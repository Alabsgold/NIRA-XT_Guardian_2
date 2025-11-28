import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";

const data = [
  { time: "00:00", queries: 240, blocked: 24 },
  { time: "04:00", queries: 138, blocked: 12 },
  { time: "08:00", queries: 980, blocked: 89 },
  { time: "12:00", queries: 1390, blocked: 156 },
  { time: "16:00", queries: 1480, blocked: 178 },
  { time: "20:00", queries: 1120, blocked: 134 },
  { time: "24:00", queries: 450, blocked: 45 },
];

export function ActivityChart() {
  return (
    <CyberCard variant="glow" hover={false} className="h-full">
      <CyberCardHeader>
        <CyberCardTitle>DNS Query Activity</CyberCardTitle>
        <p className="text-sm text-muted-foreground">
          Last 24 hours • Real-time monitoring
        </p>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="queryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(211, 100%, 52%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(211, 100%, 52%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(355, 100%, 65%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(355, 100%, 65%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(216, 20%, 18%)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="hsl(215, 25%, 63%)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(215, 25%, 63%)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(216, 28%, 9%)",
                  border: "1px solid hsl(216, 20%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(220, 20%, 93%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="queries"
                stroke="hsl(211, 100%, 52%)"
                strokeWidth={2}
                fill="url(#queryGradient)"
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="hsl(355, 100%, 65%)"
                strokeWidth={2}
                fill="url(#blockedGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Total Queries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">Blocked</span>
          </div>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
