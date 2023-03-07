
import { findAll } from "./db/customORM.js";
import { connect } from './db/database.js'
const STOCK_MOVEMENT = 'stock_movement';
const WAREHOUSES = 'warehouses';

connect();

const resolvers = {
  Query: {
    stockMovements() {
      return findAll(STOCK_MOVEMENT)
    },
    warehouses() {
      return findAll(WAREHOUSES)
    }
  }
}
export default resolvers