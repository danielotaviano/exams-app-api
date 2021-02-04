import { ValidationPipeOptions } from '@nestjs/common';

export const validationConfig: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
};
