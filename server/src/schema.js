import { gql } from 'apollo-server';

const typeDefs = gql`
    type Warehouse {
        id: ID
        name: String
        size: Int
        hazardous_stock: Boolean
    }

    type WarehouseStocks {
        warehouseId: ID
        totalStock: Int
        occupiedSpace: Int
        productStocks: [ProductStocks]
    }

    type ProductStocks {
        product_id: Int,
        name: String,
        count: Int
    }

    type Product {
        id: ID
        name: String
        size_per_unit: Int
        hazardous: Boolean
        quantity: Int
    }

    type StockMovement {
        id: ID
        product_id: Product
        warehouse_id: Warehouse
        quantity: Int
        date: String
        movement_type: String
    }

    input NewProductInput {
        name: String!
        size_per_unit: Int
        hazardous: Boolean
        quantity: Int
    }

    input NewStockMovement {
        product_id: Int
        warehouse_id: Int
        quantity: Int
        date: String
        movement_type: String
    }

    type Query {
        stockMovements: [StockMovement!]!
        warehouses: [Warehouse!]!
        products: [Product]
        getCurrentStockAmount: [WarehouseStocks]
    }

    type Mutation {
        createProduct(input: NewProductInput!): Product!
        createStockMovement(input: NewStockMovement!): StockMovement!
    }
`

export default typeDefs;