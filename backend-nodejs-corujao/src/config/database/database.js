module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100', //aqui seria localhost se eu não estivesse usando windows
  username: 'postgres',
  password: 'docker',
  database: 'backendcorujao',
  define: {
    timestamps: true
  },
};