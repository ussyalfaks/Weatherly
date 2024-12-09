export class WeatherApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof WeatherApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};