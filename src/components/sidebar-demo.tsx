
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function SidebarDemo() {
  const links = [
    {
      label: "Home",
      href: "#",
      icon: <HomeIcon />,
      active: true,
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
        "flex w-full flex-1 flex-col overflow-hidden bg-neutral-900 md:flex-row",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 p-4">
          <div className="flex flex-1 flex-col overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-12 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} active={link.active || false} />
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
    <header className="flex items-center justify-between p-6 py-5 border-b border-neutral-800">
      <h1 className="text-xl font-semibold text-white">Home</h1>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-300 hover:text-white">
          <Zap size={20} />
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Sparkles size={18} className="mr-2" /> Create a Webinar
        </Button>
      </div>
    </header>
  );
};

const ConversionFeature = () => {
  const features = [
    { text: "Create a webinar", icon: <CheckCircle size={20} className="text-green-500" /> },
    { text: "Get leads", icon: <CheckCircle size={20} className="text-green-500" /> },
    { text: "Conversion status", icon: <CheckCircle size={20} className="text-green-500" /> },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-white mb-1">Get maximum Conversion from your webinars</h2>
      <p className="text-neutral-400 mb-6">Unlock the full potential of your online presentations.</p>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            {feature.icon}
            <span className="text-neutral-200 text-sm">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href?: string }) => {
  return (
    <Card className="bg-neutral-800/70 border-neutral-700/80 text-white flex flex-col">
      <CardHeader className="pb-3">
        <div className="w-10 h-10 rounded-lg bg-neutral-700 flex items-center justify-center mb-3 text-primary">
          {icon}
        </div>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-neutral-400 text-sm">{description}</CardDescription>
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
    <div className="py-3 border-b border-neutral-700/50 last:border-b-0">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-neutral-100">{name}</h4>
      </div>
      <p className="text-xs text-neutral-400 mb-1.5">{email}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="bg-neutral-700 text-neutral-300 text-xs px-1.5 py-0.5">
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
    <div className="flex flex-1 flex-col bg-neutral-900 text-white overflow-y-auto">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <ConversionFeature />
        
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
          <Card className="bg-neutral-800/70 border-neutral-700/80 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Potential Customers</CardTitle>
                <span className="text-sm text-neutral-400">Conversions <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary">50</Badge></span>
              </div>
              <CardDescription className="text-neutral-400 text-sm">See how far along are your potential customers.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-60 overflow-y-auto pr-2">
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

          <Card className="bg-neutral-800/70 border-neutral-700/80 text-white">
             <CardHeader>
              <CardTitle className="text-lg font-medium">Current Customers</CardTitle>
              <CardDescription className="text-neutral-400 text-sm">See the list of your current customers.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-60 overflow-y-auto pr-2 opacity-75">
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
