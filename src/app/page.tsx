
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Flame, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 p-4 overflow-hidden relative selection:bg-purple-500/50 selection:text-white">
      {/* Decorative blurred elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[500px] h-[500px] bg-blue-500/20 rounded-full filter blur-3xl opacity-40 animate-pulse-slower"></div>
      <div className="absolute top-[20%] right-[5%] w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slowest"></div>

      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-20">
        <Link href="#" className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-neutral-200 transition-colors">
          <ShieldCheck size={16} className="text-green-400" />
          <span>By Web Prodigies</span>
        </Link>
      </div>

      <main className="z-10 relative text-center space-y-8 pt-20 md:pt-24 pb-12 flex flex-col items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-200">
            Welcome To
          </h1>
          <span className="block text-5xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent py-2">
            Spotlight Premium
          </span>
        </div>

        <p className="text-base md:text-lg text-neutral-400 max-w-xl">
          Crafting exceptional digital experiences through innovative design and cutting-edge technology.
        </p>

        <Card className="w-full max-w-md bg-neutral-900/60 backdrop-blur-md border-neutral-700/80 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Join the waitlist</CardTitle>
            <CardDescription className="text-sm text-neutral-300 pt-1">
              Enter your email address and we&apos;ll let you know when your spot is ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-neutral-300 sr-only">Email address</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="bg-neutral-800/70 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-base">
              Join the waitlist
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3 pt-4 pb-5">
            <p className="text-xs text-neutral-400">
              Already have access?{" "}
              <Link href="#" className="font-medium text-blue-400 hover:text-blue-300 underline-offset-2 hover:underline">
                Sign in
              </Link>
            </p>
            <div className="flex items-center space-x-2 text-xs text-neutral-500">
              <Lock size={12} />
              <span>Secured by <span className="font-medium text-neutral-400">OurSystem</span></span> {/* Changed Clerk to OurSystem */}
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs bg-yellow-700/30 text-yellow-400 border-yellow-600/70">
                Development mode
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="z-10 relative text-center mt-auto pb-8 px-4 space-y-3">
        <p className="text-xs text-neutral-500/80 max-w-lg mx-auto">
          This codebase is the property of Web Prodigies LLC and is intended solely for customers who have legally obtained a copy of this codebase. Unauthorized reproduction, distribution, or disclosure of any part of this document is strictly prohibited. Web Prodigies LLC. All rights reserved.
        </p>
        <Link href="#" className="inline-flex items-center justify-center space-x-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors font-medium">
          <Flame size={14} />
          <span>Purchase the codebase by clicking here</span>
        </Link>
      </footer>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.03); }
        }
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s infinite ease-in-out;
        }
        .animate-pulse-slowest {
          animation: pulse-slowest 12s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
