import React, { useState, useEffect } from "react";
import { Lead } from "./types";
import {
  Users,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Bell,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Menu,
} from "lucide-react";
import { getLeads } from "./handlers/leadHandlers";
import { StatCard } from "./components/StatCard";
import { LeadList } from "./components/LeadList";
import { LeadForm } from "./components/LeadForm";

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<Lead["status"] | "All">(
    "All",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchLeadsData = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);

  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;
  const interestedLeads = leads.filter((l) => l.status === "Interested").length;
  const notInterestedLeads = leads.filter(
    (l) => l.status === "Not Interested",
  ).length;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    const matchesFilter =
      filterStatus === "All" || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-mint-beige text-slate-800 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-800/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-mint-tea border-r border-mint-2 flex flex-col z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center px-6 border-b border-mint-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-linear-to-br from-emerald-400 to-green-600 text-white font-bold text-lg shadow">
              L
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-800">
                Lead Manager
              </span>
              <span className="text-xs text-emerald-700">
                Mini CRM Dashboard
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-mint-beige border border-mint-2 hover:border-mint-aqua hover:text-emerald-800 text-slate-800 rounded-xl py-2.5 flex items-center justify-center gap-2 font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create New Lead
          </button>
        </div>

        <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 bg-mint-aqua/30 text-emerald-800 rounded-xl font-medium border border-mint-aqua/50"
          >
            <LayoutDashboard className="w-5 h-5 opacity-90" />
            Dashboard
          </a>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden w-full relative z-0">
        <header className="h-16 bg-mint-beige border-b border-mint-2 flex items-center justify-between px-4 sm:px-6 shrink-0 w-full">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
            <button
              className="md:hidden p-1 mr-1 text-emerald-700 hover:text-emerald-800 rounded-md hover:bg-mint-tea transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <LayoutDashboard className="w-5 h-5 text-emerald-700 hidden sm:block" />
            <span className="hidden sm:inline">Dashboard</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <div className="relative group max-w-md w-full sm:w-auto">
              <Search className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-800 transition-colors" />
              <input
                type="text"
                placeholder="Search Leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 lg:w-64 pl-9 pr-4 py-2 bg-mint-tea border border-mint-2 rounded-full text-sm text-slate-800 placeholder:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-mint-aqua/50 focus:border-mint-aqua transition-all"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 w-full">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Leads"
                value={totalLeads}
                icon={<Users className="w-5 h-5 text-emerald-800" />}
                bgColor="bg-[#d0ffb7] border border-[#b2ffa8]"
              />
              <StatCard
                title="Converted Leads"
                value={convertedLeads}
                icon={<CheckCircle2 className="w-5 h-5 text-emerald-800" />}
                bgColor="bg-[#d0ffb7] border border-[#b2ffa8]"
              />
              <StatCard
                title="Interested"
                value={interestedLeads}
                icon={<MessageCircle className="w-5 h-5 text-emerald-800" />}
                bgColor="bg-[#d0ffb7] border border-[#b2ffa8]"
              />
              <StatCard
                title="Not Interested"
                value={notInterestedLeads}
                icon={<XCircle className="w-5 h-5 text-emerald-800" />}
                bgColor="bg-[#d0ffb7] border border-[#b2ffa8]"
              />
            </div>

            <LeadList
              leads={filteredLeads}
              loading={loading}
              onLeadUpdated={fetchLeadsData}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <LeadForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchLeadsData();
          }}
        />
      )}
    </div>
  );
}
