// Alternative simpler version without dropdown
"use client"

import { Building, Bell, LogOut } from 'lucide-react';
import { useAdminStore } from '@/app/golNimda/adminStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { admin, logout } = useAdminStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <header className="bg-blue-900 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Building className="w-6 h-6 text-white mr-3" />
            <h1 className="text-xl font-bold">RentWise Admin</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-1.5 rounded-full hover:bg-blue-800 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-blue-900 rounded-full flex items-center justify-center text-sm font-bold">
                {admin?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-sm hidden sm:inline">
                {admin?.name || 'Admin User'}
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-white hover:bg-blue-800"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}