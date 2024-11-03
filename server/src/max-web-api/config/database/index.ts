import mongoose, { ConnectOptions } from 'mongoose';

// config should be imported before importing any other file
import { config } from '../env';
import { LiveDBConnectOptions, MockDBConnectOptions } from './connect.options';
import logger from '../utils/logger';


export const LiveDatabaseManager = (connectionURI: string, options: ConnectOptions, func: () => void) => {
    return function init() {
        let msg: string;

        mongoose
            .connect(connectionURI, options)
            .then(() => {
                if (process.env.NODE_ENV === 'production') {
                    msg = `Live MongoDB Database connected.`
                }
                if (process.env.NODE_ENV === 'staging-compliance') {
                    msg = `Staging MongoDB Database connected.`
                }
                if (process.env.NODE_ENV === 'development') {
                    msg = `Develop MongoDB Database connected.`
                }
                logger.info(`${msg}`);
                func();
            })
            .catch((err: any) => {
                logger.error(
                    `${process.env.NODE_ENV} 'MongoDB connection error. Please make sure MongoDB is running.\n'` + err
                );
                process.exit(1);
            });

        const db = mongoose.connection;

        db.on('error', (err: any) => {
            logger.error(
                'MongoDB error:\n' + err
            );
        });
    }
};


/**
 * Connect to the test database.
 */
export const MockDatabaseManager = (uri: string, mongooseOpts: ConnectOptions = {}) => {
    /**
     * @ATTENTION @CAUTION Operations on live server will delete the entire database.
     */
    if (uri === config.store.database.mongodb.uri) {
        throw new Error('Attempt to use LIVE_DATABASE for testing');
    }
    return {
        setup: async () => {
            try {
                const connectOptions = mongooseOpts || MockDBConnectOptions;
                const dbConnection = await mongoose.connect(uri, connectOptions);
                dbConnection && console.info(
                    'Test MongoDB Database connected.'
                );
            } catch (error: any) {
                console.error(
                    'Test MongoDB connection error. Please make sure MongoDB is running.\n' + error
                );
                process.exit(1);
            }
        },
        close: async () => {
            await mongoose.connection.close();
        },
        clear: async () => {
            const collections = mongoose.connection.collections;

            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany({});
            };
        },
    };
};

export const startDB = () => {
    let connectionString: string;
    return {
        'test': () => {
            connectionString = config.store.database.mongodb.testUri;
            return MockDatabaseManager(connectionString);
        },
        'live': (func: () => void) => {
            if (process.env.NODE_ENV === 'production') {
                connectionString = config.store.database.mongodb.secureHost as string;
            }
            if (process.env.NODE_ENV === 'staging-compliance') {
                connectionString = config.store.database.mongodb.stagingUri as string;
            }
            if (process.env.NODE_ENV === 'development') {
                connectionString = config.store.database.mongodb.uri as string;
            }
            return LiveDatabaseManager(connectionString, LiveDBConnectOptions, func)();
        }
    };
};
