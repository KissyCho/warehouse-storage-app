const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS warehouses (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            hazardous_stock BOOLEAN DEFAULT false,
            size INT NOT NULL
        );
    `;

const insertDataQuery = `
            INSERT INTO warehouses (name, hazardous_stock, size)
            SELECT 'Warehouse A', false, '10000'
            WHERE NOT EXISTS (SELECT 1 FROM warehouses LIMIT 1)
            UNION ALL
            SELECT 'Warehouse B', true, 5000
            WHERE NOT EXISTS (SELECT 1 FROM warehouses LIMIT 1)
 `;

 export { createTablesQuery, insertDataQuery }