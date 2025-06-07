
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Spotlight',
  description: 'Sign in or sign up to access your Spotlight account.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
