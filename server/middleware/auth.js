import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

const auth = (req,res,next) => {
    try {
    const token = req.headers.authorization.split(" ")[1];
    // check whether googleAuth token or custom
    const isCustomAuth  = token.length < 500;       
    
    let decodeData;
    
    // for custom token
    if(token && isCustomAuth){
        decodeData = jwt.verify(token,'test') ;  //  'test' = secret key used while encoding
        req.userId = decodeData?.id;
    } else{     // for googleAuth
        decodeData = jwt_decode(token);
        req.userId = decodeData?.sub;
    }

    next();
        
    } catch (error) {
        console.log(error);
    }

}

export default auth;