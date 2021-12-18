import app from './app';
import config from './common/config';

const PORT: string = config.PORT || '4000';

app.listen(PORT).catch(handleAppError);

/**
 * Log an error as base handle error logic
 * @param error - Error raised by application
 */
function handleAppError(error: unknown): void {
  if (error instanceof Error) {
    app.log.error(error.message);
  }
}