import {Link} from 'react-router-dom'
import { useContext, useEffect} from 'react';
import { ModalContext } from "../../context/ModalContext";
import { DataContext } from '../../context/DataContext';
import ImportModal from '../../components/ImportModal';

const Warehouses = () => {
    const { state, toggleModal } = useContext(ModalContext)
    const{ state: dataState, refetchWarehouses, refetchStockMovements, warehouseStockAmountRefetch } = useContext(DataContext)

    const {warehouses, stockMovements, warehouseStockAmount} = dataState
    const { isModalVisible } = state
 
    useEffect(() => {
        console.log('yes')
        refetchStockMovements();
        refetchWarehouses()
        warehouseStockAmountRefetch() 
      }, [isModalVisible]);

    return(
       <>
       {isModalVisible && <ImportModal/>}
       <div>
            <button type="button" className="btn btn-info mb-5 ms-2"><Link to="/">Back to Products List</Link></button>
            <button type="button" class="btn btn-info mb-5 ms-2" onClick={() => {toggleModal() }}>Import / Export</button>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Current Stock</th>
                        <th scope="col">Space Left</th>
                        <th scope="col">Hazardous Stock</th>
                    </tr>
                </thead>
                <tbody>
    
                    {warehouses && (
                         warehouses.map((element, index) => {
                            const warehouseStock = warehouseStockAmount?.find(item => item.warehouseId == element.id)
                            return (
                                <tr key={element.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{warehouseStock?.totalStock}</td>
                                    <td>{warehouseStock && warehouseStock?.occupiedSpace}</td>
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
                            return (
                                <tr key={element.id}>
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


       </>
        
    )
}

export default Warehouses