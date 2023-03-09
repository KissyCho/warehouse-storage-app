import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      hazardous
      size_per_unit
      quantity
    }
  }
`;

const NEW_PRODUCT = gql`
  mutation createProduct($name: String!, $size_per_unit: Int!, $hazardous: Boolean!, $quantity: Int!) {
    createProduct(input: {name: $name, size_per_unit: $size_per_unit, hazardous: $hazardous, quantity: $quantity }) {
      name
      size_per_unit
      hazardous 
      quantity
    }
  }
`;

const GET_STOCK_MOVEMENT = gql`
  query GetStockMovements {
    stockMovements {
      id
      product_id {
        id
        name
        size_per_unit
        hazardous
        quantity
      }
      warehouse_id {
        id
        name
        size
        hazardous_stock
      }
      quantity
      date
      movement_type
    }
  } 
`;

const GET_WAREHOUSES = gql`
  query GetAllWarehouses {
    warehouses {
      id
      name
      size
      hazardous_stock
    }
  }
`;

const GET_WAREHOUSE_STOCK_AMOUNT = gql`
  query getCurrentStockAmount {
    getCurrentStockAmount {
      warehouseId
      totalStock,
      occupiedSpace
    }
  }
`;


const NEW_STOCK_MOVEMENT = gql`
mutation createStockMovement($warehouse_id: Int!, $quantity: Int!, $product_id: Int!, $date: String!, $movement_type: String!) {
    createStockMovement(input: {warehouse_id: $warehouse_id, quantity: $quantity, product_id: $product_id, date: $date, movement_type: $movement_type }) {
       warehouse_id {
        id 
        name
       }
       quantity
       product_id {
        id 
        name
       }
       date 
       movement_type
    }
}
`

export { GET_PRODUCTS, NEW_PRODUCT, GET_STOCK_MOVEMENT, GET_WAREHOUSES, GET_WAREHOUSE_STOCK_AMOUNT, NEW_STOCK_MOVEMENT };
