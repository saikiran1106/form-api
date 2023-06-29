const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');


const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('clicks.db');

// Create a table to store click counts if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS clicks (id INTEGER PRIMARY KEY AUTOINCREMENT, count INTEGER DEFAULT 0)');



app.use(cors());


app.post('/api/increment-click/mala', (req, res) => {
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 1', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('/donate', (req, res) => {
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 2', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.post('/live', (req, res) => {
  db.run('UPDATE clicks SET count = count + 1 WHERE id = 3', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Click count incremented successfully' });
    }
  });
});

app.get('/api/click-count', (req, res) => {
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

app.get('/donate', (req, res) => {
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

app.get('/live', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
