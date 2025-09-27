function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
      .setTitle('ERP Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getHtmlContent(pageName) {
  return HtmlService.createHtmlOutputFromFile(pageName).getContent();
}

// Placeholder functions for backend calls (to be implemented in Google Apps Script)
function getSomeData() {
  // Implement data retrieval from Google Sheets or other services
  return { message: 'Data from Google Apps Script' };
}

function exportReportAsPdf(reportId) {
  // Implement PDF generation logic here, e.g., using Google Docs or external APIs
  // For now, return a placeholder URL
  Logger.log('Exporting PDF for report: ' + reportId);
  return 'https://example.com/placeholder_report.pdf';
}

function exportReportAsExcel(reportId) {
  // Implement Excel generation logic here, e.g., using Google Sheets API
  // For now, return a placeholder URL
  Logger.log('Exporting Excel for report: ' + reportId);
  return 'https://example.com/placeholder_report.xlsx';
}


