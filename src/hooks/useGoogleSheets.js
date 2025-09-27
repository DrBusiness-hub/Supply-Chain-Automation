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
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
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
  const { loading, error, handleRequest } = useGoogleSheets();

  const fetchInventory = useCallback(async () => {
    const result = await handleRequest(googleSheetsService.getInventoryData.bind(googleSheetsService));
    if (result.success) {
      setInventory(result.data);
    }
    return result;
  }, [handleRequest]);

  const updateItem = useCallback(async (itemId, updates) => {
    const result = await handleRequest(
      googleSheetsService.updateInventoryItem.bind(googleSheetsService),
      itemId,
      updates
    );
    if (result.success) {
      // Update local state
      setInventory(prev => prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      ));
    }
    return result;
  }, [handleRequest]);

  const addItem = useCallback(async (item) => {
    const result = await handleRequest(
      googleSheetsService.addInventoryItem.bind(googleSheetsService),
      item
    );
    if (result.success && result.data) {
      setInventory(prev => [...prev, result.data]);
    }
    return result;
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
    addItem
  };
};

// Hook for transfers data
export const useTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const { loading, error, handleRequest } = useGoogleSheets();

  const fetchTransfers = useCallback(async () => {
    const result = await handleRequest(googleSheetsService.getTransfers.bind(googleSheetsService));
    if (result.success) {
      setTransfers(result.data);
    }
    return result;
  }, [handleRequest]);

  const createTransfer = useCallback(async (transfer) => {
    const result = await handleRequest(
      googleSheetsService.createTransfer.bind(googleSheetsService),
      transfer
    );
    if (result.success && result.data) {
      setTransfers(prev => [...prev, result.data]);
    }
    return result;
  }, [handleRequest]);

  const updateTransferStatus = useCallback(async (transferId, status) => {
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
    updateTransferStatus
  };
};

// Hook for suppliers data
export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const { loading, error, handleRequest } = useGoogleSheets();

  const fetchSuppliers = useCallback(async () => {
    const result = await handleRequest(googleSheetsService.getSuppliers.bind(googleSheetsService));
    if (result.success) {
      setSuppliers(result.data);
    }
    return result;
  }, [handleRequest]);

  const addSupplier = useCallback(async (supplier) => {
    const result = await handleRequest(
      googleSheetsService.addSupplier.bind(googleSheetsService),
      supplier
    );
    if (result.success && result.data) {
      setSuppliers(prev => [...prev, result.data]);
    }
    return result;
  }, [handleRequest]);

  const updateSupplier = useCallback(async (supplierId, updates) => {
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
    updateSupplier
  };
};

// Hook for customers data
export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const { loading, error, handleRequest } = useGoogleSheets();

  const fetchCustomers = useCallback(async () => {
    const result = await handleRequest(googleSheetsService.getCustomers.bind(googleSheetsService));
    if (result.success) {
      setCustomers(result.data);
    }
    return result;
  }, [handleRequest]);

  const addCustomer = useCallback(async (customer) => {
    const result = await handleRequest(
      googleSheetsService.addCustomer.bind(googleSheetsService),
      customer
    );
    if (result.success && result.data) {
      setCustomers(prev => [...prev, result.data]);
    }
    return result;
  }, [handleRequest]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    addCustomer
  };
};

// Hook for dashboard data
export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { loading, error, handleRequest } = useGoogleSheets();

  const fetchDashboardData = useCallback(async () => {
    const result = await handleRequest(googleSheetsService.getDashboardData.bind(googleSheetsService));
    if (result.success) {
      setDashboardData(result.data);
    }
    return result;
  }, [handleRequest]);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up periodic refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  return {
    dashboardData,
    loading,
    error,
    fetchDashboardData
  };
};

// Hook for reports
export const useReports = () => {
  const [reportsData, setReportsData] = useState({});
  const { loading, error, handleRequest } = useGoogleSheets();

  const fetchReport = useCallback(async (reportType, dateRange) => {
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
  }, [handleRequest]);

  const exportReport = useCallback(async (reportType, format = 'excel') => {
    return await handleRequest(
      googleSheetsService.exportReport.bind(googleSheetsService),
      reportType,
      format
    );
  }, [handleRequest]);

  return {
    reportsData,
    loading,
    error,
    fetchReport,
    exportReport
  };
};

// Hook for activity logging
export const useActivityLogger = () => {
  const logActivity = useCallback(async (activity) => {
    try {
      await googleSheetsService.logActivity({
        ...activity,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.warn('Failed to log activity:', error);
      // Don't throw error for logging failures
    }
  }, []);

  return { logActivity };
};
