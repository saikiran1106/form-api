const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');


const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('clicks.db');

app.use(express.json());


// Create a table to store click counts if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY AUTOINCREMENT, count INTEGER DEFAULT 0, donation_type TEXT)');



app.use(cors());




app.post('/Temple_Creation', (req, res) => {
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 1', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('/Janmashtmi', (req, res) => {
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 2', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('/Goshala', (req, res) => {
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 3', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('/Anna_Dhan', (req, res) => {
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 4', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('T/submit-option', (req, res) => {
   const { options } = req.body;

  // Perform validation if needed

  // Retrieve the current 'Donation_sub_type' array from the 'clicks' table
  const selectQuery = `
    SELECT Donation_sub_type
    FROM clicks
    WHERE id = 1
  `;

  db.get(selectQuery, (err, row) => {
    if (err) {
      console.error('Error retrieving donation sub type:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    let donationSubType = [];
    if (row && row.Donation_sub_type) {
      // Parse the existing 'Donation_sub_type' array
      donationSubType = JSON.parse(row.Donation_sub_type);
    }

    // Push the selected option to the array
    donationSubType.push(options);

    // Update the 'Donation_sub_type' column in the 'clicks' table
    const updateQuery = `
      UPDATE clicks
      SET Donation_sub_type = ?
      WHERE id = 1
    `;
    const params = [JSON.stringify(donationSubType)];

    db.run(updateQuery, params, function (err) {
      if (err) {
        console.error('Error updating donation sub type:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        console.log('Donation sub type updated successfully');
        res.status(200).json({ message: 'Donation sub type submitted successfully' });
      }
    });
  });
});



app.get('/Temple_Creation', (req, res) => {
  db.get('SELECT count FROM clicks WHERE id = 1', (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const count = row ? row.count : 0;
      res.status(200).json({ count });
    }
  });
});

app.get('/Janmashtmi', (req, res) => {
  db.get('SELECT count FROM clicks WHERE id = 2', (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const count = row ? row.count : 0;
      res.status(200).json({ count });
    }
  });
});

app.get('/Goshala', (req, res) => {
  db.get('SELECT count FROM clicks WHERE id = 3', (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const count = row ? row.count : 0;
      res.status(200).json({ count });
    }
  });
});

app.get('/Anna_Dhan', (req, res) => {
  db.get('SELECT count FROM clicks WHERE id = 4', (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const count = row ? row.count : 0;
      res.status(200).json({ count });
    }
  });
});








app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
