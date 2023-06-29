const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 4000; // Replace with your desired port number

// Configure Express to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database('clicks.db'); // Use ':memory:' for in-memory database, or provide a file path for persistent database

// Create a table for storing form data
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS archana1 (
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

  // Create an array of user details with unique IDs
const userDetails = details. map ( ( detail, index ) => { return { id : index + 1 , name : detail[ 0 ], gothra : detail[ 1 ], nakshatara : detail[ 2 ], rasi : detail[ 3 ], dateOfArchana : detail[ 4 ], preferredTiming : detail[ 5 ] }; });

  // Convert the user details array to a JSON string
  const detailsString = JSON.stringify(userDetails);

  // Insert form data into the database
  db.run(
    `INSERT INTO archana1 (date, numMembers, details, repeat, prasadh)
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

app.get('/api/submit-form', (req, res) => {
  // Retrieve form data from the database
  db.all('SELECT * FROM archana1', (err, rows) => {
    if (err) {
      console.error('Error retrieving form data:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      // Parse the JSON details string into an array of objects
      const formData = rows.map(row => {
        return {
          id: row.id,
          date: row.date,
          numMembers: row.numMembers,
          details: JSON.parse(row.details),
          repeat: row.repeat,
          prasadh: row.prasadh
        };
      });

      res.status(200).json(formData);
    }
  });
});





// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
