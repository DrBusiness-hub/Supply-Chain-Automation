from flask import Blueprint, jsonify, request, send_file
from datetime import datetime, timedelta
import json
import io
import tempfile
import os

# Make pandas and reportlab imports optional for deployment
try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False

try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    from reportlab.lib.units import inch
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False

reports_bp = Blueprint('reports', __name__, url_prefix='/api/reports')

# Mock data for reports
mock_reports_data = {
    'inventory_status': {
        'name': 'Inventory Status Report',
        'type': 'Inventory',
        'date': '2024-01-15',
        'status': 'Ready',
        'size': '2.3 MB',
        'data': [
            {'item': 'Paracetamol 500mg', 'current_stock': 150, 'min_stock': 50, 'status': 'In Stock', 'location': 'A-01-15'},
            {'item': 'Surgical Gloves (L)', 'current_stock': 25, 'min_stock': 100, 'status': 'Low Stock', 'location': 'B-02-08'},
            {'item': 'Insulin Syringes', 'current_stock': 300, 'min_stock': 200, 'status': 'In Stock', 'location': 'C-03-12'},
            {'item': 'Blood Test Tubes', 'current_stock': 500, 'min_stock': 200, 'status': 'In Stock', 'location': 'D-01-05'},
            {'item': 'Antibiotics (Amoxicillin)', 'current_stock': 0, 'min_stock': 30, 'status': 'Out of Stock', 'location': 'A-02-20'}
        ]
    },
    'procurement': {
        'name': 'Monthly Procurement Report',
        'type': 'Procurement',
        'date': '2024-01-14',
        'status': 'Ready',
        'size': '1.8 MB',
        'data': [
            {'po_number': 'PO-2024-0089', 'supplier': 'MedSupply Co.', 'amount': 12450, 'status': 'Approved', 'date': '2024-01-15'},
            {'po_number': 'PO-2024-0088', 'supplier': 'SafeHands Ltd.', 'amount': 8750, 'status': 'Completed', 'date': '2024-01-14'},
            {'po_number': 'PO-2024-0087', 'supplier': 'MediCare Supplies', 'amount': 15200, 'status': 'Pending', 'date': '2024-01-13'},
            {'po_number': 'PO-2024-0086', 'supplier': 'LabTech Solutions', 'amount': 6800, 'status': 'Completed', 'date': '2024-01-12'}
        ]
    },
    'expiry_management': {
        'name': 'Expiry Management Report',
        'type': 'Compliance',
        'date': '2024-01-13',
        'status': 'Processing',
        'size': '1.2 MB',
        'data': [
            {'item': 'Insulin Syringes', 'expiry_date': '2024-08-30', 'days_remaining': 227, 'quantity': 300, 'action': 'Monitor'},
            {'item': 'Paracetamol 500mg', 'expiry_date': '2024-12-15', 'days_remaining': 334, 'quantity': 150, 'action': 'Monitor'},
            {'item': 'Surgical Masks', 'expiry_date': '2024-03-20', 'days_remaining': 64, 'quantity': 200, 'action': 'Use First'},
            {'item': 'Hand Sanitizer', 'expiry_date': '2024-02-28', 'days_remaining': 43, 'quantity': 50, 'action': 'Urgent'}
        ]
    },
    'transfers': {
        'name': 'Transfer Activity Report',
        'type': 'Transfers',
        'date': '2024-01-12',
        'status': 'Ready',
        'size': '956 KB',
        'data': [
            {'transfer_id': 'TR-2024-0156', 'from_branch': 'Main Hospital', 'to_branch': 'ICU Branch', 'items': 2, 'status': 'Pending'},
            {'transfer_id': 'TR-2024-0155', 'from_branch': 'Pharmacy Branch', 'to_branch': 'Main Hospital', 'items': 2, 'status': 'Approved'},
            {'transfer_id': 'TR-2024-0154', 'from_branch': 'ICU Branch', 'to_branch': 'Pharmacy Branch', 'items': 1, 'status': 'Completed'},
            {'transfer_id': 'TR-2024-0153', 'from_branch': 'Main Hospital', 'to_branch': 'Pharmacy Branch', 'items': 2, 'status': 'Rejected'}
        ]
    },
    'financial_summary': {
        'name': 'Financial Summary Report',
        'type': 'Financial',
        'date': '2024-01-11',
        'status': 'Ready',
        'size': '3.1 MB',
        'data': [
            {'category': 'Medications', 'total_value': 45200, 'percentage': 35.2, 'trend': 'up'},
            {'category': 'Medical Devices', 'total_value': 32800, 'percentage': 25.5, 'trend': 'stable'},
            {'category': 'Consumables', 'total_value': 28500, 'percentage': 22.2, 'trend': 'down'},
            {'category': 'Lab Supplies', 'total_value': 22100, 'percentage': 17.1, 'trend': 'up'}
        ]
    }
}

@reports_bp.route('/', methods=['GET'])
def get_reports():
    """Get all available reports"""
    reports = []
    for key, report in mock_reports_data.items():
        reports.append({
            'id': key,
            'name': report['name'],
            'type': report['type'],
            'date': report['date'],
            'status': report['status'],
            'size': report['size']
        })
    
    return jsonify({
        'success': True,
        'reports': reports,
        'total': len(reports)
    })

