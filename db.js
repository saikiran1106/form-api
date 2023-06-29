const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 4000; // Replace with your desired port number

// Configure Express to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database('clicks.db'); // Use ':memory:' for in-memory database, or provide a file path for persistent database

// Create a table for storing form data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS archana (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      numMembers INTEGER,
      details TEXT,
      repeat TEXT,
      prasadh TEXT
    )
  `);
});

// Handle form submission
app.post('/api/submit-form', (req, res) => {
  const { date, numMembers, details, repeat, prasadh } = req.body;

  // Convert details array to string
  const detailsString = details.join(',');

  // Insert form data into the database
  db.run(
    `INSERT INTO archana (date, numMembers, details, repeat, prasadh)
     VALUES (?, ?, ?, ?, ?)`,
    [date, numMembers, detailsString, repeat, prasadh],
    function (err) {
      if (err) {
        console.error('Error inserting form data:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        console.log('Form data inserted successfully');
        res.status(200).json({ message: 'Form data submitted successfully' });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
