import { client } from "../config/redisdb";

export const redisCheck = async(req,res,next)=>{
    const value = await client.get('notes');
    if(value==null){
        next();
    }
    else{
        res.status(200).json({
            code:200,
            data: JSON.parse(value),
            message:"Notes fetched successfully from redis"
        })
    }
}

export const redisCheckSingleNote = async(req,res,next)=>{
    const id = req.params._id;
    const value = await client.get('getSingleNote');
    const data = JSON.parse(value);
    if(id==data._id){
        res.status(200).json({
            code: 200,
            data: data,
            message: 'Note fetched successfully from redis'
        });
    } else {
        next();
    }
} 