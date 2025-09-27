import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  UserCheck,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StatsCard from '../Dashboard/StatsCard';

const mockCustomers = [
  {
    id: 1,
    name: 'Cairo General Hospital',
    contact: 'Dr. Ahmed Mahmoud',
    email: 'ahmed@cairogh.com',
    phone: '+20 12 345 6789',
    address: 'Downtown Cairo, Egypt',
    type: 'Hospital',
    status: 'Active',
    registrationDate: '2023-03-15',
    totalOrders: 89,
    totalValue: 156000,
    lastOrder: '2024-01-14',
    creditLimit: 200000
  },
  {
    id: 2,
    name: 'Alexandria Medical Center',
    contact: 'Dr. Sarah Hassan',
    email: 'sarah@alexmed.com',
    phone: '+20 10 987 6543',
    address: 'Alexandria, Egypt',
    type: 'Medical Center',
    status: 'Active',
    registrationDate: '2023-05-20',
    totalOrders: 67,
    totalValue: 134000,
    lastOrder: '2024-01-12',
    creditLimit: 150000
  },
  {
    id: 3,
    name: 'Giza Pharmacy Chain',
    contact: 'Omar Khaled',
    email: 'omar@gizapharm.com',
    phone: '+20 11 234 5678',
    address: 'Giza, Egypt',
    type: 'Pharmacy',
    status: 'Active',
    registrationDate: '2023-07-10',
    totalOrders: 234,
    totalValue: 289000,
    lastOrder: '2024-01-16',
    creditLimit: 300000
  },
  {
    id: 4,
    name: 'Mansoura University Hospital',
    contact: 'Dr. Fatima Ali',
    email: 'fatima@mansourauniv.edu',
    phone: '+20 15 876 5432',
    address: 'Mansoura, Egypt',
    type: 'University Hospital',
    status: 'Pending',
    registrationDate: '2024-01-05',
    totalOrders: 12,
    totalValue: 23000,
    lastOrder: '2024-01-10',
    creditLimit: 100000
  },
  {
    id: 5,
    name: 'Aswan Health Clinic',
    contact: 'Dr. Mohamed Nasser',
    email: 'mohamed@aswanhealth.com',
    phone: '+20 12 765 4321',
    address: 'Aswan, Egypt',
    type: 'Clinic',
    status: 'Inactive',
    registrationDate: '2023-01-15',
    totalOrders: 45,
    totalValue: 67000,
    lastOrder: '2023-11-20',
    creditLimit: 80000
  }
];

const CustomersSection = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    type: 'hospital',
    creditLimit: '',
    notes: ''
  });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || customer.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'Active': { variant: 'default', className: 'bg-emerald-100 text-emerald-800', icon: UserCheck },
      'Pending': { variant: 'secondary', className: 'bg-amber-100 text-amber-800', icon: Clock },
      'Inactive': { variant: 'destructive', className: '', icon: Clock }
    };
    const config = variants[status] || { variant: 'default', className: '', icon: UserCheck };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Hospital': 'bg-blue-100 text-blue-800',
      'Medical Center': 'bg-emerald-100 text-emerald-800',
      'Pharmacy': 'bg-purple-100 text-purple-800',
      'University Hospital': 'bg-indigo-100 text-indigo-800',
      'Clinic': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge variant="outline" className={colors[type] || 'bg-gray-100 text-gray-800'}>
        {type}
      </Badge>
    );
  };

  const handleAddCustomer = () => {
    const customer = {
      id: customers.length + 1,
      ...newCustomer,
      status: 'Pending',
      registrationDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalValue: 0,
      lastOrder: 'Never',
      creditLimit: parseInt(newCustomer.creditLimit) || 0
    };
    
    setCustomers([...customers, customer]);
    setShowAddDialog(false);
    setNewCustomer({
      name: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
      type: 'hospital',
      creditLimit: '',
      notes: ''
    });
  };

  const stats = [
    {
      title: 'Total Customers',
      value: customers.length.toString(),
      change: '+3',
      changeType: 'positive',
      description: 'this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Customers',
      value: customers.filter(c => c.status === 'Active').length.toString(),
      change: '+2',
      changeType: 'positive',
      description: 'currently active',
      icon: UserCheck,
      color: 'emerald'
    },
    {
      title: 'Total Revenue',
      value: '$669K',
      change: '+18%',
      changeType: 'positive',
      description: 'this year',
      icon: DollarSign,
      color: 'amber'
    },
    {
      title: 'Avg Order Value',
      value: '$1,247',
      change: '+5%',
      changeType: 'positive',
      description: 'per order',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage your customer relationships and accounts</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter customer name"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={newCustomer.contact}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="Enter contact person"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter full address"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Customer Type</Label>
                <Select value={newCustomer.type} onValueChange={(value) => 
                  setNewCustomer(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="medical_center">Medical Center</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="university_hospital">University Hospital</SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="creditLimit">Credit Limit ($)</Label>
                <Input
                  id="creditLimit"
                  type="number"
                  value={newCustomer.creditLimit}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, creditLimit: e.target.value }))}
                  placeholder="Enter credit limit"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes about the customer"
                />
              </div>
              
              <div className="col-span-2 flex gap-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomer} className="bg-gradient-to-r from-blue-600 to-emerald-500">
                  Add Customer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="medical center">Medical Center</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="university hospital">University Hospital</SelectItem>
                <SelectItem value="clinic">Clinic</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Customers ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Credit Limit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {customer.address}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{customer.contact}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(customer.type)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(customer.status)}
                    </TableCell>
                    <TableCell className="text-gray-600">{customer.totalOrders}</TableCell>
                    <TableCell className="font-medium">${customer.totalValue.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-600">${customer.creditLimit.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersSection;

