import Sensors from '@database/entities/Sensors';
import validateTokenIsValid from '@modules/session/middlewares/Auth';

import { Request, Response } from 'express';

import { Get, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';

import { getRepository } from 'typeorm';

@JsonController('/sensors')
@UseBefore(validateTokenIsValid)
export class Sensor {
  @Post('/:zoneId')
  async create(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const sensorsConnection = getRepository(Sensors);

    try {
      const { name, type } = request.body;

      const zoneId = Number(request.params.zoneId);

      const createdSensor = await sensorsConnection.insert({ name, type, zoneId });

      return response.status(200).json(createdSensor.raw[0]);
    } catch (error: any) {
      if (error.detail) return response.status(409).json(error.detail);

      return response.status(500).send();
    }
  }

  @Get('/:zoneId')
  async list(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const sensorsConnection = getRepository(Sensors);
    const zoneId = Number(request.params.zoneId);

    try {
      const sensorsDB = await sensorsConnection.find({ zoneId });
      return response.status(200).json(sensorsDB);
    } catch (error) {
      return response.status(500).send();
    }
  }
}
