import shared from '@monorepo/shared';

class OnboardingServerError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

class BadRequestError extends OnboardingServerError {
  constructor(message: string = '잘못된 요청입니다.') {
    super(message, shared.STATUS_CODE['BAD_REQEUST']);
  }
}

class ForbiddenError extends OnboardingServerError {
  constructor(message: string = '권한이 없습니다.') {
    super(message, shared.STATUS_CODE['FORBIDDEN']);
  }
}

class InternalServerError extends OnboardingServerError {
  constructor(message: string = '서버에 문제가 생겼습니다.\n잠시후 다시 시도해주세요.') {
    super(message, shared.STATUS_CODE['INTERNAL_SERVER_ERROR']);
  }
}

export { BadRequestError, ForbiddenError, InternalServerError };
