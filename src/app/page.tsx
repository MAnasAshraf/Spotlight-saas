
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Host Engaging Webinars. <span className="text-foreground">Skyrocket Your Sales.</span>
        </h1>
        <p className="mb-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Access an ever-growing collection of premium, meticulously crafted templates and component packs. Save time and focus on what matters—building standout websites that captivate your audience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="secondary"
              className="relative overflow-hidden group 
                         bg-primary-foreground text-primary 
                         hover:text-primary-foreground 
                         w-full sm:w-auto 
                         transition-colors duration-300 ease-in-out"
            >
              <span
                className="absolute inset-0 w-full h-full bg-foreground 
                           transform -translate-x-full 
                           group-hover:translate-x-0 
                           transition-transform duration-300 ease-in-out"
              ></span>
              <span className="relative z-10 flex items-center">
                Go to Dashboard <ArrowRight size={20} className="ml-2" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
