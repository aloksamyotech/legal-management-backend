import { Client } from "../models/Client.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
export const AddClient = async (req) => {
  const { Name, phonenum, city, state, zipcode, Email, address, country } =
    req.body;

  const isClientAlreadyExist = await Client.exists({ Email });
  if (isClientAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }
  const client = new Client({
    Name,
    phonenum,
    city,
    state,
    zipcode,
    Email,
    address,
    country,
  });

  const createdClient = await client.save();

  if (!createdClient) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdClient;
};

export const GetClient = async (req) => {
  const { Email } = req.body;

  if (Email) {
    const client = await Client.findOne({ Email });
    if (!client) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.not_found,
      );
    }
    return client;
  }
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

    const deletedClient = await Client.findOneAndDelete({ Email });
  
    if (!deletedClient) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notDeleted,
        errorCodes?.not_found
      );
    }
  
    return { message: Message.Delete, client: deletedClient} ;
  };
  
