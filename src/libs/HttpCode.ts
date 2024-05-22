export class HttpCode {
  // 200 
  static success = 200;
  static created = 201;
  static accepted = 202;
  static noContent = 204;
  static resetContent = 205;
  static partialContent = 206;
  static multiStatus = 207;
  
  // 400
  static badRequest = 400;
  static unauthorized = 401;
  static forbidden = 403;
  static notFound = 404;
  
  // 500
  static internalServerError = 500;
  static badGateway = 502;
  static serviceUnavailable = 503;
  static gatewayTimeout = 504;
  static httpVersionNotSupported = 505;
}
