const getHearingEmailTemplate = (clientName, hearingTitle, hearingDate) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #ff9800;">Upcoming Hearing Notification</h2>
    <p>Dear <strong>${clientName}</strong>,</p>
    <p>You have a new hearing scheduled:</p>
    <p><strong>Hearing Title:</strong> ${hearingTitle}</p>
    <p><strong>Date:</strong> ${new Date(hearingDate).toDateString()}</p>
    <p>Please be prepared and contact your advocate if necessary.</p>
    <p>Best Regards,<br/>Legal Case Management System</p>
  </div>
`;
export default getHearingEmailTemplate;