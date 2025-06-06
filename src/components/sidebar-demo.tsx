
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, Logo, LogoIcon } from "@/components/ui/sidebar";
import {
  HomeIcon,
  Film,
  Users,
  Sparkles,
  Settings,
  UploadCloud,
  RadioTower, 
  CheckCircle,
  Zap,
  ArrowRight,
  ChevronRight, 
  Check, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function SidebarDemo() {
  const [activeLink, setActiveLink] = useState("Home");
  const links = [
    {
      label: "Home",
      href: "#",
      icon: <HomeIcon />,
    },
    {
      label: "Webinars",
      href: "#",
      icon: <Film />,
    },
    {
      label: "Lead",
      href: "#",
      icon: <Users />,
    },
    {
      label: "AI Agent",
      href: "#",
      icon: <Sparkles />,
    },
  ];
  const [open, setOpen] = useState(false);

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
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  active={activeLink === link.label} 
                  onClick={() => setActiveLink(link.label)}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Settings",
                href: "#",
                icon: <Settings />,
              }}
              active={activeLink === "Settings"}
              onClick={() => setActiveLink("Settings")}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between p-6 py-5 border-b border-border">
      <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="iconBackground">
          <Zap size={20} className="text-foreground" />
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Sparkles size={18} className="mr-2" /> Create a Webinar
        </Button>
      </div>
    </header>
  );
};

interface StepItem {
  id: number;
  label: string;
  href: string;
  isCompleted: boolean;
}

const stepperData: StepItem[] = [
  { id: 1, label: "Create a webinar", href: "#create-webinar", isCompleted: true },
  { id: 2, label: "Get leads for your webinar", href: "#get-leads", isCompleted: false },
  { id: 3, label: "Track conversion status", href: "#track-conversion", isCompleted: false },
];

const VerticalStepper = ({ steps }: { steps: StepItem[] }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-foreground mb-1">
        Get maximum Conversion from your webinars
      </h2>
      <p className="text-muted-foreground mb-6">
        Unlock the full potential of your online presentations.
      </p>
      <div className="space-y-3">
        {steps.map((step) => (
          <a
            key={step.id}
            href={step.href}
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                  step.isCompleted
                    ? "iconBackground" 
                    : "bg-muted border border-border text-muted-foreground group-hover:bg-background group-hover:border-primary" 
                )}
              >
                {step.isCompleted ? (
                  <Check size={18} className="text-foreground" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span className="text-foreground text-sm group-hover:text-primary">{step.label}</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary" />
          </a>
        ))}
      </div>
    </div>
  );
};


const ActionCard = ({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href?: string }) => {
  return (
    <Card className="bg-card border-border text-foreground flex flex-col">
      <CardHeader className="pb-3">
        <div className="w-10 h-10 rounded-lg iconBackground flex items-center justify-center mb-3">
          {React.cloneElement(icon as React.ReactElement, { className: "text-foreground" })}
        </div>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-muted-foreground text-sm">{description}</CardDescription>
      </CardContent>
      {href && (
        <CardFooter>
          <a href={href} className="text-sm text-primary hover:text-primary/80 flex items-center">
            View <ArrowRight size={16} className="ml-1" />
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

const CustomerListItem = ({ name, email, tags }: { name: string, email: string, tags: string[] }) => {
  return (
    <div className="py-3 border-b border-border/50 last:border-b-0">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-foreground">{name}</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-1.5">{email}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};


const Dashboard = () => {
  const potentialCustomers = [
    { name: "John Doe", email: "johndoe@gmail.com", tags: ["New Customer", "Tag 2", "Tag 3"] },
    { name: "Jane Smith", email: "janesmith@example.com", tags: ["Interested", "Followed Up"] },
    { name: "Alex Johnson", email: "alexj@mail.co", tags: ["Demo Scheduled", "High Priority"] },
  ];

  const currentCustomers = [
    { name: "Emily White", email: "emily.white@company.com", tags: ["Active User", "Premium"] },
    { name: "Michael Brown", email: "mbrown@domain.org", tags: ["Long-term", "Feedback Given"] },
    { name: "Sarah Green", email: "sarah.g@web.net", tags: ["New Customer", "Needs Onboarding"] },
  ];


  return (
    <div className="flex flex-1 flex-col bg-background text-foreground overflow-y-auto">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <VerticalStepper steps={stepperData} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard 
            icon={<UploadCloud size={22} />}
            title="Browse or drag a pre-recorded webinar file"
            description="Easily upload your existing webinar content to get started."
          />
          <ActionCard 
            icon={<RadioTower size={22} />} 
            title="Go live and interact with your audience in real-time"
            description="Engage your viewers with live sessions and Q&A."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-border text-foreground">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Potential Customers</CardTitle>
                <span className="text-sm text-muted-foreground">Conversions <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary">50</Badge></span>
              </div>
              <CardDescription className="text-muted-foreground text-sm">See how far along are your potential customers.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-60 overflow-y-auto pr-2 scrollbar-hide">
              {potentialCustomers.map((customer, idx) => (
                <CustomerListItem key={idx} {...customer} />
              ))}
            </CardContent>
            <CardFooter className="justify-end pt-4">
               <a href="#" className="text-sm text-primary hover:text-primary/80 flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </a>
            </CardFooter>
          </Card>

          <Card className="bg-card border-border text-foreground">
             <CardHeader>
              <CardTitle className="text-lg font-medium">Current Customers</CardTitle>
              <CardDescription className="text-muted-foreground text-sm">See the list of your current customers.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-60 overflow-y-auto pr-2 opacity-75 scrollbar-hide">
               {currentCustomers.map((customer, idx) => (
                <CustomerListItem key={idx} {...customer} />
              ))}
            </CardContent>
             <CardFooter className="justify-end pt-4">
               <a href="#" className="text-sm text-primary hover:text-primary/80 flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </a>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};
