import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Activity,
  Shield,
  Users,
  ListChecks,
  FileText,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Globe,
  X,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Activity, label: "DNS Monitor", path: "/dns-monitor" },
  { icon: Users, label: "Parental Control", path: "/parental-control" },
  { icon: ListChecks, label: "Block/Allow List", path: "/block-allow" },
  { icon: FileText, label: "Activity Logs", path: "/logs" },
  { icon: Server, label: "API Access", path: "/api-docs" },
];

const settingsItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: CreditCard, label: "Subscription", path: "/subscription" },
];

export function Sidebar({
  collapsed = false,
  onCollapse,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-50 transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button variant="ghost" size="icon" onClick={onMobileClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo Section */}
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            {!collapsed && (
              <span className="font-bold font-heading text-sidebar-foreground">
                X-DNS
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="mb-4">
            {!collapsed && (
              <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Main Menu
              </span>
            )}
          </div>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200",
                collapsed && "justify-center"
              )}
              activeClassName="bg-sidebar-accent text-primary border-l-2 border-primary"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}

          <div className="pt-6 mt-6 border-t border-sidebar-border">
            {!collapsed && (
              <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Account
              </span>
            )}
            <div className="mt-4 space-y-1">
              {settingsItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200",
                    collapsed && "justify-center"
                  )}
                  activeClassName="bg-sidebar-accent text-primary"
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-sidebar-border hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={onCollapse}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-2">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
