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
        product_id: Product!
        warehouse_id: Warehouse!
        quantity: Int!
        date: String!
        movement_type: String!
    }

    input NewProductInput {
        name: String!
        size_per_unit: Int!
        hazardous: Boolean!
        quantity: Int!
    }

    type Query {
        stockMovements: [StockMovement!]!
        warehouses: [Warehouse!]!
        products: [Product]
    }

    type Mutation {
        createProduct(input: NewProductInput!): Product!
    }
`

export default typeDefs;