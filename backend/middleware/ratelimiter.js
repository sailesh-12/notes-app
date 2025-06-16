import rateLimit from "../config/upstash.js"
const ratelimiter=async function(req,res,next){
    try{
        const {success}=await rateLimit.limit("my-limit-key");
        if(!success){
            console.log(success);
            return res.status(429).json({message:"Too many requests"});
            
        } 
        next();

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

export default ratelimiter