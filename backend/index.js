const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const resumeRoutes = require('./routes/resume');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
