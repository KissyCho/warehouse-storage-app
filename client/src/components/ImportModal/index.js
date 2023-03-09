import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { ModalContainer } from '../Modal/styles';
import { ModalContext } from '../../context/ModalContext';
import { DataContext } from '../../context/DataContext';
import { useMutation } from '@apollo/client';
import { NEW_STOCK_MOVEMENT } from '../../data/queries';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const ImportModal = () => {
    const { toggleModal } = useContext(ModalContext)
    const [currentWarehouseId, setCurrentWarehouseId] = useState()
    const { state } = useContext(DataContext);
    const {warehouses, products } = state
    const [createStockMovement] = useMutation(NEW_STOCK_MOVEMENT)

    const { register, handleSubmit, watch, reset, formState: { errors }} = useForm({

        defaultValues: {
            quantity: 1,
            
          }
    });
    let warehouseId = watch('warehouse_id')
    useEffect(() => {
        setCurrentWarehouseId(warehouseId)
    },[warehouseId])
    console.log(warehouseId)
    const handleAddProduct = (formValues) => {
        const { warehouse_id, quantity, product_id, date, movement_type } = formValues
        createStockMovement({
            variables: {
                    warehouse_id: Number(warehouse_id),
                    quantity: quantity,
                    product_id: Number(product_id),
                    date: date,
                    movement_type: movement_type
            }
        })
        toggleModal()
    }

    return createPortal(
        <ModalContainer>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                Warehouse
                <select {...register('warehouse_id', { required: true })}>
                        {warehouses.map(warehouse => (
                            <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                        ))}
                </select>
                <label>
                    Quantity
                    <input type="number" {...register('quantity', {required: true, min: 1, valueAsNumber: true})} />
                </label>
                <label>
                    Date
                    <input placeholder='Date' type="date" {...register('date', {required: true})}/>
                </label>
                Product
                <select {...register('product_id', { required: true })}>
                            {products.filter(product => {
                                 const warehouse = warehouses.find(w => w.id == (currentWarehouseId ? currentWarehouseId : 1)) 
                                
                                 return warehouse?.hazardous_stock === product?.hazardous
                            }).map(product => (
                            
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                </select>
                <select {...register('movement_type', { required: true })}>
                         <option value='import'>Import</option>
                         <option value='export'>Export</option>
                    </select>
                
                <div className="buttons-container">
                    <button type="submit" className="btn btn-success">Add</button>
                    <button type="button" className="btn btn-danger" onClick={(e) => {e.preventDefault(); reset(); toggleModal() }}>Cancel</button>
                </div>
                
            </form>
        </ModalContainer>
        ,
        document.getElementById('portal')
    )
}

export default ImportModal;