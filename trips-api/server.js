const app = require('./index');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Trips API running at http://localhost:${PORT}/trips`);
});
