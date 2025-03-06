const getAccountCreationEmailTemplate = (userName) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #007BFF;">Welcome to Samyotech!</h2>
    <p>Dear <strong>${userName}</strong>,</p>
    <p>Your account has been successfully created.</p>
    <p>If you have any questions, feel free to reach out.</p>
    <p>Best Regards,<br/> Samyotech Team</p>
  </div>
`;

export default getAccountCreationEmailTemplate;