
import Contact from "../models/Contact.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


export const AddContact = async (req) => {
  const { firstName, lastName, gender, phoneNumber, emailAddress } = req.body;

  const isContactExist = await Contact.exists({ emailAddress });
  if (isContactExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist
    );
  }

  const avatar = req.file ? `/uploads/${req.file.filename}` : "";

  const contact = new Contact({
    firstName,
    lastName,
    gender,
    phoneNumber,
    emailAddress,
    avatar,
  });

  const createdContact = await contact.save();

  if (!createdContact) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable
    );
  }

  return createdContact;
};

// Get Contact
export const GetContact = async (req) => {
  const { emailAddress } = req.body;

  const contact = await Contact.findOne({ emailAddress });
  if (!contact) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }
  return contact;
};


export const UpdateContact = async (req) => {
  const { emailAddress } = req.body;
  const updateData = req.body;

  if (req.file) {
    updateData.avatar = `/uploads/${req.file.filename}`;
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { emailAddress },
    updateData,
    { new: true }
  );

  if (!updatedContact) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed
    );
  }

  return updatedContact;
};


export const DeleteContact = async (req) => {
  const { emailAddress } = req.body;

  const deletedContact = await Contact.findOneAndDelete({ emailAddress });

  if (!deletedContact) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found
    );
  }

  return { message: Message?.Delete, contact: deletedContact };
};
