import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Play, 
  Pause, 
  Download, 
  Clock, 
  UserRound, 
  Smile, 
  Meh, 
  Frown,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Info,
  MoreVertical,
  ChevronRight,
  Phone,
  Sparkles,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Call {
  id: string;
  time: string;
  topic: string;
  agent: string;
  duration: string;
  status: 'Resolved' | 'Booked' | 'Escalated' | 'Missed';
  sentiment: 'positive' | 'neutral' | 'negative';
  summary: string;
  outcome: string;
  transcript: { role: 'customer' | 'ai', text: string }[];
  metadata: {
    date: string;
    source: string;
    transferStatus: string;
  };
}

const mockCalls: Call[] = [
  {
    id: '1',
    time: '10:42 AM',
    topic: 'Delivery status inquiry',
    agent: 'Customer Support Agent',
    duration: '2m 10s',
    status: 'Resolved',
    sentiment: 'positive',
    summary: 'Customer asked for delivery ETA. AI verified order status and informed expected arrival date.',
    outcome: '✔ Issue Resolved',
    transcript: [
      { role: 'customer', text: 'Where is my order?' },
      { role: 'ai', text: 'Let me check that for you. Could you provide your order number?' },
      { role: 'customer', text: '12345' },
      { role: 'ai', text: 'Your package will arrive tomorrow before 6 PM.' },
    ],
    metadata: {
      date: 'Oct 24, 2024',
      source: 'Inbound Call',
      transferStatus: 'None'
    }
  },
  {
    id: '2',
    time: '11:08 AM',
    topic: 'Booking request',
    agent: 'Scheduler Agent',
    duration: '3m 20s',
    status: 'Booked',
    sentiment: 'positive',
    summary: 'Customer wanted to book a consultation. AI checked availability and scheduled a slot for next Tuesday.',
    outcome: '✔ Appointment Booked',
    transcript: [
      { role: 'customer', text: 'I want to book a meeting.' },
      { role: 'ai', text: 'I can help with that. What day works best for you?' },
      { role: 'customer', text: 'Next Tuesday morning.' },
      { role: 'ai', text: 'I have a slot at 10 AM. Shall I book it?' },
      { role: 'customer', text: 'Yes, please.' },
    ],
    metadata: {
      date: 'Oct 24, 2024',
      source: 'Inbound Call',
      transferStatus: 'None'
    }
  },
  {
    id: '3',
    time: '11:34 AM',
    topic: 'Refund complaint',
    agent: 'Customer Support Agent',
    duration: '1m 48s',
    status: 'Escalated',
    sentiment: 'neutral',
    summary: 'Customer was unhappy with a recent purchase and requested a refund. AI attempted to troubleshoot but customer insisted on speaking to a manager.',
    outcome: '✔ Escalated to Human',
    transcript: [
      { role: 'customer', text: 'I want a refund for my last order.' },
      { role: 'ai', text: 'I am sorry to hear that. Can you tell me what was wrong with the product?' },
      { role: 'customer', text: 'It just doesn\'t work as expected. I don\'t want to talk to a robot, put me through to a manager.' },
      { role: 'ai', text: 'I understand. Let me transfer you to a supervisor right away.' },
    ],
    metadata: {
      date: 'Oct 24, 2024',
      source: 'Inbound Call',
      transferStatus: 'Transferred'
    }
  }
];

const SentimentIcon = ({ sentiment }: { sentiment: Call['sentiment'] }) => {
  switch (sentiment) {
    case 'positive': return <Smile className="w-4 h-4 text-emerald-500" />;
    case 'neutral': return <Meh className="w-4 h-4 text-slate-400" />;
    case 'negative': return <Frown className="w-4 h-4 text-rose-500" />;
  }
};

