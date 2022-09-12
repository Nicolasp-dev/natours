const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(process.env.NODE_ENV);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});

// Unhandled Rejections - Uncached promises
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection,  shutting down');
  server.close(() => {
    process.exit(1);
  });
});

// Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('Unhandled Exception,  shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
