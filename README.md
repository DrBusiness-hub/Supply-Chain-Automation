# Supply Chain Automation System
## نظام إدارة سلسلة التوريد الآلي

A comprehensive ERP dashboard for medical supply chain management with Google Sheets integration.

## 🌟 Features / الميزات

### Core Functionality / الوظائف الأساسية
- **Inventory Management** / إدارة المخزون
  - Real-time stock tracking / تتبع المخزون في الوقت الفعلي
  - Low stock alerts / تنبيهات نقص المخزون
  - Expiry date monitoring / مراقبة تواريخ الانتهاء
  - Multi-location support / دعم المواقع المتعددة

- **Transfer Management** / إدارة النقل
  - Inter-branch transfers / النقل بين الفروع
  - Approval workflows / سير عمل الموافقات
  - Transfer tracking / تتبع النقل
  - Automated notifications / الإشعارات الآلية

- **Supplier Management** / إدارة الموردين
  - Supplier database / قاعدة بيانات الموردين
  - Performance tracking / تتبع الأداء
  - Contact management / إدارة جهات الاتصال
  - Order history / تاريخ الطلبات

- **Customer Management** / إدارة العملاء
  - Customer profiles / ملفات العملاء
  - Credit management / إدارة الائتمان
  - Order tracking / تتبع الطلبات
  - Communication history / تاريخ التواصل

- **Reports & Analytics** / التقارير والتحليلات
  - Inventory reports / تقارير المخزون
  - Financial analytics / التحليلات المالية
  - Performance metrics / مقاييس الأداء
  - Export capabilities / إمكانيات التصدير

### Technical Features / الميزات التقنية
- **Google Sheets Integration** / تكامل مع جوجل شيتس
- **Real-time Data Sync** / مزامنة البيانات في الوقت الفعلي
- **Responsive Design** / تصميم متجاوب
- **Modern UI/UX** / واجهة مستخدم حديثة
- **Authentication System** / نظام المصادقة
- **Offline Support** / دعم العمل بدون اتصال

## 🚀 Live Demo / العرض التوضيحي المباشر

The application is deployed and available at: [Netlify URL will be provided after deployment]

## 🛠️ Technology Stack / المكدس التقني

- **Frontend**: React 18 + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks
- **Data Integration**: Google Sheets API
- **Deployment**: Netlify
- **Version Control**: Git + GitHub

## 📋 Prerequisites / المتطلبات المسبقة

- Node.js 18+ 
- npm or pnpm
- Google Sheets API access
- Modern web browser

## 🔧 Installation / التثبيت

1. **Clone the repository / استنساخ المستودع**
   ```bash
   git clone https://github.com/DrBusiness-hub/Supply-Chain-Automation.git
   cd Supply-Chain-Automation
   ```