@reports_bp.route('/<report_id>', methods=['GET'])
def get_report_details(report_id):
    """Get detailed report data"""
    if report_id not in mock_reports_data:
        return jsonify({'success': False, 'error': 'Report not found'}), 404
    
    report = mock_reports_data[report_id]
    return jsonify({
        'success': True,
        'report': report
    })

@reports_bp.route('/<report_id>/export/pdf', methods=['GET'])
def export_report_pdf(report_id):
    """Export report as PDF"""
    if not REPORTLAB_AVAILABLE:
        return jsonify({'success': False, 'error': 'PDF export not available - missing dependencies'}), 500
        
    if report_id not in mock_reports_data:
        return jsonify({'success': False, 'error': 'Report not found'}), 404
    
    report = mock_reports_data[report_id]
    
    # Create PDF in memory
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    
    # Styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=18,
        spaceAfter=30,
        textColor=colors.HexColor('#1f2937')
    )
    
    # Content
    story = []
    
    # Title
    title = Paragraph(report['name'], title_style)
    story.append(title)
    story.append(Spacer(1, 12))
    
    # Report info
    info_data = [
        ['Report Type:', report['type']],
        ['Generated Date:', report['date']],
        ['Status:', report['status']],
        ['File Size:', report['size']]
    ]
    
    info_table = Table(info_data, colWidths=[2*inch, 3*inch])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f3f4f6')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e5e7eb'))
    ]))
    
    story.append(info_table)
    story.append(Spacer(1, 20))
    
    # Data table
    if 'data' in report and report['data']:
        data = report['data']
        if data:
            # Create table headers based on first row keys
            headers = list(data[0].keys())
            table_data = [headers]
            
            # Add data rows
            for row in data:
                table_data.append([str(row[key]) for key in headers])
            
            # Create table
            data_table = Table(table_data)
            data_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3b82f6')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 10),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 1), (-1, -1), 9),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            
            story.append(data_table)
    
    # Build PDF
    doc.build(story)
    buffer.seek(0)
    
    return send_file(
        buffer,
        as_attachment=True,
        download_name=f"{report['name'].replace(' ', '_')}.pdf",
        mimetype='application/pdf'
    )

@reports_bp.route('/<report_id>/export/excel', methods=['GET'])
def export_report_excel(report_id):
    """Export report as Excel"""
    if not PANDAS_AVAILABLE:
        return jsonify({'success': False, 'error': 'Excel export not available - missing dependencies'}), 500
        
    if report_id not in mock_reports_data:
        return jsonify({'success': False, 'error': 'Report not found'}), 404
    
    report = mock_reports_data[report_id]
    
    # Create Excel file in memory
    buffer = io.BytesIO()
    
    with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
        # Report info sheet
        info_df = pd.DataFrame([
            ['Report Name', report['name']],
            ['Report Type', report['type']],
            ['Generated Date', report['date']],
            ['Status', report['status']],
            ['File Size', report['size']]
        ], columns=['Property', 'Value'])
        
        info_df.to_excel(writer, sheet_name='Report Info', index=False)
        
        # Data sheet
        if 'data' in report and report['data']:
            data_df = pd.DataFrame(report['data'])
            data_df.to_excel(writer, sheet_name='Data', index=False)
    
    buffer.seek(0)
    
    return send_file(
        buffer,
        as_attachment=True,
        download_name=f"{report['name'].replace(' ', '_')}.xlsx",
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

@reports_bp.route('/generate', methods=['POST'])
def generate_report():
    """Generate a new report"""
    data = request.get_json()
    
    report_type = data.get('type', 'custom')
    date_range = data.get('date_range', 'last_30_days')
    filters = data.get('filters', {})
    
    # Mock report generation
    new_report = {
        'id': f"custom_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        'name': f"Custom {report_type.title()} Report",
        'type': report_type.title(),
        'date': datetime.now().strftime('%Y-%m-%d'),
        'status': 'Processing',
        'size': '0 KB'
    }
    
    return jsonify({
        'success': True,
        'message': 'Report generation started',
        'report': new_report
    })

@reports_bp.route('/bulk-export', methods=['POST'])
def bulk_export_reports():
    """Export multiple reports as a ZIP file"""
    data = request.get_json()
    report_ids = data.get('report_ids', [])
    export_format = data.get('format', 'pdf')
    
    if not report_ids:
        return jsonify({'success': False, 'error': 'No reports selected'}), 400
    
    # Mock bulk export
    return jsonify({
        'success': True,
        'message': f'Bulk export of {len(report_ids)} reports started',
        'download_url': f'/api/reports/download/bulk_{datetime.now().strftime("%Y%m%d_%H%M%S")}.zip'
    })

@reports_bp.route('/schedule', methods=['POST'])
def schedule_report():
    """Schedule automated report generation"""
    data = request.get_json()
    
    report_type = data.get('type')
    schedule = data.get('schedule')  # daily, weekly, monthly
    recipients = data.get('recipients', [])
    
    # Mock scheduling
    return jsonify({
        'success': True,
        'message': f'Report scheduled successfully for {schedule} delivery',
        'schedule_id': f"schedule_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    })

