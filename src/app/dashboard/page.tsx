
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Sparkles, Zap, UploadCloud, RadioTower, ChevronRight, Check } from 'lucide-react';
import { CreateWebinarDialog } from '@/components/webinar/CreateWebinarDialog';

// Components specific to this page

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between p-6 py-5 border-b border-border">
      <h1 className="text-xl font-semibold text-foreground iconBackground px-4 py-2">Dashboard</h1>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="iconBackground">
          <Zap size={20} className="text-foreground" />
        </Button>
        <CreateWebinarDialog 
          trigger={
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Sparkles size={18} className="mr-2" /> Create a Webinar
            </Button>
          }
        />
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
  { id: 1, label: "Create a webinar", href: "#", isCompleted: true }, // Updated href to # for now
  { id: 2, label: "Get leads for your webinar", href: "#get-leads", isCompleted: false },
  { id: 3, label: "Track conversion status", href: "#track-conversion", isCompleted: false },
];

const VerticalStepper = ({ steps }: { steps: StepItem[] }) => {
  // Use a regular div if it's just meant to open the dialog, or pass setIsOpen to CreateWebinarDialog if needed
  const handleStepClick = (step: StepItem, e: React.MouseEvent) => {
    if (step.label === "Create a webinar") {
      // This click will be handled by DialogTrigger if the step itself is the trigger
      // Or, if not, we might need a shared state to open the dialog programmatically.
      // For now, assuming the main "Create a Webinar" button is the primary trigger.
    } else {
      // router.push(step.href) // If using Next router for other links
    }
  };

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
          <div // Changed Link to div for items that might trigger dialog or are not direct nav links yet
            key={step.id}
            // href={step.href} // Conditional href or onClick logic needed
            onClick={(e) => handleStepClick(step, e)}
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
          </div>
        ))}
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, description, href, actionText = "View", isDialogTrigger = false }: { icon: React.ReactNode, title: string, description: string, href?: string, actionText?: string, isDialogTrigger?: boolean }) => {
  const content = (
    <Card className="bg-card border-border text-foreground flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="w-10 h-10 rounded-lg iconBackground flex items-center justify-center mb-3">
          {React.cloneElement(icon as React.ReactElement, { className: "text-foreground" })}
        </div>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-muted-foreground text-sm">{description}</CardDescription>
      </CardContent>
      {(href || isDialogTrigger) && (
        <CardFooter>
          {isDialogTrigger ? (
             <span className="text-sm text-primary hover:text-primary/80 flex items-center cursor-pointer">
              {actionText} <ChevronRight size={16} className="ml-1" />
            </span>
          ) : href ? (
            <Link href={href} className="text-sm text-primary hover:text-primary/80 flex items-center">
              {actionText} <ChevronRight size={16} className="ml-1" />
            </Link>
          ) : null}
        </CardFooter>
      )}
    </Card>
  );

  if (isDialogTrigger) {
    return (
      <CreateWebinarDialog trigger={content} />
    )
  }
  return content;
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

export default function DashboardHomePage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <VerticalStepper steps={stepperData} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard 
            icon={<UploadCloud size={22} />}
            title="Browse or drag a pre-recorded webinar file"
            description="Easily upload your existing webinar content to get started."
            actionText="Upload Webinar"
            isDialogTrigger // This card will now open the dialog
          />
          <ActionCard 
            icon={<RadioTower size={22} />} 
            title="Go live and interact with your audience in real-time"
            description="Engage your viewers with live sessions and Q&A."
            // href="/dashboard/webinars/create?live=true" // Potentially also a dialog trigger or different flow
            actionText="Go Live"
            isDialogTrigger // This card will now open the dialog
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
               <Link href="#" className="text-sm text-primary hover:text-primary/80 flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
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
               <Link href="#" className="text-sm text-primary hover:text-primary/80 flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
