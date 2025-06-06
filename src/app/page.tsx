
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const avatars = [
    { src: "https://placehold.co/40x40.png", alt: "User 1", fallback: "U1", hint: "person" },
    { src: "https://placehold.co/40x40.png", alt: "User 2", fallback: "U2", hint: "person" },
    { src: "https://placehold.co/40x40.png", alt: "User 3", fallback: "U3", hint: "person" },
    { src: "https://placehold.co/40x40.png", alt: "User 4", fallback: "U4", hint: "person" },
    { src: "https://placehold.co/40x40.png", alt: "User 5", fallback: "U5", hint: "person" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
          Build world class websites at <span className="text-primary-foreground">warp speed</span>
        </h1>
        <p className="mb-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Access an ever-growing collection of premium, meticulously crafted templates and component packs. Save time and focus on what matters—building standout websites that captivate your audience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto">
              Explore Collection
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="default" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground w-full sm:w-auto">
              Unlock Unlimited Access <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Trusted by Founders and Entrepreneurs from all over the world
          </p>
        </div>
        <div className="flex justify-center items-center space-x-[-10px]">
          {avatars.map((avatar, index) => (
            <Avatar key={index} className="border-2 border-background">
              <AvatarImage src={avatar.src} alt={avatar.alt} data-ai-hint={avatar.hint} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
}
