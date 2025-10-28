import { Home, CreditCard, Heart, Wrench, MessageCircle } from 'lucide-react';

interface SidebarItem {
  id: string;
  icon: any;
  label: string;
  external?: boolean; // Optional flag for external links
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const sidebarItems: SidebarItem[] = [
    { id: 'home', icon: Home, label: 'Homepage', external: true },
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'rentals', icon: Home, label: 'My Rentals' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'services', icon: Wrench, label: 'Services' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-amber-400">RentWise</h1>
        <p className="text-slate-400 text-sm mt-1">Tenant Portal</p>
      </div>

      <nav className="mt-8">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.external) {
                  window.location.href = '/';
                } else {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-slate-700 transition-colors ${
                activeSection === item.id && !item.external
                  ? 'bg-slate-700 border-r-4 border-amber-400'
                  : ''
              }`}
            >
              <Icon className="w-5 h-5 text-amber-400" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
