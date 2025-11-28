import { Settings as SettingsIcon, User, Shield, Bell, Globe, Key } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from "@/components/ui/cyber-card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and application preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="account">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="dns">
              <Globe className="w-4 h-4 mr-2" />
              DNS Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            {/* Profile Card */}
            <CyberCard variant="glow" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle>Profile Information</CyberCardTitle>
              </CyberCardHeader>
              <CyberCardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    <Button variant="cyber-outline" size="sm" className="mt-2">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="mt-1 w-full h-10 px-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="mt-1 w-full h-10 px-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="mt-1 w-full h-10 px-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <Button variant="hero">Save Changes</Button>
              </CyberCardContent>
            </CyberCard>


          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <CyberCard variant="glow" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  Password & Authentication
                </CyberCardTitle>
              </CyberCardHeader>
              <CyberCardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium text-foreground">Password</h4>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button variant="cyber-outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium text-foreground">Active Sessions</h4>
                    <p className="text-sm text-muted-foreground">Manage devices logged into your account</p>
                  </div>
                  <Button variant="cyber-outline">View Sessions</Button>
                </div>
              </CyberCardContent>
            </CyberCard>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <CyberCard variant="glow" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CyberCardTitle>
              </CyberCardHeader>
              <CyberCardContent className="space-y-4">
                {[
                  { title: "Threat Alerts", desc: "Get notified when threats are blocked" },
                  { title: "Weekly Reports", desc: "Receive weekly security summaries" },
                  { title: "Device Activity", desc: "Alerts for new device connections" },
                  { title: "System Updates", desc: "Notifications about service updates" },
                  { title: "Screen Time Limits", desc: "Alerts when devices reach limits" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CyberCardContent>
            </CyberCard>
          </TabsContent>

          <TabsContent value="dns" className="space-y-6">
            <CyberCard variant="glow" hover={false}>
              <CyberCardHeader>
                <CyberCardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  DNS Configuration
                </CyberCardTitle>
              </CyberCardHeader>
              <CyberCardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <h4 className="font-medium text-foreground mb-2">Your DNS Addresses</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <p className="text-xs text-muted-foreground">Primary DNS</p>
                      <p className="font-mono text-foreground">103.234.56.78</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <p className="text-xs text-muted-foreground">Secondary DNS</p>
                      <p className="font-mono text-foreground">103.234.56.79</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium text-foreground">DNSSEC Validation</h4>
                    <p className="text-sm text-muted-foreground">Verify DNS response authenticity</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium text-foreground">DNS over HTTPS (DoH)</h4>
                    <p className="text-sm text-muted-foreground">Encrypt DNS queries</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium text-foreground">Query Logging</h4>
                    <p className="text-sm text-muted-foreground">Store DNS query history for 30 days</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CyberCardContent>
            </CyberCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
