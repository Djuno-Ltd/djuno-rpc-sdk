import { ZodError } from 'zod';
import { InputValidationError } from '../errors';

export function formatErrors(baseError: ZodError): InputValidationError | null {
  const errorMessages: string[] = [];

  baseError.errors.forEach((error) => {
    errorMessages.push(
      `${error.path.length > 0 ? error.path + ': ' : ''}${error.message}`
    );
  });

  return errorMessages.length > 0
    ? new InputValidationError({
        messages: errorMessages,
        zodError: baseError,
      })
    : null;
}
