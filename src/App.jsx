import React, { useState, useEffect } from 'react';
import { Shield, Activity, CheckCircle, ChevronRight, Menu, X, ArrowRight, TrendingUp, Users, Building2, ShieldCheck, Zap, BarChart3, Globe, Lock } from 'lucide-react';

// --- Animated Counter Component ---
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
};

// --- Live Activity Feed ---
const LiveActivityFeed = () => {
  const lanes = ['CHI→ATL', 'DAL→PHX', 'LAX→SEA', 'MIA→NYC', 'DEN→HOU', 'ATL→CHI'];
  const carriers = ['SWIFT', 'WERNER', 'JB HUNT', 'SCHNEIDER', 'LANDSTAR', 'XPO'];
  
  const generateTrade = () => {
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    const carrier = carriers[Math.floor(Math.random() * carriers.length)];
    const rate = 1800 + Math.floor(Math.random() * 1200);
    const rand = Math.random();
    
    if (rand < 0.6) {
      return { type: 'MATCHED', lane, carrier, rate, color: 'text-emerald-400' };
    } else {
      return { type: 'VERIFIED', lane, carrier: carrier, rate: null, color: 'text-blue-400' };
    }
  };

  const [items, setItems] = useState([
    { id: 1, ...generateTrade(), time: '10:42:01' },
    { id: 2, ...generateTrade(), time: '10:42:03' },
    { id: 3, ...generateTrade(), time: '10:42:05' },
    { id: 4, ...generateTrade(), time: '10:42:08' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const trade = generateTrade();
      const newItem = {
        id: Date.now(),
        ...trade,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setItems(prev => [newItem, ...prev].slice(0, 5));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-slate-300">Live Exchange Activity</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">REAL-TIME</span>
      </div>
      <div className="divide-y divide-slate-800/30">
        {items.map((item) => (
          <div key={item.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold ${item.color} w-16`}>{item.type}</span>
              <span className="text-sm text-slate-300">{item.lane}</span>
              {item.rate && <span className="text-sm text-slate-400">${item.rate.toLocaleString()}</span>}
            </div>
            <span className="text-xs text-slate-600 font-mono">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Stat Card Component ---
const StatCard = ({ value, label, description }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</div>
    <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">{label}</div>
    {description && <div className="text-xs text-slate-500">{description}</div>}
  </div>
);

// --- Feature Card ---
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-slate-700/50 transition-all duration-300 hover:bg-slate-900/50">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-amber-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

// --- Comparison Card ---
const ComparisonCard = ({ title, subtitle, items, accent }) => (
  <div className={`rounded-2xl p-8 ${accent === 'negative' ? 'bg-slate-900/50 border border-slate-800/50' : 'bg-gradient-to-br from-slate-900 to-slate-900/80 border border-amber-500/20'}`}>
    <div className="mb-6">
      <span className={`text-xs font-semibold uppercase tracking-wider ${accent === 'negative' ? 'text-slate-500' : 'text-amber-400'}`}>{subtitle}</span>
      <h3 className="text-2xl font-bold text-white mt-2">{title}</h3>
    </div>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${accent === 'negative' ? 'bg-slate-800' : 'bg-amber-500/20'}`}>
            {accent === 'negative' ? (
              <X className="w-3 h-3 text-slate-500" />
            ) : (
              <CheckCircle className="w-3 h-3 text-amber-400" />
            )}
          </div>
          <span className={`text-sm leading-relaxed ${accent === 'negative' ? 'text-slate-400' : 'text-slate-300'}`}>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// --- Case Study Card ---
const CaseStudyCard = ({ logo, name, description, metric }) => (
  <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/50 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
        {logo}
      </div>
      <span className="font-semibold text-white">{name}</span>
    </div>
    <p className="text-sm text-slate-400 mb-4">{description}</p>
    <div className="text-xs text-amber-400 font-medium">{metric}</div>
  </div>
);

// --- Main App ---
export default function TFXApp() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 antialiased">
      
      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-slate-900 font-black text-lg">T</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                TFX<span className="text-amber-400">.Exchange</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#platform" className="text-sm text-slate-400 hover:text-white transition-colors">Platform</a>
              <a href="#benefits" className="text-sm text-slate-400 hover:text-white transition-colors">Benefits</a>
              <a href="#proof" className="text-sm text-slate-400 hover:text-white transition-colors">Case Studies</a>
              <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
            </div>
            
            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a href="https://highway.com/products/trusted-freight-exchange#TFX-Demo" target="_blank" rel="noopener noreferrer" 
                 className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25">
                Request Demo
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-xl border-t border-slate-800/50">
            <div className="px-6 py-6 space-y-4">
              <a href="#platform" onClick={() => setMobileMenuOpen(false)} className="block text-lg text-slate-300 hover:text-white">Platform</a>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="block text-lg text-slate-300 hover:text-white">Benefits</a>
              <a href="#proof" onClick={() => setMobileMenuOpen(false)} className="block text-lg text-slate-300 hover:text-white">Case Studies</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-lg text-slate-300 hover:text-white">How It Works</a>
              <a href="https://highway.com/products/trusted-freight-exchange#TFX-Demo" target="_blank" rel="noopener noreferrer" 
                 className="block w-full text-center px-5 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg mt-4">
                Request Demo
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-amber-500/5 via-transparent to-transparent opacity-60" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-amber-400">Now serving 170+ brokerages</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                The verified freight exchange
              </h1>
              
              <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-xl">
                Trade capacity with confidence. 80,000 verified carriers. Real-time ELD validation. 
                Zero fraud incidents.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-slate-800/50">
                <StatCard value={<AnimatedCounter end={80} suffix="K" />} label="Carriers" />
                <StatCard value={<AnimatedCounter end={170} suffix="+" />} label="Brokers" />
                <StatCard value="0" label="Fraud" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://highway.com/products/trusted-freight-exchange#TFX-Demo" target="_blank" rel="noopener noreferrer" 
                   className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/20 group">
                  Request Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#platform" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-medium rounded-xl transition-all">
                  Learn More
                </a>
              </div>
            </div>
            
            {/* Right Column - Live Feed */}
            <div className="lg:pl-8">
              <LiveActivityFeed />
              
              {/* Trust Badges */}
              <div className="mt-6 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Bank-grade Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trusted By Section --- */}
      <section className="py-16 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 uppercase tracking-wider mb-8">Trusted by leading freight brokerages</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['Echo', 'TQL', 'CH Robinson', 'XPO', 'Coyote', 'Landstar'].map((name) => (
              <span key={name} className="text-lg font-semibold text-slate-400">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Platform Section --- */}
      <section id="platform" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Platform</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              The difference is verification
            </h2>
            <p className="text-lg text-slate-400">
              Traditional load boards operate on trust. TFX operates on proof. Every carrier verified, every transaction secured.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ComparisonCard 
              title="Traditional Load Boards"
              subtitle="The old way"
              accent="negative"
              items={[
                "One-time verification that quickly becomes outdated",
                "No real-time identity validation or ELD integration",
                "Manual vetting process wastes hours per load",
                "13% YoY increase in strategic cargo theft"
              ]}
            />
            <ComparisonCard 
              title="TFX Exchange"
              subtitle="A better way"
              accent="positive"
              items={[
                "Continuous verification with real-time ELD integration",
                "Every carrier identity validated at time of transaction",
                "One-click capacity trading with verified partners",
                "Zero fraud incidents across our entire network"
              ]}
            />
          </div>
        </div>
      </section>

      {/* --- Benefits Section --- */}
      <section id="benefits" className="py-24 lg:py-32 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Benefits</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Built for modern freight operations
            </h2>
            <p className="text-lg text-slate-400">
              Replace manual vetting with verified capacity. Trade faster, safer, and more profitably.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={ShieldCheck}
              title="Verified Carriers"
              description="Every carrier in our network meets strict verification requirements. ELD integration, insurance validation, and authority checks—all in real-time."
            />
            <FeatureCard 
              icon={Zap}
              title="Instant Matching"
              description="Find and book verified capacity in seconds, not hours. Our exchange model eliminates the vetting bottleneck."
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Better Margins"
              description="Reduce operational costs by 40% through automated verification. Fewer bounced loads, cleaner execution, protected margins."
            />
            <FeatureCard 
              icon={Globe}
              title="Real-Time Visibility"
              description="Live ELD tracking and location verification. Know exactly where your freight is, always."
            />
            <FeatureCard 
              icon={Building2}
              title="Enterprise Ready"
              description="SOC 2 compliant with bank-grade security. Integrates with your existing TMS and operational workflows."
            />
            <FeatureCard 
              icon={Users}
              title="Growing Network"
              description="80,000 verified carriers and 170+ brokerages. The network effect that keeps getting stronger."
            />
          </div>
        </div>
      </section>

      {/* --- Case Studies / Proof Section --- */}
      <section id="proof" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Proof</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              The exchange model works
            </h2>
            <p className="text-lg text-slate-400">
              NYSE doesn't let anyone trade. Coinbase verifies every user. TFX brings the same rigor to freight.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CaseStudyCard 
              logo="NYSE"
              name="New York Stock Exchange"
              description="Gated marketplace with strict listing requirements and ongoing compliance."
              metric="$94T market cap"
            />
            <CaseStudyCard 
              logo="COIN"
              name="Coinbase"
              description="KYC verification for every user. Real-time settlement and institutional-grade security."
              metric="$3.6B revenue"
            />
            <CaseStudyCard 
              logo="MAH"
              name="Manheim Auctions"
              description="Closed exchange for licensed dealers. Every vehicle inspected and certified."
              metric="Near-zero fraud"
            />
            <CaseStudyCard 
              logo="ICE"
              name="ICE Energy"
              description="Verified traders only. Physical and financial proof required for every transaction."
              metric="$100B+ daily volume"
            />
          </div>

          {/* How TFX Applies */}
          <div className="mt-16 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-amber-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">How TFX applies this model</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Carrier Listings', desc: '80K carriers meet listing requirements. Standards matter.' },
                { num: '02', title: 'Real-Time Verification', desc: 'ELD-linked identity proof. Verified now, not yesterday.' },
                { num: '03', title: 'Secure Settlement', desc: 'TriumphPay integration. Clean clearing, every time.' },
                { num: '04', title: 'Trust → Volume', desc: 'Safety enables speed. More trades, better margins.' },
              ].map((item) => (
                <div key={item.num}>
                  <span className="text-amber-400/30 font-bold text-4xl">{item.num}</span>
                  <h4 className="text-white font-semibold mt-2 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Three steps to verified capacity
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Apply for Access', desc: 'Submit your brokerage for review. We verify your authority, insurance, and operational history.', icon: Building2 },
              { step: '2', title: 'Access Verified Carriers', desc: 'Browse 80,000 pre-verified carriers with real-time ELD integration and continuous compliance monitoring.', icon: Users },
              { step: '3', title: 'Trade with Confidence', desc: 'Book capacity instantly. Every transaction backed by verified identity and secure settlement.', icon: ShieldCheck },
            ].map((item) => (
              <div key={item.step} className="relative p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 group hover:border-amber-500/20 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-xl">
                  {item.step}
                </div>
                <div className="pt-4">
                  <item.icon className="w-8 h-8 text-amber-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800/50 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to trade verified capacity?
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Join 170+ brokerages already trading on the most trusted freight exchange.
                80,000 verified carriers. Zero fraud. Real results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://highway.com/products/trusted-freight-exchange#TFX-Demo" target="_blank" rel="noopener noreferrer" 
                   className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/20 group">
                  Request Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <p className="text-sm text-slate-500 mt-6">Membership by application only</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-16 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-slate-900 font-black text-lg">T</span>
              </div>
              <span className="text-white font-bold text-xl">TFX<span className="text-amber-400">.Exchange</span></span>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-slate-500">
              © 2024 Highway Inc. All rights reserved.
            </div>
          </div>
          
          {/* Production Credit */}
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
            <p className="text-xs text-slate-600">
              A production by <span className="text-amber-500/70 font-medium">Dude What's The Bid?! LLC</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
