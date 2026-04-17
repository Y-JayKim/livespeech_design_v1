import React from 'react';
import { 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Database, 
  Plus, 
  BarChart3, 
  BookOpen, 
  ArrowRight,
  ArrowUpRight,
  Clock,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

const kpis = [
  { label: 'Calls Today', value: '124', icon: Phone, color: 'text-brand' },
  { label: 'Resolution Rate', value: '87%', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Missed Calls', value: '3', icon: AlertCircle, color: 'text-rose-500' },
  { label: 'Escalation Rate', value: '9%', icon: ArrowUpRight, color: 'text-amber-500' },
  { label: 'Avg Response', value: '1.2 sec', icon: Zap, color: 'text-blue-500' },
];

const systemStatus = [
  { label: 'All systems operational', status: 'healthy' },
  { label: 'Agents ready to receive calls', status: 'healthy' },
  { label: 'Call routing active', status: 'healthy' },
  { label: 'Knowledge base synced', status: 'healthy' },
];

const activities = [
  { time: '12:02 PM', text: 'New document uploaded to knowledge base', type: 'system' },
  { time: '11:34 AM', text: 'Refund complaint escalated', type: 'escalation' },
  { time: '11:08 AM', text: 'Appointment booked', type: 'success' },
  { time: '10:42 AM', text: 'Delivery inquiry resolved', type: 'success' },
];

const insights = [
  { label: 'Top Topic', value: 'Delivery Status', icon: MessageSquare },
  { label: 'Peak Hour', value: '10 AM – 12 PM', icon: Clock },
  { label: 'Neg. Sentiment', value: '8%', icon: TrendingUp },
  { label: 'Escalations', value: '9 today', icon: ArrowRight },
];

const alerts = [
  { title: '3 missed calls need review', type: 'warning', icon: AlertTriangle },
  { title: 'Refund questions increasing', type: 'info', icon: Activity },
  { title: 'Agent missing business hours', type: 'warning', icon: AlertCircle },
];

export default function OverviewPage({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <header className="px-8 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
            <p className="text-slate-500 text-sm">Welcome back. Here's what's happening with your AI workforce.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live System Pulse
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* Hero Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {kpis.map((kpi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-brand/5 transition-colors">
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Status & Activity */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Live System Status */}
              <div className="bg-slate-950 p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                  <Activity className="w-48 h-48 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30">
                        <ShieldCheck className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">System Health</h3>
                        <p className="text-xs text-slate-400">Real-time operational status</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {systemStatus.map((status, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <span className="text-sm font-medium text-slate-200">{status.label}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-brand/10 border border-brand/20 md:col-span-2">
                      <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
                      <span className="text-sm font-bold text-brand">1 call in progress now</span>
                      <button 
                        onClick={() => onNavigate('calls')}
                        className="ml-auto text-xs font-bold text-brand hover:underline flex items-center gap-1"
                      >
                        Listen Live <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Activity */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-slate-900">Today's Activity</h3>
                  <button 
                    onClick={() => onNavigate('calls')}
                    className="text-xs font-bold text-brand hover:underline"
                  >
                    View All Activity
                  </button>
                </div>
                <div className="space-y-6">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      {i !== activities.length - 1 && (
                        <div className="absolute left-[19px] top-8 bottom-[-24px] w-px bg-slate-100" />
                      )}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${
                        activity.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                        activity.type === 'escalation' ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        {activity.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                         activity.type === 'escalation' ? <ArrowRight className="w-4 h-4" /> :
                         <Database className="w-4 h-4" />}
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-bold text-slate-900">{activity.text}</p>
                        <p className="text-xs text-slate-400 font-medium">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Actions & Alerts */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quick Actions */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={() => onNavigate('agent')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-brand text-white hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 group"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Create New Agent</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                  <button 
                    onClick={() => onNavigate('calls')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:border-brand hover:text-brand transition-all group"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-bold text-sm">Review Calls</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                  <button 
                    onClick={() => onNavigate('insights')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:border-brand hover:text-brand transition-all group"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="font-bold text-sm">View Insights</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                  <button className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:border-brand hover:text-brand transition-all group">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-bold text-sm">Upload Knowledge</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                </div>
              </div>

              {/* Alerts / Attention Needed */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Attention Needed</h3>
                <div className="space-y-4">
                  {alerts.map((alert, i) => (
                    <div key={i} className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      alert.type === 'warning' ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-blue-50 border-blue-100 text-blue-700'
                    }`}>
                      <alert.icon className="w-4 h-4 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-bold leading-tight">{alert.title}</p>
                        <button className="text-[10px] font-bold underline mt-1 opacity-80 hover:opacity-100">Take Action</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Insights Snapshot */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Quick Insights</h3>
                <div className="grid grid-cols-2 gap-4">
                  {insights.map((insight, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <insight.icon className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{insight.label}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">{insight.value}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onNavigate('insights')}
                  className="w-full mt-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Full Analytics Report
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
