import { useState, useEffect, useCallback } from 'react';
import googleSheetsService from '../services/googleSheetsService';

// Custom hook for managing Google Sheets data
export const useGoogleSheets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = useCallback(async (requestFn, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await requestFn(...args);
      
      // تحقق من نجاح الطلب
      if (!result.success && result.error) {
        setError(result.error);
        throw new Error(result.error);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.message || 'حدث خطأ غير متوقع';
      setError(errorMessage);
      console.error('Request error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    handleRequest,
    clearError: () => setError(null)
  };
};

// Hook for inventory data
export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchInventory = useCallback(async () => {
    try {
      // استخدام الدالة المُصححة
      const result = await handleRequest(googleSheetsService.getInventoryData.bind(googleSheetsService));
      if (result.success && result.data) {
        setInventory(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const updateItem = useCallback(async (itemId, updates) => {
    try {
      const result = await handleRequest(
        googleSheetsService.updateInventoryItem.bind(googleSheetsService),
        itemId,
        updates
      );
      if (result.success) {
        // تحديث البيانات المحلية
        setInventory(prev => prev.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        ));
      }
      return result;
    } catch (err) {
      console.error('Failed to update inventory item:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const addItem = useCallback(async (item) => {
    try {
      const result = await handleRequest(
        googleSheetsService.addInventoryItem.bind(googleSheetsService),
        item
      );
      if (result.success && result.data) {
        setInventory(prev => [...prev, result.data]);
      }
      return result;
    } catch (err) {
      console.error('Failed to add inventory item:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const deleteItem = useCallback(async (itemId) => {
    try {
      const result = await handleRequest(
        googleSheetsService.deleteInventoryItem.bind(googleSheetsService),
        itemId
      );
      if (result.success) {
        setInventory(prev => prev.filter(item => item.id !== itemId));
      }
      return result;
    } catch (err) {
      console.error('Failed to delete inventory item:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return {
    inventory,
    loading,
    error,
    fetchInventory,
    updateItem,
    addItem,
    deleteItem,
    clearError
  };
};

// Hook for transfers data
export const useTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchTransfers = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getTransfers.bind(googleSheetsService));
      if (result.success && result.data) {
        setTransfers(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch transfers:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const createTransfer = useCallback(async (transfer) => {
    try {
      const result = await handleRequest(
        googleSheetsService.createTransfer.bind(googleSheetsService),
        transfer
      );
      if (result.success && result.data) {
        setTransfers(prev => [...prev, result.data]);
      }
      return result;
    } catch (err) {
      console.error('Failed to create transfer:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const updateTransferStatus = useCallback(async (transferId, status) => {
    try {
      const result = await handleRequest(
        googleSheetsService.updateTransferStatus.bind(googleSheetsService),
        transferId,
        status
      );
      if (result.success) {
        setTransfers(prev => prev.map(transfer => 
          transfer.id === transferId ? { ...transfer, status } : transfer
        ));
      }
      return result;
    } catch (err) {
      console.error('Failed to update transfer status:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  return {
    transfers,
    loading,
    error,
    fetchTransfers,
    createTransfer,
    updateTransferStatus,
    clearError
  };
};

// Hook for suppliers data
export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchSuppliers = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getSuppliers.bind(googleSheetsService));
      if (result.success && result.data) {
        setSuppliers(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch suppliers:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const addSupplier = useCallback(async (supplier) => {
    try {
      const result = await handleRequest(
        googleSheetsService.addSupplier.bind(googleSheetsService),
        supplier
      );
      if (result.success && result.data) {
        setSuppliers(prev => [...prev, result.data]);
      }
      return result;
    } catch (err) {
      console.error('Failed to add supplier:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const updateSupplier = useCallback(async (supplierId, updates) => {
    try {
      const result = await handleRequest(
        googleSheetsService.updateSupplier.bind(googleSheetsService),
        supplierId,
        updates
      );
      if (result.success) {
        setSuppliers(prev => prev.map(supplier => 
          supplier.id === supplierId ? { ...supplier, ...updates } : supplier
        ));
      }
      return result;
    } catch (err) {
      console.error('Failed to update supplier:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const deleteSupplier = useCallback(async (supplierId) => {
    try {
      const result = await handleRequest(
        googleSheetsService.deleteSupplier.bind(googleSheetsService),
        supplierId
      );
      if (result.success) {
        setSuppliers(prev => prev.filter(supplier => supplier.id !== supplierId));
      }
      return result;
    } catch (err) {
      console.error('Failed to delete supplier:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return {
    suppliers,
    loading,
    error,
    fetchSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    clearError
  };
};

// Hook for customers data
export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchCustomers = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getCustomers.bind(googleSheetsService));
      if (result.success && result.data) {
        setCustomers(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const addCustomer = useCallback(async (customer) => {
    try {
      const result = await handleRequest(
        googleSheetsService.addCustomer.bind(googleSheetsService),
        customer
      );
      if (result.success && result.data) {
        setCustomers(prev => [...prev, result.data]);
      }
      return result;
    } catch (err) {
      console.error('Failed to add customer:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const updateCustomer = useCallback(async (customerId, updates) => {
    try {
      const result = await handleRequest(
        googleSheetsService.updateCustomer.bind(googleSheetsService),
        customerId,
        updates
      );
      if (result.success) {
        setCustomers(prev => prev.map(customer => 
          customer.id === customerId ? { ...customer, ...updates } : customer
        ));
      }
      return result;
    } catch (err) {
      console.error('Failed to update customer:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const deleteCustomer = useCallback(async (customerId) => {
    try {
      const result = await handleRequest(
        googleSheetsService.deleteCustomer.bind(googleSheetsService),
        customerId
      );
      if (result.success) {
        setCustomers(prev => prev.filter(customer => customer.id !== customerId));
      }
      return result;
    } catch (err) {
      console.error('Failed to delete customer:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    clearError
  };
};

// Hook للمعاملات - جديد
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchTransactions = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getTransactions.bind(googleSheetsService));
      if (result.success && result.data) {
        setTransactions(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const addTransaction = useCallback(async (transaction) => {
    try {
      const result = await handleRequest(
        googleSheetsService.addTransaction.bind(googleSheetsService),
        transaction
      );
      if (result.success && result.data) {
        setTransactions(prev => [...prev, result.data]);
      }
      return result;
    } catch (err) {
      console.error('Failed to add transaction:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const updateTransaction = useCallback(async (transactionId, updates) => {
    try {
      const result = await handleRequest(
        googleSheetsService.updateTransaction.bind(googleSheetsService),
        transactionId,
        updates
      );
      if (result.success) {
        setTransactions(prev => prev.map(transaction => 
          transaction.id === transactionId ? { ...transaction, ...updates } : transaction
        ));
      }
      return result;
    } catch (err) {
      console.error('Failed to update transaction:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const deleteTransaction = useCallback(async (transactionId) => {
    try {
      const result = await handleRequest(
        googleSheetsService.deleteTransaction.bind(googleSheetsService),
        transactionId
      );
      if (result.success) {
        setTransactions(prev => prev.filter(transaction => transaction.id !== transactionId));
      }
      return result;
    } catch (err) {
      console.error('Failed to delete transaction:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const getTransactionsByType = useCallback(async (type) => {
    try {
      const result = await handleRequest(
        googleSheetsService.getTransactionsByType.bind(googleSheetsService),
        type
      );
      return result;
    } catch (err) {
      console.error('Failed to get transactions by type:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const getTransactionsByDateRange = useCallback(async (startDate, endDate) => {
    try {
      const result = await handleRequest(
        googleSheetsService.getTransactionsByDateRange.bind(googleSheetsService),
        startDate,
        endDate
      );
      return result;
    } catch (err) {
      console.error('Failed to get transactions by date range:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByType,
    getTransactionsByDateRange,
    clearError
  };
};

// Hook للفروع - جديد
export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchBranches = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getBranches.bind(googleSheetsService));
      if (result.success && result.data) {
        setBranches(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch branches:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const addBranch = useCallback(async (branch) => {
    try {
      const result = await handleRequest(
        googleSheetsService.addBranch.bind(googleSheetsService),
        branch
      );
      if (result.success && result.data) {
        setBranches(prev => [...prev, result.data]);
      }
      return result;
    } catch (err) {
      console.error('Failed to add branch:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const updateBranch = useCallback(async (branchId, updates) => {
    try {
      const result = await handleRequest(
        googleSheetsService.updateBranch.bind(googleSheetsService),
        branchId,
        updates
      );
      if (result.success) {
        setBranches(prev => prev.map(branch => 
          branch.id === branchId ? { ...branch, ...updates } : branch
        ));
      }
      return result;
    } catch (err) {
      console.error('Failed to update branch:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const deleteBranch = useCallback(async (branchId) => {
    try {
      const result = await handleRequest(
        googleSheetsService.deleteBranch.bind(googleSheetsService),
        branchId
      );
      if (result.success) {
        setBranches(prev => prev.filter(branch => branch.id !== branchId));
      }
      return result;
    } catch (err) {
      console.error('Failed to delete branch:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches,
    loading,
    error,
    fetchBranches,
    addBranch,
    updateBranch,
    deleteBranch,
    clearError
  };
};

// Hook for dashboard data - مُحسن
export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchDashboardData = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getDashboardData.bind(googleSheetsService));
      if (result.success && result.data) {
        setDashboardData(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchDashboardData();
    
    // تحديث كل 5 دقائق
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  return {
    dashboardData,
    loading,
    error,
    fetchDashboardData,
    clearError
  };
};

// Hook for reports - مُحسن
export const useReports = () => {
  const [reportsData, setReportsData] = useState({});
  const [reportsList, setReportsList] = useState([]);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchReports = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getReports.bind(googleSheetsService));
      if (result.success && result.data) {
        setReportsList(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch reports:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const fetchReport = useCallback(async (reportType, dateRange) => {
    try {
      const result = await handleRequest(
        googleSheetsService.getReportsData.bind(googleSheetsService),
        reportType,
        dateRange
      );
      if (result.success) {
        setReportsData(prev => ({
          ...prev,
          [reportType]: result.data
        }));
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch report:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const generateReport = useCallback(async (reportType, parameters) => {
    try {
      const result = await handleRequest(
        googleSheetsService.getReportsData.bind(googleSheetsService),
        reportType,
        parameters
      );
      return result;
    } catch (err) {
      console.error('Failed to generate report:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const exportReport = useCallback(async (reportType, format = 'excel') => {
    try {
      return await handleRequest(
        googleSheetsService.exportReport.bind(googleSheetsService),
        reportType,
        format
      );
    } catch (err) {
      console.error('Failed to export report:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reportsData,
    reportsList,
    loading,
    error,
    fetchReports,
    fetchReport,
    generateReport,
    exportReport,
    clearError
  };
};

// Hook للإعدادات - جديد
export const useSettings = () => {
  const [settings, setSettings] = useState({});
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const fetchSettings = useCallback(async () => {
    try {
      const result = await handleRequest(googleSheetsService.getSettings.bind(googleSheetsService));
      if (result.success && result.data) {
        setSettings(result.data);
      }
      return result;
    } catch (err) {
      console.error('Failed to fetch settings:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const updateSettings = useCallback(async (newSettings) => {
    try {
      const result = await handleRequest(
        googleSheetsService.updateSettings.bind(googleSheetsService),
        newSettings
      );
      if (result.success) {
        setSettings(prev => ({ ...prev, ...newSettings }));
      }
      return result;
    } catch (err) {
      console.error('Failed to update settings:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    clearError
  };
};

// Hook للمصادقة - جديد
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loading, error, handleRequest, clearError } = useGoogleSheets();

  const login = useCallback(async (username, password) => {
    try {
      const result = await handleRequest(
        googleSheetsService.login.bind(googleSheetsService),
        username,
        password
      );
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      return result;
    } catch (err) {
      console.error('Failed to login:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const register = useCallback(async (userData) => {
    try {
      const result = await handleRequest(
        googleSheetsService.register.bind(googleSheetsService),
        userData
      );
      return result;
    } catch (err) {
      console.error('Failed to register:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  const logout = useCallback(async () => {
    try {
      await handleRequest(googleSheetsService.logout.bind(googleSheetsService));
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      return { success: true };
    } catch (err) {
      console.error('Failed to logout:', err);
      return { success: false, error: err.message };
    }
  }, [handleRequest]);

  // تحقق من وجود مستخدم محفوظ عند تحميل التطبيق
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse saved user:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError
  };
};

// Hook لتسجيل الأنشطة
export const useActivityLogger = () => {
  const logActivity = useCallback(async (activity) => {
    try {
      await googleSheetsService.logActivity({
        ...activity,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    } catch (error) {
      console.warn('Failed to log activity:', error);
      // لا نرمي خطأ لفشل التسجيل
    }
  }, []);

  return { logActivity };
};

// Hook لاختبار الاتصال
export const useConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const testConnection = useCallback(async () => {
    try {
      const result = await googleSheetsService.testConnection();
      setConnectionStatus(result);
      return result;
    } catch (error) {
      const errorResult = { success: false, error: error.message };
      setConnectionStatus(errorResult);
      return errorResult;
    }
  }, []);

  // مراقبة حالة الإنترنت
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // اختبار الاتصال عند تحميل التطبيق
  useEffect(() => {
    if (isOnline) {
      testConnection();
    }
  }, [isOnline, testConnection]);

  return {
    connectionStatus,
    isOnline,
    testConnection
  };
};
