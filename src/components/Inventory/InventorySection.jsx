import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  RefreshCw, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  Download,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatsCard from '../Dashboard/StatsCard';
import { useInventory } from '../../hooks/useGoogleSheets';

const InventorySection = () => {
  const { inventory, loading, error, fetchInventory, updateItem, addItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('main-hospital');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Filter and sort inventory
  const filteredInventory = useMemo(() => {
    let filtered = inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category.toLowerCase() === filterCategory.toLowerCase();
      
      let matchesStatus = true;
      if (filterStatus !== 'all') {
        const status = getItemStatus(item);
        matchesStatus = status.toLowerCase().replace(' ', '-') === filterStatus;
      }
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [inventory, searchTerm, filterCategory, filterStatus, sortBy, sortOrder]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(inventory.map(item => item.category))];
    return cats.sort();
  }, [inventory]);

  // Get item status
  const getItemStatus = (item) => {
    if (item.currentStock === 0) {
      return 'Out of Stock';
    } else if (item.currentStock <= item.minStock) {
      return 'Low Stock';
    } else if (isExpiringSoon(item.expiryDate)) {
      return 'Expiring Soon';
    } else {
      return 'In Stock';
    }
  };

  // Check if item is expiring soon
  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  };

  const getStatusBadge = (item) => {
    const status = getItemStatus(item);
    
    if (status === 'Out of Stock') {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (status === 'Low Stock') {
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Low Stock</Badge>;
    } else if (status === 'Expiring Soon') {
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Expiring Soon</Badge>;
    } else {
      return <Badge variant="default" className="bg-emerald-100 text-emerald-800">In Stock</Badge>;
    }
  };

  const getStockTrend = (currentStock, minStock, maxStock) => {
    const percentage = (currentStock / maxStock) * 100;
    if (percentage > 70) {
      return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    } else if (percentage < 30) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    } else {
      return <TrendingUp className="w-4 h-4 text-amber-500" />;
    }
  };

  // Calculate stats
  const stats = useMemo(() => [
    {
      title: 'Total Items',
      value: inventory.length.toString(),
      change: '+5',
      changeType: 'positive',
      description: 'new items',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Low Stock Items',
      value: inventory.filter(item => item.currentStock <= item.minStock).length.toString(),
      change: '+2',
      changeType: 'negative',
      description: 'need reorder',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      title: 'Out of Stock',
      value: inventory.filter(item => item.currentStock === 0).length.toString(),
      change: '+1',
      changeType: 'negative',
      description: 'urgent',
      icon: Package,
      color: 'red'
    },
    {
      title: 'Total Value',
      value: '$' + inventory.reduce((sum, item) => sum + (item.currentStock * item.cost), 0).toLocaleString(),
      change: '+12%',
      changeType: 'positive',
      description: 'vs last month',
      icon: TrendingUp,
      color: 'emerald'
    }
  ], [inventory]);

  // Handle item update
  const handleUpdateItem = async (itemId, updates) => {
    try {
      await updateItem(itemId, updates);
      setEditingItem(null);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  // Handle add new item
  const handleAddItem = async (newItem) => {
    try {
      await addItem(newItem);
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  // Export inventory data
  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Category', 'Current Stock', 'Min Stock', 'Max Stock', 'Unit', 'Location', 'Expiry Date', 'Supplier', 'Cost'],
      ...filteredInventory.map(item => [
        item.id,
        item.name,
        item.category,
        item.currentStock,
        item.minStock,
        item.maxStock,
        item.unit,
        item.location,
        item.expiryDate,
        item.supplier,
        item.cost
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage and update stock levels across all branches</p>
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription>
            Failed to load inventory data: {error}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchInventory}
              className="ml-2"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage and update stock levels across all branches</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchInventory} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-hospital">Main Hospital</SelectItem>
                <SelectItem value="pharmacy">Pharmacy Branch</SelectItem>
                <SelectItem value="icu">ICU Branch</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={fetchInventory} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventory Items ({filteredInventory.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
              Loading inventory...
            </div>
          ) : filteredInventory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No inventory items found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => {
                    const expiringSoon = isExpiringSoon(item.expiryDate);
                    
                    return (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {getStockTrend(item.currentStock, item.minStock, item.maxStock)}
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.supplier}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.currentStock} {item.unit}</p>
                            <p className="text-xs text-gray-500">Min: {item.minStock} | Max: {item.maxStock}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(item)}
                        </TableCell>
                        <TableCell className="text-gray-600">{item.location}</TableCell>
                        <TableCell className={expiringSoon ? 'text-red-600' : 'text-gray-600'}>
                          {new Date(item.expiryDate).toLocaleDateString()}
                          {expiringSoon && (
                            <div className="text-xs text-red-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Expiring Soon!
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-600">${item.cost}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingItem(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Item</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add item form would be implemented here...</p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setShowAddForm(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={() => setShowAddForm(false)}>
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Item</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Edit form for {editingItem.name} would be implemented here...</p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => setEditingItem(null)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={() => setEditingItem(null)}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InventorySection;
