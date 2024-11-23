// import type { Request, Response } from 'express';
import type { Request } from 'express';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

// export const authenticateToken = (req: Request, _res: Response) => {
export const authenticateToken = ({ req } : { req: Request })=> {
  //console.log("Incomiing Request: ", req);
  let token = req.body.token || req.query.token || req.headers.authorization;
  //const authHeader = req.headers.authorization || req.body.token || req.query.token;
  console.log("Incomiing Headers: ", token);

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();  // `Bearer ${token}`
  }

  if(!token || token == undefined) {
    console.log("No token");
    return req;
  }
   
  
  const secretKey: any = process.env.JWT_SECRET_KEY || '';

  try {
    const data = jwt.verify(token, secretKey, { maxAge: '1h' });
    console.log("\n data: ", data);
    req.user = data as JwtPayload
  } catch (error) {
    console.log("Error: ", error);
    
  }
    /*
    jwt.verify(token, secretKey, (err: any, user: any)  => {
      if (err) {
        console.log("Auth Err: ", err);
        //return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;
      //return next();
    });

  } else {
    console.log("No token");
  // res.sendStatus(401); // Unauthorized
  return req;
}
*/
  console.log("Passing Request On")
  return req
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};