const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});