import AdminSidebar from '@/components/AdminSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar is fixed, so it doesn't need a wrapper div with flex-1 */}
      <AdminSidebar />

      {/* Main Content Area:
        - ml-0 on mobile
        - ml-24 for the "icons only" view (around 768px-1100px)
        - ml-80 for full desktop (above 1100px)
      */}
      <main className="flex-1 p-8 pt-32 md:pt-8 md:ml-24 lg:ml-80 transition-all duration-500">
        {children}
      </main>
    </div>
  );
}