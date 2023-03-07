
import { findAll } from "./db/customORM.js";
import { connect } from './db/database.js'
const STOCK_MOVEMENT = 'stock_movement';
const WAREHOUSES = 'warehouses';
const PRODUCTS = 'products';

connect();

const resolvers = {
  Query: {
    stockMovements() {
      return findAll(STOCK_MOVEMENT)
    },
    warehouses() {
      return findAll(WAREHOUSES)
    },
    products() {
      return findAll(PRODUCTS);
    }
  }
}
export default resolvers