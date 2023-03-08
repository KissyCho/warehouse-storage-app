import { pool } from './database.js';

const findAll = async (table) => {

    try {
        const client = await pool.connect();
        const { rows } = await client.query(`SELECT * FROM ${table}`);
        client.release();

        return rows;

    } catch(err) {
        console.log(err)
    }
}

const findById = async (table, id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${table} WHERE id = ${id}`)
        return result
    } catch(error) {

    }
}
const insert = async(table, data) => {
    try {
        const client = await pool.connect();

        const result = await client.query(`INSERT INTO products (name, size_per_unit, hazardous, quantity)
        VALUES ($1, $2, $3, $4)`, [data.name, data.size_per_unit, data.hazardous, data.quantity])
        console.log(result)
        return result;
    } catch(error) {
        console.log(error)
    }
}

export { findAll, insert, findById }