'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Box, DollarSign, User, Menu, X } from 'react-feather';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/zustand/zustand';
import { LayoutDashboard } from 'lucide-react';


const navItems = [
  { icon: <LayoutDashboard size={18} />, href: '/ownerDashboard', text: 'Dashboard' },
  { icon: <Box size={18} />, href: '/ownerDashboard/properties', text: 'My Properties' },
  { icon: <DollarSign size={18} />, href: '/ownerDashboard/income', text: 'Income' },
  { icon: <User size={18} />, href: '/ownerDashboard/tenant', text: 'Tenants' },
  { icon: <Home size={18} />, href: '/', text: 'Home' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUserStore();
  console.log(user)
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Floating Menu Button */}
        <button
          onClick={toggleSidebar}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-950 hover:bg-blue-900 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Popup Menu */}
        {isOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 ease-out">
            {/* Header */}
            <div className="bg-blue-950 text-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">RentWise</h2>
                <button 
                  onClick={closeSidebar}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="p-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/ownerDashboard' && pathname.startsWith(item.href));
                
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    onClick={closeSidebar}
                    className="block"
                  >
                    <div className={`flex items-center space-x-3 p-3 mx-1 my-1 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-950 border-l-4 border-blue-950' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}>
                      <span className={`${isActive ? 'text-blue-950' : 'text-gray-500'}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* User Info */}
            <div className="border-t border-gray-100 p-4 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={18} className="text-blue-950" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.fullName ?? 'Owner Name'}</p>
                  <p className="text-sm text-gray-500">Property Owner</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop view (original sidebar)
  return (
    <div className="w-64 bg-blue-950 text-blue-50 h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="mb-8 p-4 border-b border-blue-800">
          <h1 className="text-xl font-bold">RentWise</h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    pathname === item.href || (item.href !== '/ownerDashboard' && pathname.startsWith(item.href))
                      ? 'bg-blue-800 text-white' 
                      : 'hover:bg-blue-900'
                  }`}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
              <User size={16} />
            </div>
            <span>{user?.fullName ?? 'Owner Name'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}