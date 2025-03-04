const getCaseConfirmationEmailTemplate = (clientName, caseTitle) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #28a745;">Case Registered Successfully</h2>
    <p>Dear <strong>${clientName}</strong>,</p>
    <p>Your case <strong>${caseTitle}</strong> has been successfully registered in our system.</p>
    <p>Your assigned advocate will contact you soon.</p>
    <p>Best Regards,<br/>Legal Case Management System</p>
  </div>
`;
export default getCaseConfirmationEmailTemplate;
