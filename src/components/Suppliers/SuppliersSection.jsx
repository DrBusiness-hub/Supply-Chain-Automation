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
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle
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

const mockSuppliers = [
  {
    id: 1,
    name: 'MedSupply Co.',
    contact: 'Ahmed Hassan',
    email: 'ahmed@medsupply.com',
    phone: '+20 12 345 6789',
    address: 'Cairo, Egypt',
    category: 'Medications',
    status: 'Active',
    rating: 4.8,
    totalOrders: 156,
    totalValue: 245000,
    lastOrder: '2024-01-15'
  },
  {
    id: 2,
    name: 'SafeHands Ltd.',
    contact: 'Sarah Ahmed',
    email: 'sarah@safehands.com',
    phone: '+20 10 987 6543',
    address: 'Alexandria, Egypt',
    category: 'Medical Devices',
    status: 'Active',
    rating: 4.6,
    totalOrders: 89,
    totalValue: 178000,
    lastOrder: '2024-01-14'
  },
  {
    id: 3,
    name: 'MediCare Supplies',
    contact: 'Omar Khaled',
    email: 'omar@medicare.com',
    phone: '+20 11 234 5678',
    address: 'Giza, Egypt',
    category: 'Consumables',
    status: 'Pending',
    rating: 4.2,
    totalOrders: 67,
    totalValue: 134000,
    lastOrder: '2024-01-10'
  },
  {
    id: 4,
    name: 'LabTech Solutions',
    contact: 'Fatima Ali',
    email: 'fatima@labtech.com',
    phone: '+20 15 876 5432',
    address: 'Mansoura, Egypt',
    category: 'Lab Supplies',
    status: 'Active',
    rating: 4.9,
    totalOrders: 234,
    totalValue: 456000,
    lastOrder: '2024-01-16'
  },
  {
    id: 5,
    name: 'PharmaTech Inc.',
    contact: 'Mohamed Nasser',
    email: 'mohamed@pharmatech.com',
    phone: '+20 12 765 4321',
    address: 'Aswan, Egypt',
    category: 'Medications',
    status: 'Inactive',
    rating: 3.8,
    totalOrders: 45,
    totalValue: 89000,
    lastOrder: '2023-12-20'
  }
];

const SuppliersSection = () => {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    category: 'medications',
    notes: ''
  });

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || supplier.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesStatus = filterStatus === 'all' || supplier.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'Active': { variant: 'default', className: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
      'Pending': { variant: 'secondary', className: 'bg-amber-100 text-amber-800', icon: AlertCircle },
      'Inactive': { variant: 'destructive', className: '', icon: AlertCircle }
    };
    const config = variants[status] || { variant: 'default', className: '', icon: CheckCircle };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleAddSupplier = () => {
    const supplier = {
      id: suppliers.length + 1,
      ...newSupplier,
      status: 'Pending',
      rating: 0,
      totalOrders: 0,
      totalValue: 0,
      lastOrder: 'Never'
    };
    
    setSuppliers([...suppliers, supplier]);
    setShowAddDialog(false);
    setNewSupplier({
      name: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
      category: 'medications',
      notes: ''
    });
  };

  const stats = [
    {
      title: 'Total Suppliers',
      value: suppliers.length.toString(),
      change: '+2',
      changeType: 'positive',
      description: 'this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Suppliers',
      value: suppliers.filter(s => s.status === 'Active').length.toString(),
      change: '+1',
      changeType: 'positive',
      description: 'currently active',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      title: 'Average Rating',
      value: '4.7',
      change: '+0.2',
      changeType: 'positive',
      description: 'out of 5.0',
      icon: Star,
      color: 'amber'
    },
    {
      title: 'Total Value',
      value: '$1.1M',
      change: '+15%',
      changeType: 'positive',
      description: 'this year',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-gray-600 mt-1">Manage your supplier relationships and partnerships</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add New Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplierName">Supplier Name</Label>
                <Input
                  id="supplierName"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter supplier name"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={newSupplier.contact}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="Enter contact person"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter full address"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newSupplier.category} onValueChange={(value) => 
                  setNewSupplier(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medications">Medications</SelectItem>
                    <SelectItem value="medical_devices">Medical Devices</SelectItem>
                    <SelectItem value="consumables">Consumables</SelectItem>
                    <SelectItem value="lab_supplies">Lab Supplies</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newSupplier.notes}
                  onChange={(e) => setNewSupplier(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes about the supplier"
                />
              </div>
              
              <div className="col-span-2 flex gap-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSupplier} className="bg-gradient-to-r from-blue-600 to-emerald-500">
                  Add Supplier
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
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medications">Medications</SelectItem>
                <SelectItem value="medical devices">Medical Devices</SelectItem>
                <SelectItem value="consumables">Consumables</SelectItem>
                <SelectItem value="lab supplies">Lab Supplies</SelectItem>
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

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Suppliers ({filteredSuppliers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-semibold">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{supplier.name}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {supplier.address}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{supplier.contact}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="w-3 h-3" />
                          {supplier.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{supplier.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(supplier.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getRatingStars(supplier.rating)}
                        <span className="text-sm text-gray-600 ml-1">{supplier.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{supplier.totalOrders}</TableCell>
                    <TableCell className="font-medium">${supplier.totalValue.toLocaleString()}</TableCell>
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

export default SuppliersSection;

