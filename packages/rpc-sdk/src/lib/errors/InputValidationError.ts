import { ZodError } from 'zod';
export class InputValidationError extends Error {
  messages: string[];
  zodError: ZodError;
  issues: ZodError['issues'];

  constructor({
    messages,
    zodError,
  }: {
    messages: string[];
    zodError: ZodError;
  }) {
    super(`Djuno RPC SDK Input Validation Error: ${messages.join(', ')}`);
    this.messages = messages;
    this.issues = zodError.issues;
    this.zodError = zodError; // see https://github.com/colinhacks/zod/blob/HEAD/ERROR_HANDLING.md
  }
}
