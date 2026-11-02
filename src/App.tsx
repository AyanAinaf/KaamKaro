import React, { useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { WorkerDirectory } from './pages/WorkerDirectory';

export default function App() {
  const [testSandboxOpen, setTestSandboxOpen] = useState(false);
  const [agentManagerOpen, setAgentManagerOpen] = useState(false);
  const [firebaseSchemaOpen, setFirebaseSchemaOpen] = useState(false);
  const [requestElectricianDemo, setRequestElectricianDemo] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar with 3-Zone contract */}
      <TopNavigation
        onOpenTestSandbox={() => setTestSandboxOpen(true)}
        onOpenAgentManager={() => setAgentManagerOpen(true)}
        onOpenFirebaseSchema={() => setFirebaseSchemaOpen(true)}
        onRunElectricianDemo={() => setRequestElectricianDemo(true)}
      />

      {/* Main Worker Directory & Skill Intelligence Page */}
      <div className="flex-1">
        <WorkerDirectory
          testSandboxOpen={testSandboxOpen}
          onCloseTestSandbox={() => setTestSandboxOpen(false)}
          agentManagerOpen={agentManagerOpen}
          onCloseAgentManager={() => setAgentManagerOpen(false)}
          firebaseSchemaOpen={firebaseSchemaOpen}
          onCloseFirebaseSchema={() => setFirebaseSchemaOpen(false)}
          onRequestElectricianDemo={requestElectricianDemo}
          onResetElectricianDemoTrigger={() => setRequestElectricianDemo(false)}
        />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <strong className="text-slate-900">KaamKaro</strong> · Skills That Work. Opportunities That Matter.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFirebaseSchemaOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Firebase Realtime Database Architecture
            </button>
            <span>·</span>
            <button
              onClick={() => setTestSandboxOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Skill Isolation Test Bench
            </button>
            <span>·</span>
            <button
              onClick={() => setAgentManagerOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Agent Availability Manager
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
