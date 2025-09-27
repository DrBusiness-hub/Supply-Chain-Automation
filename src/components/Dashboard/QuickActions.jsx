import React from 'react';
import { RefreshCw, Truck, Calendar, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const quickActions = [
  {
    icon: RefreshCw,
    label: 'Update Inventory',
    description: 'Sync latest stock levels',
    color: 'bg-blue-500 hover:bg-blue-600',
    action: 'inventory'
  },
  {
    icon: Truck,
    label: 'New Transfer',
    description: 'Create inter-branch transfer',
    color: 'bg-emerald-500 hover:bg-emerald-600',
    action: 'transfers'
  },
  {
    icon: Calendar,
    label: 'Check Expiries',
    description: 'Review expiring items',
    color: 'bg-amber-500 hover:bg-amber-600',
    action: 'expiry'
  },
  {
    icon: ShoppingCart,
    label: 'Generate POs',
    description: 'Create purchase orders',
    color: 'bg-purple-500 hover:bg-purple-600',
    action: 'procurement'
  },
  {
    icon: Package,
    label: 'Stock Analysis',
    description: 'Analyze inventory levels',
    color: 'bg-indigo-500 hover:bg-indigo-600',
    action: 'analytics'
  },
  {
    icon: AlertTriangle,
    label: 'Critical Alerts',
    description: 'View urgent notifications',
    color: 'bg-red-500 hover:bg-red-600',
    action: 'alerts'
  }
];

const QuickActions = ({ onActionClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-3 hover:shadow-md transition-all duration-200"
                onClick={() => onActionClick(action.action)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} transition-colors`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;

