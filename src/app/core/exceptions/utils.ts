export function extractErrorMessage(error: unknown, defaultMessage?: string): string {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(defaultMessage);
  }
}
