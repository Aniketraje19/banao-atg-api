import { ApiError, ApiResponse } from "../Utils/index.js"


const error = (err,req,res,next) => {
    if(err instanceof ApiError){
        return res.status(err.statusCode).json(new ApiResponse(err.statusCode,{},err.message))
    }else{
        return res.status(500).json( new ApiResponse(500,{},"Internal Server Error!"))
    }
}

export default error;