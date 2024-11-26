import shared from '@monorepo/shared';
import { type RequestHandler } from 'express';

const errorBoundary = <T>(controller: RequestHandler<any, any, any, T>): RequestHandler<any, any, any, T> => {
  return async (req, res, next) => {
    controller(req, res, next)?.catch((error: OnboardingServerError) => {
      res.status(error.status).json({ message: error.message });
    });
  };
};

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

class NotEnoughStockError extends OnboardingServerError {
  constructor(message: string = '상품의 재고가 부족합니다.') {
    super(message, shared.STATUS_CODE['BAD_REQEUST']);
  }
}

class TransactionalError extends OnboardingServerError {
  constructor(message: string = '잠시 후 다시 시도해주세요.') {
    super(message, shared.STATUS_CODE['INTERNAL_SERVER_ERROR']);
  }
}

class PaymentError extends OnboardingServerError {
  constructor(message: string = '결제에 실패했습니다.\n다시 시도 해주세요.') {
    super(message, shared.STATUS_CODE['INTERNAL_SERVER_ERROR']);
  }
}

class PaymentForgeryError extends OnboardingServerError {
  constructor(message: string = '결제 위/변조 시도가 의심됩니다.') {
    super(message, shared.STATUS_CODE['INTERNAL_SERVER_ERROR']);
  }
}

export {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotEnoughStockError,
  TransactionalError,
  PaymentError,
  PaymentForgeryError,
  errorBoundary,
};
