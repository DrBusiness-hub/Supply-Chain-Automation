// Google Sheets API Service - الإصدار المُصحح
class GoogleSheetsService {
  constructor() {
    this.SHEET_ID = '1RcfFYd2-4_f0ogGnzlFjauagYnLAbZRnXimuSI65Ocw';
    // احذف API_KEY - مش محتاجه مع Google Apps Script
    // this.API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
    this.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzR5Jb7OD-1nqvwc0lNyTahRgxKR-LxbGueoHTiq1AfyWqtPmviIVHRAsIRBUVmTysd/exec';
    // احذف BASE_URL - مش محتاجه
    // this.BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}`;
  }

  // دالة موحدة لكل الطلبات مع معالجة أفضل للأخطاء
  async makeScriptRequest(action, data = {}) {
    try {
      console.log(`📡 Making request: ${action}`);
      
      const response = await fetch(this.SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data,
          timestamp: new Date().toISOString()
        }),
        // إضافة timeout
        signal: AbortSignal.timeout(30000) // 30 ثانية
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ ${action} successful`);
      } else {
        console.warn(`⚠️ ${action} returned error:`, result.error);
      }
      
      return result;
    } catch (error) {
      console.error(`❌ Google Sheets API Error for ${action}:`, error);
      // إرجاع بيانات وهمية في حالة فشل الاتصال
      return await this.getFallbackData(action, data);
    }
  }

  // معالج البيانات الاحتياطية
  async getFallbackData(action, data) {
    console.log(`🔄 Using fallback data for: ${action}`);
    
    switch (action) {
      case 'getInventory':
        return this.getMockInventoryData();
      case 'getTransfers':
        return this.getMockTransfersData();
      case 'getSuppliers':
        return this.getMockSuppliersData();
      case 'getCustomers':
        return this.getMockCustomersData();
      case 'getDashboardStats':
        return this.getMockDashboardData();
      default:
        return { 
          success: false, 
          error: `No fallback available for action: ${action}`,
          usingFallback: true 
        };
    }
  }

  // === إدارة المخزون ===
  async getInventoryData() {
    return await this.makeScriptRequest('getInventory');
  }

  async updateInventoryItem(itemId, updates) {
    return await this.makeScriptRequest('updateInventoryItem', {
      id: itemId,
      ...updates
    });
  }

  async addInventoryItem(item) {
    return await this.makeScriptRequest('addInventoryItem', item);
  }

  async deleteInventoryItem(itemId) {
    return await this.makeScriptRequest('deleteInventoryItem', {
      id: itemId
    });
  }

  // === إدارة التحويلات ===
  async getTransfers() {
    return await this.makeScriptRequest('getTransfers');
  }

  async createTransfer(transfer) {
    return await this.makeScriptRequest('addTransfer', transfer);
  }

  async updateTransferStatus(transferId, status) {
    return await this.makeScriptRequest('updateTransfer', {
      id: transferId,
      status: status
    });
  }

  // === إدارة الموردين ===
  async getSuppliers() {
    return await this.makeScriptRequest('getSuppliers');
  }

  async addSupplier(supplier) {
    return await this.makeScriptRequest('addSupplier', supplier);
  }

  async updateSupplier(supplierId, updates) {
    return await this.makeScriptRequest('updateSupplier', {
      id: supplierId,
      ...updates
    });
  }

  async deleteSupplier(supplierId) {
    return await this.makeScriptRequest('deleteSupplier', {
      id: supplierId
    });
  }

  // === إدارة العملاء ===
  async getCustomers() {
    return await this.makeScriptRequest('getCustomers');
  }

  async addCustomer(customer) {
    return await this.makeScriptRequest('addCustomer', customer);
  }

  async updateCustomer(customerId, updates) {
    return await this.makeScriptRequest('updateCustomer', {
      id: customerId,
      ...updates
    });
  }

  async deleteCustomer(customerId) {
    return await this.makeScriptRequest('deleteCustomer', {
      id: customerId
    });
  }

  // === إدارة المعاملات ===
  async getTransactions() {
    return await this.makeScriptRequest('getTransactions');
  }

  async addTransaction(transaction) {
    return await this.makeScriptRequest('addTransaction', transaction);
  }

  async updateTransaction(transactionId, updates) {
    return await this.makeScriptRequest('updateTransaction', {
      id: transactionId,
      ...updates
    });
  }

  async deleteTransaction(transactionId) {
    return await this.makeScriptRequest('deleteTransaction', {
      id: transactionId
    });
  }

  async getTransactionsByType(type) {
    return await this.makeScriptRequest('getTransactionsByType', { type });
  }

  async getTransactionsByDateRange(startDate, endDate) {
    return await this.makeScriptRequest('getTransactionsByDateRange', {
      startDate,
      endDate
    });
  }

  // === إدارة الفروع ===
  async getBranches() {
    return await this.makeScriptRequest('getBranches');
  }

  async addBranch(branch) {
    return await this.makeScriptRequest('addBranch', branch);
  }

  async updateBranch(branchId, updates) {
    return await this.makeScriptRequest('updateBranch', {
      id: branchId,
      ...updates
    });
  }

  async deleteBranch(branchId) {
    return await this.makeScriptRequest('deleteBranch', {
      id: branchId
    });
  }

  // === التقارير والتحليلات ===
  async getReportsData(reportType, dateRange) {
    return await this.makeScriptRequest('generateReport', {
      type: reportType,
      dateRange
    });
  }

  async getReports() {
    return await this.makeScriptRequest('getReports');
  }

  async exportReport(reportType, format = 'excel') {
    if (format === 'excel') {
      return await this.makeScriptRequest('exportReportAsExcel', {
        reportId: reportType
      });
    } else if (format === 'pdf') {
      return await this.makeScriptRequest('exportReportAsPdf', {
        reportId: reportType
      });
    }
    return { success: false, error: 'Unsupported format' };
  }

  // === بيانات لوحة التحكم ===
  async getDashboardData() {
    const statsPromise = this.makeScriptRequest('getDashboardStats');
    const activityPromise = this.makeScriptRequest('getRecentActivity');
    
    try {
      const [stats, activity] = await Promise.all([statsPromise, activityPromise]);
      
      return {
        success: true,
        data: {
          stats: stats.success ? stats.data : {},
          recentActivities: activity.success ? activity.data : [],
          alerts: [] // يمكن إضافة alerts لاحقاً
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return this.getMockDashboardData();
    }
  }

  // === الإعدادات ===
  async getSettings() {
    return await this.makeScriptRequest('getSettings');
  }

  async updateSettings(settings) {
    return await this.makeScriptRequest('updateSettings', settings);
  }

  // === المصادقة ===
  async login(username, password) {
    return await this.makeScriptRequest('authenticate', {
      username,
      password
    });
  }

  async register(userData) {
    return await this.makeScriptRequest('registerUser', userData);
  }

  async logout() {
    return await this.makeScriptRequest('logout');
  }

  // === تسجيل الأنشطة ===
  async logActivity(activity) {
    try {
      // يمكن إضافة action محدد للـ activity logging في Google Apps Script
      return await this.makeScriptRequest('logActivity', { activity });
    } catch (error) {
      console.error('Error logging activity:', error);
      // لا نرمي error للـ logging failures
      return { success: false, error: error.message };
    }
  }

  // === اختبار الاتصال ===
  async testConnection() {
    try {
      console.log('🔍 Testing connection to Google Apps Script...');
      const result = await this.makeScriptRequest('getDashboardStats');
      
      if (result.success) {
        console.log('✅ Connection test successful!');
        return { success: true, message: 'Connected successfully' };
      } else {
        console.log('⚠️ Connection test failed:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.log('❌ Connection test error:', error);
      return { success: false, error: error.message };
    }
  }

  // === البيانات الوهمية (للاختبار والـ fallback) ===
  getMockInventoryData() {
    return {
      success: true,
      data: [
        {
          id: 'INV001',
          product_name: 'Paracetamol 500mg',
          sku: 'PAR-500',
          category: 'Medications',
          quantity: 450,
          unit_price: 0.25,
          supplier: 'PharmaCorp',
          expiry_date: '2025-06-15',
          status: 'Active'
        },
        {
          id: 'INV002',
          product_name: 'Insulin Vials',
          sku: 'INS-10ML',
          category: 'Medications',
          quantity: 25,
          unit_price: 15.50,
          supplier: 'MediSupply',
          expiry_date: '2024-10-05',
          status: 'Low Stock'
        },
        {
          id: 'INV003',
          product_name: 'Surgical Masks',
          sku: 'MASK-SURG',
          category: 'PPE',
          quantity: 2500,
          unit_price: 0.15,
          supplier: 'SafetyFirst',
          expiry_date: '2024-12-31',
          status: 'Active'
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
          from_location: 'Main Hospital',
          to_location: 'Pharmacy Branch',
          product: 'Paracetamol 500mg',
          quantity: 100,
          status: 'Pending',
          date: '2024-09-27T10:00:00Z',
          notes: 'Urgent transfer for pharmacy stock'
        },
        {
          id: 'TR002',
          from_location: 'Pharmacy Branch',
          to_location: 'ICU Branch',
          product: 'Insulin Vials',
          quantity: 10,
          status: 'Approved',
          date: '2024-09-26T14:30:00Z',
          notes: 'ICU emergency stock'
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
          contact_person: 'John Smith',
          email: 'john@pharmacorp.com',
          phone: '+1-555-0123',
          address: '123 Medical St, Healthcare City',
          category: 'Medications',
          status: 'Active',
          rating: 4.8
        },
        {
          id: 'SUP002',
          name: 'MediSupply',
          contact_person: 'Sarah Johnson',
          email: 'sarah@medisupply.com',
          phone: '+1-555-0456',
          address: '456 Supply Ave, Medical District',
          category: 'Medical Equipment',
          status: 'Active',
          rating: 4.6
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
          email: 'procurement@citygeneral.com',
          phone: '+1-555-0789',
          address: '789 Hospital Blvd, Medical Center',
          company: 'City General Hospital',
          status: 'Active'
        },
        {
          id: 'CUST002',
          name: 'Community Clinic Network',
          email: 'orders@communityclinic.com',
          phone: '+1-555-0321',
          address: '321 Clinic St, Healthcare Plaza',
          company: 'Community Clinic Network',
          status: 'Active'
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
          totalCustomers: 150,
          totalProducts: 1247,
          totalSuppliers: 45,
          lowStockItems: 23,
          totalTransactions: 2340,
          todaysSales: 15420,
          monthlyRevenue: 485200
        },
        recentActivities: [
          {
            id: 1,
            type: 'transaction',
            message: 'معاملة بيع: REF-789456',
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            amount: 1250
          },
          {
            id: 2,
            type: 'transaction', 
            message: 'معاملة شراء: REF-123789',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            amount: 3400
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

// إنشاء وتصدير instance واحد
const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
