const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS warehouses (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            hazardous_stock BOOLEAN DEFAULT false,
            size INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            size_per_unit INT NOT NULL,
            hazardous BOOLEAN DEFAULT false
        );

        CREATE TABLE IF NOT EXISTS stock_movements (
            id SERIAL PRIMARY KEY,
            warehouse_id INTEGER NOT NULL REFERENCES warehouses(id),
            product_id INTEGER NOT NULL REFERENCES products(id),
            movement_type VARCHAR(50),
            date TIMESTAMP NOT NULL,
            quantity INTEGER NOT NULL
        );
    `;

const insertDataQuery = `
            BEGIN;
            INSERT INTO warehouses (name, hazardous_stock, size)
            SELECT 'Warehouse A', false, '10000'
            WHERE NOT EXISTS (SELECT 1 FROM warehouses LIMIT 1)
            UNION ALL
            SELECT 'Warehouse B', true, 5000
            WHERE NOT EXISTS (SELECT 1 FROM warehouses LIMIT 1);

            INSERT INTO products (name, size_per_unit, hazardous)
            SELECT 'My Fancy Product A', 100, false
            WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)
            UNION ALL
            SELECT 'My Fancy Product B', 340, true
            WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1)
            UNION ALL
            SELECT 'My Fancy Product C', 5000, false
            WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

            INSERT INTO stock_movements (warehouse_id, product_id, movement_type, date, quantity)
            SELECT 1, 1, 'import', TO_TIMESTAMP('2022-03-07', 'YYYY-MM-DD'), 100
            WHERE NOT EXISTS (SELECT 1 FROM stock_movements LIMIT 1)
            UNION ALL
            SELECT 2, 2, 'import', TO_TIMESTAMP('2022-03-07', 'YYYY-MM-DD'), 340
            WHERE NOT EXISTS (SELECT 1 FROM stock_movements LIMIT 1);

            COMMIT;
 `;

 export { createTablesQuery, insertDataQuery }