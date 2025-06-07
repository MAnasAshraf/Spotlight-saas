
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export const metadata: Metadata = {
  title: 'Spotlight',
  description: 'Host Engaging Webinars. Skyrocket Your Sales.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // These are read on the server side during rendering or at build time.
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;

  // Check if the keys are missing or effectively empty
  if (!publishableKey || publishableKey.trim() === '' || !secretKey || secretKey.trim() === '') {
    const keyInstructions = `
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${publishableKey || 'your_publishable_key_here'}
CLERK_SECRET_KEY=${secretKey || 'your_secret_key_here'}

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
    `;

    // If keys are missing, render a detailed error page
    return (
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet"></link>
        </head>
        <body className="font-body antialiased" style={{ margin: 0, padding: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}>
          <div style={{ padding: '2rem', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', maxWidth: '600px', textAlign: 'center', backgroundColor: 'hsl(var(--card))' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'hsl(var(--destructive))' }}>Clerk Configuration Error</h1>
            {(!publishableKey || publishableKey.trim() === '') && <p style={{ marginBottom: '0.5rem' }}>The <code style={{ background: 'hsl(var(--muted))', padding: '0.2rem 0.4rem', borderRadius: '0.2rem' }}>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> is missing or empty.</p>}
            {(!secretKey || secretKey.trim() === '') && <p style={{ marginBottom: '1rem' }}>The <code style={{ background: 'hsl(var(--muted))', padding: '0.2rem 0.4rem', borderRadius: '0.2rem' }}>CLERK_SECRET_KEY</code> is missing or empty.</p>}
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>
              Please ensure these keys are set in a <strong><code>.env.local</code></strong> file in the root of your project.
              You can get your keys from the <a href="https://dashboard.clerk.com/last-active?path=api-keys" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>Clerk Dashboard</a>.
            </p>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>Your <code>.env.local</code> file should look like this:</p>
            <pre style={{
              textAlign: 'left',
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
              padding: '1rem',
              borderRadius: 'var(--radius)',
              fontSize: '0.8rem',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}>
              {keyInstructions.trim()}
            </pre>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>
              <strong>Important:</strong> After creating or updating the <code>.env.local</code> file, you
              <strong>must restart your Next.js development server</strong> (e.g., stop <code>npm run dev</code> and run it again).
            </p>
          </div>
        </body>
      </html>
    );
  }

  // If keys are present, proceed with ClerkProvider.
  // ClerkProvider will attempt to read NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY from the environment.
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#6366f1' }, 
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/logo.png', 
        }
      }}
    >
      <html lang="en" className="dark">
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
    </ClerkProvider>
  );
}
