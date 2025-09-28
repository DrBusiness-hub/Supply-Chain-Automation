import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Package, 
  Users, 
  Truck, 
  BarChart3, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Building2,
  UserPlus,
  PackagePlus,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import './App.css'

// Mock data for demonstration - in real implementation, this would come from Google Sheets API
const mockInventoryData = [
  { id: 1, name: 'Medical Masks', category: 'PPE', quantity: 500, minStock: 100, supplier: 'MedSupply Co', price: 2.50 },
  { id: 2, name: 'Surgical Gloves', category: 'PPE', quantity: 1200, minStock: 200, supplier: 'HealthCare Ltd', price: 0.75 },
  { id: 3, name: 'Syringes', category: 'Medical Devices', quantity: 800, minStock: 150, supplier: 'MedTech Inc', price: 0.25 },
  { id: 4, name: 'Bandages', category: 'Supplies', quantity: 300, minStock: 50, supplier: 'MedSupply Co', price: 1.20 }
]

const mockSuppliersData = [
  { id: 1, name: 'MedSupply Co', contact: 'John Smith', email: 'john@medsupply.com', phone: '+1-555-0123', address: '123 Medical St' },
  { id: 2, name: 'HealthCare Ltd', contact: 'Sarah Johnson', email: 'sarah@healthcare.com', phone: '+1-555-0456', address: '456 Health Ave' },
  { id: 3, name: 'MedTech Inc', contact: 'Mike Brown', email: 'mike@medtech.com', phone: '+1-555-0789', address: '789 Tech Blvd' }
]

