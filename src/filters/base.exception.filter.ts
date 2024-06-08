import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import {
  CustomError,
  HttpResponseEnvelope,
} from '../interfaces/response.interface';

export class BaseExceptionFilter implements ExceptionFilter {
  catch(_exception: Error, _host: ArgumentsHost) {
    console.error(_exception);
    console.log(_host);
    throw new Error('Method not implemented.');
  }

  errorMapper(
    clientMessage: string,
    serverMessage: string,
    statusCode: number,
  ) {
    return <HttpResponseEnvelope>{
      status_code: statusCode,
      client_message: clientMessage,
      data: null,
      error_detail: <CustomError>{ server_message: serverMessage },
    };
  }
}
