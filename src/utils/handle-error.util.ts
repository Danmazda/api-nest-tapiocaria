import { UnprocessableEntityException } from '@nestjs/common';

export function handleError(error: Error) {
  const errorLines = error.message?.split('\n');
  const lastLine = errorLines[errorLines.length - 1].trim();
  if (!lastLine) {
    console.error(error);
  }
  throw new UnprocessableEntityException(lastLine || 'Erro ao criar mesa.');
}
