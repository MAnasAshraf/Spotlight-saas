
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar, SidebarBody, SidebarLink, Logo, LogoIcon } from "@/components/ui/sidebar";
import {
  HomeIcon,
  Film,
  Users,
  Sparkles,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dashboardLinks = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    label: "Webinars",
    href: "/dashboard/webinars",
    icon: <Film />,
  },
  {
    label: "Lead",
    href: "/dashboard/leads", // Placeholder, page to be created
    icon: <Users />,
  },
  {
    label: "AI Agent",
    href: "/dashboard/ai-agent", // Placeholder, page to be created
    icon: <Sparkles />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const getActiveLabel = () => {
    const exactMatch = dashboardLinks.find(link => pathname === link.href);
    if (exactMatch) return exactMatch.label;

    if (pathname.startsWith("/dashboard/webinars")) return "Webinars";
    if (pathname.startsWith("/dashboard/leads")) return "Lead";
    if (pathname.startsWith("/dashboard/ai-agent")) return "AI Agent";
    if (pathname.startsWith("/dashboard/settings")) return "Settings";
    if (pathname === '/dashboard') return "Home";
    
    // Fallback for deeply nested routes, try to match parent
    const parentLink = dashboardLinks.find(link => pathname.startsWith(link.href) && link.href !== '/dashboard');
    if (parentLink) return parentLink.label;

    return ""; 
  };
  
  const activeLabel = getActiveLabel();

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden bg-background md:flex-row",
        "h-screen" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 p-4">
          <div className="flex flex-1 flex-col overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-12 flex flex-col gap-2">
              {dashboardLinks.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  active={activeLabel === link.label}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Settings",
                href: "/dashboard/settings", // Placeholder, page to be created
                icon: <Settings />,
              }}
              active={activeLabel === "Settings"}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 flex-col overflow-y-auto bg-background text-foreground">
        {children}
      </div>
    </div>
  );
}
