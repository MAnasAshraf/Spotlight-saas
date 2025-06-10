
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
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto">
              Go to Dashboard <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Trusted by Founders and Entrepreneurs from all over the world
          </p>
        </div>
        {/* Avatar images section removed */}
      </div>
    </div>
  );
}
