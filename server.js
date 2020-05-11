require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Boat-Server now running on ${PORT}. Happy Computing!`);
});
