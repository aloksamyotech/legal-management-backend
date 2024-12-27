import * as contactService from "../services/contact.js";
import { Message, statusCodes } from "../core/common/constant.js";
const ContactAdd = async (req, res, next) => {
  const ContactData = await contactService.AddContact(req, res, next);
  res.status(statusCodes?.created).send(ContactData);
};
const ContactFetch = async (req, res, next) => {
  const ContactData = await contactService.GetContact(req, res, next);
  res.status(statusCodes?.found).send(ContactData);
};
const ContactDelete = async (req, res, next) => {
  const ContactDelData = await contactService.DeleteContact(req, res, next);
  res.status(statusCodes?.ok).send(ContactDelData);
};
const ContactUpdate = async (req, res, next) => {
  const ContactUpdateData = await contactService.UpdateContact(req, res, next);
  res.status(statusCodes?.ok).send(ContactUpdateData);
};

export default {
  ContactAdd,
  ContactFetch,
  ContactDelete,
  ContactUpdate,
};
