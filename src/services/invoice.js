import  Invoice  from "../models/Invoice.js";

import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddInvoice = async (req) => {
    const {
      Case,
      Advocate,
      Client,
      hearings, 
      PaymentStatus
    } = req.body;
  
    if (!Case || !Advocate || !Client || !hearings || hearings.length === 0) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message.Missing_required_field,
        errorCodes?.bad_request
      );
    }
  

    let totalPrice = 0;
    hearings.forEach(hearing => {
      if (hearing.amount) {
        totalPrice += hearing.amount; 
      }
    });
  
  
    if (totalPrice <= 0) {
      throw new CustomError(
        statusCodes?.badRequest,
        "Total Price must be greater than 0",
        errorCodes?.bad_request
      );
    }
  
    
    const invoice = new Invoice({
      Case,
      Advocate,
      Client,
      hearings,
      TotalPrice: totalPrice, 
      PaymentStatus
    });
  
    
    const invoiceCreate = await invoice.save();
  
    if (!invoiceCreate) {
      throw new CustomError(
        statusCodes?.serviceUnavailable,
        Message.notCreated,
        errorCodes?.service_unavailable
      );
    }
  
    return invoiceCreate;
  };
  


export const GetInvoices = async () => {
  const invoices = await Invoice.find({ Active: true }).populate("Case").populate("Advocate").populate("Client");
  
  if (!invoices || invoices.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return invoices;
};


export const GetInvoiceById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const invoice = await Invoice.findById(id).populate("Case").populate("Advocate").populate("Client");

  if (!invoice) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return invoice;
};


export const UpdateInvoice = async (req) => {
    const { id } = req.params;
    const updateData = req.body;
  
    if (!id) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.inValid,
        errorCodes?.bad_request
      );
    }
  
    
    if (updateData.Hearings) {
      let totalPrice = 0;
      updateData.Hearings.forEach(hearing => {
        if (hearing.Amount) {
          totalPrice += hearing.Amount;
        }
      });
  
      if (totalPrice <= 0) {
        throw new CustomError(
          statusCodes?.badRequest,
          "Total Price must be greater than 0",
          errorCodes?.bad_request
        );
      }
      updateData.TotalPrice = totalPrice;
    }
  
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, { new: true });
  
    if (!updatedInvoice) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notUpdated,
        errorCodes?.action_failed
      );
    }
  
    return updatedInvoice;
  };
  

// Soft-Delete Invoice
export const DeleteInvoice = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const invoice = await Invoice.findById(id);
  if (!invoice) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  invoice.Active = false;
  await invoice.save();

  return { message: Message.Delete, invoice };
};


export const UpdatePaymentStatus = async (req) => {
  const { id } = req.params;
  const { PaymentStatus, PaidAmount } = req.body;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const invoice = await Invoice.findById(id);

  if (!invoice) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

 
  if (PaymentStatus === "Paid" && !invoice.PaidAt) {
    invoice.PaidAt = new Date();
  }

  invoice.PaymentStatus = PaymentStatus;

  if (PaidAmount) {
    
    invoice.Hearings.forEach(hearing => {
      if (hearing.Amount === PaidAmount) {
        hearing.PaidAmount = PaidAmount;
      }
    });
  }

  await invoice.save();
  return invoice;
};
