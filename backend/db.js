import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sos_mis'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

export default db;
