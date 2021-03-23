"use strict";
require('dotenv').config();
const database = {
    development: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'xcoin-development',
    },
    test: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'xcoin-test',
    },
    production: {
        host: 'localhost',
        port: 23306,
        username: 'root',
        password: 'UVXcoin6049',
        database: 'xcoin',
    },
};
module.exports = Object.assign(Object.assign({}, database[process.env.NODE_ENV]), { type: 'mysql', host: 'localhost', port: 23306, username: 'root', password: 'UVXcoin6049', database: 'xcoin', synchronize: true, logging: false, entities: ['dist/entity/*.js'], subscribers: ['dist/subscriber/*.js'], migrations: ['dist/migration/*.js'], cli: {
        entitiesDir: 'dist/entity',
        migrationsDir: 'dist/migration',
        subscribersDir: 'dist/subscriber',
    } });
