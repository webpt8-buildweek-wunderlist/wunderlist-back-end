// Update with your config settings.
module.exports = {

  development: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
      filename: './data/development.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  testing: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
      filename: './data/test.db3',
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true
  }
};
