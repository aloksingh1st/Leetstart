import { response } from "express"


export const healthCheck = ()=>{


    return response.status(201).json({
        status:true,
        message : "The server is up and running",
        err : [],
        data : [],
    })
}