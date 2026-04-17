/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AgentBuilder from './components/AgentBuilder';
import CallsPage from './components/CallsPage';
import InsightsPage from './components/InsightsPage';
import OverviewPage from './components/OverviewPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage onNavigate={setActiveTab} />;
      case 'agent':
        return <AgentBuilder />;
      case 'calls':
        return <CallsPage />;
      case 'insights':
        return <InsightsPage />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <p className="text-lg font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div id="app-root" className="flex h-screen bg-white overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
