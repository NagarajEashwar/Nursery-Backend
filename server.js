const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nursery',
  password: '6598&Ravi',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/bills', async (req, res) => {
  const { customerName, amount, date, description, seedlingCount, seedlingRate } = req.body;
  let seedling_count = seedlingCount;
  let seedling_rate = seedlingRate;
  try {
    const result = await pool.query(
      'INSERT INTO bills (customer_name, amount, date, description, seedling_count, seedling_rate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [customerName, amount, date, description, seedling_count, seedling_rate]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/bills', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bills');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
