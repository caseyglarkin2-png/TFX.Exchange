import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Activity, AlertTriangle, CheckCircle, Terminal, DollarSign, ChevronRight, Menu, X, Crosshair, Hexagon, Zap, Layers, Map, Users, Radio, FileText, Send, Ban, Clapperboard, Sparkles, BarChart3, Palette, ArrowRight, Clock } from 'lucide-react';

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
    <span className={`${color} font-mono font-bold tracking-tighter uppercase`}>{text}</span>
  );
};

const Ticker = () => {
  return (
    <div className="bg-black border-b border-[#F8C617]/30 overflow-hidden whitespace-nowrap py-2 flex relative z-40">
      <div className="animate-marquee inline-block font-mono text-xs text-[#F8C617] font-bold tracking-wider">
        <span className="mx-4">TFX NETWORK: 80K REGISTERED CARRIERS</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">ACTIVE DAILY: 40K UNIQUE CARRIERS</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">BROKERS ON EXCHANGE: 170</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4 text-[#5BA4B5] flex items-center gap-1"><Zap className="w-3 h-3" /> ACTUAL TRANSPARENCY (NOT A BUZZWORD)</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">APPLICATION REQUIRED</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">FRAUD BLOCKED (24H): 1,204</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4 text-red-400 flex items-center gap-1"><Ban className="w-3 h-3" /> NOT EVERYONE GETS IN</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">TFX NETWORK: 80K REGISTERED CARRIERS</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">ACTIVE DAILY: 40K UNIQUE CARRIERS</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4 text-[#5BA4B5] flex items-center gap-1"><Zap className="w-3 h-3" /> REAL MARKETPLACE, REAL TRANSPARENCY</span>
        <span className="mx-4 text-gray-500">|</span>
        <span className="mx-4">BROKERS ON EXCHANGE: 170</span>
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
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-green-500">LIVE</span>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center animate-fadeIn">
            <span className={item.type === 'BLOCK' ? 'text-red-500' : 'text-[#5BA4B5]'}>
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

// --- Floating Particles Background ---
const ParticleField = ({ count = 30 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${8 + Math.random() * 8}s`,
    size: `${2 + Math.random() * 4}px`,
    isCyan: Math.random() > 0.5,
    drift: `${(Math.random() - 0.5) * 100}px`
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle ${p.isCyan ? 'particle-cyan' : 'particle-gold'}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            '--delay': p.delay,
            '--duration': p.duration,
            '--drift': p.drift,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

// --- Animated Background Orbs ---
const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-3xl orb"></div>
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl orb orb-delay-1"></div>
    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-red-500/5 to-transparent rounded-full blur-3xl orb orb-delay-2"></div>
  </div>
);

// --- Animated Grid Background ---
const CyberGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
    <div className="absolute inset-0 cyber-grid"></div>
    <div className="scan-line"></div>
  </div>
);

// --- Hexagon Decorations ---
const HexagonDecor = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <svg className="absolute -top-20 -left-20 w-64 h-64 text-yellow-500/5 hex-pulse" viewBox="0 0 100 100">
      <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
    <svg className="absolute -bottom-20 -right-20 w-48 h-48 text-[#5BA4B5]/5 hex-pulse" style={{animationDelay: '-3s'}} viewBox="0 0 100 100">
      <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
    <svg className="absolute top-1/2 right-10 w-32 h-32 text-yellow-500/3 hex-pulse" style={{animationDelay: '-1s'}} viewBox="0 0 100 100">
      <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
  </div>
);

// --- Data Points Background (exchange-style) ---
const DataPoints = ({ count = 20 }) => {
  const points = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    isGold: Math.random() > 0.7
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {points.map((p) => (
        <div
          key={p.id}
          className={`absolute w-1 h-1 rounded-full ${p.isGold ? 'bg-[#F8C617]' : 'bg-[#5BA4B5]'}`}
          style={{ left: p.left, top: p.top }}
        />
      ))}
    </div>
  );
};

// --- US Map with ELD Pings ---
const USMapWithPings = () => {
  // Major freight hub cities with positions mapped to SVG viewBox (959x593)
  const cities = [
    // West Coast
    { name: 'Seattle', x: 108, y: 60, size: 'lg' },
    { name: 'Portland', x: 95, y: 110, size: 'md' },
    { name: 'San Francisco', x: 65, y: 200, size: 'lg' },
    { name: 'Los Angeles', x: 95, y: 280, size: 'xl' },
    { name: 'San Diego', x: 110, y: 310, size: 'md' },
    { name: 'Phoenix', x: 175, y: 310, size: 'lg' },
    { name: 'Las Vegas', x: 145, y: 245, size: 'md' },
    { name: 'Salt Lake City', x: 180, y: 180, size: 'md' },
    { name: 'Denver', x: 260, y: 220, size: 'lg' },
    // Texas Triangle
    { name: 'El Paso', x: 230, y: 350, size: 'md' },
    { name: 'Dallas', x: 355, y: 380, size: 'xl' },
    { name: 'Houston', x: 390, y: 440, size: 'xl' },
    { name: 'San Antonio', x: 340, y: 430, size: 'lg' },
    { name: 'Austin', x: 345, y: 410, size: 'md' },
    // Midwest
    { name: 'Minneapolis', x: 420, y: 130, size: 'lg' },
    { name: 'Chicago', x: 510, y: 210, size: 'xl' },
    { name: 'Detroit', x: 580, y: 180, size: 'lg' },
    { name: 'Indianapolis', x: 535, y: 265, size: 'md' },
    { name: 'St Louis', x: 475, y: 290, size: 'lg' },
    { name: 'Kansas City', x: 405, y: 270, size: 'lg' },
    { name: 'Omaha', x: 390, y: 215, size: 'md' },
    // Southeast
    { name: 'Atlanta', x: 595, y: 375, size: 'xl' },
    { name: 'Nashville', x: 555, y: 330, size: 'lg' },
    { name: 'Memphis', x: 490, y: 345, size: 'lg' },
    { name: 'Charlotte', x: 660, y: 340, size: 'lg' },
    { name: 'Miami', x: 690, y: 530, size: 'lg' },
    { name: 'Tampa', x: 640, y: 480, size: 'md' },
    { name: 'Jacksonville', x: 650, y: 430, size: 'md' },
    { name: 'New Orleans', x: 480, y: 440, size: 'md' },
    // Northeast
    { name: 'New York', x: 780, y: 175, size: 'xl' },
    { name: 'Philadelphia', x: 765, y: 210, size: 'lg' },
    { name: 'Boston', x: 810, y: 120, size: 'lg' },
    { name: 'Baltimore', x: 740, y: 235, size: 'md' },
    { name: 'Pittsburgh', x: 660, y: 230, size: 'md' },
    { name: 'Columbus', x: 595, y: 255, size: 'md' },
    { name: 'Cleveland', x: 610, y: 210, size: 'md' },
  ];

  // Define major freight lanes
  const lanes = [
    ['Los Angeles', 'Dallas'],
    ['Dallas', 'Chicago'],
    ['Chicago', 'New York'],
    ['Seattle', 'Chicago'],
    ['Dallas', 'Atlanta'],
    ['Atlanta', 'Miami'],
    ['Los Angeles', 'Seattle'],
    ['Chicago', 'New Orleans'],
    ['New York', 'Miami'],
    ['Denver', 'Kansas City'],
    ['Kansas City', 'St Louis'],
    ['St Louis', 'Indianapolis'],
    ['Indianapolis', 'Columbus'],
    ['Columbus', 'New York'],
    ['Phoenix', 'Dallas'],
    ['El Paso', 'Houston']
  ];

  // Random carrier pings (simulating 40K active) - coordinates for SVG viewBox 959x593
  const [pings, setPings] = useState([]);
  
  useEffect(() => {
    // Generate initial pings within continental US bounds
    const generatePings = () => {
      return Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: 60 + Math.random() * 780,  // Stay within US bounds
        y: 40 + Math.random() * 480,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        size: Math.random() > 0.7 ? 4 : 2, // Some larger pings
      }));
    };
    setPings(generatePings());
    
    // Refresh some pings periodically to simulate movement
    const interval = setInterval(() => {
      setPings(prev => {
        const updated = [...prev];
        // Update 15 random pings
        for (let i = 0; i < 15; i++) {
          const idx = Math.floor(Math.random() * updated.length);
          updated[idx] = {
            ...updated[idx],
            x: 60 + Math.random() * 780,
            y: 40 + Math.random() * 480,
          };
        }
        return updated;
      });
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  const sizeMap = { sm: 6, md: 8, lg: 10, xl: 14 };
  const getCityPos = (name) => cities.find(c => c.name === name);

  return (
    <div className="relative w-full h-full bg-[#080a12] rounded overflow-hidden group">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{
             backgroundImage: 'linear-gradient(#1a2a3a 1px, transparent 1px), linear-gradient(90deg, #1a2a3a 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Radar Scan Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 w-[2px] bg-[#5BA4B5] shadow-[0_0_20px_#5BA4B5] opacity-50 animate-[scan_4s_linear_infinite]"></div>
      </div>

      {/* US Map with State Boundaries SVG */}
      <svg viewBox="0 0 959 593" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <g fill="none" stroke="#1a3a4a" strokeWidth="1" opacity="0.6">
          {/* Washington */}
          <path d="M78 42L93 44L108 39L123 40L137 43L138 82L107 82L78 78Z"/>
          {/* Oregon */}
          <path d="M78 78L107 82L138 82L140 130L93 132L60 125L58 95Z"/>
          {/* California */}
          <path d="M60 125L93 132L140 130L145 185L125 250L100 290L75 295L55 260L50 200L52 160Z"/>
          {/* Nevada */}
          <path d="M140 130L145 185L165 240L155 250L145 200L140 130Z"/>
          {/* Idaho */}
          <path d="M138 82L170 85L185 130L175 175L145 175L140 130L138 82Z"/>
          {/* Montana */}
          <path d="M170 85L270 90L275 140L185 130Z"/>
          {/* Wyoming */}
          <path d="M185 130L275 140L280 195L190 190L185 130Z"/>
          {/* Utah */}
          <path d="M145 175L190 190L195 250L155 250L145 175Z"/>
          {/* Colorado */}
          <path d="M190 190L280 195L285 265L200 260L195 250L190 190Z"/>
          {/* Arizona */}
          <path d="M125 250L155 250L195 250L200 260L205 330L140 335L100 290Z"/>
          {/* New Mexico */}
          <path d="M200 260L285 265L290 340L205 330Z"/>
          {/* North Dakota */}
          <path d="M270 90L370 92L372 135L275 140Z"/>
          {/* South Dakota */}
          <path d="M275 140L372 135L375 190L280 195Z"/>
          {/* Nebraska */}
          <path d="M280 195L375 190L380 245L285 265Z"/>
          {/* Kansas */}
          <path d="M285 265L380 245L385 310L290 320Z"/>
          {/* Oklahoma */}
          <path d="M290 320L385 310L390 365L295 375Z"/>
          {/* Texas */}
          <path d="M205 330L290 340L295 375L390 365L400 430L385 485L330 520L270 485L230 430L205 360Z"/>
          {/* Minnesota */}
          <path d="M370 92L460 90L465 170L430 175L375 190L372 135Z"/>
          {/* Iowa */}
          <path d="M375 190L430 175L465 170L475 230L445 245L380 245Z"/>
          {/* Missouri */}
          <path d="M380 245L445 245L475 230L485 295L450 320L385 310Z"/>
          {/* Arkansas */}
          <path d="M385 310L450 320L460 375L395 380L390 365Z"/>
          {/* Louisiana */}
          <path d="M390 365L395 380L460 375L475 440L440 465L410 445L400 430Z"/>
          {/* Wisconsin */}
          <path d="M460 90L530 95L545 175L510 190L465 170Z"/>
          {/* Illinois */}
          <path d="M465 170L510 190L520 275L475 295L475 230Z"/>
          {/* Michigan */}
          <path d="M530 95L575 60L620 100L600 170L560 190L545 175Z"/>
          {/* Indiana */}
          <path d="M510 190L560 190L570 270L520 275Z"/>
          {/* Ohio */}
          <path d="M560 190L600 170L635 195L620 275L570 270Z"/>
          {/* Kentucky */}
          <path d="M520 275L570 270L620 275L625 315L560 330L510 320Z"/>
          {/* Tennessee */}
          <path d="M510 320L560 330L625 315L680 330L675 370L515 365Z"/>
          {/* Mississippi */}
          <path d="M460 375L515 365L520 440L475 440Z"/>
          {/* Alabama */}
          <path d="M515 365L570 365L580 450L520 440Z"/>
          {/* Georgia */}
          <path d="M570 365L635 355L660 440L620 470L580 450Z"/>
          {/* Florida */}
          <path d="M580 450L620 470L660 440L690 480L720 540L680 560L630 520L590 480Z"/>
          {/* South Carolina */}
          <path d="M635 355L690 335L710 385L660 390L635 355Z"/>
          {/* North Carolina */}
          <path d="M625 315L680 330L735 305L760 345L710 385L690 335L635 355Z"/>
          {/* Virginia */}
          <path d="M620 275L680 260L740 270L760 305L735 305L680 330L625 315Z"/>
          {/* West Virginia */}
          <path d="M620 275L660 255L680 260L680 295L660 310L625 315Z"/>
          {/* Pennsylvania */}
          <path d="M635 195L730 175L745 225L680 245L660 255L620 275Z"/>
          {/* New York */}
          <path d="M680 120L755 100L780 140L760 175L730 175L635 195L630 160Z"/>
          {/* Vermont */}
          <path d="M755 100L770 80L780 110L780 140L755 100Z"/>
          {/* New Hampshire */}
          <path d="M770 80L785 65L795 100L780 110Z"/>
          {/* Maine */}
          <path d="M785 65L820 25L850 60L820 110L795 100Z"/>
          {/* Massachusetts */}
          <path d="M780 110L820 110L835 130L795 145L780 140Z"/>
          {/* Rhode Island */}
          <path d="M820 130L835 130L835 145L820 145Z"/>
          {/* Connecticut */}
          <path d="M795 145L820 145L830 165L795 175Z"/>
          {/* New Jersey */}
          <path d="M760 175L780 180L790 220L765 235L745 225Z"/>
          {/* Delaware */}
          <path d="M765 235L790 220L795 250L770 260Z"/>
          {/* Maryland */}
          <path d="M680 245L745 225L765 235L770 260L740 270Z"/>
        </g>
        {/* Glow effect for activity */}
        <defs>
          <radialGradient id="pingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5BA4B5" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#5BA4B5" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F8C617" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#F8C617" stopOpacity="0"/>
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Lanes */}
        {lanes.map(([start, end], i) => {
          const s = getCityPos(start);
          const e = getCityPos(end);
          if (!s || !e) return null;
          return (
            <g key={`${start}-${end}`}>
              {/* Lane Line */}
              <path
                d={`M${s.x},${s.y} L${e.x},${e.y}`}
                stroke="#5BA4B5"
                strokeWidth="0.5"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
              />
              {/* Moving Particle on Lane */}
              <circle r="1.5" fill="#fff">
                <animateMotion
                  dur={`${3 + i % 4}s`}
                  repeatCount="indefinite"
                  path={`M${s.x},${s.y} L${e.x},${e.y}`}
                />
              </circle>
            </g>
          );
        })}
        
        {/* Major freight hubs as SVG circles */}
        {cities.map((city) => (
          <g key={city.name}>
            <circle
              cx={city.x}
              cy={city.y}
              r={sizeMap[city.size]}
              fill="#F8C617"
              opacity="0.15"
            />
            <circle
              cx={city.x}
              cy={city.y}
              r={sizeMap[city.size] / 2}
              fill="#F8C617"
              opacity="0.4"
            />
          </g>
        ))}
        
        {/* Active carrier pings as SVG circles with animation */}
        {pings.map((ping) => (
          <g key={ping.id}>
            <circle
              cx={ping.x}
              cy={ping.y}
              r={ping.size + 4}
              fill="url(#pingGlow)"
              opacity="0.3"
              style={{
                animation: `pulse ${ping.duration}s ease-in-out infinite`,
                animationDelay: `${ping.delay}s`,
                transformOrigin: `${ping.x}px ${ping.y}px`
              }}
            />
            <circle
              cx={ping.x}
              cy={ping.y}
              r={ping.size}
              fill="#5BA4B5"
              opacity="0.9"
              style={{
                animation: `pulse ${ping.duration}s ease-in-out infinite`,
                animationDelay: `${ping.delay}s`
              }}
            />
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex items-center gap-4 text-[10px] font-mono text-gray-500 bg-[#080a12]/80 px-2 py-1 rounded border border-gray-800/50">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#F8C617] opacity-50" />
          <span>Freight Hub</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#5BA4B5]" />
          <span>ELD Verified Carrier</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-[1px] bg-[#5BA4B5] opacity-50 border-t border-dashed border-[#5BA4B5]" />
          <span>Active Lane</span>
        </div>
      </div>
      
      {/* Stats overlay */}
      <div className="absolute top-2 right-2 text-right bg-[#080a12]/80 px-2 py-1 rounded border border-gray-800/50">
        <div className="text-[10px] font-mono text-gray-500">LIVE ELD FEED</div>
        <div className="text-sm font-bold text-[#5BA4B5]">40K <span className="text-xs text-gray-500">Active</span></div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, subtext, trend }) => (
  <div className="bg-[#0f1225] border border-gray-800 p-6 relative overflow-hidden group hover:border-[#F8C617] transition-colors duration-300">
    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
      <Activity size={24} className="text-[#F8C617]" />
    </div>
    <div className="text-gray-400 font-mono text-xs uppercase mb-2">{label}</div>
    <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{value}</div>
    <div className={`text-xs font-mono flex items-center gap-2 ${trend === 'negative' ? 'text-red-500' : 'text-[#5BA4B5]'}`}>
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
    const [history, setHistory] = useState([]);

    const handleAnalyze = () => {
        if(!input.trim()) return;
        setLoading(true);
        setAnalysis(null);

        // Simulate processing delay
        setTimeout(() => {
            const result = detectThreat(input);
            setAnalysis(result);
            setHistory([{ text: input, result }, ...history.slice(0, 4)]);
            setLoading(false);
        }, 600);
    };

    return (
        <div className="bg-gradient-to-b from-[#05060a] to-[#0f0a15] border border-[#5BA4B5]/30 p-6 rounded shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <div className="absolute top-0 right-0 p-2 text-xs font-mono text-[#5BA4B5]">
                [ACTIVE]
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Crosshair size={20} className="text-[#5BA4B5]" />
                THREAT SENTINEL
            </h3>
            <p className="text-xs text-gray-500 font-mono mb-4">Real-time fraud pattern detection. Analyze carrier communications, pricing anomalies, and identity risks.</p>
            
            <div className="mb-4">
                <label className="text-xs text-gray-400 font-mono block mb-2">SCAN_INPUT</label>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste email body, text, or communication for instant threat assessment..."
                    className="w-full bg-[#0f1225] border border-cyan-900/50 text-cyan-300 font-mono text-xs p-3 focus:outline-none focus:border-[#5BA4B5] min-h-[80px] rounded"
                />
            </div>

            <button 
                onClick={handleAnalyze}
                disabled={loading || !input.trim()}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold py-3 font-mono text-sm hover:from-cyan-500 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 mb-4 rounded uppercase disabled:opacity-50"
            >
                {loading ? <Activity size={16} className="animate-spin" /> : <Crosshair size={16} />}
                {loading ? "SCANNING..." : "RUN THREAT SCAN"} 
            </button>

            {analysis && (
                <div className={`border p-4 rounded mb-4 animate-fadeIn ${analysis.threatLevel === 'CRITICAL' ? 'border-red-500/50 bg-red-900/20' : analysis.threatLevel === 'MEDIUM' ? 'border-yellow-500/50 bg-yellow-900/20' : 'border-[#5BA4B5]/50 bg-cyan-900/20'}`}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <span className="font-mono text-xs text-gray-400">THREAT_LEVEL</span>
                            <span className={`block text-lg font-bold font-mono mt-1 ${analysis.threatLevel === 'CRITICAL' ? 'text-red-400' : analysis.threatLevel === 'MEDIUM' ? 'text-yellow-400' : 'text-[#5BA4B5]'}`}>
                                {analysis.threatLevel}
                            </span>
                        </div>
                        <div>
                            <span className="font-mono text-xs text-gray-400">STATUS</span>
                            <span className="block text-lg font-bold font-mono text-white mt-1">{analysis.status}</span>
                        </div>
                    </div>
                    <div className="mb-4 pb-4 border-b border-gray-700/50">
                        <span className="font-mono text-xs text-gray-400 block mb-2">ANOMALIES_DETECTED</span>
                        <ul className="space-y-1">
                            {analysis.flags.map((flag, i) => (
                                <li key={i} className="text-xs font-mono text-gray-300 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#5BA4B5]"></div>
                                    {flag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                         <span className="font-mono text-xs text-gray-400 block mb-1">RECOMMENDED_ACTION</span>
                         <span className="block text-white text-sm font-mono">{analysis.directive}</span>
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                    <span className="font-mono text-xs text-gray-500 block mb-2">SCAN_HISTORY ({history.length})</span>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {history.map((item, i) => (
                            <div key={i} className="text-xs bg-black/40 p-2 border border-gray-800 rounded">
                                <div className="text-gray-400 truncate mb-1">{item.text.substring(0, 50)}...</div>
                                <div className={`font-mono text-xs ${item.result.threatLevel === 'CRITICAL' ? 'text-red-400' : item.result.threatLevel === 'MEDIUM' ? 'text-yellow-400' : 'text-[#5BA4B5]'}`}>
                                    {item.result.threatLevel}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const WarGameGenerator = () => {
    const [scenario, setScenario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [difficulty, setDifficulty] = useState('medium');
    const [attempts, setAttempts] = useState(0);
    const [userDecision, setUserDecision] = useState(null);

    const handleGenerateScenario = () => {
        setLoading(true);
        setScenario(null);
        setUserDecision(null);
        
        // Simulate processing delay
        setTimeout(() => {
            const result = generateScenario();
            setScenario(result);
            setAttempts(attempts + 1);
            setLoading(false);
        }, 500);
    };

    const handleDecision = (decision) => {
        setUserDecision(decision);
        setTimeout(() => {
            setScenario(null);
            setUserDecision(null);
        }, 2500);
    };

    return (
        <div className="bg-gradient-to-b from-[#15000a] to-[#0a0505] border border-red-600/40 p-6 rounded shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                        <Zap size={20} className="text-red-500" />
                        WAR GAME SIMULATION
                    </h3>
                    <p className="text-xs text-gray-500 font-mono">Strategic theft scenarios. Real-world decision points. Zero room for error.</p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono">RUNS</div>
                    <div className="text-2xl font-bold text-red-500 font-mono">{attempts}</div>
                </div>
            </div>

            {!scenario && (
                <div className="mb-4 p-4 bg-red-900/10 border border-red-900/50 rounded">
                    <label className="text-xs text-gray-400 font-mono block mb-2">DIFFICULTY_LEVEL</label>
                    <div className="flex gap-2">
                        {['easy', 'medium', 'hard'].map(level => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-3 py-1 font-mono text-xs rounded uppercase transition-all ${
                                    difficulty === level 
                                    ? 'bg-red-600 text-white border border-red-500' 
                                    : 'bg-black/50 text-gray-400 border border-red-900/30 hover:border-red-600'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="min-h-[200px] flex flex-col items-center justify-center text-center mb-6 relative">
                {loading ? (
                    <div className="text-red-500 font-mono text-sm">
                        <div className="mb-2">Loading scenario...</div>
                        <div className="text-xs text-gray-500">Please wait</div>
                    </div>
                ) : scenario ? (
                    <div className="w-full animate-fadeIn">
                        <div className="text-white font-mono text-base leading-relaxed mb-6 bg-red-900/20 border border-red-900/50 p-4 rounded">
                            "{scenario}"
                        </div>
                        {userDecision ? (
                            <div className={`text-white font-mono text-lg font-bold px-4 py-2 rounded ${
                                userDecision === 'block' 
                                ? 'bg-green-900/40 border border-green-600 text-green-400' 
                                : 'bg-red-900/40 border border-red-600 text-red-400'
                            }`}>
                                {userDecision === 'block' ? (
                                    <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> THREAT BLOCKED</span>
                                ) : (
                                    <span className="flex items-center gap-2"><X className="w-5 h-5" /> LOAD COMPROMISED</span>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => handleDecision('block')}
                                    className="px-6 py-3 bg-green-600 text-white font-bold rounded uppercase text-sm hover:bg-green-700 transition-colors"
                                >
                                    Block Load
                                </button>
                                <button
                                    onClick={() => handleDecision('proceed')}
                                    className="px-6 py-3 bg-yellow-600 text-white font-bold rounded uppercase text-sm hover:bg-yellow-700 transition-colors"
                                >
                                    Proceed
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-500 font-mono text-sm">
                        Press button below to activate simulation
                    </p>
                )}
            </div>

            <button 
                onClick={handleGenerateScenario}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 hover:from-red-500 hover:to-red-600 transition-all uppercase tracking-widest flex items-center justify-center gap-2 rounded font-mono disabled:opacity-50"
            >
                {loading ? <Activity className="animate-spin" size={18} /> : <Zap size={18} />}
                {loading ? "Generating..." : "ACTIVATE WAR GAME"}
            </button>

            <div className="mt-4 text-xs text-gray-500 font-mono text-center">
                [SYSTEM_MESSAGE: Success rate on TFX = 100%. On open boards = unpredictable.]
            </div>
        </div>
    );
};

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

const IconSanctuary = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L4 8V14C4 21.5 9.1 28.4 16 30C22.9 28.4 28 21.5 28 14V8L16 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14L15 17L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Benefit Icons (Evolved TFX Design) ---
const BenefitCarrierUtil = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" fill="#2a2a3e" stroke="#F8C617" strokeWidth="2"/>
    <path d="M28 35 L32 28 L36 35 L40 28 L44 35 L48 28 L52 35" stroke="#F8C617" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28 50 Q40 55 52 50" stroke="#F8C617" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="40" cy="42" r="3" fill="#F8C617"/>
    <path d="M32 60 L48 60" stroke="#5BA4B5" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BenefitReduceRisk = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" fill="#2a2a3e" stroke="#F8C617" strokeWidth="2"/>
    <path d="M40 20 L28 28 L28 42 Q28 55 40 62 Q52 55 52 42 L52 28 Z" stroke="#F8C617" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
    <path d="M36 42 L38 46 L44 38" stroke="#5BA4B5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BenefitProductivity = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" fill="#2a2a3e" stroke="#F8C617" strokeWidth="2"/>
    <rect x="28" y="48" width="5" height="14" fill="#F8C617" rx="1"/>
    <rect x="36" y="40" width="5" height="22" fill="#F8C617" rx="1"/>
    <rect x="44" y="32" width="5" height="30" fill="#F8C617" rx="1"/>
    <path d="M28 48 L36 40 L44 32 L52 24" stroke="#5BA4B5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <circle cx="52" cy="24" r="2.5" fill="#5BA4B5"/>
  </svg>
);

const BenefitMargins = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="35" fill="#2a2a3e" stroke="#F8C617" strokeWidth="2"/>
    <g transform="translate(25, 28)">
      <rect x="0" y="8" width="8" height="16" fill="#F8C617" rx="1"/>
      <rect x="12" y="4" width="8" height="20" fill="#F8C617" rx="1"/>
      <rect x="24" y="0" width="8" height="24" fill="#F8C617" rx="1"/>
    </g>
    <path d="M30 30 Q40 35 50 28" stroke="#5BA4B5" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M32 50 L48 50 M40 48 L40 52" stroke="#5BA4B5" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// --- Icon Badge Component ---
const IconBadge = ({ icon: Icon, label, color = "cyan" }) => {
  const colorMap = {
    cyan: 'text-[#5BA4B5] border-[#5BA4B5]',
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
        <a href="#" title="Presented by Dude What's The Bid?! LLC" className="flex items-center gap-1"><Clapperboard className="w-3 h-3" /> DWBTB</a>
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
              <a href="#the-separation" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <IconAnarchy className="w-3 h-3" /> The Separation
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
              <a href="#architecture" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <IconVerified className="w-3 h-3" /> Architecture
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
              <a href="#benefits" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Benefits
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
              <a href="#case-studies" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <BarChart3 className="w-3 h-3" /> Case Studies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
              <a href="#branding" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <Palette className="w-3 h-3" /> Branding
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
              <a href="#the-anarchy" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <IconThreat className="w-3 h-3" /> The Problem
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
              <a href="#tools" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <Zap className="w-3 h-3" /> Tools
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
              <a href="#reid-circle" className="hover:text-[#F8C617] transition-all relative group flex items-center gap-1">
                <IconSanctuary className="w-3 h-3" /> Reid's Circle
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8C617] transition-all group-hover:w-full"></span>
              </a>
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
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
            <a href="#case-studies" onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
            <a href="#branding" onClick={() => setMobileMenuOpen(false)}>Branding</a>
            <a href="#the-anarchy" onClick={() => setMobileMenuOpen(false)}>The Problem</a>
            <a href="#tools" onClick={() => setMobileMenuOpen(false)}>Tools</a>
            <a href="#reid-circle" onClick={() => setMobileMenuOpen(false)}>Reid's Circle</a>
            <button className="bg-[#F8C617] text-black px-6 py-3 font-bold mt-4">
              Apply for Access
            </button>
          </div>
        </div>
      )}

      {/* --- Hero Section: The Exchange Floor --- */}
      <header className="relative min-h-screen flex items-center grid-bg pt-32 pb-12 overflow-hidden aurora-bg" id="the-separation">
        {/* Subtle Background Effects */}
        <DataPoints count={30} />
        <BackgroundOrbs />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12">
              
              {/* Left Column: Text */}
              <div className="lg:w-1/2 text-left pt-10">
                <div className="inline-flex items-center gap-2 border border-red-900/50 bg-red-900/10 px-4 py-1 rounded-full mb-8 backdrop-blur-sm" style={{borderColor: 'rgba(255,68,68,0.3)'}}>
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-red-400 font-mono text-xs uppercase tracking-widest">
                      <IconAnarchy /> PUBLIC SQUARE: COMPROMISED
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-6">
                    <span className="gradient-text-flow">THE GREAT</span> <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 hover:from-[#F8C617] hover:via-[#F8C617] hover:to-[#D4A017] transition-all duration-1000">SEPARATION</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-10 font-mono leading-relaxed border-l-4 border-[#F8C617] pl-6">
                    The open market is dead. The "Anarchy" has won. <br/>
                    <span className="text-white font-bold">TFX is the only Sanctuary left.</span>
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    <button className="bg-[#F8C617] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 group">
                        Apply for Access <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="border border-gray-700 text-gray-300 px-8 py-4 font-mono uppercase tracking-widest hover:border-[#5BA4B5] hover:text-[#5BA4B5] transition-all electric-border highlight-glow">
                    View Requirements
                    </button>
                </div>
                <p className="text-xs text-gray-600 font-mono mt-4 italic">* Membership by application only. Not everyone gets in.</p>
              </div>

              {/* Right Column: Expanded Live Feed (Command Center) */}
              <div className="lg:w-1/2 w-full">
                  <div className="relative w-full bg-[#05060a]/90 border border-gray-800 p-6 rounded-sm shadow-2xl glass tilt-card">
                      
                      {/* Glow effect behind card */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-transparent to-yellow-500/20 rounded-sm blur-xl -z-10"></div>
                      
                      {/* Dashboard Header */}
                      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <Activity className="text-[#5BA4B5]" />
                            <span className="text-white font-bold uppercase tracking-widest">Network Topography</span>
                        </div>
                        <div className="text-xs font-mono text-gray-500">
                            UPDATED: {new Date().toLocaleTimeString()}
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-[#0f1225] p-4 border border-gray-800">
                              <div className="text-xs text-gray-500 font-mono uppercase">Registered Carriers</div>
                              <div className="text-2xl font-bold text-[#F8C617]">80K</div>
                              <div className="text-xs text-gray-600 mt-1">Total network</div>
                          </div>
                          <div className="bg-[#0f1225] p-4 border border-gray-800">
                              <div className="text-xs text-gray-500 font-mono uppercase">Active Daily</div>
                              <div className="text-2xl font-bold text-[#5BA4B5]">40K</div>
                              <div className="text-xs text-gray-600 mt-1">Unique moving freight</div>
                          </div>
                          <div className="bg-[#0f1225] p-4 border border-gray-800">
                              <div className="text-xs text-gray-500 font-mono uppercase">Brokers</div>
                              <div className="text-2xl font-bold text-[#F8C617]">170</div>
                              <div className="text-xs text-gray-600 mt-1">On the exchange</div>
                          </div>
                      </div>

                      {/* Live Feed Component */}
                      <LiveFeed />

                      {/* US Map with ELD Pings */}
                      <div className="mt-6 h-64 w-full border border-gray-800 relative overflow-hidden rounded">
                        <USMapWithPings />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </header>

      {/* --- The Architecture: Load Board vs Exchange --- */}
      <section id="architecture" className="py-24 bg-[#0A0D1E] relative border-t border-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 circuit-pattern opacity-30"></div>
        <BackgroundOrbs />
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            title="Market Structure" 
            subtitle="Load Board vs Exchange" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Load Board */}
            <div className="relative hover-lift">
              <div className="border border-red-900/50 bg-red-900/5 p-8 rounded-sm glass spotlight">
                <div className="flex items-center gap-3 mb-6">
                  <IconAnarchy className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-red-500 uppercase neon-text-gold" style={{textShadow: '0 0 10px rgba(255,68,68,0.5)'}}>Load Board</h3>
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
            <div className="relative hover-lift">
              <div className="border border-cyan-900/50 bg-cyan-900/5 p-8 rounded-sm glass electric-border spotlight">
                <div className="flex items-center gap-3 mb-6">
                  <IconSanctuary className="w-8 h-8 text-[#5BA4B5]" />
                  <h3 className="text-2xl font-bold text-[#5BA4B5] uppercase neon-text-cyan">Exchange</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-[#5BA4B5] rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Quality First</div>
                      <div className="text-sm text-gray-400">Gated access. Strategic friction filters out bad actors before they enter.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-[#5BA4B5] rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Real-Time Verification</div>
                      <div className="text-sm text-gray-400">Continuous ELD-linked identity proof. "Verified" = verified RIGHT NOW, not yesterday.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-[#5BA4B5] rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Physical Reality</div>
                      <div className="text-sm text-gray-400">Truck's location is proven via ELD. Digital claim = physical fact. The machine verifies the person.</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 h-1 bg-[#5BA4B5] rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-bold text-white">Safety Enables Speed</div>
                      <div className="text-sm text-gray-400">Zero Trust architecture. One-click booking without fear. Identity certainty = operational velocity.</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 p-4 border border-cyan-900/30 rounded-sm">
                  <p className="text-[#5BA4B5] font-mono text-xs uppercase mb-2">Result:</p>
                  <p className="text-white text-sm">80K registered carriers. 40K active daily. 170 brokers on network. Zero fraudulent transactions. Brokers operate with confidence, not paranoia.</p>
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
                  <th className="text-left px-6 py-4 font-mono text-xs uppercase text-[#5BA4B5]">Exchange</th>
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
                  <td className="px-6 py-4 text-sm text-cyan-300">80K+ registered | 40K+ active | 170 brokers. Every load is clean.</td>
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

      {/* --- Benefits Section --- */}
      <section id="benefits" className="py-24 bg-[#0A0D1E] relative border-t border-gray-900 overflow-hidden">
        {/* Subtle Background */}
        <DataPoints count={15} />
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            title="Why Choose TFX" 
            subtitle="Real Benefits for Real Operators" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1: Carrier Utilization */}
            <div className="bg-gradient-to-br from-[#1a1d2e] to-[#0f1225] border border-gray-800 hover:border-[#F8C617] transition-all p-8 rounded-lg group hover-lift">
              <div className="flex justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
                <BenefitCarrierUtil size={80} />
              </div>
              <h3 className="text-2xl font-bold text-[#F8C617] text-center mb-3">Increase Carrier Utilization</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">See only loads you're cleared to haul. Pre-vetted = faster tenders. Higher close rate on qualified lanes.</p>
            </div>

            {/* Benefit 2: Reduce Risk */}
            <div className="bg-gradient-to-br from-[#1a1d2e] to-[#0f1225] border border-gray-800 hover:border-[#5BA4B5] transition-all p-8 rounded-lg group hover-lift">
              <div className="flex justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
                <BenefitReduceRisk size={80} />
              </div>
              <h3 className="text-2xl font-bold text-[#5BA4B5] text-center mb-3">Reduce Risk</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">Verifies identity, insurance, and compliance upfront. No surprises mid-route. Brokers don't call you on hold.</p>
            </div>

            {/* Benefit 3: Boost Productivity */}
            <div className="bg-gradient-to-br from-[#1a1d2e] to-[#0f1225] border border-gray-800 hover:border-[#F8C617] transition-all p-8 rounded-lg group hover-lift">
              <div className="flex justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
                <BenefitProductivity size={80} />
              </div>
              <h3 className="text-2xl font-bold text-[#F8C617] text-center mb-3">Boost Rep Productivity</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">Less manual vetting. More first-tender success. Reps spend time closing deals, not chasing verification.</p>
            </div>

            {/* Benefit 4: Protect Margins */}
            <div className="bg-gradient-to-br from-[#1a1d2e] to-[#0f1225] border border-gray-800 hover:border-[#5BA4B5] transition-all p-8 rounded-lg group hover-lift">
              <div className="flex justify-center mb-6 transform group-hover:scale-105 transition-all duration-300">
                <BenefitMargins size={80} />
              </div>
              <h3 className="text-2xl font-bold text-[#5BA4B5] text-center mb-3">Protect Margins</h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">Keep loads moving with fewer bounces and cleaner execution. Quality network = predictable outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Case Studies: Exchanges in Other Industries --- */}
      <section id="case-studies" className="py-24 bg-[#05060a] relative border-t border-gray-900 overflow-hidden">
        {/* Background Effects */}
        <DataPoints count={25} />
        <div className="absolute inset-0 hex-pattern opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            title="Proven Model" 
            subtitle="Exchanges Work. Here's Why." 
          />

          <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16 text-lg">
            The exchange model isn't new. It's been battle-tested across industries for centuries. Gated access + verified participants = liquidity with safety. The freight market is overdue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NYSE */}
            <div className="border border-gray-800 bg-[#0f1225]/80 p-8 hover:border-[#F8C617] transition-all hover-lift glass spotlight">
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
          <div className="mt-16 bg-[#0A0D1E] border border-[#F8C617] p-8 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <IconSanctuary size={120} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <IconVerified className="w-6 h-6 text-[#F8C617]" />
              The Pattern
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              <div className="p-4 bg-black/30 border border-gray-800 hover:border-[#F8C617] transition-colors">
                <p className="text-xs font-mono text-[#F8C617] uppercase mb-2">1. Gated Access</p>
                <p className="text-sm text-gray-300">Not everyone gets in. Standards matter. Quality over quantity.</p>
              </div>
              <div className="p-4 bg-black/30 border border-gray-800 hover:border-[#F8C617] transition-colors">
                <p className="text-xs font-mono text-[#F8C617] uppercase mb-2">2. Verification</p>
                <p className="text-sm text-gray-300">Continuous proof of identity/solvency. Today, not yesterday.</p>
              </div>
              <div className="p-4 bg-black/30 border border-gray-800 hover:border-[#F8C617] transition-colors">
                <p className="text-xs font-mono text-[#F8C617] uppercase mb-2">3. Real-Time Settlement</p>
                <p className="text-sm text-gray-300">Instant clearing. Financial link guarantees performance.</p>
              </div>
              <div className="p-4 bg-black/30 border border-gray-800 hover:border-[#F8C617] transition-colors">
                <p className="text-xs font-mono text-[#F8C617] uppercase mb-2 flex items-center gap-1">4. Trust <ArrowRight className="w-3 h-3" /> Scale</p>
                <p className="text-sm text-gray-300">Safety paradoxically enables speed. Safe = scalable.</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 relative z-10">
              <p className="text-gray-400 italic">
                <span className="text-[#F8C617] font-bold">TFX applies this pattern to freight:</span> ELD verification = stock audits. Gated carrier network = licensed traders. Financial integration = settlement guarantee. Result? Carriers move loads 1-click, brokers move capital risk-free.
              </p>
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

            {/* Visual: Market Data Display */}
            <div className="relative bg-[#0a0a0a] border border-red-900/30 p-6">
              <div className="text-xs font-mono text-red-500 mb-4 uppercase tracking-widest">// Threat Index - Live</div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Identity Spoofing</span>
                  <span className="text-red-500 font-mono">+847% YoY</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Double Brokering</span>
                  <span className="text-red-500 font-mono">+312% YoY</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-gray-400">Strategic Theft</span>
                  <span className="text-red-500 font-mono">+200% YoY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cargo Loss (Q3)</span>
                  <span className="text-red-500 font-mono">$223M</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-800 text-center">
                <span className="text-xs text-gray-600 font-mono">Source: Highway Threat Index 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOOLS SUITE --- */}
      <section id="tools" className="py-24 bg-gradient-to-b from-[#0A0D1E] to-[#05060a] border-y border-gray-800 relative overflow-hidden">
          {/* Subtle Background */}
          <DataPoints count={20} />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#5BA4B5] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F8C617] rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
              <SectionHeader 
                title="Operator Toolkit" 
                subtitle="Threat Sentinel & War Games" 
              />
              
              <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto font-mono text-sm">
                Two battle-tested tools for operational resilience. Analyze real communications for fraud patterns. Run strategic theft simulations. Master the decision protocol that separates sanctuaries from open markets.
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Tool 1: Threat Sentinel */}
                <div className="hover-lift">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#5BA4B5] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Crosshair size={18} />
                      Threat Sentinel
                    </h3>
                    <p className="text-xs text-gray-500">Real-time fraud pattern detection. Analyze communications instantly. Build pattern recognition muscle.</p>
                  </div>
                  <SentinelTerminal />
                </div>

                {/* Tool 2: War Game */}
                <div className="hover-lift">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Zap size={18} />
                      War Game Simulator
                    </h3>
                    <p className="text-xs text-gray-500">Strategic theft scenarios. Real decision points. Test your protocol against live threats.</p>
                  </div>
                  <WarGameGenerator />
                </div>
              </div>

              <div className="mt-16 bg-black/50 border border-gray-800 p-8 rounded-lg max-w-3xl mx-auto glass spotlight hover-lift">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-[#F8C617]" />
                  Why These Tools Matter
                </h4>
                <ul className="space-y-3 text-sm text-gray-400 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5BA4B5] mt-1"><ArrowRight className="w-3 h-3" /></span>
                    <span><strong className="text-white">On Load Boards:</strong> Zero training. Carriers learn by taking losses. Brokers operate on hope.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5BA4B5] mt-1"><ArrowRight className="w-3 h-3" /></span>
                    <span><strong className="text-white">On TFX:</strong> Train before you tender. Every carrier learns the threat patterns. Every broker knows the protocol. Threats drop 87%.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5BA4B5] mt-1"><ArrowRight className="w-3 h-3" /></span>
                    <span><strong className="text-white">The Pattern:</strong> Identity Certainty + Training Tools + Real-Time Verification = Operational Confidence. This is the exchange model.</span>
                  </li>
                </ul>
              </div>
          </div>
      </section>

      {/* --- Founder's Circle (Pricing/Offer) --- */}
      <section id="reid-circle" className="py-24 bg-[#0A0D1E] relative overflow-hidden">
        {/* Subtle Background */}
        <DataPoints count={15} />
        
        <div className="container mx-auto px-6 relative z-10">
           <SectionHeader 
            title="Access Protocols" 
            subtitle="Reid's Circle" 
          />
          
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#1a1d2e] to-[#0f1225] border border-[#F8C617] p-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F8C617] text-black text-xs font-bold px-4 py-1">APPLICATION REQUIRED</div>
              <div className="absolute top-0 left-0 bg-red-900/80 text-red-200 text-xs font-mono px-4 py-1">87% REJECTION RATE</div>
              
              <div className="p-12 text-center relative">
                  <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#F8C617] shadow-2xl shadow-[#F8C617]/30">
                    <img src="/reid-avatar.svg" alt="Reid Clements" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">Reid's Inner Circle</h3>
                  <p className="text-[#F8C617] font-mono text-sm uppercase tracking-widest mb-2">Reid Clements</p>
                  <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-6">// Architect of the Verified Economy</p>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                      For the visionaries, operators, and architects who believe the separation is inevitable. <br/>
                      <span className="text-gray-500 text-sm italic">We know "transparency" is every freighttech deck's buzzword. Here it's just... how we operate.</span>
                  </p>

                  <div className="grid grid-cols-3 gap-4 text-center max-w-2xl mx-auto mb-10 bg-black/40 border border-gray-700 p-8 rounded">
                      <div className="p-2">
                          <div className="text-4xl font-black text-[#F8C617]">80K</div>
                          <div className="text-sm text-gray-400 uppercase tracking-widest font-mono">Registered Carriers</div>
                      </div>
                      <div className="p-2">
                          <div className="text-4xl font-black text-[#5BA4B5]">40K</div>
                          <div className="text-sm text-gray-400 uppercase tracking-widest font-mono">Active Daily</div>
                      </div>
                      <div className="p-2">
                          <div className="text-4xl font-black text-[#F8C617]">170</div>
                          <div className="text-sm text-gray-400 uppercase tracking-widest font-mono">Brokers on Exchange</div>
                      </div>
                  </div>

                  <div className="flex gap-2 justify-center mb-8 flex-wrap">
                    <IconBadge icon={IconVerified} label="Verified Access" color="yellow" />
                    <IconBadge icon={IconSanctuary} label="Sanctuary" color="cyan" />
                  </div>

                  <button className="bg-[#F8C617] text-black px-12 py-5 font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform">
                    Submit Application
                  </button>
                  <p className="text-xs text-gray-500 font-mono mt-4 flex items-center justify-center gap-1"><Clock className="w-3 h-3" /> Average review time: 48 hours. <span className="text-gray-600">We actually check.</span></p>
              </div>
          </div>

        </div>
      </section>

      {/* --- Footer / CTA --- */}
      <footer className="bg-black py-20 border-t border-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-animate"></div>
        <DataPoints count={20} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter flex items-center justify-center gap-4">
            <IconSanctuary /> REQUEST <span className="text-[#F8C617]">ADMISSION</span> <IconSanctuary />
          </h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto font-mono">
            System Status: <span className="text-green-400">ONLINE</span>. <br/> 
            A marketplace with actual transparency. <span className="text-gray-600 italic">Yes, we know everyone says that.</span><br/>
            The difference? <span className="text-[#F8C617]">We mean it.</span>
          </p>

          <div className="mt-24 flex flex-col md:flex-row justify-between items-center border-t border-gray-900 pt-8 text-gray-600 font-mono text-xs gap-6">
            <div>
              © 2026 HIGHWAY INC. // ALL SYSTEMS NOMINAL
            </div>
            <div className="text-center text-gray-500 text-xs">
              <div className="mb-2 flex items-center justify-center gap-2"><Clapperboard className="w-4 h-4" /> A Production by</div>
              <div className="font-bold tracking-wider dwtb-brand text-lg">DUDE WHAT'S THE BID?! LLC</div>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#F8C617] transition-colors highlight-glow">PRIVACY_PROTOCOL</a>
              <a href="#" className="hover:text-[#F8C617] transition-colors highlight-glow">TERMS_OF_WAR</a>
              <a href="#" className="hover:text-[#F8C617] transition-colors highlight-glow">STATUS_PAGE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
