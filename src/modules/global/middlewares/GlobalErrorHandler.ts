import { ValidationError } from 'class-validator';

import { Request, Response } from 'express';

import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { HttpStatusError } from '@shared/errors/HttpStatusError';

import { HttpStatus } from '@shared/errors/HttpStatus';

import { formatErrors } from '@shared/utils/format-errors';

type Errors = {
  errors?: ValidationError[];
  httpCode?: number;
  statusCode?: number;
  message?: string;
} & HttpStatusError;

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Errors, _request: Request, response: Response): Response {
    if (error.statusCode) {
      return response.status(error.statusCode).json({
        message: error.message,
        status: error.httpCode,
      });
    }

    if (error.httpCode === HttpStatus.BAD_REQUEST && error?.errors) {
      return response.status(error.httpCode).json({
        errors: formatErrors(error.errors),
        message: error.message,
        status: error.httpCode,
      });
    }

    if (error instanceof HttpError) {
      return response.status(error.httpCode).json({
        message: error.message,
        status: error.httpCode,
      });
    }

    if (error instanceof HttpStatusError) {
      return response.status(error.status).json({
        message: error.message,
        status: error.status,
      });
    }

    console.error(error);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