2. **Install dependencies / تثبيت التبعيات**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup / إعداد البيئة**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here
   REACT_APP_GOOGLE_SHEET_ID=1RcfFYd2-4_f0ogGnzlFjauagYnLAbZRnXimuSI65Ocw
   REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxcSLT_ey6PWqlsmo34PQVxrfC6J-Nzv2Bj_-0KDMio6ocy00zHupt5l7l25FKB3dYj/exec
   ```

4. **Start development server / تشغيل خادم التطوير**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Build for production / البناء للإنتاج**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## 🔗 Google Sheets Integration / تكامل جوجل شيتس

### Setup Instructions / تعليمات الإعداد

1. **Create a Google Sheet** / إنشاء جوجل شيت
   - Use the provided template: [Google Sheet Template](https://docs.google.com/spreadsheets/d/1RcfFYd2-4_f0ogGnzlFjauagYnLAbZRnXimuSI65Ocw/edit?gid=0#gid=0)

2. **Deploy Google Apps Script** / نشر جوجل أبس سكريبت
   - Copy the `Code.gs` file content to Google Apps Script
   - Deploy as web app with the provided URL

3. **Configure API Access** / تكوين الوصول للواجهة البرمجية
   - Enable Google Sheets API
   - Create API credentials
   - Update environment variables

### Data Structure / هيكل البيانات

The system expects the following sheets in your Google Spreadsheet:
- `Inventory` - Product inventory data
- `Transfers` - Transfer requests and status
- `Suppliers` - Supplier information
- `Customers` - Customer database
- `Activities` - Audit trail and logs

## 🎨 UI Components / مكونات واجهة المستخدم

### Layout Components / مكونات التخطيط
- `Header` - Navigation and user menu
- `Sidebar` - Main navigation menu
- `LoginForm` - Authentication interface

### Dashboard Components / مكونات لوحة التحكم
- `Overview` - Main dashboard view
- `StatsCard` - Statistics display cards
- `QuickActions` - Quick action buttons

### Feature Components / مكونات الميزات
- `InventorySection` - Inventory management
- `TransfersSection` - Transfer management
- `SuppliersSection` - Supplier management
- `CustomersSection` - Customer management
- `ReportsSection` - Reports and analytics

## 🔐 Authentication / المصادقة

The system includes a comprehensive authentication system with:
- Login form with validation
- Session management
- Role-based access control
- Secure logout functionality

Default credentials for demo:
- **Admin**: admin@rama.com / admin123
- **Manager**: manager@rama.com / manager123
- **User**: user@rama.com / user123

## 📊 Data Management / إدارة البيانات

### Real-time Sync / المزامنة في الوقت الفعلي
- Automatic data refresh every 5 minutes
- Manual refresh capabilities
- Offline data caching
- Error handling and retry logic

### Data Validation / التحقق من صحة البيانات
- Input validation on all forms
- Data type checking
- Required field validation
- Business rule enforcement

## 🚀 Deployment / النشر

### Netlify Deployment / النشر على Netlify
The application is configured for easy deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Deploy automatically on push

### Manual Deployment / النشر اليدوي
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🧪 Testing / الاختبار

### Development Testing / اختبار التطوير
```bash
npm run dev
# Test all features in development mode
```

### Production Testing / اختبار الإنتاج
```bash
npm run build
npm run preview
# Test built application locally
```

## 📝 API Documentation / توثيق واجهة البرمجة

### Google Sheets Service / خدمة جوجل شيتس

#### Inventory Methods / طرق المخزون
- `getInventoryData()` - Fetch all inventory items
- `updateInventoryItem(itemId, updates)` - Update specific item
- `addInventoryItem(item)` - Add new inventory item

#### Transfer Methods / طرق النقل
- `getTransfers()` - Fetch all transfers
- `createTransfer(transfer)` - Create new transfer
- `updateTransferStatus(transferId, status)` - Update transfer status

#### Supplier Methods / طرق الموردين
- `getSuppliers()` - Fetch all suppliers
- `addSupplier(supplier)` - Add new supplier
- `updateSupplier(supplierId, updates)` - Update supplier info

## 🤝 Contributing / المساهمة

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License / الترخيص

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team / الفريق

- **Developer**: DrBusiness-hub
- **Organization**: Rama Medical Group

## 📞 Support / الدعم

For support and questions:
- GitHub Issues: [Create an issue](https://github.com/DrBusiness-hub/Supply-Chain-Automation/issues)
- Email: support@rama-medical.com

## 🔄 Version History / تاريخ الإصدارات

### v1.0.0 (Current)
- Initial release with core functionality
- Google Sheets integration
- Authentication system
- Responsive design
- Real-time data sync

## 🎯 Roadmap / خارطة الطريق

### Upcoming Features / الميزات القادمة
- [ ] Mobile application
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] API integrations
- [ ] Automated reporting
- [ ] Barcode scanning
- [ ] Email notifications
- [ ] Advanced user roles

---

**Made with ❤️ for Rama Medical Group**
