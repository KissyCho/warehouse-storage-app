
import { findAll, insert, findById } from "./db/customORM.js";
import { connect } from './db/database.js'
const STOCK_MOVEMENT = 'stock_movements';

const WAREHOUSES = 'warehouses';
const PRODUCTS = 'products';

connect();

const resolvers = {
  Query: {
    stockMovements: async () => {
      const result = await findAll(STOCK_MOVEMENT)
      return result;
    },
    warehouses: async() => {
      const result = findAll(WAREHOUSES)
      return result
    },
    products: () => {
      return findAll(PRODUCTS);
    }
  },
  Mutation: {
     createProduct: async (_, {input}) => {
      const data = await insert(PRODUCTS, input)
      return data
    }
  },
  StockMovement: {
    product_id: async (parent) => {
      const { rows } = await findById(PRODUCTS, parent.product_id)
      return rows[0];
    },
    warehouse_id: async (parent) => {
      const { rows } = await findById(WAREHOUSES, parent.warehouse_id)
      return rows[0];
    },
    date: (parent) => {
      const dateObject = new Date(parent.date)
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        timeZone: 'Europe/Sofia' 
      };
      const formattedDate = dateObject.toLocaleDateString('en-US', options);
      return formattedDate;
    }
  
  }
}
export default resolvers