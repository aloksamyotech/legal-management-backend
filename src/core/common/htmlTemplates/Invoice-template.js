const getInvoiceEmailTemplate = (recipientName, invoiceNo, amount) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #007bff;">Invoice Generated</h2>
    <p>Dear <strong>${recipientName}</strong>,</p>
    <p>An invoice has been generated for your case.</p>
    <p><strong>Invoice No:</strong> ${invoiceNo}</p>
    <p><strong>Total Amount:</strong> $${amount}</p>
    <p>Please find the attached invoice for more details.</p>
    <p>Best Regards,<br/>Legal Case Management System</p>
  </div>
`;

export default getInvoiceEmailTemplate;
