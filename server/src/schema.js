import { gql } from 'apollo-server';

const typeDefs = gql`
    type Warehouse {
        id: ID!
        name: String!
        size: Int!
        hazardous_stock: Boolean!
    }

    type Product {
        id: ID!
        name: String!
        size_per_unit: Int!
        hazardous: Boolean!
        quantity: Int!
    }

    type StockMovement {
        id: ID!
        product: Product!
        amount: Int!
        date: String!
        type: String!
    }

    type Query {
        stockMovements: [StockMovement!]!
        warehouses: [Warehouse!]!
        products: [Product]
    }
`

export default typeDefs;