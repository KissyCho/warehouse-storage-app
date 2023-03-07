import { pool } from './database.js';

const findAll = async (table) => {
//      // Connect to the database
//   const client = await connect();

    try {
        const client = await pool.connect();
        const { rows } = await client.query(`SELECT * FROM ${table}`);
        console.log(rows)
        client.release();
        return rows;

    } catch(err) {
        console.log(err)
    }
}

export { findAll }