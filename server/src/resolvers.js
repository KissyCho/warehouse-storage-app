
import { findAll, insert, findById, insertImport} from "./db/customORM.js";
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
    },
    getCurrentStockAmount: async () => {
    const rows = await findAll(STOCK_MOVEMENT)

    const warehouseStocks = {}
    const allProducts = await findAll(PRODUCTS)
 
    rows.forEach(async (stockMovement) => {
      const warehouseId = stockMovement.warehouse_id
      const quantity = stockMovement.quantity
      const movementType = stockMovement.movement_type
      const resultRows = allProducts.find(p => p.id === stockMovement.product_id)

      if(!warehouseStocks[warehouseId]) {
        warehouseStocks[warehouseId] = { totalStock: 0, occupiedSpace: 0}
      }
 
      if (movementType === 'import') {
        warehouseStocks[warehouseId].totalStock += quantity
       warehouseStocks[warehouseId].occupiedSpace += resultRows ? resultRows.size_per_unit * quantity : 0
      } else {
        warehouseStocks[warehouseId].totalStock -= quantity
        warehouseStocks[warehouseId].occupiedSpace -= resultRows ? resultRows.size_per_unit * quantity : 0
      }
    })

    const result = Object.keys(warehouseStocks).map(warehouseId => ({
      warehouseId,
      totalStock: warehouseStocks[warehouseId].totalStock,
      occupiedSpace: warehouseStocks[warehouseId].occupiedSpace
    }));
        return result
    },
  },
  Mutation: {
     createProduct: async (_, {input}) => {
      const data = await insert(PRODUCTS, input)
      return data
    },
    createStockMovement: async (_, {input}) => {
      
      const data = await insertImport(STOCK_MOVEMENT, input)
      return data
    }

  },
  StockMovement: {    
    product_id: async (parent) => {
      const result = await findById(PRODUCTS, parent?.product_id)
      if ( !result ) {
        return 0
      }
      return result.rows[0];
    },
    warehouse_id: async (parent) => {
      
      const result = await findById(WAREHOUSES, parent?.warehouse_id)
    
      if ( !result ) {
        return 0
      }
      return result.rows[0];
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