import { motion } from "motion/react";
import { AlertTriangle, ShieldCheck, Settings2 } from "lucide-react";
import riskData from '../data/mockData.json';

export default function Sidebar() {
  const rankedAlerts = [...riskData].sort((a, b) => b.risk_score - a.risk_score);

  return (
    <div className="w-96 h-screen bg-[#0a0a0a] border-r border-gray-800 text-white p-6 flex flex-col z-10 overflow-y-auto">
      
      <div className="flex items-center gap-3 mb-8">
        <Settings2 className="text-blue-500 w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-wider">CivicFlow</h1>
      </div>

      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Ranked Deployments</h2>

      <div className="flex flex-col gap-4">
        {rankedAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, type: 'spring' }}
            className={`p-4 rounded-xl border ${alert.status === 'unmanned' ? 'bg-red-950/20 border-red-900/50' : 'bg-gray-900 border-gray-800'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg leading-tight">{alert.location}</h3>
              {alert.status === 'unmanned' ? <AlertTriangle className="text-red-500 w-5 h-5" /> : <ShieldCheck className="text-green-500 w-5 h-5" />}
            </div>
            
            <div className="bg-black/40 p-2 rounded text-xs text-gray-300 mb-3 border border-gray-700/50">
              <span className="text-blue-400 font-bold block mb-1">AI Reasoning:</span>
              {alert.reason}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-xs font-bold py-2 rounded transition-colors cursor-pointer">
                Accept 
              </button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-xs font-bold py-2 rounded border border-gray-600 transition-colors cursor-pointer">
                Manual Override
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}