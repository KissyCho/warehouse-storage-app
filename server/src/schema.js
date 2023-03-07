import { gql } from 'apollo-server';

const typeDefs = gql`
    type Warehouse {
        id: ID!
        name: String!
        size: Int!
        hazardousStock: Boolean!
    }

    type Product {
        id: ID!
        name: String!
        sizePerUnit: Int!
        hazardous: Boolean!
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
    }
`

export default typeDefs;