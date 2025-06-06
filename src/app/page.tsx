
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Home Page
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          This page is currently under construction.
        </p>
        <p className="mb-8 text-md text-foreground">
          We're getting ready to build a new home page inspired by Aceternity UI!
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
