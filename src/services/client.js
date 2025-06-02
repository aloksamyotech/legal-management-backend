import { Client } from "../models/Client.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import CaseModel from "../models/Case.js";
import BlockedRole from "../models/Email-Sch.js";
import { sendEmail } from "../core/Nodemailer/nodemailer.js";
import getAccountCreationEmailTemplate from "../core/common/htmlTemplates/accountCreationtemp.js";
import ExcelJS from "exceljs";

export const AddClient = async (req) => {
  const {
    Name,
    phonenum,
    city,
    state,
    zipcode,
    Email,
    address,
    country,
    About,
  } = req.body;
  const companyId = req.user.companyId;

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
    About,
    companyId,
  });

  const createdClient = await client.save();
  if (!createdClient) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable
    );
  }
  const isBlocked = await BlockedRole.findOne({ role: "client", companyId });
  if (isBlocked?.isBlocked) {
    await sendEmail(
      Email,
      "Welcome to Our Company",
      "",
      getAccountCreationEmailTemplate(Name)
    );
  } else {
    console.log("Email not sent as 'client' role is blocked.");
  }

  return createdClient;
};

export const GetClient = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const client = await Client.findOne({ _id: id, Active: true });
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
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const client = await Client.findOne({ _id: id, Active: true });

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
  const {
    Name,
    phonenum,
    city,
    state,
    zipcode,
    Email,
    address,
    country,
    About,
  } = req.body;
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
  };
  if (req?.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }
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

export const GetAllClients = async (req) => {
  const companyId = req.user.companyId;
  const clients = await Client.find({ Active: true, companyId }).sort({
    createdAt: -1,
  });

  if (!clients || clients.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return clients;
};
export const GetCaseByClient = async (req) => {
  const { clientId } = req.params;

  const cases = await CaseModel.find({
    Client: clientId,
    Active: true,
  }).populate([
    { path: "Advocate", select: "name" },
    { path: "Matter", select: "Title" },
    { path: "Judge", select: "Title" },
    { path: "PoliceStation", select: "Title" },
    { path: "Court", select: "Title" },
  ]);

  if (!cases || cases.length === 0) {
    return {
      status: statusCodes?.notFound,
      message: Message?.notFound,
      errorCode: errorCodes?.not_found,
      cases: [],
    };
  }

  return cases;
};
export const ClientBulk = async (req, res) => {
  const file = req?.file?.path;
  const companyId = req.user.companyId;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file);

    if (!workbook.worksheets || workbook.worksheets.length === 0) {
      return res.status(400).json({ message: "No sheets found in the file" });
    }

    const worksheet = workbook.worksheets[0];
    const headers = [];
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      headers.push(cell.text.trim());
    });

    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const rowData = {};

      row.eachCell((cell, colNumber) => {
        const columnName = headers[colNumber - 1];
        rowData[columnName] = cell.text.trim();
      });

      data.push(rowData);
    });

    if (data.length === 0) {
      return res.status(400).json({ message: "File is empty" });
    }

    const emailSet = new Set();
    const filteredData = data
      .map((row) => {
        if (row.Email && emailSet.has(row.Email)) {
          console.log(`Skipping duplicate email: ${row.Email}`);
          return null;
        }
        row.companyId = companyId;
        emailSet.add(row.Email);
        return row;
      })
      .filter((row) => row !== null);

    if (filteredData.length === 0) {
      return res.status(400).json({ message: "No valid data to insert" });
    }

    const bulkInsert = await Client.insertMany(filteredData);

    if (!bulkInsert) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.not_found
      );
    }

    return res
      .status(200)
      .json({ message: "Bulk upload successful", data: bulkInsert });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const GetAllClientsIndex = async (req) => {
  const companyId = req.user.companyId;
  const { page, limit, search } = req.query;
  const searchCondition = search
    ? { Name: { $regex: search, $options: "i" } }
    : {};

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
  
  if (isNaN(pageNumber) || pageNumber <= 0) {
    throw new CustomError(
      statusCodes.badRequest,
      "Invalid page number",
      errorCodes.invalidInput
    );
  }
  if (isNaN(pageSize) || pageSize <= 0) {
    throw new CustomError(
      statusCodes.badRequest,
      "Invalid page size",
      errorCodes.invalidInput
    );
  }
  const clientsQuery = Client.find({
    Active: true,
    companyId,
    ...searchCondition,
  }).sort({ createdAt: -1 });

  const totalClients = await Client.countDocuments({
    Active: true,
    companyId,
    ...searchCondition,
  });

  const clients = await clientsQuery
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  if (!clients || clients.length === 0) {
    throw new CustomError(
      statusCodes.notFound,
      Message.notFound,
      errorCodes.not_found
    );
  }

  return {
    clients,
    totalClients,
    page: pageNumber,
    totalPages: Math.ceil(totalClients / pageSize),
  };
};
