const getAppointmentEmailTemplate = (advocateName, clientName, caseTitle) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #007bff;">Case Appointment Notice</h2>
    <p>Dear <strong>${advocateName}</strong>,</p>
    <p>You have been appointed as the advocate for <strong>${clientName}</strong> in the case titled <strong>${caseTitle}</strong>.</p>
    <p>Please review the case details and proceed accordingly.</p>
    <p>Best Regards,<br/>Legal Case Management System</p>
  </div>
`;
export default getAppointmentEmailTemplate;
