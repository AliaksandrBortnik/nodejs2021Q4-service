import app from './app';
import config from './common/config';

const PORT: string = config.PORT || '4000';

app.listen(PORT).catch((error: Error) => app.log.error(error.message));