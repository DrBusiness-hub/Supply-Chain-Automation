import React from 'react';
import { Package, AlertTriangle, Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Overview = ({ onSectionChange }) => {
  const stats = [
    {
      title: 'Total Items',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      description: 'vs last month',
      icon: Package,
      color: 'emerald'
    },
    {
      title: 'Low Stock Alerts',
      value: '23',
      change: '+3',
      changeType: 'negative',
      description: 'from yesterday',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      title: 'Expiring Soon',
      value: '7',
      change: '+2',
      changeType: 'negative',
      description: 'this week',
      icon: Calendar,
      color: 'red'
    },
    {
      title: 'Monthly Procurement',
      value: '$45.2K',
      change: '-8%',
      changeType: 'positive',
      description: 'from target',
      icon: DollarSign,
      color: 'blue'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Inventory Update',
      user: 'admin@rama.com',
      branch: 'Main Hospital',
      details: '47 items updated',
      time: '2024-01-15 14:32:15',
      type: 'update'
    },
    {
      id: 2,
      action: 'Transfer Approved',
      user: 'manager@rama.com',
      branch: 'Pharmacy to ICU',
      details: 'Transfer #TR-2024-0156 | 12 items',
      time: '2024-01-15 13:45:22',
      type: 'transfer'
    },
    {
      id: 3,
      action: 'Purchase Order Generated',
      user: 'procurement@rama.com',
      branch: 'Central Procurement',
      details: 'PO #PO-2024-0089 | $12,450',
      time: '2024-01-15 12:18:09',
      type: 'purchase'
    },
    {
      id: 4,
      action: 'Expiry Alert',
      user: 'system',
      branch: 'All Branches',
      details: '3 items flagged as expiring within 7 days',
      time: '2024-01-15 11:55:33',
      type: 'alert'
    }
  ];

  const kpiTargets = [
    { name: 'Inventory Turnover', current: 12.4, target: 15.0, percentage: 82 },
    { name: 'Stock Availability', current: 97.8, target: 98.0, percentage: 99 },
    { name: 'Cost Reduction', current: 8.2, target: 10.0, percentage: 82 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'update': return '🔄';
      case 'transfer': return '🚛';
      case 'purchase': return '🛒';
      case 'alert': return '⚠️';
      default: return '📋';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Supply Chain Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your medical supply chain operations efficiently</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions onActionClick={onSectionChange} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              KPI Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {kpiTargets.map((kpi, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{kpi.name}</span>
                  <span className="text-sm text-gray-500">
                    {kpi.current} / {kpi.target}
                  </span>
                </div>
                <Progress value={kpi.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.user} • {activity.branch}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Status */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-800">Main Hospital</p>
                  <p className="text-xs text-emerald-600">Operational</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
              </div>
              <div className="mt-2 text-xs text-emerald-700">
                Last sync: 2 minutes ago
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Pharmacy Branch</p>
                  <p className="text-xs text-blue-600">Operational</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
              </div>
              <div className="mt-2 text-xs text-blue-700">
                Last sync: 5 minutes ago
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800">ICU Branch</p>
                  <p className="text-xs text-amber-600">Sync Pending</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
              </div>
              <div className="mt-2 text-xs text-amber-700">
                Last sync: 15 minutes ago
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;

