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
        client.release();
        return result
    } catch(error) {

    }
}
const insert = async(table, data) => {
    try {
        const client = await pool.connect();

        const result = await client.query(`INSERT INTO products (name, size_per_unit, hazardous, quantity)
        VALUES ($1, $2, $3, $4)`, [data.name, data.size_per_unit, data.hazardous, data.quantity])
        return result;
    } catch(error) {
        console.log(error)
    }
}

const insertImport = async(table, data) => {
    try {
        const client = await pool.connect();
        console.log(data)
        const result = await client.query(`INSERT INTO stock_movements (warehouse_id, product_id, date, quantity, movement_type)
        VALUES ($1, $2, $3, $4, $5)`, [data.warehouse_id, data.product_id, data.date, data.quantity, data.movement_type])
        return result;
    } catch(error) {
        console.log(error)
    }
}

const findSpecific = async(warehouseId) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM stock_movements WHERE warehouse_id = $1`, [warehouseId])
        return result
    } catch(error) {
        console.log(error)
    }
}

export { findAll, insert, findById, findSpecific, insertImport }