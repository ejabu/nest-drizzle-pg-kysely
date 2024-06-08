import { ArgumentsHost, Catch } from '@nestjs/common';

import { HttpResponseEnvelope } from '../interfaces/response.interface';
import { BaseExceptionFilter } from './base.exception.filter';

@Catch(Error)
export class GenericExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const data = this.parseError(exception);
    const envelopeBody: HttpResponseEnvelope = super.errorMapper(
      data.client_message,
      data.server_message,
      data.status_code,
    );
    const response = ctx.getResponse();
    response.status(data.status_code).json(envelopeBody);
  }

  parseError(exception: any) {
    const errorResponse: any = exception.message;
    const status: number = 500;
    const clientMessage: string = 'Unknown error';
    return {
      status_code: status,
      client_message: clientMessage,
      server_message: errorResponse,
    };
  }
}
