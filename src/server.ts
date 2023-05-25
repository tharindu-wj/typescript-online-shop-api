import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import makeApp from './app';

const port = config.get<string>('port');
const app = makeApp();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost${port}`);

  await connect();
});
