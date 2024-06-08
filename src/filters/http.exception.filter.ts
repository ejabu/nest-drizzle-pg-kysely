import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

import { HttpResponseEnvelope } from '../interfaces/response.interface';
import { BaseExceptionFilter } from './base.exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();

    const data = this.parseError(exception);
    const envelopeBody: HttpResponseEnvelope = super.errorMapper(
      data.client_message,
      data.server_message,
      data.status_code,
    );

    const response = ctx.getResponse();
    response.status(status).json(envelopeBody);
  }

  parseError(exception: HttpException) {
    const errorResponse: any = exception.getResponse();
    let message;
    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else {
      message = errorResponse.message;
    }

    const status: number = exception.getStatus();

    let clientMessage: string = message;
    if (status === 500) clientMessage = 'Unknown error';

    return {
      status_code: status,
      client_message: clientMessage,
      server_message: message,
    };
  }
}