const StatusBadge = ({ status }: { status: Call['status'] }) => {
  const styles = {
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Booked: 'bg-blue-50 text-blue-700 border-blue-100',
    Escalated: 'bg-amber-50 text-amber-700 border-amber-100',
    Missed: 'bg-rose-50 text-rose-700 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function CallsPage() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(mockCalls[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <header className="px-8 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Calls</h1>
          <p className="text-slate-500 text-sm">Review AI agent activity and call performance.</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: 'Today Calls', value: '124', icon: Phone, color: 'text-brand' },
              { label: 'Resolved Rate', value: '87%', icon: CheckCircle2, color: 'text-emerald-500' },
              { label: 'Missed Calls', value: '3', icon: AlertCircle, color: 'text-rose-500' },
              { label: 'Escalated', value: '9', icon: ArrowUpRight, color: 'text-amber-500' },
              { label: 'Avg Duration', value: '2m 14s', icon: Clock, color: 'text-slate-500' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search calls..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all whitespace-nowrap">
                <Filter className="w-3 h-3" />
                Status: All
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all whitespace-nowrap">
                <UserRound className="w-3 h-3" />
                Type: All
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all whitespace-nowrap">
                <Calendar className="w-3 h-3" />
                Today
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
            {/* Left Side: Call List */}
            <div className="lg:col-span-5 space-y-3">
              {mockCalls.map((call) => (
                <button 
                  key={call.id}
                  onClick={() => setSelectedCall(call)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all group ${
                    selectedCall?.id === call.id 
                      ? 'border-brand bg-brand/5 ring-1 ring-brand/20' 
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{call.time}</span>
                    <SentimentIcon sentiment={call.sentiment} />
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${selectedCall?.id === call.id ? 'text-brand' : 'text-slate-900'}`}>
                    {call.topic}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">{call.agent}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                      <Clock className="w-3 h-3" />
                      {call.duration}
                    </div>
                    <StatusBadge status={call.status} />
                  </div>
                </button>
              ))}
            </div>

            {/* Right Side: Call Detail Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {selectedCall ? (
                  <motion.div 
                    key={selectedCall.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full"
                  >
                    {/* Detail Header */}
                    <div className="p-8 border-b border-slate-50">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-brand" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{selectedCall.topic}</h3>
                            <p className="text-xs text-slate-500">{selectedCall.agent}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-3 h-3 text-brand" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Summary</span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {selectedCall.summary}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100">
                            <CheckCircle2 className="w-3 h-3" />
                            {selectedCall.outcome}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recording Player */}
                    <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-50">
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
                          >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                          </button>
                          <div className="flex-1 space-y-1">
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: isPlaying ? '60%' : '30%' }}
                                className="absolute inset-y-0 left-0 bg-brand"
                              />
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                              <span>00:42</span>
                              <span>{selectedCall.duration}</span>
                            </div>
                          </div>
                          <button className="p-2 text-slate-400 hover:text-brand transition-all">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Transcript */}
                    <div className="flex-1 p-8 overflow-y-auto max-h-[400px] space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transcript</h4>
                        <button className="text-[10px] font-bold text-brand hover:underline">Copy Transcript</button>
                      </div>
                      
                      <div className="space-y-6">
                        {selectedCall.transcript.map((msg, i) => (
                          <div key={i} className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
                            <span className="text-[9px] font-bold text-slate-400 uppercase mb-1 px-1">
                              {msg.role === 'ai' ? selectedCall.agent : 'Customer'}
                            </span>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                              msg.role === 'ai' 
                                ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
                                : 'bg-brand text-white rounded-tr-none shadow-md shadow-brand/10'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Date', value: selectedCall.metadata.date },
                        { label: 'Duration', value: selectedCall.duration },
                        { label: 'Source', value: selectedCall.metadata.source },
                        { label: 'Transfer', value: selectedCall.metadata.transferStatus },
                      ].map((meta, i) => (
                        <div key={i} className="space-y-0.5">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{meta.label}</p>
                          <p className="text-xs font-bold text-slate-700">{meta.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50/30 rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-4">
                      <Phone className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No call selected</h3>
                    <p className="text-sm text-slate-500 max-w-[240px]">Select a call from the list to view recordings and transcripts.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
