import app from './app';
import config from './common/config';

const PORT: string = config.PORT || '4000';

app.listen(PORT).catch((error: unknown) => {
  if (error instanceof Error) {
    app.log.error(error.message);
  }
});

// TODO: implement uncaughtException handler
process.on('uncaughtException', () => {

});

// TODO: implement unhandledRejection handler
process.on('unhandledRejection', () => {

});