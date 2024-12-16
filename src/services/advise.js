import { Advisedb } from "../models/Advise.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
export const AddAdvise = async (req) => {
    const { 
      Client, 
      Advocate, 
      Date, 
      Matter, 
      Fee, 
      Status, 
      description, 
      internalNote 
    } = req.body;

    if (!Client || !Advocate || !Date || !Matter || Fee === undefined || !Status) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message.Missing_required_field,
        errorCodes?.bad_request
      );
    }
  
    const advise = new Advisedb({
      Client,
      Advocate,
      Date,
      Matter,
      Fee,
      Status,
      description,
      internalNote,
    });
  
    const Advisecreate = await advise.save();
  
    if (!Advisecreate) {
      throw new CustomError(
        statusCodes?.serviceUnavailable,
        Message.notCreated,
        errorCodes?.service_unavailable
      );
    }
  
    return Advisecreate;
  };


  export const GetAdvise=async(req)=>{
    const advises= await Advisedb.find();
    if(!advises){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound,
            errorCodes?.not_found,
          );
    }
    return advises;
  }

  export const DeleteAdvise =async(req)=>{
        const {id}=req.params;
         if (!id) {
          throw new CustomError(
            statusCodes?.badRequest,
            Message?.inValid,
            errorCodes?.bad_request
          );
        }
    
        const deletedAdvise = await Advisedb.findOneAndDelete(id);
      
        if (!deletedAdvise) {
          throw new CustomError(
            statusCodes?.notFound,
            Message?.notDeleted,
            errorCodes?.not_found
          );
        }
        
        return { message: Message.Delete, advise: deletedAdvise} ;
      };
      export const UpdateAdvise = async (req) => {
        const {id} = req.params;
        const updateData = req.body;
        console.log("upd",  updateData);
        if (!id) {
          throw new CustomError(
            statusCodes?.badRequest,
            Message?.inValid,
            errorCodes?.bad_request
          );
        };
    
        const updatedAdvise = await Advisedb.findOneAndUpdate(
            { _id: id },
          updateData,
          { new: true} 
        );
      
        if (!updatedAdvise) {
          throw new CustomError(
            statusCodes?.notFound,
           Message.notUpdate,
          errorCodes?.action_failed
          );
        }
      
        return updatedAdvise;
      };
      