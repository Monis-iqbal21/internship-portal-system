"use client"
import { Users, Briefcase, Clock, CheckCircle, Search, Filter, Plus } from 'lucide-react'; // Pro icons

const DashBoard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* 1. Overview / Summary Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Students" value="1,284" icon={<Users />} color="var(--primary)" />
          <StatCard title="Active Internships" value="156" icon={<Briefcase />} color="#3b82f6" />
          <StatCard title="Pending Apps" value="42" icon={<Clock />} color="#f59e0b" />
          <StatCard title="Completed" value="890" icon={<CheckCircle />} color="#10b981" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. Application Management (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Clock className="text-[var(--primary)]" /> Pending Applications
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-xs uppercase tracking-wider border-b">
                      <th className="pb-3">Student</th>
                      <th className="pb-3">Domain</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <ApplicationRow name="Alex Rivera" domain="Web Dev" />
                    <ApplicationRow name="Sarah Chen" domain="UI/UX" />
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Task Submissions */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-black">Task Submissions</h2>
                  <button className="text-xs font-bold text-[var(--primary)] flex items-center gap-1">
                    <Filter size={14} /> Filter
                  </button>
               </div>
               <TaskItem student="John Doe" task="Landing Page" status="Review Needed" />
            </div>
          </div>

          {/* 3 & 5. Right Sidebar (Student & Domain Mgmt) */}
          <div className="space-y-8">
            {/* Student Search */}
            <div className="bg-[var(--primary)] p-6 rounded-[2rem] shadow-lg text-white">
              <h2 className="text-lg font-bold mb-4">Search Students</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-white/50" size={18} />
                <input 
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-10 pr-4 placeholder:text-white/50 focus:outline-none focus:ring-2 ring-white/30"
                  placeholder="Name or Email..."
                />
              </div>
            </div>

            {/* Domain Management */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-black text-gray-800">Domains</h2>
                <Plus size={20} className="text-[var(--primary)] cursor-pointer" />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Web', 'App', 'Python', 'Design'].map(d => (
                  <span key={d} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleanliness
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="p-4 rounded-2xl text-white shadow-inner" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase">{title}</p>
      <h3 className="text-2xl font-black">{value}</h3>
    </div>
  </div>
);

const ApplicationRow = ({ name, domain }) => (
  <tr className="group">
    <td className="py-4 font-bold text-gray-700">{name}</td>
    <td className="py-4 text-sm text-gray-500">{domain}</td>
    <td className="py-4 text-right space-x-2">
      <button className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-black hover:bg-green-600 hover:text-white transition-all">Approve</button>
      <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-black hover:bg-red-600 hover:text-white transition-all">Reject</button>
    </td>
  </tr>
);

const TaskItem = ({ student, task, status }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
        {student[0]}
      </div>
      <div>
        <p className="text-sm font-bold">{task}</p>
        <p className="text-xs text-gray-400">{student}</p>
      </div>
    </div>
    <span className="text-[10px] font-black uppercase tracking-tighter bg-amber-100 text-amber-600 px-2 py-1 rounded-md">
      {status}
    </span>
  </div>
);

export default DashBoard;