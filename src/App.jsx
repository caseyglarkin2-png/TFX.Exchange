import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Activity, AlertTriangle, CheckCircle, Terminal, DollarSign, ChevronRight, Menu, X, Crosshair, Hexagon, Zap, Layers, Map, Users, Radio, FileText, Send } from 'lucide-react';

// --- Local Threat Detection ---
const detectThreat = (input) => {
  const text = input.toLowerCase();
  
  // Threat indicators
  const urgencyKeywords = ['urgent', 'asap', 'immediate', 'rush', 'emergency', 'now'];
  const domainFlags = ['gmail', 'yahoo', 'outlook', 'hotmail'];
  const priceAnomalies = ['below market', 'too good', 'steal', 'heavily discounted'];
  const genericLanguage = ['hello', 'hi there', 'dear shipper', 'valued customer'];
  
  const flags = [];
  let threatScore = 0;
  
  // Check for urgency
  if (urgencyKeywords.some(kw => text.includes(kw))) {
    flags.push('Excessive Urgency Pattern');
    threatScore += 2;
  }
  
  // Check for domain mismatches (generic email domains)
  if (domainFlags.some(domain => text.includes(domain))) {
    flags.push('Domain Mismatch Detected');
    threatScore += 2;
  }
  
  // Check for price anomalies
  if (priceAnomalies.some(anom => text.includes(anom))) {
    flags.push('Pricing Anomaly Alert');
    threatScore += 3;
  }
  
  // Check for generic language
  if (genericLanguage.some(lang => text.includes(lang))) {
    flags.push('Generic Greeting Pattern');
    threatScore += 1;
  }
  
  // Check for suspicious patterns
  if (text.includes('wire transfer') || text.includes('advance payment')) {
    flags.push('Advance Payment Request');
    threatScore += 3;
  }
  
  if (text.includes('spoof') || text.includes('fake') || text.includes('clone')) {
    flags.push('Identity Spoofing Risk');
    threatScore += 4;
  }
  
  // Determine threat level
  let threatLevel = 'LOW';
  let status = 'VERIFIED';
  
  if (threatScore >= 6) {
    threatLevel = 'CRITICAL';
    status = 'COMPROMISED';
  } else if (threatScore >= 4) {
    threatLevel = 'MEDIUM';
    status = 'COMPROMISED';
  }
  
  // Ensure we have 3 flags
  while (flags.length < 3) {
    flags.push('Standard Protocol Check');
  }
  
  // Directive
  const directives = {
    'CRITICAL': 'Block load immediately. Escalate to fraud team.',
    'MEDIUM': 'Request additional verification before tender.',
    'LOW': 'Proceed with standard verification protocol.'
  };
  
  return {
    threatLevel,
    status,
    flags: flags.slice(0, 3),
    directive: directives[threatLevel]
  };
};

// --- Scenario Generator ---
const generateScenario = () => {
  const scenarios = [
    "It's 4:15 PM on Friday. A load of copper wire ($847K) just picked up from Phoenix. Shipper email domain is 'shipper-logistics.co'. Pickup location differs from manifest. WHAT IS YOUR PROTOCOL?",
    "Emergency notification: Solar panel load ($2.3M) needs same-day tender. Carrier requesting wire transfer upfront. Contact number has no voicemail. WHAT IS YOUR PROTOCOL?",
    "Electronics shipment ($1.2M) to undisclosed destination. Broker requesting communication through personal email only. Rate 30% below market. WHAT IS YOUR PROTOCOL?",
    "High-value semi-conductor load ($3.1M) diverted mid-route. New drop-off requested via text message from 'dispatcher'. Original shipper unreachable. WHAT IS YOUR PROTOCOL?",
    "Agricultural equipment ($567K) load cancelled/re-tendered 4 times in 6 hours. Each time with different carrier. Email domain mismatch detected. WHAT IS YOUR PROTOCOL?"
  ];
  
  return scenarios[Math.floor(Math.random() * scenarios.length)];
};

// --- Utility Components ---

