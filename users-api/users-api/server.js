const app = require('./index');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Users API running at http://localhost:${PORT}/api/v1/users`);
});
