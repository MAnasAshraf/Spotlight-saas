
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';
import Link from 'next/link';
// Removed CreateWebinarDialog import as creation is now centralized

// Placeholder data for webinars - in a real app, this would come from an API
const webinars = [
  { id: '1', title: 'Introduction to AI Sales Agents', status: 'Live', attendees: 120, date: '2024-08-15' },
  { id: '2', title: 'Mastering Pre-recorded Webinars', status: 'Recorded', attendees: 350, date: '2024-08-10' },
  { id: '3', title: 'Advanced Funnel Management Techniques', status: 'Upcoming', attendees: 0, date: '2024-09-01' },
];

export default function WebinarsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-6 border-b border-border">
        <h1 className="text-2xl font-semibold text-foreground">My Webinars</h1>
        {/* "Create New Webinar" button removed from here to centralize creation on the main dashboard */}
      </header>
      <main className="flex-1 p-6 space-y-6">
        {webinars.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <Video size={64} className="mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2 text-foreground">No Webinars Yet</h2>
            <p className="text-muted-foreground mb-6">
              To create a webinar, please go to the main dashboard.
            </p>
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard to Create</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className="bg-card border-border text-card-foreground hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{webinar.title}</CardTitle>
                  <CardDescription>Status: {webinar.status} | Date: {webinar.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Attendees: {webinar.attendees}</p>
                  {/* Add more details or actions here */}
                </CardContent>
                {/* <CardFooter>
                  <Button variant="outline" size="sm">View Details</Button>
                </CardFooter> */}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
