require('dotenv').config();

const database = {
  development: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'xcoin_development',
  },
  test: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'xcoin_test',
  },
  production: {
    host: 'tpeng.ddns.net',
    port: 23306,
    username: 'root',
    password: 'UVXcoin6049',
    database: 'xcoin',
  },
};

console.log(process.env.NODE_ENV, database[process.env.NODE_ENV]);

module.exports = {
  ...database[process.env.NODE_ENV],
  type: 'mysql',
  synchronize: true,
  logging: false,
  entities: ['dist/entity/*.js'],
  subscribers: ['dist/subscriber/*.js'],
  migrations: ['dist/migration/*.js'],
  logging: 'all',
  cli: {
    entitiesDir: 'dist/entity',
    migrationsDir: 'dist/migration',
    subscribersDir: 'dist/subscriber',
  },
};
