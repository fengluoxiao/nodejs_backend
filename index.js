const db = require('./database');

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection();
