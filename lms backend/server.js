const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const booksRoutes = require('./routes/Books');
const circulationsRoutes = require('./routes/circulations');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3001" })); // Allow requests from React (port 3001)
app.use(bodyParser.json()); // Parse incoming JSON data

// Routes
app.use("/circulations", circulationsRoutes); // Mount circulations route at /circulations
app.use("/books", booksRoutes); // Books route

// Default route for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
