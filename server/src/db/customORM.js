import { pool } from './database.js';

const findAll = async (table) => {
//      // Connect to the database
//   const client = await connect();

    try {
        // pool.connect()
        const { rows } = await pool.query(`SELECT * FROM ${table}`)
        console.log(rows)
        // pool.release();
        return rows

    } catch(err) {
        console.log(err)
    } finally {
        // Release the client back to the pool
       // client.release();
    }
}

export { findAll }