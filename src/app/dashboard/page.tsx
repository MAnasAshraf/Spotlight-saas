
'use client';

import SidebarDemo from "@/components/sidebar-demo";

// Explicitly define the props this Client Component page might receive from Next.js.
// We are not using `params` or `searchParams` here, and they are not passed down to SidebarDemo.
// This is to acknowledge their potential presence if external tooling inspects page props.
export default function DashboardPage(props: {
  params?: Record<string, string | string[] | undefined>;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // You can uncomment the following lines to log what props Next.js passes to a Client Component page.
  // This should only run on the client-side.
  // if (typeof window !== 'undefined') {
  //   console.log("DashboardPage props from Next.js:", props);
  // }
  
  return <SidebarDemo />;
}
