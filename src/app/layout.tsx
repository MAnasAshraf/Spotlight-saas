import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// Removed ClerkProvider import
// Removed dark theme import from @clerk/themes

export const metadata: Metadata = {
  title: 'Spotlight',
  description: 'Host Engaging Webinars. Skyrocket Your Sales.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed ClerkProvider wrapper
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
