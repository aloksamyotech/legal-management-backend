import * as clientService from "../services/client.js";
import { Message, statusCodes } from "../core/common/constant.js";
const ClientAdd = async (req, res, next) => {
  const ClientData = await clientService.AddClient(req, res, next);
  res.status(statusCodes?.created).send(ClientData);
};
const ClientFetch = async (req, res, next) => {
  const ClientData = await clientService.GetClient(req, res, next);
  res.status(statusCodes?.found).send(ClientData);

};
const ClientDelete = async (req, res, next) => {
  const ClientDelData = await clientService.DeleteClient(req, res, next);
  res.status(statusCodes?.ok).send(ClientDelData);
};
const ClientUpdate = async (req, res, next) => {
  const ClientUpdateData = await clientService.UpdateClient(req, res, next);
  res.status(statusCodes?.ok).send(ClientUpdateData);
};

export default {
  ClientAdd,
  ClientFetch,
  ClientDelete,
  ClientUpdate
};
