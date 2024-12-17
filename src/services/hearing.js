import  HearingModel from "../models/Hearing.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
export const AddHearing = async (req, res) => {
  const { Title, Fee, Witness, JudgementStatus, Date, JudgementReason, Description, Case } = req.body;

  if (!Title || !Fee || !Date || !Case) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request
    );
  }

  const hearing = new HearingModel({
    Title,
    Fee,
    Witness,
    JudgementStatus,
    Date,
    JudgementReason,
    Description,
    Case, 
  });

  const savedHearing = await hearing.save();
  if (!savedHearing) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }
  return savedHearing;
};

export const GetHearing = async (req, res) => {
    const { id } = req.params;
  
    const hearing = await HearingModel.findById(id).populate("Case");
  
    if (!hearing) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.not_found
      );
    }
  
    return hearing;
  };

  export const GetAllHearing=async(req)=>{
    const allhearings= await HearingModel?.find();
    if(!allhearings){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound,
            errorCodes?.not_found,
          );
    }
    return allhearings;
  }



  export const DeleteHearing = async (req, res) => {
    const { id } = req.params;
  
    const deletedHearing = await HearingModel.findByIdAndDelete(id);
  
    if (!deletedHearing) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notDeleted,
        errorCodes?.not_found
      );
    }
  
    return({ message: Message?.Delete, hearing: deletedHearing });
  };

  export const UpdateHearing = async (req, res) => {
    const { id } = req?.params;
    const updateData = req?.body;
  
    if (!id) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.inValid,
        errorCodes?.bad_request
      );
    }
  
    const updatedHearing = await HearingModel?.findByIdAndUpdate(id, updateData, { new: true });
  
    if (!updatedHearing) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notUpdate,
        errorCodes?.action_failed
      );
    }
  
    return(updatedHearing);
  };
  


  
  