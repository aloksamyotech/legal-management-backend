import { Client } from "../models/Client.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
export const AddClient = async (req) => {
  const { Name, phonenum, city, state, zipcode, Email, address, country,About } =
    req.body;

  const isClientAlreadyExist = await Client.exists({ Email });
  if (isClientAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist
    );
  }
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const client = new Client({
    Name,
    phonenum,
    city,
    state,
    zipcode,
    Email,
    address,
    country,
    image,
    About
  });

  const createdClient = await client.save();

  if (!createdClient) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable
    );
  }

  return createdClient;
};

export const GetClient = async (req) => {
  const { Email } = req.body;

  if (!Email) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const client = await Client.findOne({ Email, Active: true });
  if (!client) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }
  return client;
};

export const DeleteClient = async (req) => {
  const { Email } = req.body;

  if (!Email) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const client = await Client.findOne({ Email, Active: true });

  if (!client) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found
    );
  }

  client.Active = false;
  await client.save();

  return { message: Message.Delete, client };
};

export const UpdateClient = async (req) => {
  const { Name, phonenum, city, state, zipcode, Email, address, country,About } =
    req.body;
  if (!Email) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }
  const updateData = {
    Name,
    phonenum,
    city,
    state,
    zipcode,
    address,
    country,
    About,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  };
  const updatedClient = await Client.findOneAndUpdate(
    { Email, Active: true },
    updateData,
    { new: true }
  );

  if (!updatedClient) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed
    );
  }

  return updatedClient;
};

export const GetAllClients = async () => {
  const clients = await Client.find({ Active: true });

  if (!clients || clients.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return clients;
};
