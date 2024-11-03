import os from 'os';
import http from 'http';
import { Application } from 'express';

import { config } from '../env';
import logger from '../utils/logger';

export const Server = (
    ExpressApplication: Application,
    port: string | number,
) => {
    const server = new http.Server(ExpressApplication);
    return {
        'test': () =>
            server.listen(port,
                () => logger.info(`Mock Environment up and running @: ${os.hostname()} on port: ${port}`)),
        'live': () =>
            server.listen(port,
                () => logger.info(
                    `🚀 Server ready and listening at (${config.env}) ==> http://localhost:${port}`)),
    };
};