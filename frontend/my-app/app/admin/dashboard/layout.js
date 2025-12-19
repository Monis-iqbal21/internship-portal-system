import AdminSidebar from '@/components/AdminSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Sidebar - Permanent/Fixed */}
      <div className="flex-1">
        <AdminSidebar />
      </div>

      {/* 2. Main Content Area - This is where components "load" */}
      <main className="flex-3 p-8 pt-24 md:pt-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}