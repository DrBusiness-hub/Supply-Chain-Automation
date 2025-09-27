import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Search,
  FileSpreadsheet,
  Eye,
  RefreshCw
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

const mockReports = [
  {
    id: 1,
    name: 'Inventory Status Report',
    type: 'Inventory',
    date: '2024-01-15',
    status: 'Ready',
    size: '2.3 MB',
    description: 'Complete inventory status across all branches'
  },
  {
    id: 2,
    name: 'Monthly Procurement Report',
    type: 'Procurement',
    date: '2024-01-14',
    status: 'Ready',
    size: '1.8 MB',
    description: 'Purchase orders and supplier performance'
  },
  {
    id: 3,
    name: 'Expiry Management Report',
    type: 'Compliance',
    date: '2024-01-13',
    status: 'Processing',
