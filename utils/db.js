import mysql from 'mysql2/promise';

// Function to create a connection pool
const createPool = () => {
  try {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'blendin',
      password: process.env.DB_PASS||'Gjp@2002',
     
       
    });

    console.log('Database connection pool created successfully');
    return pool;
  } catch (error) {
    console.error('Error creating database connection pool:', error);
    throw error; // Re-throw the error to ensure it's not silently ignored
  }
};

// Create the pool
const pool = createPool();

// Export the pool for use in other modules
export default pool;
