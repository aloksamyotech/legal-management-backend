import * as clientService from "../services/client.js";
import { Message, statusCodes } from "../core/common/constant.js";
const ClientAdd = async (req, res, next) => {
  const ClientData = await clientService.AddClient(req, res, next);
  res.status(statusCodes?.created).send(ClientData);
};
const ClientFetch = async (req, res, next) => {
  const ClientData = await clientService.GetClient(req, res, next);
  res.status(statusCodes?.ok).send(ClientData);
};
const GetAllclient = async (req, res, next) => {
  const ClientData = await clientService.GetAllClients(req, res, next);
  res.status(statusCodes?.ok).send(ClientData);
};
const ClientDelete = async (req, res, next) => {
  const ClientDelData = await clientService.DeleteClient(req, res, next);
  res.status(statusCodes?.ok).send(ClientDelData);
};
const ClientUpdate = async (req, res, next) => {
  const ClientUpdateData = await clientService.UpdateClient(req, res, next);
  res.status(statusCodes?.ok).send(ClientUpdateData);
};

const GetCasebyClientId = async (req, res, next) => {
  const ClientData = await clientService.GetCaseByClient(req, res, next);
  res.status(statusCodes?.ok).send(ClientData);
};
export default {
  GetCasebyClientId,
  ClientAdd,
  ClientFetch,
  ClientDelete,
  ClientUpdate,
  GetAllclient,
};
