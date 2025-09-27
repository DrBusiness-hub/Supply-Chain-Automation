// Google Sheets API Service
class GoogleSheetsService {
  constructor() {
    this.SHEET_ID = '1RcfFYd2-4_f0ogGnzlFjauagYnLAbZRnXimuSI65Ocw';
    this.API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
    this.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcSLT_ey6PWqlsmo34PQVxrfC6J-Nzv2Bj_-0KDMio6ocy00zHupt5l7l25FKB3dYj/exec';
    this.BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}`;
  }

  // Generic method to make requests to Google Apps Script
  async makeScriptRequest(action, data = {}) {
    try {
      const response = await fetch(this.SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Google Sheets API Error:', error);
      throw error;
    }
  }

  // Inventory Management
  async getInventoryData() {
    try {
      return await this.makeScriptRequest('getInventory');
    } catch (error) {
      console.error('Error fetching inventory:', error);
      // Return mock data as fallback
      return this.getMockInventoryData();
    }
  }

  async updateInventoryItem(itemId, updates) {
    try {
      return await this.makeScriptRequest('updateInventory', {
        itemId,
        updates
      });
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  }

  async addInventoryItem(item) {
    try {
      return await this.makeScriptRequest('addInventory', { item });
    } catch (error) {
      console.error('Error adding inventory item:', error);
      throw error;
    }
  }

  // Transfers Management
  async getTransfers() {
    try {
      return await this.makeScriptRequest('getTransfers');
    } catch (error) {
      console.error('Error fetching transfers:', error);
      return this.getMockTransfersData();
    }
  }

  async createTransfer(transfer) {
    try {
      return await this.makeScriptRequest('createTransfer', { transfer });
    } catch (error) {
      console.error('Error creating transfer:', error);
      throw error;
    }
  }

  async updateTransferStatus(transferId, status) {
    try {
      return await this.makeScriptRequest('updateTransferStatus', {
        transferId,
        status
      });
    } catch (error) {
      console.error('Error updating transfer status:', error);
      throw error;
    }
  }

  // Suppliers Management
  async getSuppliers() {
    try {
      return await this.makeScriptRequest('getSuppliers');
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      return this.getMockSuppliersData();
    }
  }

  async addSupplier(supplier) {
    try {
      return await this.makeScriptRequest('addSupplier', { supplier });
    } catch (error) {
      console.error('Error adding supplier:', error);
      throw error;
    }
  }

  async updateSupplier(supplierId, updates) {
    try {
      return await this.makeScriptRequest('updateSupplier', {
        supplierId,
        updates
      });
    } catch (error) {
      console.error('Error updating supplier:', error);
      throw error;
    }
  }

  // Customers Management
  async getCustomers() {
    try {
      return await this.makeScriptRequest('getCustomers');
    } catch (error) {
      console.error('Error fetching customers:', error);
      return this.getMockCustomersData();
    }
  }

  async addCustomer(customer) {
    try {
      return await this.makeScriptRequest('addCustomer', { customer });
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  }

  // Reports and Analytics
  async getReportsData(reportType, dateRange) {
    try {
      return await this.makeScriptRequest('getReports', {
        reportType,
        dateRange
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
      return this.getMockReportsData(reportType);
    }
  }

  async exportReport(reportType, format = 'excel') {
    try {
      return await this.makeScriptRequest('exportReport', {
        reportType,
        format
      });
    } catch (error) {
      console.error('Error exporting report:', error);
      throw error;
    }
  }

  // Dashboard Data
  async getDashboardData() {
    try {
      return await this.makeScriptRequest('getDashboard');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return this.getMockDashboardData();
    }
  }

  // Audit Trail
  async logActivity(activity) {
    try {
      return await this.makeScriptRequest('logActivity', { activity });
    } catch (error) {
      console.error('Error logging activity:', error);
      // Don't throw error for logging failures
    }
  }

  // Mock Data Methods (Fallback when API is unavailable)
  getMockInventoryData() {
    return {
      success: true,
      data: [
        {
          id: 'INV001',
          name: 'Paracetamol 500mg',
          category: 'Medications',
          currentStock: 450,
          minStock: 100,
          maxStock: 1000,
          unit: 'tablets',
          location: 'A1-B2',
          expiryDate: '2025-06-15',
          supplier: 'PharmaCorp',
          cost: 0.25,
          lastUpdated: '2024-09-27T10:30:00Z'
        },
        {
          id: 'INV002',
          name: 'Insulin Vials',
          category: 'Medications',
          currentStock: 25,
          minStock: 50,
          maxStock: 200,
          unit: 'vials',
          location: 'C1-D3',
          expiryDate: '2024-10-05',
          supplier: 'MediSupply',
          cost: 15.50,
          lastUpdated: '2024-09-27T09:15:00Z'
        },
        {
          id: 'INV003',
          name: 'Surgical Masks',
          category: 'PPE',
          currentStock: 2500,
          minStock: 1000,
          maxStock: 5000,
          unit: 'pieces',
          location: 'E1-F2',
          expiryDate: '2024-12-31',
          supplier: 'SafetyFirst',
          cost: 0.15,
          lastUpdated: '2024-09-27T08:45:00Z'
        }
      ]
    };
  }

  getMockTransfersData() {
    return {
      success: true,
      data: [
        {
          id: 'TR001',
          fromBranch: 'Main Hospital',
          toBranch: 'Pharmacy Branch',
          items: [
            { name: 'Paracetamol 500mg', quantity: 100, unit: 'tablets' }
          ],
          status: 'pending',
          requestedBy: 'manager@rama.com',
          requestDate: '2024-09-27T10:00:00Z',
          notes: 'Urgent transfer for pharmacy stock'
        },
        {
          id: 'TR002',
          fromBranch: 'Pharmacy Branch',
          toBranch: 'ICU Branch',
          items: [
            { name: 'Insulin Vials', quantity: 10, unit: 'vials' }
          ],
          status: 'approved',
          requestedBy: 'nurse@rama.com',
          requestDate: '2024-09-26T14:30:00Z',
          approvedBy: 'admin@rama.com',
          approvedDate: '2024-09-26T15:00:00Z'
        }
      ]
    };
  }

  getMockSuppliersData() {
    return {
      success: true,
      data: [
        {
          id: 'SUP001',
          name: 'PharmaCorp',
          contact: 'John Smith',
          email: 'john@pharmacorp.com',
          phone: '+1-555-0123',
          address: '123 Medical St, Healthcare City',
          category: 'Medications',
          rating: 4.8,
          status: 'active',
          lastOrder: '2024-09-25'
        },
        {
          id: 'SUP002',
          name: 'MediSupply',
          contact: 'Sarah Johnson',
          email: 'sarah@medisupply.com',
          phone: '+1-555-0456',
          address: '456 Supply Ave, Medical District',
          category: 'Medical Equipment',
          rating: 4.6,
          status: 'active',
          lastOrder: '2024-09-20'
        }
      ]
    };
  }

  getMockCustomersData() {
    return {
      success: true,
      data: [
        {
          id: 'CUST001',
          name: 'City General Hospital',
          contact: 'Dr. Michael Brown',
          email: 'procurement@citygeneral.com',
          phone: '+1-555-0789',
          address: '789 Hospital Blvd, Medical Center',
          type: 'Hospital',
          creditLimit: 50000,
          currentBalance: 12500,
          status: 'active'
        },
        {
          id: 'CUST002',
          name: 'Community Clinic Network',
          contact: 'Lisa Davis',
          email: 'orders@communityclinic.com',
          phone: '+1-555-0321',
          address: '321 Clinic St, Healthcare Plaza',
          type: 'Clinic',
          creditLimit: 25000,
          currentBalance: 5750,
          status: 'active'
        }
      ]
    };
  }

  getMockReportsData(reportType) {
    const baseData = {
      success: true,
      reportType,
      generatedAt: new Date().toISOString(),
      dateRange: {
        start: '2024-09-01',
        end: '2024-09-27'
      }
    };

    switch (reportType) {
      case 'inventory':
        return {
          ...baseData,
          data: {
            totalItems: 1247,
            lowStockItems: 23,
            expiringItems: 7,
            totalValue: 125000,
            categories: [
              { name: 'Medications', count: 450, value: 85000 },
              { name: 'PPE', count: 320, value: 15000 },
              { name: 'Medical Equipment', count: 180, value: 25000 }
            ]
          }
        };
      case 'financial':
        return {
          ...baseData,
          data: {
            revenue: 1200000,
            expenses: 850000,
            profit: 350000,
            profitMargin: 29.2,
            monthlyTrend: [
              { month: 'Jan', revenue: 95000, expenses: 68000 },
              { month: 'Feb', revenue: 102000, expenses: 72000 },
              { month: 'Mar', revenue: 118000, expenses: 78000 }
            ]
          }
        };
      default:
        return baseData;
    }
  }

  getMockDashboardData() {
    return {
      success: true,
      data: {
        stats: {
          totalItems: 1247,
          lowStockAlerts: 23,
          expiringItems: 7,
          monthlyProcurement: 45200
        },
        recentActivities: [
          {
            id: 1,
            action: 'Inventory Update',
            user: 'admin@rama.com',
            details: '47 items updated',
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            action: 'Transfer Approved',
            user: 'manager@rama.com',
            details: 'Transfer TR-001 approved',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
          }
        ],
        alerts: [
          {
            type: 'low_stock',
            message: 'Insulin Vials - Only 25 units remaining',
            severity: 'high',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
          },
          {
            type: 'expiry',
            message: 'Surgical Masks expiring in 7 days',
            severity: 'medium',
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
          }
        ]
      }
    };
  }
}

// Create and export a singleton instance
const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
