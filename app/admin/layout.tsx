import { ReactNode } from "react";
import { Sidebar } from "@/components/admin/sidebar"; // We'll create this or reuse existing sidebar logic
import { TopBar } from "@/components/dashboard/top-bar";

// Force dynamic rendering for all admin pages to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Admin Dashboard" />
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
