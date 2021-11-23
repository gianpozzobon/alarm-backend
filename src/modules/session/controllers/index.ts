import { Request, Response } from 'express';

import { JsonController, Post, Req, Res } from 'routing-controllers';

import { getRepository } from 'typeorm';
import Users from '@database/entities/Users';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET } from '@config/env';

@JsonController('/session')
export class Session {
  @Post('/')
  async login(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { username, password } = request.body;
    try {
      const userRepository = getRepository(Users);
      const user = await userRepository.findOne(
        {
          username,
        },
        {
          relations: ['system'],
        },
      );
      if (!user) return response.status(403).json('Usuário ou senha incorretos');
      const passwordVerify = await compare(password, user.password);
      if (!passwordVerify) return response.status(403).json('Usuário ou senha incorretos');
      console.log(process.env.SECRET);

      const token = sign({ username: user.username }, SECRET ?? '', {
        subject: String(user.id),
        expiresIn: '1d',
      });
      const responseBody: any = { ...user, token };
      delete responseBody.password;
      return response.status(200).json(responseBody);
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  }
}
