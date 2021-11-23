import { SECRET } from '@config/env';
import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  sub: string;

  username: string;

  iat: number;

  exp: number;
}

export default async function validateTokenIsValid(
  request: Request,

  response: Response,

  next: NextFunction,
): Promise<Response | void | string | NextFunction> {
  const authHeader = request.headers.authorization;

  if (!authHeader) return response.status(401).json({ message: 'Session token not provied' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, SECRET ?? '') as ITokenPayload;
    console.log(decoded);

    return next();
  } catch (err) {
    return response.status(401).json({ Error: 'Invalid session token' });
  }
}
