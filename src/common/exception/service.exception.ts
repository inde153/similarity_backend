import { NOT_FOUND, ErrorCode, INTERNAL_SERVER, FORBIDDEN } from '../exception';

export const NotFoundException = (message?: string): ServiceException => {
  return new ServiceException(NOT_FOUND, message);
};

export const InternalServerException = (message?: string): ServiceException => {
  return new ServiceException(INTERNAL_SERVER, message);
};

export const ForbiddenException = (message?: string): ServiceException => {
  return new ServiceException(FORBIDDEN, message);
};

export class ServiceException extends Error {
  readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, message?: string) {
    if (!message) {
      message = errorCode.message;
    }

    super(message);

    this.errorCode = errorCode;
  }
}
