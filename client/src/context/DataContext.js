import { createContext, useReducer } from 'react';
import { GET_WAREHOUSES, GET_STOCK_MOVEMENT, GET_WAREHOUSE_STOCK_AMOUNT, GET_PRODUCTS } from '../data/queries';
import { useQuery } from '@apollo/client';


const ALL_WAREHOUSES = 'ALL_WAREHOUSES';
const ALL_STOCK_MOVEMENTS = 'ALL_STOCK_MOVEMENTS';
const WAREHOUSE_STOCK_AMOUNT = 'WAREHOUSE_STOCK_AMOUNT';
const ALL_PRODUCTS = 'ALL_PRODUCTS';

const initialState = {
    warehouses: [],
    products: [],
    stockMovements: [],
    warehouseStockAmount: []
};

const reducer = (state, action) => {
    switch (action.type) {
      case ALL_WAREHOUSES:
            return { ...state, warehouses: [...action.payload] };
        case ALL_STOCK_MOVEMENTS:
            return { ...state, stockMovements: [...action.payload] };
        case ALL_PRODUCTS:
            return { ...state, products: [...action.payload]}
        case WAREHOUSE_STOCK_AMOUNT:
            return { ...state, warehouseStockAmount: [...action.payload] };    
      default:
        return state;
    }
};

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const { refetch: refetchWarehouses } = useQuery(GET_WAREHOUSES, {
        onCompleted: (queryData) => {
            dispatch({type: ALL_WAREHOUSES, payload: queryData?.warehouses})
        }
    });

    const { refetch: refetchStockMovements } = useQuery(GET_STOCK_MOVEMENT, {
        onCompleted: (queryData) => {
            dispatch({type: ALL_STOCK_MOVEMENTS, payload: queryData?.stockMovements})
        }
    })

    const  { refetch: warehouseStockAmountRefetch } = useQuery(GET_WAREHOUSE_STOCK_AMOUNT, {
        onCompleted: (queryData) => {
           dispatch({ type: WAREHOUSE_STOCK_AMOUNT, payload: queryData?.getCurrentStockAmount})
      }
    }   
   )

   const { refetch: refetchProducts } = useQuery(GET_PRODUCTS, {
    onCompleted: (queryData) => {
        dispatch({ type: ALL_PRODUCTS, payload: queryData?.products })
    },
  });

    
    const value = {
      state,
      refetchWarehouses,
      refetchStockMovements,
      warehouseStockAmountRefetch,
      refetchProducts
    }
  
    return (
      <DataContext.Provider value={value}>
        {children}
      </DataContext.Provider>
    );
  };
  
  export {DataProvider, DataContext};

