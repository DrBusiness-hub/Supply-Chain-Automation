import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Package,
  ArrowRight,
  Eye,
  Edit
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
import StatsCard from '../Dashboard/StatsCard';

const mockTransfers = [
  {
    id: 'TR-2024-0156',
    fromBranch: 'Main Hospital',
    toBranch: 'ICU Branch',
    items: [
      { name: 'Paracetamol 500mg', quantity: 50, unit: 'Tablets' },
      { name: 'Surgical Gloves (L)', quantity: 10, unit: 'Boxes' }
    ],
    status: 'Pending Approval',
    requestedBy: 'Dr. Ahmed Hassan',
    requestDate: '2024-01-15',
    approvedBy: null,
    approvalDate: null,
    priority: 'High'
  },
  {
    id: 'TR-2024-0155',
    fromBranch: 'Pharmacy Branch',
    toBranch: 'Main Hospital',
    items: [
      { name: 'Insulin Syringes', quantity: 100, unit: 'Pieces' },
      { name: 'Blood Test Tubes', quantity: 200, unit: 'Pieces' }
    ],
    status: 'Approved',
    requestedBy: 'Pharmacist Sara',
    requestDate: '2024-01-14',
    approvedBy: 'Manager Ali',
    approvalDate: '2024-01-14',
    priority: 'Medium'
  },
  {
    id: 'TR-2024-0154',
    fromBranch: 'ICU Branch',
    toBranch: 'Pharmacy Branch',
    items: [
      { name: 'Antibiotics (Amoxicillin)', quantity: 5, unit: 'Bottles' }
    ],
    status: 'Completed',
    requestedBy: 'Nurse Fatima',
    requestDate: '2024-01-13',
    approvedBy: 'Manager Ali',
    approvalDate: '2024-01-13',
    priority: 'Low'
  },
  {
    id: 'TR-2024-0153',
    fromBranch: 'Main Hospital',
    toBranch: 'Pharmacy Branch',
    items: [
      { name: 'Surgical Masks', quantity: 500, unit: 'Pieces' },
      { name: 'Hand Sanitizer', quantity: 20, unit: 'Bottles' }
    ],
    status: 'Rejected',
    requestedBy: 'Dr. Omar Khalil',
    requestDate: '2024-01-12',
    approvedBy: 'Manager Ali',
    approvalDate: '2024-01-12',
    priority: 'Medium'
  }
];

const TransfersSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');
  const [showNewTransferDialog, setShowNewTransferDialog] = useState(false);
  const [newTransfer, setNewTransfer] = useState({
    fromBranch: '',
    toBranch: '',
    items: [{ name: '', quantity: 1, unit: '' }],
    priority: 'Medium',
    notes: ''
  });

  const filteredTransfers = mockTransfers.filter(transfer => {
    const matchesSearch = transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fromBranch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toBranch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transfer.status.toLowerCase().replace(' ', '-') === filterStatus;
    const matchesBranch = filterBranch === 'all' || 
                         transfer.fromBranch.toLowerCase().includes(filterBranch.toLowerCase()) ||
                         transfer.toBranch.toLowerCase().includes(filterBranch.toLowerCase());
    return matchesSearch && matchesStatus && matchesBranch;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'Pending Approval': { variant: 'secondary', className: 'bg-amber-100 text-amber-800' },
      'Approved': { variant: 'default', className: 'bg-blue-100 text-blue-800' },
      'Completed': { variant: 'default', className: 'bg-emerald-100 text-emerald-800' },
      'Rejected': { variant: 'destructive', className: '' }
    };
    const config = variants[status] || { variant: 'default', className: '' };
    return <Badge variant={config.variant} className={config.className}>{status}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'High': { variant: 'destructive', className: '' },
      'Medium': { variant: 'secondary', className: 'bg-amber-100 text-amber-800' },
      'Low': { variant: 'default', className: 'bg-gray-100 text-gray-800' }
    };
    const config = variants[priority] || { variant: 'default', className: '' };
    return <Badge variant={config.variant} className={config.className}>{priority}</Badge>;
  };

  const handleApproveTransfer = (transferId) => {
    console.log(`Approving transfer ${transferId}`);
    // Implement approval logic
  };

  const handleRejectTransfer = (transferId) => {
    console.log(`Rejecting transfer ${transferId}`);
    // Implement rejection logic
  };

  const addItemToTransfer = () => {
    setNewTransfer(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unit: '' }]
    }));
  };

  const removeItemFromTransfer = (index) => {
    setNewTransfer(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const stats = [
    {
      title: 'Total Transfers',
      value: mockTransfers.length.toString(),
      change: '+8',
      changeType: 'positive',
      description: 'this month',
      icon: Truck,
      color: 'blue'
    },
    {
      title: 'Pending Approval',
      value: mockTransfers.filter(t => t.status === 'Pending Approval').length.toString(),
      change: '+2',
      changeType: 'negative',
      description: 'need attention',
      icon: Clock,
      color: 'amber'
    },
    {
      title: 'Completed',
      value: mockTransfers.filter(t => t.status === 'Completed').length.toString(),
      change: '+5',
      changeType: 'positive',
      description: 'this week',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      title: 'Average Time',
      value: '2.3 days',
      change: '-0.5',
      changeType: 'positive',
      description: 'processing time',
      icon: Clock,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inter-Branch Transfers</h1>
          <p className="text-gray-600 mt-1">Create and manage transfers between branches</p>
        </div>
        <Dialog open={showNewTransferDialog} onOpenChange={setShowNewTransferDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              New Transfer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Transfer Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromBranch">From Branch</Label>
                  <Select value={newTransfer.fromBranch} onValueChange={(value) => 
                    setNewTransfer(prev => ({ ...prev, fromBranch: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main-hospital">Main Hospital</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy Branch</SelectItem>
                      <SelectItem value="icu">ICU Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="toBranch">To Branch</Label>
                  <Select value={newTransfer.toBranch} onValueChange={(value) => 
                    setNewTransfer(prev => ({ ...prev, toBranch: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main-hospital">Main Hospital</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy Branch</SelectItem>
                      <SelectItem value="icu">ICU Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Items to Transfer</Label>
                {newTransfer.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 mt-2">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...newTransfer.items];
                        newItems[index].name = e.target.value;
                        setNewTransfer(prev => ({ ...prev, items: newItems }));
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...newTransfer.items];
                        newItems[index].quantity = parseInt(e.target.value) || 1;
                        setNewTransfer(prev => ({ ...prev, items: newItems }));
                      }}
                    />
                    <Input
                      placeholder="Unit"
                      value={item.unit}
                      onChange={(e) => {
                        const newItems = [...newTransfer.items];
                        newItems[index].unit = e.target.value;
                        setNewTransfer(prev => ({ ...prev, items: newItems }));
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItemFromTransfer(index)}
                      disabled={newTransfer.items.length === 1}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addItemToTransfer}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setShowNewTransferDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-500">
                  Create Transfer
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
                placeholder="Search transfers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending-approval">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="main-hospital">Main Hospital</SelectItem>
                <SelectItem value="pharmacy">Pharmacy Branch</SelectItem>
                <SelectItem value="icu">ICU Branch</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transfers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Transfer Requests ({filteredTransfers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transfer ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id} className="hover:bg-gray-50">
                    <TableCell>
                      <p className="font-medium text-blue-600">{transfer.id}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{transfer.fromBranch}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{transfer.toBranch}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transfer.items.length} items</p>
                        <p className="text-xs text-gray-500">
                          {transfer.items[0]?.name}
                          {transfer.items.length > 1 && ` +${transfer.items.length - 1} more`}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transfer.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(transfer.priority)}
                    </TableCell>
                    <TableCell className="text-gray-600">{transfer.requestedBy}</TableCell>
                    <TableCell className="text-gray-600">{transfer.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {transfer.status === 'Pending Approval' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-emerald-600 hover:text-emerald-700"
                              onClick={() => handleApproveTransfer(transfer.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleRejectTransfer(transfer.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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

export default TransfersSection;

