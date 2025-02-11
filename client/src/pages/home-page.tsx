import { SidebarNav } from "@/components/sidebar-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { CpuIcon, ServerIcon, ShieldCheck, GitBranch, Loader2 } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import { Resource } from "@shared/schema";
import { Link } from "wouter";

export default function HomePage() {
  const { user } = useAuth();
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const stats = [
    {
      title: "dashboard.stats.cicd",
      value: resources.filter(r => r.category === "cicd").length,
      description: "dashboard.stats.cicd.description",
      icon: GitBranch,
      category: "cicd",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "dashboard.stats.iac",
      value: resources.filter(r => r.category === "infrastructure").length,
      description: "dashboard.stats.iac.description",
      icon: ServerIcon,
      category: "infrastructure",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "dashboard.stats.monitoring",
      value: resources.filter(r => r.category === "monitoring").length,
      description: "dashboard.stats.monitoring.description",
      icon: CpuIcon,
      category: "monitoring",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "dashboard.stats.security",
      value: resources.filter(r => r.category === "security").length,
      description: "dashboard.stats.security.description",
      icon: ShieldCheck,
      category: "security",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <SidebarNav />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            <FormattedMessage 
              id="dashboard.welcome" 
              values={{ username: user?.username }} 
            />
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            <FormattedMessage id="dashboard.description" />
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={`/resources?category=${stat.category}`}>
                <Card className="cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      <FormattedMessage id={stat.title} />
                    </CardTitle>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <FormattedMessage id={stat.description} />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}