const mockCustomersData = [
  { id: 1, name: 'City Hospital', contact: 'Dr. Wilson', email: 'wilson@cityhospital.com', phone: '+1-555-1111', type: 'Hospital' },
  { id: 2, name: 'Community Clinic', contact: 'Nurse Davis', email: 'davis@communityclinic.com', phone: '+1-555-2222', type: 'Clinic' },
  { id: 3, name: 'Emergency Center', contact: 'Dr. Martinez', email: 'martinez@emergency.com', phone: '+1-555-3333', type: 'Emergency' }
]

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [inventoryData, setInventoryData] = useState(mockInventoryData)
  const [suppliersData, setSuppliersData] = useState(mockSuppliersData)
  const [customersData, setCustomersData] = useState(mockCustomersData)
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)

  // Form states
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '', minStock: '', supplier: '', price: '' })
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', email: '', phone: '', address: '' })
  const [newCustomer, setNewCustomer] = useState({ name: '', contact: '', email: '', phone: '', type: '' })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const addInventoryItem = () => {
    if (!newItem.name || !newItem.quantity) {
      showNotification('Please fill in required fields', 'error')
      return
    }
    
    const item = {
      id: Date.now(),
      ...newItem,
      quantity: parseInt(newItem.quantity),
      minStock: parseInt(newItem.minStock) || 0,
      price: parseFloat(newItem.price) || 0
    }
    
    setInventoryData([...inventoryData, item])
    setNewItem({ name: '', category: '', quantity: '', minStock: '', supplier: '', price: '' })
    showNotification('Inventory item added successfully!')
  }

  const addSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact) {
      showNotification('Please fill in required fields', 'error')
      return
    }
    
    const supplier = {
      id: Date.now(),
      ...newSupplier
    }
    
    setSuppliersData([...suppliersData, supplier])
    setNewSupplier({ name: '', contact: '', email: '', phone: '', address: '' })
    showNotification('Supplier added successfully!')
  }

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.contact) {
      showNotification('Please fill in required fields', 'error')
      return
    }
    
    const customer = {
      id: Date.now(),
      ...newCustomer
    }
    
    setCustomersData([...customersData, customer])
    setNewCustomer({ name: '', contact: '', email: '', phone: '', type: '' })
    showNotification('Customer added successfully!')
  }

  const deleteItem = (id, type) => {
    if (type === 'inventory') {
      setInventoryData(inventoryData.filter(item => item.id !== id))
    } else if (type === 'supplier') {
      setSuppliersData(suppliersData.filter(item => item.id !== id))
    } else if (type === 'customer') {
      setCustomersData(customersData.filter(item => item.id !== id))
    }
    showNotification('Item deleted successfully!')
  }

  const filteredInventory = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredSuppliers = suppliersData.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCustomers = customersData.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lowStockItems = inventoryData.filter(item => item.quantity <= item.minStock)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Supply Chain Automation</h1>
                <p className="text-sm text-gray-500">Rama Medical Group</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Connected to Google Sheets
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className={`${notification.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            {notification.type === 'error' ? 
              <AlertCircle className="h-4 w-4 text-red-600" /> : 
              <CheckCircle className="h-4 w-4 text-green-600" />
            }
            <AlertDescription className={notification.type === 'error' ? 'text-red-800' : 'text-green-800'}>
              {notification.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Suppliers</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Customers</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inventoryData.length}</div>
                  <p className="text-xs opacity-75">Active inventory items</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{suppliersData.length}</div>
                  <p className="text-xs opacity-75">Active suppliers</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customersData.length}</div>
                  <p className="text-xs opacity-75">Active customers</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Low Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{lowStockItems.length}</div>
                  <p className="text-xs opacity-75">Items need reorder</p>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alert */}
            {lowStockItems.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Low Stock Alert</span>
                  </CardTitle>
                  <CardDescription className="text-red-600">
                    The following items are running low and need to be restocked:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="destructive">
                          {item.quantity} / {item.minStock} min
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add New Item Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PackagePlus className="h-5 w-5" />
                    <span>Add New Item</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="itemName">Item Name *</Label>
                    <Input
                      id="itemName"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      placeholder="Enter category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
                      placeholder="Minimum stock level"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      value={newItem.supplier}
                      onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                      placeholder="Supplier name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      placeholder="Unit price"
                    />
                  </div>
                  <Button onClick={addInventoryItem} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Inventory List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredInventory.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge variant="outline">{item.category}</Badge>
                              {item.quantity <= item.minStock && (
                                <Badge variant="destructive">Low Stock</Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              <span>Qty: {item.quantity}</span>
                              {item.supplier && <span> • Supplier: {item.supplier}</span>}
                              {item.price > 0 && <span> • ${item.price}</span>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => deleteItem(item.id, 'inventory')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add New Supplier Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Add New Supplier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="supplierName">Company Name *</Label>
                    <Input
                      id="supplierName"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplierContact">Contact Person *</Label>
                    <Input
                      id="supplierContact"
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                      placeholder="Contact person name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplierEmail">Email</Label>
                    <Input
                      id="supplierEmail"
                      type="email"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplierPhone">Phone</Label>
                    <Input
                      id="supplierPhone"
                      value={newSupplier.phone}
                      onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplierAddress">Address</Label>
                    <Input
                      id="supplierAddress"
                      value={newSupplier.address}
                      onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                      placeholder="Company address"
                    />
                  </div>
                  <Button onClick={addSupplier} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supplier
                  </Button>
                </CardContent>
              </Card>

              {/* Suppliers List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Suppliers ({filteredSuppliers.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredSuppliers.map(supplier => (
                        <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <h3 className="font-semibold">{supplier.name}</h3>
                            <div className="text-sm text-gray-600 mt-1">
                              <div>Contact: {supplier.contact}</div>
                              {supplier.email && <div>Email: {supplier.email}</div>}
                              {supplier.phone && <div>Phone: {supplier.phone}</div>}
                              {supplier.address && <div>Address: {supplier.address}</div>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => deleteItem(supplier.id, 'supplier')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add New Customer Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Add New Customer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Organization Name *</Label>
                    <Input
                      id="customerName"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                      placeholder="Enter organization name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerContact">Contact Person *</Label>
                    <Input
                      id="customerContact"
                      value={newCustomer.contact}
                      onChange={(e) => setNewCustomer({...newCustomer, contact: e.target.value})}
                      placeholder="Contact person name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input
                      id="customerPhone"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerType">Type</Label>
                    <Input
                      id="customerType"
                      value={newCustomer.type}
                      onChange={(e) => setNewCustomer({...newCustomer, type: e.target.value})}
                      placeholder="Hospital, Clinic, etc."
                    />
                  </div>
                  <Button onClick={addCustomer} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </CardContent>
              </Card>

              {/* Customers List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredCustomers.map(customer => (
                        <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold">{customer.name}</h3>
                              {customer.type && <Badge variant="outline">{customer.type}</Badge>}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              <div>Contact: {customer.contact}</div>
                              {customer.email && <div>Email: {customer.email}</div>}
                              {customer.phone && <div>Phone: {customer.phone}</div>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => deleteItem(customer.id, 'customer')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Summary</CardTitle>
                  <CardDescription>Overview of current inventory status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span className="font-semibold">{inventoryData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low Stock Items:</span>
                      <span className="font-semibold text-red-600">{lowStockItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-semibold">
                        ${inventoryData.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Export Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance</CardTitle>
                  <CardDescription>Supplier statistics and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Active Suppliers:</span>
                      <span className="font-semibold">{suppliersData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top Supplier:</span>
                      <span className="font-semibold">MedSupply Co</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Response Time:</span>
                      <span className="font-semibold">2.3 days</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Export Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Analytics</CardTitle>
                  <CardDescription>Customer engagement and orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Active Customers:</span>
                      <span className="font-semibold">{customersData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hospitals:</span>
                      <span className="font-semibold">
                        {customersData.filter(c => c.type === 'Hospital').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clinics:</span>
                      <span className="font-semibold">
                        {customersData.filter(c => c.type === 'Clinic').length}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Export Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App
