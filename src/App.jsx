import React, { useState } from 'react';

import Header from './components/Layout/Header';

import Sidebar from './components/Layout/Sidebar';

import Overview from './components/Dashboard/Overview';

import ReportsSectionNew from './components/Reports/ReportsSectionNew';

import InventorySection from './components/Inventory/InventorySection';

import TransfersSection from './components/Transfers/TransfersSection';

import SuppliersSection from './components/Suppliers/SuppliersSection';

import CustomersSection from './components/Customers/CustomersSection';

import LoginForm from './components/Auth/LoginForm';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import './App.css';



function App() {

  const [activeSection, setActiveSection] = useState('overview');

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const handleLogin = (userData) => {

    setUser(userData);

    setIsAuthenticated(true);

  };



  const handleLogout = () => {

    setUser(null);

    setIsAuthenticated(false);

    setActiveSection('overview');

  };



  const handleSectionChange = (section) => {

    setActiveSection(section);

  };



  const toggleSidebar = () => {

    setSidebarCollapsed(!sidebarCollapsed);

  };



  if (!isAuthenticated) {

    return <LoginForm onLogin={handleLogin} />;

  }



  const renderContent = () => {

    switch (activeSection) {

      case 'overview':

        return <Overview onSectionChange={handleSectionChange} />;

      case 'reports':

        return <ReportsSectionNew />;

      case 'inventory':

        return <InventorySection />;

      case 'transfers':

        return <TransfersSection />;

      case 'suppliers':

        return <SuppliersSection />;

      case 'customers':

        return <CustomersSection />;

      case 'alerts':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">Critical Alerts</h1>

              <p className="text-gray-600 mt-1">Monitor and respond to urgent notifications</p>

            </div>

            <Card>

              <CardHeader>

                <CardTitle>Alert Management</CardTitle>

              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">

                    <div className="flex items-center">

                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>

                      <h3 className="font-semibold text-red-800">Low Stock Alert</h3>

                    </div>

                    <p className="text-red-700 mt-2">Paracetamol 500mg - Only 50 units remaining</p>

                    <p className="text-sm text-red-600 mt-1">Threshold: 100 units</p>

                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

                    <div className="flex items-center">

                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>

                      <h3 className="font-semibold text-yellow-800">Expiry Warning</h3>

                    </div>

                    <p className="text-yellow-700 mt-2">Insulin Vials - Expiring in 7 days</p>

                    <p className="text-sm text-yellow-600 mt-1">Batch: INS-2024-001</p>

                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">

                    <div className="flex items-center">

                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>

                      <h3 className="font-semibold text-blue-800">Pending Orders</h3>

                    </div>

                    <p className="text-blue-700 mt-2">5 purchase orders awaiting approval</p>

                    <p className="text-sm text-blue-600 mt-1">Total value: $15,750</p>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

        );

      case 'procurement':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">Procurement Management</h1>

              <p className="text-gray-600 mt-1">Manage purchase orders and supplier relationships</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <Card>

                <CardHeader>

                  <CardTitle>Purchase Orders</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="flex justify-between">

                      <span>Pending</span>

                      <span className="font-semibold text-orange-600">12</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Approved</span>

                      <span className="font-semibold text-green-600">8</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Delivered</span>

                      <span className="font-semibold text-blue-600">25</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Supplier Performance</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="flex justify-between">

                      <span>On-time Delivery</span>

                      <span className="font-semibold text-green-600">94%</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Quality Score</span>

                      <span className="font-semibold text-blue-600">4.7/5</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Active Suppliers</span>

                      <span className="font-semibold">15</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Budget Overview</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="flex justify-between">

                      <span>Monthly Budget</span>

                      <span className="font-semibold">$50,000</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Spent</span>

                      <span className="font-semibold text-red-600">$32,500</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Remaining</span>

                      <span className="font-semibold text-green-600">$17,500</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

            </div>

          </div>

        );

      case 'expiry':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">Expiry Management</h1>

              <p className="text-gray-600 mt-1">Monitor and manage product expiration dates</p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <Card>

                <CardHeader>

                  <CardTitle>Expiring Soon</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-4">

                    <div className="border-l-4 border-red-500 pl-4">

                      <h4 className="font-semibold text-red-800">Insulin Vials</h4>

                      <p className="text-sm text-gray-600">Expires: 2024-10-05</p>

                      <p className="text-sm text-gray-600">Quantity: 25 units</p>

                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">

                      <h4 className="font-semibold text-orange-800">Antibiotics</h4>

                      <p className="text-sm text-gray-600">Expires: 2024-10-12</p>

                      <p className="text-sm text-gray-600">Quantity: 150 units</p>

                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">

                      <h4 className="font-semibold text-yellow-800">Surgical Masks</h4>

                      <p className="text-sm text-gray-600">Expires: 2024-10-20</p>

                      <p className="text-sm text-gray-600">Quantity: 500 units</p>

                    </div>

                  </div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Expiry Statistics</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-4">

                    <div className="flex justify-between items-center">

                      <span>Items expiring in 7 days</span>

                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">3</span>

                    </div>

                    <div className="flex justify-between items-center">

                      <span>Items expiring in 30 days</span>

                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-semibold">12</span>

                    </div>

                    <div className="flex justify-between items-center">

                      <span>Items expiring in 90 days</span>

                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">45</span>

                    </div>

                    <div className="flex justify-between items-center">

                      <span>Expired items (last 30 days)</span>

                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-semibold">2</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

            </div>

          </div>

        );

      case 'compliance':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">Regulatory Compliance</h1>

              <p className="text-gray-600 mt-1">Ensure adherence to healthcare regulations</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Card>

                <CardHeader>

                  <CardTitle>Compliance Status</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-4">

                    <div className="flex items-center justify-between">

                      <span>FDA Compliance</span>

                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">✓ Compliant</span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span>ISO 13485</span>

                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">✓ Certified</span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span>GMP Standards</span>

                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">⚠ Review Required</span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span>HIPAA Compliance</span>

                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">✓ Compliant</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Audit Schedule</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="border-l-4 border-blue-500 pl-4">

                      <h4 className="font-semibold">Internal Audit</h4>

                      <p className="text-sm text-gray-600">Next: October 15, 2024</p>

                    </div>

                    <div className="border-l-4 border-green-500 pl-4">

                      <h4 className="font-semibold">FDA Inspection</h4>

                      <p className="text-sm text-gray-600">Last: June 20, 2024</p>

                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">

                      <h4 className="font-semibold">ISO Certification Review</h4>

                      <p className="text-sm text-gray-600">Next: December 1, 2024</p>

                    </div>

                  </div>

                </CardContent>

              </Card>

            </div>

          </div>

        );

      case 'invoicing':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">Invoicing System</h1>

              <p className="text-gray-600 mt-1">Create and manage invoices and billing</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <Card>

                <CardHeader>

                  <CardTitle>Invoice Summary</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="flex justify-between">

                      <span>Total Invoices</span>

                      <span className="font-semibold">156</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Paid</span>

                      <span className="font-semibold text-green-600">142</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Pending</span>

                      <span className="font-semibold text-orange-600">12</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Overdue</span>

                      <span className="font-semibold text-red-600">2</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Revenue Overview</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="flex justify-between">

                      <span>This Month</span>

                      <span className="font-semibold text-green-600">$125,000</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Last Month</span>

                      <span className="font-semibold">$118,500</span>

                    </div>

                    <div className="flex justify-between">

                      <span>Outstanding</span>

                      <span className="font-semibold text-orange-600">$15,750</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Quick Actions</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-2">

                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">

                      Create Invoice

                    </button>

                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">

                      Send Reminders

                    </button>

                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">

                      Generate Report

                    </button>

                  </div>

                </CardContent>

              </Card>

            </div>

          </div>

        );

      case 'financial':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>

              <p className="text-gray-600 mt-1">View financial performance and analytics</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <Card>

                <CardHeader>

                  <CardTitle>Revenue</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="text-2xl font-bold text-green-600">$1.2M</div>

                  <p className="text-sm text-gray-600">+12% from last month</p>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Expenses</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="text-2xl font-bold text-red-600">$850K</div>

                  <p className="text-sm text-gray-600">+5% from last month</p>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Profit Margin</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="text-2xl font-bold text-blue-600">29.2%</div>

                  <p className="text-sm text-gray-600">+2.1% from last month</p>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Cash Flow</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="text-2xl font-bold text-purple-600">$350K</div>

                  <p className="text-sm text-gray-600">Positive trend</p>

                </CardContent>

              </Card>

            </div>

          </div>

        );

      case 'analytics':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">Analytics & KPIs</h1>

              <p className="text-gray-600 mt-1">Key performance indicators and business intelligence</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <Card>

                <CardHeader>

                  <CardTitle>Inventory Turnover</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="text-3xl font-bold text-blue-600">8.5x</div>

                  <p className="text-sm text-gray-600">Annual turnover rate</p>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Order Fulfillment</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="text-3xl font-bold text-green-600">96%</div>

                  <p className="text-sm text-gray-600">On-time delivery rate</p>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>Customer Satisfaction</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="text-3xl font-bold text-purple-600">4.8/5</div>

                  <p className="text-sm text-gray-600">Average rating</p>

                </CardContent>

              </Card>

            </div>

          </div>

        );

      case 'audit':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">System Audit Trail</h1>

              <p className="text-gray-600 mt-1">Complete log of all system activities</p>

            </div>

            <Card>

              <CardHeader>

                <CardTitle>Recent Activities</CardTitle>

              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  <div className="border-l-4 border-blue-500 pl-4">

                    <h4 className="font-semibold">User Login</h4>

                    <p className="text-sm text-gray-600">admin@rama.com logged in</p>

                    <p className="text-xs text-gray-500">2024-09-27 10:30:15</p>

                  </div>

                  <div className="border-l-4 border-green-500 pl-4">

                    <h4 className="font-semibold">Inventory Update</h4>

                    <p className="text-sm text-gray-600">Stock level updated for Paracetamol 500mg</p>

                    <p className="text-xs text-gray-500">2024-09-27 09:45:22</p>

                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">

                    <h4 className="font-semibold">Purchase Order</h4>

                    <p className="text-sm text-gray-600">PO-2024-001 created for Medical Supplies</p>

                    <p className="text-xs text-gray-500">2024-09-27 08:15:33</p>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

        );

      case 'settings':

        return (

          <div className="space-y-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>

              <p className="text-gray-600 mt-1">Configure system preferences and user settings</p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Card>

                <CardHeader>

                  <CardTitle>User Management</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="flex justify-between items-center">

                      <span>Active Users</span>

                      <span className="font-semibold">12</span>

                    </div>

                    <div className="flex justify-between items-center">

                      <span>Admin Users</span>

                      <span className="font-semibold">3</span>

                    </div>

                    <div className="flex justify-between items-center">

                      <span>Last Login</span>

                      <span className="text-sm text-gray-600">2024-09-27 10:30</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

              <Card>

                <CardHeader>

                  <CardTitle>System Configuration</CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-3">

                    <div className="flex justify-between items-center">

                      <span>Auto Backup</span>

                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Enabled</span>

                    </div>

                    <div className="flex justify-between items-center">

                      <span>Email Notifications</span>

                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Enabled</span>

                    </div>

                    <div className="flex justify-between items-center">

                      <span>Two-Factor Auth</span>

                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">Optional</span>

                    </div>

                  </div>

                </CardContent>

              </Card>

            </div>

          </div>

        );

      default:

        return <Overview onSectionChange={handleSectionChange} />;

    }

  };



  return (

    <div className="min-h-screen bg-gray-50">

      <Header onToggleSidebar={toggleSidebar} user={user} onLogout={handleLogout} />

      

      <div className="flex">

        <Sidebar 

          activeSection={activeSection} 

          onSectionChange={handleSectionChange}

          isCollapsed={sidebarCollapsed}

        />

        

        <main className="flex-1 p-6 overflow-y-auto">

          {renderContent()}

        </main>

      </div>

    </div>

  );

}



export default App;
