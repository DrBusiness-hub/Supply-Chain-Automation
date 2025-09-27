import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  ShoppingCart, 
  Calendar, 
  Shield, 
  BarChart3, 
  FileText, 
  History, 
  Settings,
  AlertTriangle,
  Building2,
  Users,
  Receipt,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    items: [
      { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
      { icon: AlertTriangle, label: 'Critical Alerts', id: 'alerts' },
    ]
  },
  {
    title: 'Supply Chain',
    items: [
      { icon: Package, label: 'Inventory', id: 'inventory' },
      { icon: Truck, label: 'Transfers', id: 'transfers' },
      { icon: ShoppingCart, label: 'Procurement', id: 'procurement' },
      { icon: Calendar, label: 'Expiry Management', id: 'expiry' },
      { icon: Shield, label: 'Compliance', id: 'compliance' },
    ]
  },
  {
    title: 'Business Management',
    items: [
      { icon: Building2, label: 'Suppliers', id: 'suppliers' },
      { icon: Users, label: 'Customers', id: 'customers' },
      { icon: Receipt, label: 'Invoicing', id: 'invoicing' },
      { icon: TrendingUp, label: 'Financial Reports', id: 'financial' },
    ]
  },
  {
    title: 'Reports & Analytics',
    items: [
      { icon: BarChart3, label: 'Analytics', id: 'analytics' },
      { icon: FileText, label: 'Reports', id: 'reports' },
      { icon: History, label: 'Audit Trail', id: 'audit' },
    ]
  },
  {
    title: 'System',
    items: [
      { icon: Settings, label: 'Settings', id: 'settings' },
    ]
  }
];

const Sidebar = ({ activeSection, onSectionChange, isCollapsed = false }) => {
  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">ERP Dashboard</h1>
              <p className="text-sm text-gray-500">Supply Chain Automation</p>
            </div>
          )}
        </div>
      </div>

      <nav className="px-4 pb-4">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            {!isCollapsed && (
              <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-lg transform translate-x-1"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500")} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

