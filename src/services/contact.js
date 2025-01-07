import Contact from "../models/Contact.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddContact = async (req) => {
  const { Name,  gender, phoneNumber, emailAddress,Message, subject } = req.body;

  const isContactExist = await Contact.exists({ emailAddress });
  if (isContactExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const avatar = req.file ? `/uploads/${req.file.filename}` : "";

  const contact = new Contact({
    Name,
    gender,
    phoneNumber,
    emailAddress,
    avatar,
    Message,
    subject
    });

  const createdContact = await contact.save();

  if (!createdContact) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdContact;
};

// Get Contact
export const GetContact = async (req) => {
  const { emailAddress } = req.body;

  const contact = await Contact.findOne({ emailAddress, Active: true }); 
  if (!contact) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return contact;
};


export const UpdateContact = async (req) => {
  const {id} = req.params;
  const updateData = req.body;

  if (req.file) {
    updateData.avatar = `/uploads/${req.file.filename}`;
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id:id, Active: true },  
    updateData,
    { new: true },
  );

  if (!updatedContact) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedContact;
};

export const DeleteContact = async (req) => {
  const {id } = req.params;

  const contactToUpdate = await Contact.findOne({ _id:id, Active: true });
  
  if (!contactToUpdate) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }

  contactToUpdate.Active = false;
  const updatedContact = await contactToUpdate.save();

  return { message: Message?.Delete, contact: updatedContact };
};

export const GetAllContact = async () => {
  const contact = await Contact.find({ Active: true }).sort({ createdAt: -1 });

  if (!contact || contact.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return contact;
};