const GlitchText = ({ text, color = "text-white" }) => {
  return (
    <div className={`relative inline-block ${color} font-mono font-bold tracking-tighter uppercase`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-70 animate-pulse z-0">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-cyan-400 opacity-70 animate-pulse delay-75 z-0">{text}</span>
    </div>
  );
};

const Ticker = () => {
  return (
    <div className="bg-black border-b border-[#F8C617]/30 overflow-hidden whitespace-nowrap py-2 flex relative z-40">
      <div className="animate-marquee inline-block font-mono text-xs text-[#F8C617] font-bold tracking-wider">
        <span className="mx-4">TFX INDEX: 14,203 (+4.2%)</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">FRAUD BLOCKED (24H): 1,204</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">VERIFIED CARRIERS: 45,200</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4 text-cyan-400">MARKET STATUS: SEGREGATED</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">IDENTITY DEBT: PURGING...</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">STRATEGIC THEFT ALERT: FOOD & BEV SECTOR</span>
         <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">TFX INDEX: 14,203 (+4.2%)</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">FRAUD BLOCKED (24H): 1,204</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">VERIFIED CARRIERS: 45,200</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4 text-cyan-400">MARKET STATUS: SEGREGATED</span>
      </div>
    </div>
  );
};

const LiveFeed = () => {
  const [items, setItems] = useState([
    { id: 1, type: 'VERIFIED', text: 'MC# 192834 - IDENTITY CONFIRMED', time: '10:42:01' },
    { id: 2, type: 'BLOCK', text: 'MC# 992811 - SPOOF DETECTED (NY)', time: '10:42:03' },
    { id: 3, type: 'VERIFIED', text: 'MC# 442100 - ELD SYNC ACTIVE', time: '10:42:05' },
    { id: 4, type: 'VERIFIED', text: 'MC# 110293 - TRIUMPH PAY CLEAR', time: '10:42:08' },
    { id: 5, type: 'BLOCK', text: 'EMAIL BLOCKED - DOMAIN MISMATCH', time: '10:42:12' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAction = Math.random() > 0.7 ? 'BLOCK' : 'VERIFIED';
      const mc = Math.floor(100000 + Math.random() * 900000);
      const text = newAction === 'BLOCK' 
        ? `THREAT NEUTRALIZED - MC# ${mc}` 
        : `IDENTITY VERIFIED - MC# ${mc}`;
      
      const newItem = {
        id: Date.now(),
        type: newAction,
        text: text,
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
      };

      setItems(prev => [newItem, ...prev].slice(0, 6));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black/80 border border-gray-800 font-mono text-xs p-4 rounded-sm shadow-2xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
        <span className="text-gray-500 uppercase">Live Exchange Feed</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-green-500">REALTIME</span>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center animate-fadeIn">
            <span className={item.type === 'BLOCK' ? 'text-red-500' : 'text-cyan-400'}>
              [{item.type}]
            </span>
            <span className="text-gray-300 truncate ml-2 flex-1">{item.text}</span>
            <span className="text-gray-600">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, align = "center" }) => (
  <div className={`mb-12 ${align === "left" ? "text-left" : "text-center"}`}>
    <h2 className="text-sm font-mono text-[#F8C617] mb-2 tracking-widest uppercase">
      // {title}
    </h2>
    <h3 className="text-3xl md:text-5xl font-sans font-black text-white uppercase tracking-tight leading-none">
      {subtitle}
    </h3>
    <div className={`h-1 w-24 bg-[#F8C617] mt-6 ${align === "left" ? "" : "mx-auto"}`}></div>
  </div>
);

const StatCard = ({ label, value, subtext, trend }) => (
  <div className="bg-[#0f1225] border border-gray-800 p-6 relative overflow-hidden group hover:border-[#F8C617] transition-colors duration-300">
    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
      <Activity size={24} className="text-[#F8C617]" />
    </div>
    <div className="text-gray-400 font-mono text-xs uppercase mb-2">{label}</div>
    <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{value}</div>
    <div className={`text-xs font-mono flex items-center gap-2 ${trend === 'negative' ? 'text-red-500' : 'text-cyan-400'}`}>
      {trend === 'negative' ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
      {subtext}
    </div>
  </div>
);

const LogoConcept = ({ title, description, children, active }) => {
    const [viewMode, setViewMode] = useState('app'); // 'app' or 'truck'

    return (
        <div className={`border ${active ? 'border-[#F8C617] bg-[#1a1d2e]' : 'border-gray-800 bg-[#0f1225]'} transition-all hover:border-gray-600 group flex flex-col`}>
            {/* View Toggle */}
            <div className="flex border-b border-gray-800 text-[10px] font-mono uppercase">
                <button 
                    onClick={() => setViewMode('app')}
                    className={`flex-1 py-2 ${viewMode === 'app' ? 'bg-[#F8C617] text-black font-bold' : 'text-gray-500 hover:text-white'}`}
                >
                    Digital (App)
                </button>
                <button 
                    onClick={() => setViewMode('truck')}
                    className={`flex-1 py-2 ${viewMode === 'truck' ? 'bg-white text-black font-bold' : 'text-gray-500 hover:text-white'}`}
                >
                    Physical (Decal)
                </button>
            </div>

            {/* Context Viewer */}
            <div className="h-48 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                {viewMode === 'app' ? (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                         {/* Scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                        <div className="w-16 h-16 rounded-xl bg-[#111] border border-gray-700 flex items-center justify-center shadow-lg shadow-cyan-900/20">
                            <div className="scale-50">{children}</div>
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center">
                        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                        {/* Metallic Decal Effect */}
                        <div className="scale-75 drop-shadow-2xl filter contrast-125">
                            {children}
                        </div>
                        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-gray-500">DOOR_PANEL_MOCKUP_V2</div>
                    </div>
                )}
            </div>
            
            <div className="p-6">
                <h4 className="text-white font-bold text-lg uppercase mb-2 font-sans">{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

const Calculator = () => {
  const [volume, setVolume] = useState(500);
  const [theftRisk, setTheftRisk] = useState(0);
  const [timeWasted, setTimeWasted] = useState(0);

  useEffect(() => {
    // Logic from PDF: Avg Loss $336,787. 15 mins vetting per load.
    const riskFactor = 0.02; // 2% chance per month
    const avgLoss = 336787;
    setTheftRisk(Math.floor(volume * riskFactor * avgLoss)); 
    setTimeWasted(Math.floor((volume * 15) / 60)); // Hours
  }, [volume]);

  return (
    <div className="bg-[#0F1121] border border-gray-800 p-8 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F8C617] to-transparent"></div>
      <h3 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-3">
        <Terminal size={24} className="text-[#F8C617]" />
        Anarchy Calculator
      </h3>
      
      <div className="mb-8">
        <label className="text-gray-400 font-mono text-xs uppercase mb-2 block">Monthly Load Volume</label>
        <input 
          type="range" 
          min="50" 
          max="5000" 
          step="50"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#F8C617]"
        />
        <div className="text-right text-[#F8C617] font-mono font-bold mt-2">{volume} Loads</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/50 p-4 border-l-2 border-red-500">
          <div className="text-gray-500 text-xs font-mono uppercase mb-1">Projected Identity Debt</div>
          <div className="text-2xl font-bold text-white">${theftRisk.toLocaleString()}</div>
          <div className="text-red-500 text-xs mt-1">Potential Fraud Exposure</div>
        </div>
        <div className="bg-black/50 p-4 border-l-2 border-yellow-500">
          <div className="text-gray-500 text-xs font-mono uppercase mb-1">Operational Paralysis</div>
          <div className="text-2xl font-bold text-white">{timeWasted.toLocaleString()} hrs</div>
          <div className="text-yellow-500 text-xs mt-1">Wasted on Manual Vetting</div>
        </div>
      </div>
    </div>
  );
};

// --- New Gemini Features ---

const SentinelTerminal = () => {
    const [input, setInput] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if(!input) return;
        setLoading(true);
        setAnalysis(null);

        // Simulate processing delay
        setTimeout(() => {
            const result = detectThreat(input);
            setAnalysis(result);
            setLoading(false);
        }, 600);
    };

    return (
        <div className="bg-[#05060a] border border-cyan-900/50 p-6 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-xs font-mono text-cyan-500 animate-pulse">
                [SENTINEL_AI_ONLINE]
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Terminal size={20} className="text-cyan-400" />
                THREAT ANALYZER
            </h3>
            
            <div className="mb-4">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="PASTE CARRIER COMMS / EMAIL BODY FOR ANALYSIS..."
                    className="w-full bg-[#0f1225] border border-gray-800 text-cyan-400 font-mono text-xs p-4 focus:outline-none focus:border-cyan-500 min-h-[100px]"
                />
            </div>

            <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-cyan-900/20 border border-cyan-500 text-cyan-400 py-3 font-mono font-bold hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center gap-2 mb-6"
            >
                {loading ? "ANALYZING..." : "INITIATE THREAT SCAN"} 
            </button>

            {analysis && (
                <div className={`border-l-2 p-4 animate-fadeIn ${analysis.threatLevel === 'CRITICAL' ? 'border-red-500 bg-red-900/10' : 'border-cyan-500 bg-cyan-900/10'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-xs text-gray-500 flex items-center gap-2">
                            {analysis.threatLevel === 'CRITICAL' ? <IconThreat /> : <IconVerified />}
                            THREAT_LEVEL
                        </span>
                        <span className={`font-bold font-mono ${analysis.threatLevel === 'CRITICAL' ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                            {analysis.threatLevel}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-xs text-gray-500">STATUS</span>
                        <span className="font-bold font-mono text-white">{analysis.status}</span>
                    </div>
                    <div className="mb-4">
                        <span className="font-mono text-xs text-gray-500 block mb-2">FLAGS_DETECTED</span>
                        <ul className="space-y-1">
                            {analysis.flags.map((flag, i) => (
                                <li key={i} className="text-xs font-mono text-gray-300 flex items-center gap-2">
                                    <AlertTriangle size={10} className={analysis.threatLevel === 'CRITICAL' ? 'text-red-500' : 'text-cyan-400'} /> 
                                    {flag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                         <span className="font-mono text-xs text-gray-500 block mb-1">DIRECTIVE</span>
                         <span className="font-bold text-white text-sm uppercase tracking-wider">{analysis.directive}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

const WarGameGenerator = () => {
    const [scenario, setScenario] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateScenario = () => {
        setLoading(true);
        
        // Simulate processing delay
        setTimeout(() => {
            const result = generateScenario();
            setScenario(result);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="bg-black/80 max-w-lg mx-auto p-8 border border-gray-800 relative group">
             <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
             
             <div className="flex justify-between items-center text-sm font-mono text-gray-400 mb-6 border-b border-gray-800 pb-4">
                <span>SIMULATION_MODE</span>
                <span>STATUS: {loading ? 'GENERATING...' : 'READY'}</span>
            </div>

            <div className="min-h-[150px] flex items-center justify-center text-center">
                {loading ? (
                    <div className="text-red-500 font-mono animate-pulse">UPLOADING SCENARIO PARAMETERS...</div>
                ) : scenario ? (
                    <div className="text-white font-mono text-lg leading-relaxed animate-fadeIn">
                        "{scenario}"
                    </div>
                ) : (
                    <p className="text-gray-500 italic">
                        "It is 4:00 PM on a Friday. A load of copper wire has just been picked up..."
                    </p>
                )}
            </div>

            <button 
                onClick={handleGenerateScenario}
                className="w-full mt-8 bg-red-600 text-white font-bold py-4 hover:bg-red-700 transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
            >
                {loading ? <Activity className="animate-spin" /> : <Zap size={18} />}
                ACTIVATE WAR GAME
            </button>
        </div>
    );
}

// --- Main App ---

// --- Logo Concepts ---
const LogoMonogram = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20H40V40H60V20H80V80H60V60H40V80H20V20Z" fill="currentColor"/>
    <rect x="40" y="40" width="20" height="20" fill="#F8C617"/>
  </svg>
);

const LogoFortress = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10L30 10L40 90L20 90L10 10Z" fill="currentColor"/>
    <path d="M90 10L70 10L60 90L80 90L90 10Z" fill="currentColor"/>
    <rect x="35" y="45" width="30" height="10" fill="#F8C617"/>
    <path d="M10 10H90V20H10V10Z" fill="currentColor" opacity="0.5"/>
    <path d="M20 90H80V80H20V90Z" fill="currentColor" opacity="0.5"/>
  </svg>
);

const LogoPulse = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L45 50L20 80H35L60 50L35 20H20Z" fill="currentColor"/>
    <path d="M80 80L55 50L80 20H65L40 50L65 80H80Z" fill="#F8C617"/>
    <rect x="0" y="48" width="100" height="4" fill="currentColor"/>
  </svg>
);

const LogoSelector = ({ currentLogo, setCurrentLogo }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const logos = [
    { name: 'Monogram', id: 'monogram', component: LogoMonogram, desc: 'Bank-like Structure' },
    { name: 'Fortress', id: 'fortress', component: LogoFortress, desc: 'Enclosed Security' },
    { name: 'Pulse', id: 'pulse', component: LogoPulse, desc: 'Digital-First' }
  ];
  
  const current = logos.find(l => l.id === currentLogo);
  
  return (
    <div className="relative group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-black border border-[#F8C617] flex items-center justify-center group-hover:bg-[#F8C617] transition-colors">
          <div className="text-[#F8C617] group-hover:text-black transition-colors">
            {current && <current.component size={16} />}
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-12 left-0 bg-[#0A0D1E] border border-[#F8C617] rounded-sm shadow-2xl z-50 overflow-hidden min-w-64">
          <div className="p-2 border-b border-gray-800">
            <span className="text-xs font-mono text-gray-500 px-3 block py-2">SELECT IDENTITY</span>
          </div>
          {logos.map(logo => (
            <button
              key={logo.id}
              onClick={() => {
                setCurrentLogo(logo.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                currentLogo === logo.id 
                  ? 'bg-[#F8C617] text-black' 
                  : 'hover:bg-gray-900 text-white'
              } border-b border-gray-800 last:border-b-0`}
            >
              <div className={`w-6 h-6 flex items-center justify-center ${currentLogo === logo.id ? 'text-black' : 'text-[#F8C617]'}`}>
                <logo.component size={16} />
              </div>
              <div className="flex-1">
                <div className="font-mono font-bold text-sm">{logo.name}</div>
                <div className={`text-xs ${currentLogo === logo.id ? 'text-black/60' : 'text-gray-500'}`}>{logo.desc}</div>
              </div>
              {currentLogo === logo.id && (
                <div className="w-2 h-2 bg-black rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Icon Set for Threat States ---
const IconVerified = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconThreat = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconAnarchy = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L28 28M28 4L4 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const IconSanctuary = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="20" height="18" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 8L24 2L26 8H32V14H16L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Icon Badge Component ---
const IconBadge = ({ icon: Icon, label, color = "cyan" }) => {
  const colorMap = {
    cyan: 'text-cyan-400 border-cyan-400',
    yellow: 'text-[#F8C617] border-[#F8C617]',
    red: 'text-red-500 border-red-500',
    green: 'text-green-500 border-green-500'
  };
  
  return (
    <div className={`flex items-center gap-2 px-3 py-2 border ${colorMap[color]} rounded-sm font-mono text-xs`}>
      <Icon />
      <span className="uppercase tracking-wider">{label}</span>
    </div>
  );
};

// Wrapper to render icons inline
const Icon = ({ component: Component, size = 20, ...props }) => (
  <Component size={size} {...props} />
);

export default function TFXApp() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState('monogram');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0A0D1E] min-h-screen text-gray-300 font-sans selection:bg-[#F8C617] selection:text-black overflow-x-hidden">
      
      {/* Production Credit */}
      <div className="fixed top-0 right-6 z-30 pt-2 text-xs font-mono text-gray-600 hover:text-[#F8C617] transition-colors">
        <a href="#" title="Presented by Dude What's The Bid?! LLC">🎬 DWBTB</a>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Oswald:wght@400;500;700&family=Inter:wght@400;600;800&display=swap');
      `}</style>

      {/* --- Ticker & Nav --- */}
      <div className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0D1E]/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <Ticker />
        <nav className={`border-b ${scrolled ? 'border-gray-800 py-3' : 'border-transparent py-6'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LogoSelector currentLogo={currentLogo} setCurrentLogo={setCurrentLogo} />
              <span className="text-white font-bold text-xl tracking-tighter">TFX<span className="text-[#F8C617]">.EXCHANGE</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
              <a href="#the-separation" className="hover:text-[#F8C617] transition-colors flex items-center gap-1"><IconAnarchy className="w-3 h-3" /> The Separation</a>
              <a href="#architecture" className="hover:text-[#F8C617] transition-colors flex items-center gap-1"><IconVerified className="w-3 h-3" /> Architecture</a>
              <a href="#case-studies" className="hover:text-[#F8C617] transition-colors flex items-center gap-1">📊 Case Studies</a>
              <a href="#the-anarchy" className="hover:text-[#F8C617] transition-colors flex items-center gap-1"><IconThreat className="w-3 h-3" /> The Problem</a>
              <a href="#reid-circle" className="hover:text-[#F8C617] transition-colors flex items-center gap-1"><IconSanctuary className="w-3 h-3" /> Reid's Circle</a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* --- Mobile Menu --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0D1E] pt-32 px-6 md:hidden">
          <div className="flex flex-col gap-6 font-mono text-lg uppercase tracking-widest text-white">
            <a href="#the-separation" onClick={() => setMobileMenuOpen(false)}>The Separation</a>
            <a href="#architecture" onClick={() => setMobileMenuOpen(false)}>Architecture</a>
            <a href="#case-studies" onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
            <a href="#the-anarchy" onClick={() => setMobileMenuOpen(false)}>The Problem</a>
            <a href="#reid-circle" onClick={() => setMobileMenuOpen(false)}>Reid's Circle</a>
            <a href="#war-room" onClick={() => setMobileMenuOpen(false)}>War Room</a>
            <button className="bg-[#F8C617] text-black px-6 py-3 font-bold mt-4">
              Apply for Access
            </button>
          </div>
        </div>
      )}

      {/* --- Hero Section: The Exchange Floor --- */}
      <header className="relative min-h-screen flex items-center grid-bg pt-32 pb-12 overflow-hidden" id="the-separation">
        {/* Abstract "Map" Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12">
              
              {/* Left Column: Text */}
              <div className="lg:w-1/2 text-left pt-10">
                <div className="inline-flex items-center gap-2 border border-red-900/50 bg-red-900/10 px-4 py-1 rounded-full mb-8 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span className="text-red-400 font-mono text-xs uppercase tracking-widest">
                      <IconAnarchy /> PUBLIC SQUARE: COMPROMISED
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-6">
                    THE GREAT <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">SEPARATION</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-10 font-mono leading-relaxed border-l-4 border-[#F8C617] pl-6">
                    The open market is dead. The "Anarchy" has won. <br/>
                    <span className="text-white font-bold">TFX is the only Sanctuary left.</span>
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    <button className="bg-[#F8C617] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 group">
                    Enter Exchange <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="border border-gray-700 text-gray-300 px-8 py-4 font-mono uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-colors">
                    Market Analysis
                    </button>
                </div>
              </div>

              {/* Right Column: Expanded Live Feed (Command Center) */}
              <div className="lg:w-1/2 w-full">
                  <div className="relative w-full bg-[#05060a] border border-gray-800 p-6 rounded-sm shadow-2xl">
                      
                      {/* Dashboard Header */}
                      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <Activity className="text-cyan-400" />
                            <span className="text-white font-bold uppercase tracking-widest">Network Topography</span>
                        </div>
                        <div className="text-xs font-mono text-gray-500">
                            UPDATED: {new Date().toLocaleTimeString()}
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-[#0f1225] p-4 border border-gray-800">
                              <div className="text-xs text-gray-500 font-mono uppercase">Verified Nodes</div>
                              <div className="text-2xl font-bold text-white">45,210</div>
                              <div className="h-1 w-full bg-gray-800 mt-2">
                                  <div className="h-full bg-cyan-400 w-[85%]"></div>
                              </div>
                          </div>
                          <div className="bg-[#0f1225] p-4 border border-gray-800">
                              <div className="text-xs text-gray-500 font-mono uppercase">Threats Active</div>
                              <div className="text-2xl font-bold text-red-500">1,204</div>
                              <div className="h-1 w-full bg-gray-800 mt-2">
                                  <div className="h-full bg-red-500 w-[30%]"></div>
                              </div>
                          </div>
                      </div>

                      {/* Live Feed Component */}
                      <LiveFeed />

                      {/* Map Visualization (Abstract) */}
                      <div className="mt-6 h-32 w-full bg-[#0f1225] border border-gray-800 relative overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                          <div className="text-xs font-mono text-gray-600 flex flex-col items-center">
                              <Map className="mb-2 opacity-50"/>
                              [GEO-SPATIAL MONITORING ACTIVE]
                          </div>
                          {/* Random blips */}
                          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </header>

      {/* --- The Architecture: Load Board vs Exchange --- */}
      <section id="architecture" className="py-24 bg-[#0A0D1E] relative border-t border-gray-900">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Market Structure" 
            subtitle="Load Board vs Exchange" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Load Board */}
            <div className="relative">
              <div className="border border-red-900/50 bg-red-900/5 p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                  <IconAnarchy className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-red-500 uppercase">Load Board</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-red-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Liquidity First</div>
                      <div className="text-sm text-gray-400">Maximum volume, minimum friction. Anyone with a credit card can post.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-red-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Passive Vetting</div>
                      <div className="text-sm text-gray-400">One-time credit check. No ongoing identity verification. "Verified" badge = yesterday's snapshot.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-red-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">No Physical Proof</div>
                      <div className="text-sm text-gray-400">Trucks exist on paper, not in reality. No ELD integration, no real-time location verification.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-red-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Speed Over Safety</div>
                      <div className="text-sm text-gray-400">Built for discovery (finding loads). Not designed for certainty (proving who you are).</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 p-4 border border-red-900/30 rounded-sm">
                  <p className="text-red-400 font-mono text-xs uppercase mb-2">Result:</p>
                  <p className="text-white text-sm">13% YoY increase in cargo theft. Strategic theft outpaces hijacking. Identity spoofing becomes the primary attack vector.</p>
                </div>
              </div>
            </div>

            {/* Exchange */}
            <div className="relative">
              <div className="border border-cyan-900/50 bg-cyan-900/5 p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                  <IconSanctuary className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-cyan-400 uppercase">Exchange</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Quality First</div>
                      <div className="text-sm text-gray-400">Gated access. Strategic friction filters out bad actors before they enter.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Real-Time Verification</div>
                      <div className="text-sm text-gray-400">Continuous ELD-linked identity proof. "Verified" = verified RIGHT NOW, not yesterday.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Physical Reality</div>
                      <div className="text-sm text-gray-400">Truck's location is proven via ELD. Digital claim = physical fact. The machine verifies the person.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Safety Enables Speed</div>
                      <div className="text-sm text-gray-400">Zero Trust architecture. One-click booking without fear. Identity certainty = operational velocity.</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 p-4 border border-cyan-900/30 rounded-sm">
                  <p className="text-cyan-400 font-mono text-xs uppercase mb-2">Result:</p>
                  <p className="text-white text-sm">45,210 verified nodes. Zero fraudulent transactions. Brokers operate with confidence, not paranoia.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full border border-gray-800">
              <thead>
                <tr className="border-b border-gray-800 bg-[#05060a]">
                  <th className="text-left px-6 py-4 font-mono text-xs uppercase text-gray-500">Dimension</th>
                  <th className="text-left px-6 py-4 font-mono text-xs uppercase text-red-500">Load Board</th>
                  <th className="text-left px-6 py-4 font-mono text-xs uppercase text-cyan-400">Exchange</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">Onboarding</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Credit card + form submission</td>
                  <td className="px-6 py-4 text-sm text-cyan-300">Multi-layer verification + ELD integration</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">Vetting Model</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Historical (FMCSA data, past inspections)</td>
                  <td className="px-6 py-4 text-sm text-cyan-300">Real-time (live ELD, current location, active status)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">Identity Proof</td>
                  <td className="px-6 py-4 text-sm text-gray-300">None. You claim you're a carrier; we believe you.</td>
                  <td className="px-6 py-4 text-sm text-cyan-300">Cryptographic. You prove you are a carrier (ELD + financial link).</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">Fraud Rate</td>
                  <td className="px-6 py-4 text-sm text-red-300">13% YoY increase (strategic theft)</td>
                  <td className="px-6 py-4 text-sm text-cyan-300">1% (isolated attempts, rapidly blocked)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">Capacity</td>
                  <td className="px-6 py-4 text-sm text-gray-300">400M+ loads. Noise kills signal.</td>
                  <td className="px-6 py-4 text-sm text-cyan-300">45K+ verified carriers. Every load is clean.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">Trust Model</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Optimism. Hope no one is lying.</td>
                  <td className="px-6 py-4 text-sm text-cyan-300">Zero Trust. Prove it or we don't move it.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- The Anarchy (Problem) --- */}
      <section id="the-anarchy" className="py-24 bg-[#05060a] relative border-t border-gray-900">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Current Operating Environment" 
            subtitle="Welcome to the Anarchy" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                The public load boards have failed. They were designed for liquidity, not security. 
                In the "Public Square," a legitimate carrier is indistinguishable from a criminal syndicate.
              </p>
              <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center gap-4 bg-[#111] p-4 border-l-2 border-red-500">
                      <div className="font-mono text-2xl font-bold text-red-500">1.4M</div>
                      <div className="text-sm text-gray-400">Fraudulent Emails Blocked <br/> <span className="text-xs text-gray-600">Q3 2025 (Source: Highway Index)</span></div>
                  </div>
                   <div className="flex items-center gap-4 bg-[#111] p-4 border-l-2 border-yellow-500">
                      <div className="font-mono text-2xl font-bold text-yellow-500">200%</div>
                      <div className="text-sm text-gray-400">Increase in Strategic Theft <br/> <span className="text-xs text-gray-600">High-Value Cargo Targeting</span></div>
                  </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-4 border border-red-900/30 bg-red-900/5">
                  <AlertTriangle className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold uppercase mb-1">Identity Spoofing</h4>
                    <p className="text-gray-400 text-sm">Bad actors aren't just stealing cargo; they are stealing identities. Static vetting fails against dynamic threats.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <IconBadge icon={IconAnarchy} label="The Anarchy" color="red" />
                <IconBadge icon={IconThreat} label="Strategic Threats" color="red" />
              </div>
            </div>

            {/* AI FEATURE 1: Sentinel Terminal */}
            <div className="relative">
                <SentinelTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* --- Visual Identity Lab --- */}
      <section id="branding" className="py-24 bg-[#0A0D1E] relative border-t border-gray-900">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Visual Identity Lab" 
            subtitle="Constructing The Brand" 
            align="left"
          />
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <p className="text-gray-400 max-w-2xl font-mono text-sm">
                // OBJECTIVE: Establish TFX as a distinct, premium exchange environment. <br/>
                // DIRECTIVE: Toggle views to inspect brand resilience across digital and physical mediums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LogoConcept 
              title="Concept A: The Monogram" 
              description="Interlocking 'H' and 'X'. Represents the intersection of Verification and Liquidity. A solid, bank-like structure."
              active={true}
            >
               <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20H40V40H60V20H80V80H60V60H40V80H20V20Z" fill="white"/>
                  <rect x="40" y="40" width="20" height="20" fill="#F8C617"/>
               </svg>
            </LogoConcept>

            <LogoConcept 
              title="Concept B: The Fortress" 
              description="Evolution of the Highway 'H', now enclosed. Transforms the open road into a secured perimeter. Yellow core = verified load."
            >
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10L30 10L40 90L20 90L10 10Z" fill="white"/>
                  <path d="M90 10L70 10L60 90L80 90L90 10Z" fill="white"/>
                  <rect x="35" y="45" width="30" height="10" fill="#F8C617"/>
                  <path d="M10 10H90V20H10V10Z" fill="white" opacity="0.5"/>
                  <path d="M20 90H80V80H20V90Z" fill="white" opacity="0.5"/>
                </svg>
            </LogoConcept>

             <LogoConcept 
              title="Concept C: The Pulse" 
              description="Focuses on the 'X' of Exchange. The break signifies the speed of the live data feed. Minimalist and digital-first."
            >
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20L45 50L20 80H35L60 50L35 20H20Z" fill="white"/>
                  <path d="M80 80L55 50L80 20H65L40 50L65 80H80Z" fill="#F8C617"/>
                  <rect x="0" y="48" width="100" height="4" fill="black"/>
                </svg>
            </LogoConcept>
          </div>
        </div>
      </section>

      {/* --- Case Studies: Exchanges in Other Industries --- */}
      <section id="case-studies" className="py-24 bg-[#05060a] relative border-t border-gray-900">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Proven Model" 
            subtitle="Exchanges Work. Here's Why." 
          />

          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16 text-lg">
            The exchange model isn't new. It's been battle-tested across industries for centuries. Gated access + verified participants = liquidity with safety. The freight market is overdue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NYSE */}
            <div className="border border-gray-800 bg-[#0f1225] p-8 hover:border-[#F8C617] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#F8C617] rounded-sm flex items-center justify-center text-black font-bold text-lg">NYSE</div>
                <div>
                  <h4 className="text-white font-bold uppercase">New York Stock Exchange</h4>
                  <p className="text-xs text-gray-500">Founded 1792</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">Model</p>
                  <p className="text-sm text-white">Gated marketplace. Not every company can list. Strict financial standards + ongoing compliance required.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Barrier</p>
                  <p className="text-sm text-white">Listing fees, audits, regulatory filing. Creates "friction" that filters bad actors.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Result</p>
                  <p className="text-sm text-[#F8C617]">$94T market cap. Trillions trade daily. Trust is the asset.</p>
                </div>
              </div>
            </div>

            {/* Coinbase */}
            <div className="border border-gray-800 bg-[#0f1225] p-8 hover:border-[#F8C617] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-sm flex items-center justify-center text-white font-bold text-xs">COIN</div>
                <div>
                  <h4 className="text-white font-bold uppercase">Coinbase Exchange</h4>
                  <p className="text-xs text-gray-500">Founded 2012</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">Model</p>
                  <p className="text-sm text-white">Crypto exchange with KYC (Know Your Customer). Verified users only. Real-time settlement via blockchain.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Barrier</p>
                  <p className="text-sm text-white">Government ID verification, biometric proof, ongoing compliance checks. Inconvenient? Yes. Worth it? Yes.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Result</p>
                  <p className="text-sm text-blue-400">$3.6B revenue. Institutional-grade security. Outpaced unverified competitors.</p>
                </div>
              </div>
            </div>

            {/* Manheim Auto Auctions */}
            <div className="border border-gray-800 bg-[#0f1225] p-8 hover:border-[#F8C617] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-sm flex items-center justify-center text-white font-bold text-xs">MAH</div>
                <div>
                  <h4 className="text-white font-bold uppercase">Manheim Auto Auctions</h4>
                  <p className="text-xs text-gray-500">Used Car Exchange</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">Model</p>
                  <p className="text-sm text-white">Closed exchange. Only licensed dealers/brokers. Every vehicle inspected, graded, certified.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Barrier</p>
                  <p className="text-sm text-white">Licensing + dealer verification. Can't just walk in with cash. Protects both buyer and seller.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Result</p>
                  <p className="text-sm text-red-400">$1.2B+ annual transactions. Industry standard. Fraud risk: near-zero.</p>
                </div>
              </div>
            </div>

            {/* ICE Energy Exchange */}
            <div className="border border-gray-800 bg-[#0f1225] p-8 hover:border-[#F8C617] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-sm flex items-center justify-center text-white font-bold text-xs">ICE</div>
                <div>
                  <h4 className="text-white font-bold uppercase">Intercontinental Exchange (Energy)</h4>
                  <p className="text-xs text-gray-500">Commodity Trading</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">Model</p>
                  <p className="text-sm text-white">Verified traders only. Real-time settlement. Physical + financial proof required.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Barrier</p>
                  <p className="text-sm text-white">Strict credit requirements, collateral, insurance. Can't trade oil on a hunch.</p>
                </div>
                <div className="h-px bg-gray-800"></div>
                <div>
                  <p className="text-xs text-gray-400 font-mono uppercase mb-1">The Result</p>
                  <p className="text-sm text-orange-400">$100B+ daily trading. Price discovery + trust. Zero counterparty fraud.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Pattern */}
          <div className="mt-16 bg-[#0A0D1E] border border-[#F8C617] p-8 rounded-sm">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <IconVerified className="w-6 h-6 text-[#F8C617]" />
              The Pattern
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase mb-2">1. Gated Access</p>
                <p className="text-sm text-gray-300">Not everyone gets in. Standards matter. Quality over quantity.</p>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase mb-2">2. Verification</p>
                <p className="text-sm text-gray-300">Continuous proof of identity/solvency. Today, not yesterday.</p>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase mb-2">3. Real-Time Settlement</p>
                <p className="text-sm text-gray-300">Instant clearing. Financial link guarantees performance.</p>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase mb-2">4. Trust → Scale</p>
                <p className="text-sm text-gray-300">Safety paradoxically enables speed. Safe = scalable.</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 italic">
                <span className="text-[#F8C617] font-bold">TFX applies this pattern to freight:</span> ELD verification = stock audits. Gated carrier network = licensed traders. Financial integration = settlement guarantee. Result? Carriers move loads 1-click, brokers move capital risk-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- War Room (Manifest 2026 Event) --- */}
      <section id="war-room" className="py-24 bg-red-900/10 border-y border-red-900/30 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
              <div className="inline-block border border-red-500 text-red-500 font-mono text-xs px-4 py-1 mb-6 animate-pulse">
                  CLASSIFIED: INVITE ONLY
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
                  The War Game
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-serif italic">
                  Run a live simulation of a strategic theft event. Witness how TFX architecture solves what phone calls cannot.
              </p>
              
              {/* AI FEATURE 2: War Game Generator */}
              <WarGameGenerator />

          </div>
      </section>

      {/* --- Founder's Circle (Pricing/Offer) --- */}
      <section id="reid-circle" className="py-24 bg-[#0A0D1E] relative">
        <div className="container mx-auto px-6">
           <SectionHeader 
            title="Access Protocols" 
            subtitle="Reid's Circle" 
          />
          
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#1a1d2e] to-[#0f1225] border border-[#F8C617] p-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F8C617] text-black text-xs font-bold px-4 py-1">LIMITED CAPACITY</div>
              
              <div className="p-12 text-center">
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#F8C617] to-cyan-400 p-1 shadow-2xl shadow-[#F8C617]/50 overflow-hidden border-2 border-[#F8C617]">
                    <img src="/reid.jpg" alt="Reid" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">Reid's Inner Circle</h3>
                  <p className="text-[#F8C617] font-mono text-sm uppercase tracking-widest mb-6">// Architect of the Verified Economy</p>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                      For the visionaries, operators, and architects who believe the separation is inevitable. Commit your conviction to the movement and shape the future of verified freight.
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-center max-w-2xl mx-auto mb-10 bg-black/40 border border-gray-700 p-8 rounded">
                      <div>
                          <div className="text-4xl font-black text-[#F8C617]">80K</div>
                          <div className="text-sm text-gray-400 uppercase tracking-widest font-mono">Registered Carriers</div>
                      </div>
                      <div>
                          <div className="text-4xl font-black text-cyan-400">40K</div>
                          <div className="text-sm text-gray-400 uppercase tracking-widest font-mono">Active Daily</div>
                      </div>
                      <div>
                          <div className="text-4xl font-black text-[#F8C617]">170</div>
                          <div className="text-sm text-gray-400 uppercase tracking-widest font-mono">Brokers Signed</div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-10">
                      <div className="bg-black/40 p-4 border border-gray-700">
                          <CheckCircle size={20} className="text-[#F8C617] mb-2"/>
                          <div className="text-white font-bold">Zero Fees</div>
                          <div className="text-xs text-gray-500">For first 90 days of activation</div>
                      </div>
                      <div className="bg-black/40 p-4 border border-gray-700">
                          <CheckCircle size={20} className="text-[#F8C617] mb-2"/>
                          <div className="text-white font-bold">Legacy Pricing</div>
                          <div className="text-xs text-gray-500">Locked rate for 3 years</div>
                      </div>
                      <div className="bg-black/40 p-4 border border-gray-700">
                          <CheckCircle size={20} className="text-[#F8C617] mb-2"/>
                          <div className="text-white font-bold">Product Council</div>
                          <div className="text-xs text-gray-500">Direct roadmap influence</div>
                      </div>
                  </div>

                  <div className="flex gap-2 justify-center mb-8 flex-wrap">
                    <IconBadge icon={IconVerified} label="Verified Access" color="yellow" />
                    <IconBadge icon={IconSanctuary} label="Sanctuary" color="cyan" />
                  </div>

                  <button className="bg-[#F8C617] text-black px-12 py-5 font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(248,198,23,0.3)]">
                    Secure Your Seat
                  </button>
              </div>
          </div>

        </div>
      </section>

      {/* --- Footer / CTA --- */}
      <footer className="bg-black py-20 border-t border-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F8C617] via-red-500 to-cyan-500"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter flex items-center justify-center gap-4">
            <IconSanctuary /> JOIN THE <span className="text-[#F8C617]">SANCTUARY</span> <IconSanctuary />
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto font-mono">
            System Status: ONLINE. <br/> The separation has begun. Which side of the wall are you on?
          </p>

          <div className="mt-24 flex flex-col md:flex-row justify-between items-center border-t border-gray-900 pt-8 text-gray-600 font-mono text-xs gap-6">
            <div>
              © 2026 HIGHWAY INC. // ALL SYSTEMS NOMINAL
            </div>
            <div className="text-center text-gray-500 text-xs">
              <div className="mb-2">🎬 A Production by</div>
              <div className="font-bold text-[#F8C617] tracking-wider">DUDE WHAT'S THE BID?! LLC</div>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</a>
              <a href="#" className="hover:text-white transition-colors">TERMS_OF_WAR</a>
              <a href="#" className="hover:text-white transition-colors">STATUS_PAGE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
