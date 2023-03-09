import {Link} from 'react-router-dom'
import { useContext, useEffect} from 'react';

import { ModalContext } from "../../context/ModalContext";
import { DataContext } from '../../context/DataContext';
import Table from '../../components/Table';
import ImportModal from '../../components/ImportModal';
import Button from '../../components/Button';

const Warehouses = () => {
    const { state, toggleModal } = useContext(ModalContext)
    const{ state: dataState, refetchWarehouses, refetchStockMovements, warehouseStockAmountRefetch } = useContext(DataContext)

    const {warehouses, stockMovements, warehouseStockAmount} = dataState
    const { isModalVisible } = state
 
    useEffect(() => {
        refetchStockMovements();
        refetchWarehouses()
        warehouseStockAmountRefetch() 
      }, [isModalVisible]);

    return(
       <>
       {isModalVisible && <ImportModal/>}
       <div>
            <Button type="button" btnType="info" classNames="mb-5 ms-2"><Link to="/">Back to Products List</Link></Button>
            <Button type="button" btnType="info" classNames="mb-5 ms-2" onClick={() => {toggleModal()}}>Import / Export</Button>

            <Table 
            items={warehouses} 
            headers={[
                'Name',
                'Current Stock',
                'Space Left',
                'Hazardous Stock'
            ]}
            type='warehouses-stock'
            warehouseStockAmount={warehouseStockAmount}
            />

            <Table 
            items={stockMovements}
            headers={[
                'Product Name',
                'Amount',
                'Type',
                'From / To',
                'Date'
            ]}
            type="stock-movements"
            />
        </div>
       </>
        
    )
}

export default Warehouses