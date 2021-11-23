import { Request, Response } from 'express';

import { Get, JsonController, Param, Post, Req, Res } from 'routing-controllers';

import { HttpStatusError, HttpStatus } from '@shared/errors';
import { hash } from 'bcrypt';
import { getRepository } from 'typeorm';
import Users from '@database/entities/Users';

@JsonController('/user')
export class User {
  @Post('/:systemId')
  async create(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const userConnection = getRepository(Users);
    try {
      const password = await hash(request.body.password, 8);
      const { username } = request.body;
      const systemId = Number(request.params.systemId);
      const createdUser = await userConnection.insert({ username, password, systemId });
      return response.status(200).json(createdUser.raw[0]);
    } catch (error: any) {
      if (error.detail) return response.status(409).json(error.detail);
      return response.status(500).send();
    }
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<Response> {
    throw new HttpStatusError(HttpStatus.BAD_REQUEST, `Impossível Localizar o ID: ${id}`);
  }
}
