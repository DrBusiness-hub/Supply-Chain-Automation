import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  Plus,
  RefreshCw,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Archive
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

const ReportsSectionNew = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [newReport, setNewReport] = useState({
    type: 'inventory',
    dateRange: 'last_30_days',
    format: 'pdf',
    recipients: ''
  });

  // Fetch reports from API
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reports/');
      const data = await response.json();
      
      if (data.success) {
        setReports(data.reports);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async (reportId) => {
    try {
      const response = await fetch(`/api/reports/${reportId}/export/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `report_${reportId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const handleExportExcel = async (reportId) => {
    try {
      const response = await fetch(`/api/reports/${reportId}/export/excel`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `report_${reportId}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting Excel:', error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReport),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowGenerateDialog(false);
        fetchReports(); // Refresh reports list
        setNewReport({
          type: 'inventory',
          dateRange: 'last_30_days',
          format: 'pdf',
          recipients: ''
        });
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleBulkExport = async (format) => {
    const selectedReports = reports.filter(r => r.status === 'Ready').map(r => r.id);
    
    try {
      const response = await fetch('/api/reports/bulk-export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_ids: selectedReports,
          format: format
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Bulk export started:', data.message);
      }
    } catch (error) {
      console.error('Error with bulk export:', error);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type.toLowerCase() === filterType.toLowerCase();
    const matchesDate = filterDate === 'all'; // Add date filtering logic as needed
    return matchesSearch && matchesType && matchesDate;
  });

  const getStatusBadge = (status) => {
    const variants = {
      'Ready': { variant: 'default', className: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
      'Processing': { variant: 'secondary', className: 'bg-amber-100 text-amber-800', icon: Clock },
      'Failed': { variant: 'destructive', className: '', icon: AlertCircle }
    };
    const config = variants[status] || { variant: 'default', className: '', icon: FileText };
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const stats = [
    {
      title: 'Total Reports',
      value: reports.length.toString(),
      change: '+3',
      changeType: 'positive',
      description: 'this month',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Ready Reports',
      value: reports.filter(r => r.status === 'Ready').length.toString(),
      change: '+2',
      changeType: 'positive',
      description: 'available now',
      icon: CheckCircle,
      color: 'emerald'
    },
    {
      title: 'Processing',
      value: reports.filter(r => r.status === 'Processing').length.toString(),
      change: '0',
      changeType: 'neutral',
      description: 'in queue',
      icon: Clock,
      color: 'amber'
    },
    {
      title: 'Total Size',
      value: '12.8 MB',
      change: '+2.1',
      changeType: 'positive',
      description: 'storage used',
      icon: Archive,
      color: 'purple'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Loading reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Documents</h1>
          <p className="text-gray-600 mt-1">Generate, view, and export business reports</p>
        </div>
        <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={newReport.type} onValueChange={(value) => 
                  setNewReport(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inventory">Inventory Status</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="transfers">Transfers</SelectItem>
                    <SelectItem value="financial">Financial Summary</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={newReport.dateRange} onValueChange={(value) => 
                  setNewReport(prev => ({ ...prev, dateRange: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                    <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                    <SelectItem value="current_month">Current Month</SelectItem>
                    <SelectItem value="last_month">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="recipients">Email Recipients (Optional)</Label>
                <Textarea
                  placeholder="Enter email addresses separated by commas"
                  value={newReport.recipients}
                  onChange={(e) => setNewReport(prev => ({ ...prev, recipients: e.target.value }))}
                />
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateReport} className="bg-gradient-to-r from-blue-600 to-emerald-500">
                  Generate Report
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reports..."
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
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="procurement">Procurement</SelectItem>
                <SelectItem value="transfers">Transfers</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger>
                <SelectValue placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={fetchReports} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>

            <Button variant="outline" onClick={() => handleBulkExport('pdf')} className="w-full">
              <Archive className="w-4 h-4 mr-2" />
              Bulk Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Available Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{report.name}</p>
                          <p className="text-sm text-gray-500">Complete report with detailed analysis</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{report.date}</TableCell>
                    <TableCell>
                      {getStatusBadge(report.status)}
                    </TableCell>
                    <TableCell className="text-gray-600">{report.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {report.status === 'Ready' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleExportPDF(report.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleExportExcel(report.id)}
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              <FileSpreadsheet className="w-4 h-4" />
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

      {/* Quick Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Quick Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleBulkExport('pdf')}
            >
              <Download className="w-6 h-6 text-red-600" />
              <div className="text-center">
                <p className="font-medium">Export as PDF</p>
                <p className="text-xs text-gray-500">Formatted reports</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => handleBulkExport('excel')}
            >
              <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
              <div className="text-center">
                <p className="font-medium">Export as Excel</p>
                <p className="text-xs text-gray-500">Data analysis</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Archive className="w-6 h-6 text-blue-600" />
              <div className="text-center">
                <p className="font-medium">Bulk Download</p>
                <p className="text-xs text-gray-500">Multiple reports</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="w-6 h-6 text-purple-600" />
              <div className="text-center">
                <p className="font-medium">Schedule Export</p>
                <p className="text-xs text-gray-500">Automated reports</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSectionNew;

