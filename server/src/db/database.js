import pkg from 'pg';
const { Pool } = pkg;

import { createTablesQuery, insertDataQuery} from './dbSchema.js';

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})

async function connect() {
    return await pool.connect();
}

const initializeDatabase = async () => {

    try {
        const client = await pool.connect();
         // Create the table
        const res = await client.query(createTablesQuery);
        console.log(res)
        
        // // Insert data
         await client.query(insertDataQuery);
        // console.log('Data inserted successfully');

        // // Release the client
        client.release();
    }
    catch (error) {
        console.error('Error initializing database', error);
      }  
}

export { initializeDatabase, connect, pool }
