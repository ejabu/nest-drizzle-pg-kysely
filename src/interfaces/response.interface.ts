export interface CustomError {
  server_message: string;
}

export interface HttpResponseEnvelope {
  status_code: number;
  data: any;
  client_message: string;
  error_detail: CustomError;
}
