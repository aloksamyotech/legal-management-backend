import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/**
 * Generates a PDF invoice.
 * @param {Object} invoiceData
 * @returns {Promise<string>}
 */
export const generateInvoicePDF = async (invoiceData) => {
  return new Promise((resolve, reject) => {
    const fileName = `invoice_${invoiceData.invoiceNo}.pdf`;
    const filePath = path.join(__dirname, "../invoices", fileName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice No: ${invoiceData.invoiceNo}`);
    doc.text(`Client: ${invoiceData.client}`);
    doc.text(`Advocate: ${invoiceData.advocate}`);
    doc.text(`Case: ${invoiceData.caseTitle}`);
    doc.moveDown();

    doc.fontSize(14).text("Hearings:", { underline: true });
    invoiceData.hearings.forEach((h, index) => {
      doc.text(`${index + 1}. ${h.title}: $${h.amount}`);
    });

    doc.moveDown();
    doc.fontSize(14).text("Extra Expenses:", { underline: true });
    invoiceData.extraExpenses.forEach((e, index) => {
      doc.text(`${index + 1}. ${e.reason}: $${e.amount}`);
    });

    doc.moveDown();
    doc
      .fontSize(16)
      .text(`Total Amount: $${invoiceData.totalAmount}`, { bold: true });

    doc.end();
    doc.on("finish", () => resolve(filePath));
    doc.on("error", reject);
  });
};
