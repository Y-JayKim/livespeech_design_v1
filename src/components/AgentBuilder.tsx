import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  Upload, 
  Check, 
  Sparkles,
  PhoneCall,
  Rocket,
  UserRound,
  Mic2,
  Building2, 
  Phone, 
  Globe, 
  Clock, 
  Settings2, 
  MessageSquare, 
  ArrowRightLeft, 
  Bell, 
  Mail,
  ShieldCheck,
  Languages,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Sub-components ---

const Waveform = () => (
  <div className="flex items-center justify-center gap-1 h-8">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          height: [8, 24, 12, 28, 8],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          delay: i * 0.1,
          ease: "easeInOut"
        }}
        className="w-1 bg-brand rounded-full opacity-60"
      />
    ))}
  </div>
);

interface RoleCardProps {
  key?: string;
  title: string;
  description: string;
  example: string;
  active: boolean;
  onClick: () => void;
}

const RoleCard = ({ 
  title, 
  description, 
  example,
  active, 
  onClick 
}: RoleCardProps) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group flex flex-col h-full ${
      active 
        ? 'border-brand bg-brand/5 ring-1 ring-brand/20' 
        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
    }`}
  >
    {active && (
      <div className="absolute top-2 right-2">
        <div className="bg-brand text-white p-0.5 rounded-full">
          <Check className="w-3 h-3" />
        </div>
      </div>
    )}
    <h4 className={`font-semibold text-sm mb-1 ${active ? 'text-brand' : 'text-slate-900'}`}>{title}</h4>
    <p className="text-[11px] text-slate-500 leading-relaxed mb-3 flex-1">{description}</p>
    <div className={`p-2 rounded-lg text-[10px] leading-relaxed ${active ? 'bg-brand/10 text-brand-dark' : 'bg-slate-50 text-slate-400'}`}>
      <span className="font-bold uppercase text-[8px] block mb-0.5 opacity-70">Example Response</span>
      "{example}"
    </div>
  </button>
);

const KnowledgeItem = ({ name, size, usage }: { name: string, size: string, usage: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50 group hover:bg-white hover:shadow-sm transition-all duration-200">
    <div className="p-2 bg-white rounded-md border border-slate-200 text-slate-400 group-hover:text-brand group-hover:border-brand/30 transition-colors">
      <FileText className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-700 truncate">{name}</p>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-tight">{usage}</span>
      </div>
      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{size}</p>
    </div>
  </div>
);

interface ToneTagProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const ToneTag: React.FC<ToneTagProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-brand text-white shadow-md shadow-brand/20 scale-105' 
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
);

interface AccordionItemProps {
  id: number;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
  status?: 'complete' | 'needs-setup' | 'unsaved';
  children: React.ReactNode;
}

const AccordionItem = ({ 
  id, 
  title, 
  description, 
  active, 
  onClick, 
  status,
  children 
}: AccordionItemProps) => (
  <div className={`bg-white rounded-3xl border transition-all duration-500 overflow-hidden ${active ? 'border-brand shadow-lg shadow-brand/5' : 'border-slate-100 shadow-sm hover:border-slate-200'}`}>
    <button 
      onClick={onClick}
      className={`w-full p-8 flex items-center justify-between text-left group transition-colors ${active ? 'bg-white' : 'hover:bg-slate-50/50'}`}
    >
      <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${active ? 'bg-brand text-white scale-110 shadow-lg shadow-brand/20' : 'bg-brand/10 text-brand'}`}>
          {id}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className={`text-xl font-bold tracking-tight transition-colors ${active ? 'text-slate-900' : 'text-slate-700'}`}>{title}</h2>
            {status && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                status === 'complete' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                status === 'needs-setup' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {status.replace('-', ' ')}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${active ? 'bg-brand/10 text-brand rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
        <ChevronDown className="w-4 h-4" />
      </div>
    </button>
    
    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="px-8 pb-8 pt-2 border-t border-slate-50">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Main Component ---

const rolePresets: Record<string, { title: string, description: string, example: string, prompt: string }> = {
  support: {
    title: "Customer Support",
    description: "Handles refunds and delivery issues with empathy.",
    example: "Let me check that order for you. Could you provide your order number?",
    prompt: "You are a friendly and professional customer support agent who helps users with orders, refunds, and delivery questions."
  },
  scheduler: {
    title: "Scheduler",
    description: "Manages calendars and books meetings efficiently.",
    example: "I have an opening at 2 PM tomorrow. Would that work for you?",
    prompt: "You are an efficient appointment scheduler. Your goal is to find the best time for meetings and manage calendars accurately."
  },
  sales: {
    title: "Sales Assistant",
    description: "Qualifies leads and pitches products with persuasion.",
    example: "Based on your needs, I recommend our Pro plan for the best results.",
    prompt: "You are a persuasive sales assistant. You qualify leads, explain product benefits, and guide customers toward a purchase."
  },
  custom: {
    title: "Custom",
    description: "Build a unique AI employee from scratch.",
    example: "Define your own behavior below...",
    prompt: ""
  }
};

export default function AgentBuilder() {
  // --- AI Profile State ---
  const [aiName, setAiName] = useState('Customer Support Agent');
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 000-0000');
  const [isPhoneConnected, setIsPhoneConnected] = useState(false);
  const [primaryLanguage, setPrimaryLanguage] = useState('English (US)');

  // --- AI Behavior State ---
  const [role, setRole] = useState<string>('support');
  const [roleDescription, setRoleDescription] = useState(rolePresets.support.prompt);
  const [greetingMessage, setGreetingMessage] = useState('Hello, this is {company}. How can I help you today?');
  const [tones, setTones] = useState<string[]>(['Friendly']);
  const [scope, setScope] = useState<string[]>(['General inquiries', 'Orders & delivery']);

  // --- Call Operations State ---
  const [businessHours, setBusinessHours] = useState<'24/7' | 'Schedule'>('24/7');
  const [activeDays, setActiveDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [dailySchedule, setDailySchedule] = useState<Record<string, { start: string, end: string }>>({
    'Monday': { start: '09:00', end: '18:00' },
    'Tuesday': { start: '09:00', end: '18:00' },
    'Wednesday': { start: '09:00', end: '18:00' },
    'Thursday': { start: '09:00', end: '18:00' },
    'Friday': { start: '09:00', end: '18:00' },
    'Saturday': { start: '10:00', end: '14:00' },
    'Sunday': { start: '09:00', end: '18:00' },
  });
  
  const [callHandling, setCallHandling] = useState<'transfer' | 'message' | 'standard'>('transfer');
  const [transferNumber, setTransferNumber] = useState('');
  const [transferConditions, setTransferConditions] = useState<string[]>(["AI doesn't know the answer"]);
  const [messageEmail, setMessageEmail] = useState('');
  const [standardResponse, setStandardResponse] = useState('I apologize, but I am unable to assist with that request at the moment. Would you like me to have someone from our team call you back?');
  
  const [summaryEmails, setSummaryEmails] = useState<string[]>(['support@acme.com']);
  const [newEmail, setNewEmail] = useState('');

  const [deploymentStatus, setDeploymentStatus] = useState<'Draft' | 'Live'>('Draft');
  const [hasTested, setHasTested] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([1, 2]);

  const toggleSection = (id: number) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // --- Call Simulation State ---
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<'Idle' | 'Connecting' | 'Listening' | 'Processing' | 'Speaking' | 'Resolved'>('Idle');
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'customer', text: 'When will my delivery arrive?' },
    { role: 'ai', text: 'Let me check that for you. Could you provide your order number?' },
  ]);

  const handleRoleSelect = (key: string) => {
    setRole(key);
    setRoleDescription(rolePresets[key].prompt);
  };

  const toggleTone = (tone: string) => {
    setTones(prev => 
      prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone]
    );
  };

  const toggleScope = (item: string) => {
    setScope(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleDay = (day: string) => {
    setActiveDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const updateDayTime = (day: string, type: 'start' | 'end', value: string) => {
    setDailySchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: value }
    }));
  };

  const applyMondaySchedule = () => {
    const mondaySchedule = dailySchedule['Monday'];
    const newSchedule = { ...dailySchedule };
    activeDays.forEach(day => {
      newSchedule[day] = { ...mondaySchedule };
    });
    setDailySchedule(newSchedule);
  };

  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      timeOptions.push(`${hh}:${mm}`);
    }
  }

  const toggleTransferCondition = (condition: string) => {
    setTransferConditions(prev => 
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const addSummaryEmail = () => {
    if (newEmail && !summaryEmails.includes(newEmail)) {
      setSummaryEmails([...summaryEmails, newEmail]);
      setNewEmail('');
    }
  };

  const removeSummaryEmail = (email: string) => {
    setSummaryEmails(summaryEmails.filter(e => e !== email));
  };

  const startCall = () => {
    setIsCalling(true);
    setCallStatus('Connecting');
    setOutcomes([]);
    setMessages([
      { role: 'customer', text: 'When will my delivery arrive?' },
      { role: 'ai', text: 'Let me check that for you. Could you provide your order number?' },
    ]);
    
    setTimeout(() => setCallStatus('Listening'), 1500);
    setTimeout(() => setCallStatus('Processing'), 3000);
    setTimeout(() => {
      setCallStatus('Speaking');
      if (role === 'support') setOutcomes(['✔ Issue identified']);
      if (role === 'scheduler') setOutcomes(['✔ Availability checked']);
    }, 4500);
    
    setTimeout(() => {
      if (role === 'support') setOutcomes(['✔ Issue identified', '✔ Delivery status found']);
      if (role === 'scheduler') setOutcomes(['✔ Availability checked', '✔ Appointment booked']);
      if (role === 'sales') setOutcomes(['✔ Customer informed', '✔ Lead qualified']);
      setCallStatus('Resolved');
      setHasTested(true);
    }, 7000);
  };

  const isSetupComplete = isPhoneConnected && hasTested && aiName && companyName;

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <header className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Agent Builder</h1>
          <p className="text-slate-500 text-sm">Design your AI employee's voice and intelligence.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            deploymentStatus === 'Live' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${deploymentStatus === 'Live' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            {deploymentStatus}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">AI is ready to take calls</span>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Panel: Configuration */}
        <section className="lg:col-span-7 p-8 space-y-4 border-r border-slate-100 overflow-y-auto max-h-[calc(100vh-160px)] scroll-smooth">
          
          {/* 1. AI Profile */}
          <AccordionItem 
            id={1}
            title="AI Profile"
            description="Define the identity and communication base of your AI."
            active={openSections.includes(1)}
            onClick={() => toggleSection(1)}
            status={aiName && companyName && isPhoneConnected ? 'complete' : 'needs-setup'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Name</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={aiName}
                    onChange={(e) => setAiName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm"
                    placeholder="e.g. Customer Support Agent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Phone Number</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <button 
                    onClick={() => setIsPhoneConnected(!isPhoneConnected)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isPhoneConnected 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {isPhoneConnected ? 'Connected' : 'Connect'}
                  </button>
                </div>
                {!isPhoneConnected && (
                  <p className="text-[10px] text-amber-600 font-medium flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3 h-3" />
                    Not connected. Your AI cannot receive real calls yet.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Language</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    value={primaryLanguage}
                    onChange={(e) => setPrimaryLanguage(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm appearance-none bg-white"
                  >
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>
          </AccordionItem>

          {/* 2. AI Behavior */}
          <AccordionItem 
            id={2}
            title="Define Your AI"
            description="Configure how your AI talks, responds, and represents your brand."
            active={openSections.includes(2)}
            onClick={() => toggleSection(2)}
            status={roleDescription && greetingMessage ? 'complete' : 'needs-setup'}
          >
            <div className="space-y-10 mt-6">
              {/* Role Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Choose a starting point</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(rolePresets).map(([key, preset]) => (
                    <RoleCard 
                      key={key}
                      title={preset.title}
                      description={preset.description}
                      example={preset.example}
                      active={role === key}
                      onClick={() => handleRoleSelect(key)}
                    />
                  ))}
                </div>
              </div>

              {/* Editable Role */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Customize your AI role</h3>
                <textarea 
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  placeholder="Describe how your AI should behave..."
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm min-h-[100px] resize-none leading-relaxed"
                />
                <p className="text-xs text-slate-400">Describe how your AI should behave and respond to users.</p>
              </div>

              {/* Greeting Message */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Greeting Message</h3>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <textarea 
                    value={greetingMessage}
                    onChange={(e) => setGreetingMessage(e.target.value)}
                    placeholder="Hello, this is {company}. How can I help you today?"
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm min-h-[80px] resize-none leading-relaxed"
                  />
                </div>
                <p className="text-xs text-slate-400">This is the first thing your AI will say when answering a call.</p>
              </div>

              {/* Tone & Behavior */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Tone & Behavior</h3>
                <div className="flex flex-wrap gap-2">
                  {['Friendly', 'Professional', 'Concise', 'Empathetic', 'Direct', 'Proactive'].map(tone => (
                    <ToneTag 
                      key={tone} 
                      label={tone} 
                      active={tones.includes(tone)}
                      onClick={() => toggleTone(tone)}
                    />
                  ))}
                </div>
              </div>

              {/* Scope of Support */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Scope of Support</h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">Optional</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['General inquiries', 'Orders & delivery', 'Reservations', 'Sales questions', 'Technical support'].map(item => (
                    <button 
                      key={item}
                      onClick={() => toggleScope(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        scope.includes(item)
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 italic">Selected topics will be prioritized in responses. This helps guide your AI, but it can still handle general conversations.</p>
              </div>
            </div>
          </AccordionItem>

          {/* 3. Call Operations */}
          <AccordionItem 
            id={3}
            title="Call Operations"
            description="Define how the AI handles real-world call situations and workflows."
            active={openSections.includes(3)}
            onClick={() => toggleSection(3)}
            status={businessHours && callHandling ? 'complete' : 'needs-setup'}
          >
            <div className="space-y-12 mt-8">
              {/* Business Hours */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Business Hours</h3>
                <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
                  <button 
                    onClick={() => setBusinessHours('24/7')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${businessHours === '24/7' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    24/7 Available
                  </button>
                  <button 
                    onClick={() => setBusinessHours('Schedule')}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${businessHours === 'Schedule' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Custom Schedule
                  </button>
                </div>

                {businessHours === 'Schedule' && (
                  <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-700">Select Active Days</p>
                      <div className="flex flex-wrap gap-2">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                              activeDays.includes(day)
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {activeDays.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                              .filter(day => activeDays.includes(day))
                              .map(day => (
                                <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-100">
                                  <span className="text-xs font-bold text-slate-700 min-w-[80px]">{day}</span>
                                  <div className="flex items-center gap-2">
                                    <select 
                                      value={dailySchedule[day].start}
                                      onChange={(e) => updateDayTime(day, 'start', e.target.value)}
                                      className="px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white outline-none focus:border-brand"
                                    >
                                      {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <span className="text-slate-400 text-xs">→</span>
                                    <select 
                                      value={dailySchedule[day].end}
                                      onChange={(e) => updateDayTime(day, 'end', e.target.value)}
                                      className="px-2 py-1.5 rounded-lg border border-slate-200 text-xs bg-white outline-none focus:border-brand"
                                    >
                                      {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          {activeDays.includes('Monday') && activeDays.length > 1 && (
                            <button 
                              onClick={applyMondaySchedule}
                              className="text-[10px] font-bold text-brand hover:text-brand-dark flex items-center gap-1.5 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              Apply Monday schedule to all selected days
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="py-8 text-center bg-white rounded-xl border border-dashed border-slate-200">
                          <p className="text-xs text-slate-400 font-medium">Select at least one day to configure hours</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Call Handling Rules */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">If AI cannot handle the request</h3>
                  <p className="text-xs text-slate-500">Choose the fallback action when the AI reaches its limit.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'transfer', label: 'Transfer to human', icon: ArrowRightLeft },
                    { id: 'message', label: 'Take a message', icon: Mail },
                    { id: 'standard', label: 'Standard response', icon: MessageSquare },
                  ].map(rule => (
                    <button 
                      key={rule.id}
                      onClick={() => setCallHandling(rule.id as any)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col gap-3 h-full ${
                        callHandling === rule.id 
                          ? 'border-brand bg-brand/5' 
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <rule.icon className={`w-5 h-5 ${callHandling === rule.id ? 'text-brand' : 'text-slate-400'}`} />
                      <span className={`text-xs font-bold ${callHandling === rule.id ? 'text-brand' : 'text-slate-700'}`}>{rule.label}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {callHandling === 'transfer' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Transfer Phone Number</label>
                        <input 
                          type="text" 
                          value={transferNumber}
                          onChange={(e) => setTransferNumber(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-700">When should we transfer?</label>
                        <div className="space-y-2">
                          {["AI doesn't know the answer", "User asks for human", "High intent (booking, purchase)"].map(condition => (
                            <label key={condition} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 cursor-pointer group hover:border-brand/30 transition-all">
                              <input 
                                type="checkbox" 
                                checked={transferConditions.includes(condition)}
                                onChange={() => toggleTransferCondition(condition)}
                                className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand"
                              />
                              <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">{condition}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {callHandling === 'message' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4"
                    >
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collecting: Name / Phone / Request</p>
                        <label className="text-xs font-bold text-slate-700">Send messages to:</label>
                        <input 
                          type="email" 
                          value={messageEmail}
                          onChange={(e) => setMessageEmail(e.target.value)}
                          placeholder="support@acme.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm"
                        />
                      </div>
                    </motion.div>
                  )}

                  {callHandling === 'standard' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Standard Fallback Response</label>
                        <textarea 
                          value={standardResponse}
                          onChange={(e) => setStandardResponse(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all text-sm min-h-[100px] resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Call Summary */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Call Summary</h3>
                  <p className="text-xs text-slate-500">After each call, a summary will be sent to these emails.</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {summaryEmails.map(email => (
                      <div key={email} className="flex items-center gap-2 px-3 py-1.5 bg-brand/5 border border-brand/10 rounded-lg text-xs font-medium text-brand">
                        {email}
                        <button onClick={() => removeSummaryEmail(email)} className="hover:text-brand-dark">
                          <Plus className="w-3 h-3 rotate-45" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Add another email..."
                      className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-brand outline-none text-xs"
                    />
                    <button 
                      onClick={addSummaryEmail}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>

          {/* 4. Knowledge Base */}
          <AccordionItem 
            id={4}
            title="Knowledge Base"
            description="Upload documents to help your AI answer questions accurately."
            active={openSections.includes(4)}
            onClick={() => toggleSection(4)}
            status="complete"
          >
            <div className="space-y-8 mt-6">
              <div className="bg-slate-50 rounded-2xl p-8 border border-dashed border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm">
                  <Upload className="w-5 h-5 text-slate-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500">Upload documents to improve answer quality and accuracy.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 py-2">
                  {['FAQ', 'Product Catalog', 'Pricing', 'Policies', 'Support Docs'].map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white border border-slate-100 rounded text-[10px] text-slate-400 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">
                  Select Files
                </button>
              </div>

              <div className="space-y-3">
                <KnowledgeItem name="Product_Catalog_2024.pdf" size="2.4 MB" usage="Used in responses" />
                <KnowledgeItem name="Support_Guidelines_v2.docx" size="1.1 MB" usage="Improves accuracy" />
              </div>
            </div>
          </AccordionItem>
        </section>

        {/* Right Panel: Live Preview */}
        <section className="lg:col-span-5 bg-slate-50/50 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="w-full max-w-sm bg-white rounded-[48px] shadow-2xl shadow-slate-300/50 border border-slate-100 overflow-hidden flex flex-col h-[640px] relative z-10 ring-8 ring-slate-900/5">
            {/* Phone Header */}
            <div className="bg-slate-950 p-8 text-center space-y-4 relative">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center border border-brand/30 relative">
                  <div className={`w-10 h-10 rounded-full bg-brand flex items-center justify-center ${isCalling ? 'animate-pulse' : ''} relative z-10`}>
                    <PhoneCall className="text-white w-5 h-5" />
                  </div>
                  {isCalling && callStatus === 'Speaking' && (
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-brand blur-md"
                    />
                  )}
                  {isCalling && (
                    <motion.div 
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-brand"
                    />
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-white font-bold text-lg tracking-tight">
                  {aiName}
                </h4>
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isCalling ? 'bg-emerald-500 animate-pulse' : (isPhoneConnected ? 'bg-emerald-500' : 'bg-amber-500')}`}></span>
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                    {isCalling ? callStatus : (isPhoneConnected ? 'Ready' : 'Not Connected')}
                  </p>
                </div>
              </div>

              {isCalling && <Waveform />}
            </div>

            {/* Main Interaction Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/30">
              {!isCalling ? (
                <div className="text-center space-y-6">
                  <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Test your agent's voice and knowledge in a live environment before going live.
                    </p>
                  </div>
                  <button 
                    onClick={startCall}
                    className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand/30 hover:bg-brand-dark transition-all scale-105 hover:scale-110 flex items-center justify-center gap-3"
                  >
                    <PhoneCall className="w-6 h-6" />
                    Start Test Call
                  </button>
                  {!isPhoneConnected && (
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <p className="text-[10px] text-amber-700 font-bold uppercase tracking-tight">Your AI is not receiving real calls yet</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full space-y-6 text-center">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {callStatus === 'Connecting' ? 'Connecting...' : 
                       callStatus === 'Listening' ? 'Listening...' : 
                       callStatus === 'Speaking' ? 'AI Speaking...' : 
                       callStatus === 'Processing' ? 'Processing...' : 
                       callStatus === 'Resolved' ? 'Call Resolved' : 'Ready'}
                    </p>
                    <div className="h-12 flex items-center justify-center">
                      {callStatus === 'Speaking' ? (
                        <motion.p 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-slate-800 font-medium italic text-sm px-4"
                        >
                          "{greetingMessage.replace('{company}', companyName)}"
                        </motion.p>
                      ) : callStatus === 'Resolved' ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase"
                        >
                          <Check className="w-3 h-3" />
                          AI answered successfully
                        </motion.div>
                      ) : callStatus === 'Idle' ? (
                        <p className="text-slate-400 text-xs px-8">Click start to simulate a call with your {rolePresets[role].title} agent.</p>
                      ) : (
                        <div className="flex gap-1.5">
                          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-brand rounded-full"></motion.span>
                          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-brand rounded-full"></motion.span>
                          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-brand rounded-full"></motion.span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Outcomes Section */}
                  <AnimatePresence>
                    {outcomes.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 space-y-2"
                      >
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest text-left">Call Outcomes</p>
                        <div className="space-y-1 text-left">
                          {outcomes.map((outcome, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-xs font-medium text-emerald-700 flex items-center gap-2"
                            >
                              {outcome}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Secondary Transcript */}
                  <div className="bg-white/50 rounded-2xl p-4 border border-slate-100 max-h-24 overflow-y-auto text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Live Transcript</p>
                    <div className="space-y-2">
                      {messages.map((msg, i) => (
                        <p key={i} className="text-[11px] text-slate-600">
                          <span className="font-bold uppercase text-[9px] mr-1">{msg.role}:</span> {msg.text}
                        </p>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsCalling(false)}
                    className="px-6 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-bold border border-rose-100 hover:bg-rose-100 transition-colors"
                  >
                    End Call
                  </button>
                </div>
              )}
            </div>

            {/* Phone Footer */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <div className="flex items-center justify-center gap-6">
                <button className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <Mic2 className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                  <UserRound className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Tone Feedback */}
          <AnimatePresence>
            {tones.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand" />
                <span className="text-xs font-medium text-slate-600">
                  AI is now speaking in a <span className="text-brand font-bold">{tones.join(' & ')}</span> tone
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Sticky CTA Footer */}
      <footer className="h-20 border-t border-slate-100 bg-white px-8 flex items-center justify-between sticky bottom-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 font-medium">3 team members editing this agent</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            Save Changes
          </button>
          <button 
            onClick={startCall}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-brand bg-brand/10 hover:bg-brand/20 transition-all"
          >
            Start Test Call
          </button>
          <div className="flex flex-col items-end">
            <button 
              disabled={!isSetupComplete}
              onClick={() => setDeploymentStatus(deploymentStatus === 'Draft' ? 'Live' : 'Draft')}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                !isSetupComplete
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                  : deploymentStatus === 'Live' 
                    ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                    : 'bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-dark'
              }`}
            >
              <Rocket className="w-4 h-4" />
              {deploymentStatus === 'Live' ? 'Pause Agent' : 'Deploy Agent'}
            </button>
            {!isSetupComplete && (
              <span className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-wider">Complete setup to deploy</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
