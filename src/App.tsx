/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  LayoutDashboard,
  Users,
  CreditCard,
  LogOut,
  Wallet,
  Calendar,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { AMENITIES, ROOM_TYPES, TESTIMONIALS, RESIDENTS } from './lib/data';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [currentView, setCurrentView] = useState('home'); // home, admin, resident
  const [mockResidents, setMockResidents] = useState(RESIDENTS);

  const openBooking = (roomType = '') => {
    setSelectedRoom(roomType);
    setIsBookingOpen(true);
    setIsMenuOpen(false);
  };

  const handlePayRent = () => {
    alert('Mock Payment Successful! Status updated in Admin Portal.');
    // In a real app, this would be an API call.
    // For demo, we update Arjun's status if he's the 'logged in' user
    setMockResidents(prev => prev.map(r => r.id === 2 ? { ...r, status: 'Paid', date: new Date().toISOString().split('T')[0] } : r));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (currentView === 'admin') {
    const totalRevenue = mockResidents.filter(r => r.status === 'Paid').reduce((acc, curr) => acc + curr.rent, 0);
    const pendingCount = mockResidents.filter(r => r.status === 'Pending').length;

    return (
      <div className="min-h-screen bg-[#070707] text-white">
        {/* Admin Nav */}
        <nav className="border-b border-white/5 bg-[#0a0a0a] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <span className="text-xl font-black tracking-tighter">
              KVR<span className="text-brand-accent">.</span> <span className="text-neutral-500 font-medium">ADMIN</span>
            </span>
            <div className="hidden md:flex gap-6 ml-10">
              <button className="text-xs font-black uppercase tracking-widest text-brand-accent flex items-center gap-2">
                <LayoutDashboard className="w-3.5 h-3.5" /> Overview
              </button>
              <button className="text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Residents
              </button>
              <button className="text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5" /> Payments
              </button>
            </div>
          </div>
          <button 
            onClick={() => setCurrentView('home')}
            className="text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Exit
          </button>
        </nav>

        <main className="max-w-7xl mx-auto p-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-display text-4xl md:text-6xl mb-2">Management</h2>
              <p className="text-neutral-500 uppercase tracking-[0.2em] font-bold text-xs">Rent Collection Tracker • April 2024</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                 <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-black">Total Revenue</div>
                 <div className="text-3xl font-black text-brand-accent">₹{totalRevenue.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                 <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-black">Pending Dues</div>
                 <div className="text-3xl font-black text-white">{pendingCount} <span className="text-xs font-bold text-neutral-600">UNPAID</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
               <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                 <input type="text" placeholder="SEARCH RESIDENTS..." className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-brand-accent transition-all" />
               </div>
               <div className="flex gap-2">
                 <button className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><Bell className="w-4 h-4" /></button>
                 <button className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><Settings className="w-4 h-4" /></button>
               </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.03] text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  <th className="px-8 py-6">Resident Name</th>
                  <th className="px-8 py-6">Room Details</th>
                  <th className="px-8 py-6">Monthly Rent</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Paid Date</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockResidents.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-all">
                    <td className="px-8 py-6 font-black uppercase tracking-tighter text-lg">{r.name}</td>
                    <td className="px-8 py-6 text-xs font-bold text-neutral-400 uppercase tracking-widest">{r.room}</td>
                    <td className="px-8 py-6 text-sm font-black">₹{r.rent.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest ${r.status === 'Paid' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-bold text-neutral-600 tracking-widest">{r.date}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all underline underline-offset-4 decoration-brand-accent">
                        Remind
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }

  if (currentView === 'resident') {
    const user = mockResidents[1]; // Mocking login as Siddharth Rao
    
    return (
      <div className="min-h-screen bg-[#070707] text-white flex flex-col">
        <nav className="border-b border-white/5 bg-[#0a0a0a] px-8 py-6 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter">
            KVR<span className="text-brand-accent">.</span> <span className="text-neutral-500 font-medium tracking-widest">RESIDENT</span>
          </span>
          <button 
            onClick={() => setCurrentView('home')}
            className="text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-white flex items-center gap-2"
          >
            <LogOut className="w-4 h-4 text-brand-accent" /> Log Out
          </button>
        </nav>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 mb-4">
               <h2 className="text-display text-4xl lg:text-7xl">Welcome Back,</h2>
               <h2 className="text-display text-4xl lg:text-7xl text-neutral-600 leading-[0.8]">{user.name.split(' ')[0]}</h2>
            </div>

            <div className="lg:col-span-7 bg-white/5 border border-white/10 p-10 backdrop-blur-xl relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-12">
                   <div className="w-10 h-10 bg-brand-accent flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-black" />
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Monthly Rent Portal</div>
                </div>

                <div className="mb-12">
                   <div className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-2">Amount Due</div>
                   <div className="text-6xl font-black tracking-tighter">₹{user.rent.toLocaleString()}</div>
                   <div className="text-xs font-bold text-neutral-600 mt-2 uppercase tracking-widest flex items-center gap-2">
                     <Calendar className="w-3 h-3" /> Due by 10th April, 2024
                   </div>
                </div>

                <div className="mt-auto pt-12 border-t border-white/10">
                   {user.status === 'Paid' ? (
                     <div className="flex items-center gap-4 text-green-500 bg-green-500/10 p-6 border border-green-500/20">
                        <CheckCircle2 className="w-8 h-8" />
                        <div>
                           <div className="text-sm font-black uppercase tracking-widest">Rent Paid Successfully</div>
                           <div className="text-[10px] font-bold text-green-500/60 uppercase tracking-widest mt-0.5">Transaction ID: #KVR_98721 - {user.date}</div>
                        </div>
                     </div>
                   ) : (
                     <button 
                       onClick={handlePayRent}
                       className="w-full bg-white text-black py-6 font-black text-xl uppercase tracking-tighter hover:bg-brand-accent transition-all flex items-center justify-center gap-4 group"
                     >
                        Pay Rent Now <CreditCard className="w-7 h-7 group-hover:scale-110 transition-transform" />
                     </button>
                   )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
               <div className="bg-brand-surface border border-white/10 p-8">
                  <div className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-6">Your Profile</div>
                  <div className="space-y-6">
                     <div>
                        <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Room Number</div>
                        <div className="text-xl font-black uppercase tracking-tighter">{user.room}</div>
                     </div>
                     <div>
                        <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Hostel Location</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider leading-relaxed">Madhapur, Hyderabad</div>
                     </div>
                  </div>
               </div>

               <div className="bg-white/[0.02] border border-white/5 p-8">
                  <div className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-4">Support</div>
                  <p className="text-xs text-neutral-500 leading-relaxed font-medium mb-6">Need assistance with your room or facilities? Our concierge is available 24/7.</p>
                  <button className="text-[11px] font-black uppercase tracking-[0.2em] text-white underline underline-offset-4 decoration-brand-accent">Raise a Ticket</button>
               </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-brand-primary/95 border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span 
              onClick={() => setCurrentView('home')}
              className="text-2xl font-black tracking-tighter text-white cursor-pointer"
            >
              KVR<span className="text-brand-accent">.</span> <span className="text-neutral-400 font-medium">PG</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Amenities', 'Rooms', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            <button 
              onClick={() => setCurrentView('resident')}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent hover:text-white transition-all flex items-center gap-2"
            >
              Resident Login
            </button>
            <button 
              onClick={() => openBooking()}
              className="bg-brand-accent hover:bg-orange-600 text-black px-6 py-2.5 rounded-none font-black text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              Book Now
            </button>
          </div>
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-brand-primary pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-10">
              {['Home', 'Amenities', 'Rooms', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black text-white uppercase tracking-tighter"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => openBooking()}
                className="bg-brand-accent text-black py-4 font-black uppercase tracking-widest"
              >
                Secure Your Room
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsBookingOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-brand-surface border border-white/10 p-8 md:p-16"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="mb-12">
                <h3 className="text-xs font-black text-brand-accent uppercase tracking-[0.4em] mb-4">Reservation</h3>
                <h4 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Book Your Space</h4>
              </div>

              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Booking Inquiry Sent!'); setIsBookingOpen(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Full Name</label>
                    <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-brand-accent transition-all text-lg font-bold" placeholder="YOUR NAME" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Phone Number</label>
                    <input required type="tel" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-brand-accent transition-all text-lg font-bold" placeholder="+91" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Room Type</label>
                    <select 
                      value={selectedRoom} 
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-brand-accent transition-all text-lg font-bold appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-brand-surface">SELECT TYPE</option>
                      <option value="single" className="bg-brand-surface">SINGLE OCCUPANCY</option>
                      <option value="double" className="bg-brand-surface">TWO SHARING</option>
                      <option value="triple" className="bg-brand-surface">THREE SHARING</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Move-in Date</label>
                    <input required type="date" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-brand-accent transition-all text-lg font-bold text-white invert filter brightness-200" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-brand-accent hover:bg-orange-600 text-black py-6 font-black text-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-4 group">
                  Confirm Reservation <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-all" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen lg:h-[100dvh] flex items-center overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/40 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Trust Badges - Top Layer */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-xl">
                  <div className="flex gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-brand-accent text-brand-accent" />
                    ))}
                    <Star className="w-3 h-3 text-brand-accent" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-white">4.0</span>
                    <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">(110 Reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    Open 24 Hours
                  </div>
                </div>

                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-600">
                  Premium Boys' Hostel
                </div>
              </div>

            <div className="text-brand-accent font-bold mb-6 tracking-[0.3em] uppercase text-xs">Bespoke PG Living</div>
            <h1 className="text-massive mb-8">
              Living<br/>
              <span className="text-neutral-600">Defined.</span>
            </h1>
            <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-xl">
              Strategically located for professionals who refuse to compromise on comfort, community, and style.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8">
              <button 
                onClick={() => openBooking()}
                className="bg-brand-accent hover:bg-orange-600 text-black px-10 py-5 font-black text-lg uppercase tracking-tighter transition-all flex items-center justify-center gap-3 group"
              >
                Check Rooms <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-white border-b-2 border-white/10 hover:border-brand-accent px-2 py-4 text-xs font-black uppercase tracking-[0.3em] transition-all text-center">
                Virtual Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 lg:py-32 bg-brand-primary border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-16 lg:mb-24">
            <div className="col-span-1 md:col-span-8">
              <h2 className="text-xs font-black text-brand-accent uppercase tracking-[0.4em] mb-4 md:mb-6">Service Pillars</h2>
              <h3 className="text-display text-white">
                Utility & <br/>Comfort
              </h3>
            </div>
            <div className="col-span-1 md:col-span-4 flex items-end">
              <p className="text-lg text-neutral-500 leading-relaxed">
                We believe in a frictionless lifestyle where every domestic detail is solved before you notice it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-white/10">
            {AMENITIES.slice(0, 8).map((amenity, idx) => (
              <motion.div 
                key={amenity.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 lg:p-12 border-r border-b border-white/10 group hover:bg-white transition-colors duration-500"
              >
                <amenity.icon className="w-8 h-8 text-neutral-600 group-hover:text-brand-accent mb-8 transition-colors" />
                <h4 className="text-xs font-black text-neutral-400 group-hover:text-black uppercase tracking-[0.2em] mb-2">{amenity.name}</h4>
                <p className="text-sm text-neutral-600 group-hover:text-neutral-500 font-medium">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Showcase */}
      <section id="rooms" className="py-20 lg:py-32 bg-brand-primary border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-display text-white">The Units</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10">
            {ROOM_TYPES.map((room, idx) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx !== 2 ? 'lg:border-r' : ''} border-white/10`}
              >
                <div className="h-72 lg:h-[400px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-8 lg:p-12 flex-1 flex flex-col bg-brand-surface">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 gap-2">
                    <h4 className="text-3xl font-black uppercase tracking-tighter">{room.title}</h4>
                    <div className="text-xl font-light text-brand-accent">{room.price}</div>
                  </div>
                  
                  <p className="text-neutral-500 mb-10 font-medium leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => openBooking(room.id)}
                      className="w-full py-6 border border-white/10 hover:bg-white hover:text-black text-[11px] font-black uppercase tracking-[0.2em] transition-all"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-32 bg-brand-primary border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`p-10 lg:p-16 ${idx !== 2 ? 'md:border-r' : ''} border-b md:border-b-0 border-white/10 bg-brand-surface`}
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                <p className="text-2xl font-black uppercase tracking-tighter text-white mb-10 leading-[1.1]">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-px h-10 bg-brand-accent"></div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white underline underline-offset-4 decoration-brand-accent decoration-2">{t.name}</div>
                    <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mt-1">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-brand-primary border-t border-white/10 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 400 400" className="animate-float lg:w-[800px] lg:h-[800px]">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="40" fill="none" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-12 mb-6 lg:mb-10">
               <h2 className="text-xs font-black text-brand-accent uppercase tracking-[0.4em] mb-6">Contact</h2>
               <h3 className="text-display text-white">Get In<br/><span className="text-neutral-600">The Space</span></h3>
            </div>

            <div className="lg:col-span-5 space-y-12 lg:space-y-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-2">Location</div>
                  <div className="text-xl lg:text-2xl font-black text-white uppercase tracking-tighter">
                    Rd Number 56, Ayyappa Society, Mega Hills, Madhapur, Hyderabad, 500081
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-2">Communication</div>
                  <div className="text-xl lg:text-2xl font-black text-white underline decoration-brand-accent underline-offset-8">094408 44105</div>
                  <div className="text-sm lg:text-lg font-medium text-neutral-500 mt-2">C9XV+96 Hyderabad, Telangana</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 lg:gap-10">
                {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
                  <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 hover:text-brand-accent transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-brand-surface border border-white/10 p-8 lg:p-20">
                <form className="space-y-8 lg:space-y-10" onSubmit={(e) => { e.preventDefault(); alert('Inquiry Sent!'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Full Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/20 pb-4 outline-none focus:border-brand-accent transition-all text-lg lg:text-xl font-bold placeholder:text-white/10" placeholder="REQUIRED" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Phone Number</label>
                      <input type="tel" className="w-full bg-transparent border-b border-white/20 pb-4 outline-none focus:border-brand-accent transition-all text-lg lg:text-xl font-bold placeholder:text-white/10" placeholder="+91" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Your Message</label>
                    <textarea className="w-full bg-transparent border-b border-white/20 pb-4 outline-none focus:border-brand-accent transition-all text-lg lg:text-xl font-bold placeholder:text-white/10 h-24 lg:h-24 resize-none" placeholder="OPTIONAL"></textarea>
                  </div>
                  <button className="w-full bg-brand-accent hover:bg-orange-600 text-black py-6 lg:py-8 font-black text-lg lg:text-xl uppercase tracking-tighter transition-all group flex items-center justify-center gap-4">
                    Send Enquiry <ArrowRight className="w-6 h-6 lg:w-7 lg:h-7 group-hover:translate-x-2 transition-all" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black tracking-tighter text-white">
            KVR<span className="text-brand-accent">.</span> <span className="text-neutral-400 font-medium">PG</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 text-center">
              © 2024 KVR MENS PG. DEFINING URBAN LIVING.
            </div>
            <button 
              onClick={() => setCurrentView('admin')}
              className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-800 hover:text-brand-accent transition-all"
            >
              Admin Portal
            </button>
          </div>

          <div className="flex gap-4">
            <div className="w-2.5 h-2.5 bg-brand-accent rounded-full"></div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
               All Systems Active
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
