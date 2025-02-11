import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";
import {
  Home,
  Library,
  LogOut,
  Menu,
  Settings,
  Globe,
  User,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/", label: "nav.dashboard", icon: Home },
    { href: "/resources", label: "nav.resources", icon: Library },
    { href: "/about", label: "nav.about", icon: User },
  ];

  if (user?.isAdmin) {
    items.push({ href: "/settings", label: "nav.settings", icon: Settings });
  }

  const nav = (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            DevOps Doctor
          </h2>
          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <FormattedMessage id={item.label} />
                  </Button>
                </Link>
              );
            })}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  <FormattedMessage id="language" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLocale('en')}>
                  <FormattedMessage id="language.en" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale('es')}>
                  <FormattedMessage id="language.es" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <FormattedMessage id="nav.logout" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {nav}
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block">
        <ScrollArea className="h-screen w-64 border-r">
          {nav}
        </ScrollArea>
      </div>
    </>
  );
}