const express = require('express');
const cors = require('cors');
const tasks = require('./routes/tasks');
const fs = require('fs');
const path = require('path');

const app = express();

const filePath = path.join(__dirname, 'tasks.json');

// Initialize tasks.json file if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
