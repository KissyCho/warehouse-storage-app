
import {Link} from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const Warehouses = () => {

    const[warehouses, setWarehouses] = useState();
    const [stockMovements, setStockMovements] = useState();

    const GET_WAREHOUSES = gql`
        query GetAllWarehouses {
            warehouses {
                id
                name
                size
                hazardous_stock
              }
        }
    `
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
    `

    const { refetch: refetchWarehouses } = useQuery(GET_WAREHOUSES, {
        onCompleted: (queryData) => {
            setWarehouses(queryData?.warehouses)
        }
    });

    const { loading, error, data, refetch} = useQuery(GET_STOCK_MOVEMENT, {
        onCompleted: (queryData) => {
            console.log(queryData)
            setStockMovements(queryData?.stockMovements)
        }
    })

    return(
        <div>
            <button type="button" className="btn btn-info mb-5 ms-2"><Link to="/">Back to Products List</Link></button>
            <button type="button" className='btn btn-primary mb-5 ms-2'>Add a warehouse</button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Current Stock</th>
                        <th scope="col">Space Left</th>
                        <th scope="col">Hazardous Stock</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
    
                    {warehouses && (
                         warehouses.map((element, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.size}</td>
                    
                                    <td>{element.hazardous_stock ? 'Yes' : 'No' }</td>
                                </tr>
                            )
                         }
                      
                    ))
                       
                    }
                  
                </tbody>
            </table>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Type</th>
                        <th scope="col">From / To</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
    
                    {stockMovements && (
                         stockMovements.map((element, index) => {
                            console.log(element)
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.product_id.name}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.movement_type}</td>
                                    <td>{element.warehouse_id.name}</td>
                                    <td>{element.date}</td>
                                </tr>
                            )
                         }
                      
                    ))
                       
                    }
                  
                </tbody>
            </table>
        </div>
    )
}

export default Warehouses