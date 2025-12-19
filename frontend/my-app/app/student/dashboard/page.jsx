"use client"
import { useState } from 'react';
import { Search, Filter, UserCircle, Mail, ExternalLink } from 'lucide-react';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data for individual student profiles
  const students = [
    { id: 1, name: "Arjun Mehta", email: "arjun@gmail.com", domain: "Web Dev", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@internify.com", domain: "UI/UX", status: "Pending" },
    { id: 3, name: "Zain Khan", email: "zain.k@outlook.com", domain: "Python", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Student Management</h1>
          <p className="text-gray-500 font-medium">View and manage all registered interns</p>
        </div>
        
        {/* Search Bar - Highlighted with Primary Color */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-3 w-full md:w-80 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Students Table / List */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-700">All Students ({students.length})</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:opacity-80">
            <Filter size={16} /> Filter List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
                <th className="px-8 py-5">Profile</th>
                <th className="px-8 py-5">Domain</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-bold">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12}/> {student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-semibold text-gray-600">
                    {student.domain}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      student.status === 'Active' ? 'bg-green-100 text-green-600' : 
                      student.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-gray-400 hover:text-[var(--primary)] transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;