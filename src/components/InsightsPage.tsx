import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Clock, 
  Download, 
  Calendar,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Zap,
  ShieldAlert,
  Lightbulb,
  ArrowRight,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'motion/react';

const performanceData = [
  { day: 'Mon', volume: 110, resolution: 85, escalations: 8 },
  { day: 'Tue', volume: 132, resolution: 88, escalations: 10 },
  { day: 'Wed', volume: 145, resolution: 84, escalations: 12 },
  { day: 'Thu', volume: 128, resolution: 89, escalations: 7 },
  { day: 'Fri', volume: 156, resolution: 91, escalations: 9 },
  { day: 'Sat', volume: 85, resolution: 86, escalations: 5 },
  { day: 'Sun', volume: 76, resolution: 87, escalations: 4 },
];

const topicData = [
  { name: 'Delivery Status', value: 32, color: '#6366f1' },
  { name: 'Booking Requests', value: 24, color: '#818cf8' },
  { name: 'Refund Policy', value: 18, color: '#a5b4fc' },
  { name: 'Product Questions', value: 14, color: '#c7d2fe' },
  { name: 'Complaint Handling', value: 12, color: '#e0e7ff' },
];

const sentimentData = [
  { name: 'Positive', value: 68, color: '#10b981' },
  { name: 'Neutral', value: 24, color: '#94a3b8' },
  { name: 'Negative', value: 8, color: '#f43f5e' },
];

const peakHoursData = [
  { hour: '8am', calls: 20 },
  { hour: '9am', calls: 45 },
  { hour: '10am', calls: 85 },
  { hour: '11am', calls: 92 },
  { hour: '12pm', calls: 78 },
  { hour: '1pm', calls: 55 },
  { hour: '2pm', calls: 88 },
  { hour: '3pm', calls: 95 },
  { hour: '4pm', calls: 72 },
  { hour: '5pm', calls: 40 },
  { hour: '6pm', calls: 25 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl">
        <p className="text-xs font-bold text-slate-900 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[10px] font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.name === 'Resolution' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <header className="px-8 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Insights</h1>
          <p className="text-slate-500 text-sm">Actionable intelligence for your AI agents.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
            <Calendar className="w-3 h-3" />
            Last 7 Days
            <ChevronDown className="w-3 h-3" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
            <Download className="w-3 h-3" />
            Export Report
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Calls (7d)', value: '842', trend: '+12%', positive: true, icon: Phone, color: 'text-brand' },
              { label: 'Resolution Rate', value: '87%', trend: '+2.4%', positive: true, icon: CheckCircle2, color: 'text-emerald-500' },
              { label: 'Avg Satisfaction', value: '4.6/5', trend: '+0.2', positive: true, icon: Users, color: 'text-blue-500' },
              { label: 'Missed Calls', value: '6', trend: '-2', positive: true, icon: AlertCircle, color: 'text-rose-500' },
              { label: 'Escalation Rate', value: '9%', trend: '+1%', positive: false, icon: ArrowUpRight, color: 'text-amber-500' },
            ].map((kpi, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-[10px] font-bold ${kpi.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.trend}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Charts & Topics */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Performance Trends */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Performance Trends</h3>
                    <p className="text-xs text-slate-500">Call volume and resolution rate over the last 7 days.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-brand" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Volume</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Resolution</span>
                    </div>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        name="Volume"
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#6366f1" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorVolume)" 
                      />
                      <Line 
                        name="Resolution"
                        type="monotone" 
                        dataKey="resolution" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Peak Hours & Sentiment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Peak Hours */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Peak Hours</h3>
                    <p className="text-xs text-slate-500">Most active call times to optimize staffing.</p>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={peakHoursData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="hour" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 600 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="calls" radius={[4, 4, 0, 0]}>
                          {peakHoursData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.calls > 80 ? '#6366f1' : '#e2e8f0'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                    <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
                      Peak activity detected between 10 AM – 12 PM and 2 PM – 4 PM.
                    </p>
                  </div>
                </div>

                {/* Customer Sentiment */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Customer Sentiment</h3>
                    <p className="text-xs text-slate-500">Overall mood of your callers this week.</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="h-[160px] w-[160px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sentimentData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {sentimentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-3">
                      {sentimentData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs font-bold text-slate-600">{item.name}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-900">{item.value}%</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
                          <TrendingUp className="w-3 h-3" />
                          +6% improvement this week
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Customer Topics */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900">Top Customer Topics</h3>
                  <p className="text-xs text-slate-500">Most common reasons customers are calling.</p>
                </div>
                <div className="space-y-5">
                  {topicData.map((topic, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700">{topic.name}</span>
                        <span className="text-slate-900">{topic.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${topic.value}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: topic.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Recommendations & Weak Areas */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* AI Recommendations */}
              <div className="bg-slate-950 p-6 rounded-3xl shadow-xl shadow-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">AI Advisor</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { text: 'Upload refund policy document', icon: CheckCircle2, sub: 'AI struggled with 12 refund exception queries.' },
                      { text: 'Improve booking flow instructions', icon: CheckCircle2, sub: '7 escalations happened during booking changes.' },
                      { text: 'Add weekend business hours', icon: CheckCircle2, sub: 'Missed 4 calls during Saturday mornings.' },
                      { text: 'Create sales-specific agent', icon: CheckCircle2, sub: 'High volume of pricing questions detected.' },
                    ].map((rec, i) => (
                      <button key={i} className="w-full text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                        <div className="flex items-start gap-3">
                          <rec.icon className="w-4 h-4 text-brand mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-white mb-1 group-hover:text-brand transition-colors">{rec.text}</p>
                            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{rec.sub}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <button className="w-full mt-6 py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2">
                    Apply All Recommendations
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weak Areas */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  <h3 className="text-lg font-bold text-slate-900">Attention Required</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: 'Refund Exceptions', count: '12 calls', desc: 'AI confidence was low in complex refund scenarios.', status: 'critical' },
                    { title: 'Pricing Questions', count: 'High volume', desc: 'Customers are asking about bulk discounts not in KB.', status: 'warning' },
                    { title: 'Booking Changes', count: '7 escalations', desc: 'Users find it hard to modify existing appointments.', status: 'warning' },
                  ].map((issue, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{issue.title}</h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          issue.status === 'critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {issue.count}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        {issue.desc}
                      </p>
                      <button className="text-[10px] font-bold text-brand hover:underline flex items-center gap-1 pt-1">
                        View related calls
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Efficiency Insight */}
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-emerald-900">Efficiency Win</h3>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed font-medium mb-4">
                  Your AI agents saved approximately <span className="font-bold">28 hours</span> of human support time this week by resolving <span className="font-bold">732</span> routine inquiries.
                </p>
                <div className="h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    className="h-full bg-emerald-600"
                  />
                </div>
                <p className="text-[10px] text-emerald-600 font-bold mt-2">87% resolution efficiency</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
