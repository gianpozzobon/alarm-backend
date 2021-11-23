import Zones from '@database/entities/Zones';
import validateTokenIsValid from '@modules/session/middlewares/Auth';
import { Request, Response } from 'express';

import { Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';

import { getRepository } from 'typeorm';

@JsonController('/zones')
@UseBefore(validateTokenIsValid)
export class Zone {
  @Post('/:systemId')
  async create(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const zonesConnection = getRepository(Zones);
    try {
      const { name } = request.body;
      const systemId = Number(request.params.systemId);
      const createdZone = await zonesConnection.insert({ name, systemId });
      return response.status(200).json(createdZone.raw[0]);
    } catch (error: any) {
      if (error.detail) return response.status(409).json(error.detail);
      return response.status(500).send();
    }
  }

  @Get('/:systemId')
  async list(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const zoneConnection = getRepository(Zones);
    const systemId = Number(request.params.systemId);

    try {
      const zoneDB = await zoneConnection.find({ systemId });
      return response.status(200).json(zoneDB);
    } catch (error) {
      return response.status(500).send();
    }
  }
}
