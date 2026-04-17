import { 
  LayoutDashboard, 
  Phone, 
  UserRound, 
  BarChart3, 
  CreditCard, 
  Settings,
  Mic2
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Phone, label: 'Calls', id: 'calls' },
  { icon: UserRound, label: 'Agent', id: 'agent', active: true },
  { icon: BarChart3, label: 'Insights', id: 'insights' },
  { icon: CreditCard, label: 'Billing', id: 'billing' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside id="sidebar" className="w-64 bg-slate-950 text-slate-400 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
          <Mic2 className="text-white w-5 h-5" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">LiveSpeech<span className="text-brand">.ai</span></span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'group-hover:text-slate-200'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-brand"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-900">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
            EH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">Eunseo Han</p>
            <p className="text-xs text-slate-500 truncate">eunseo@hrlab.kr</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
