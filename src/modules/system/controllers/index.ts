import { Request, Response } from 'express';

import { Get, JsonController, Param, Post, Req, Res } from 'routing-controllers';

import { HttpStatusError, HttpStatus } from '@shared/errors';
import Systems from '@database/entities/Systems';
import { getRepository } from 'typeorm';

@JsonController('/system')
export class System {
  @Post('/')
  async create(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const systemConnection = getRepository(Systems);
    try {
      const { name } = request.body;
      const createdUser = await systemConnection.insert({ name });
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
