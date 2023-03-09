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

const schema = z.object({
    quantity: z.number().min(1, {message: 'Please enter quantity above 1'}),
    warehouse_id: z.string(),
    date: z.string().min(1, {message: 'Please enter a date' }),
    product_id: z.string(),
    movement_type: z.string()
})

const ImportModal = () => {
    const { toggleModal } = useContext(ModalContext)
    const [currentWarehouseId, setCurrentWarehouseId] = useState()
    const { state } = useContext(DataContext);
    const {warehouses, products, warehouseStockAmount } = state
    const [createStockMovement] = useMutation(NEW_STOCK_MOVEMENT)
    const [errorMessages, setErrorMessages ] = useState(null)

    const { register, handleSubmit, watch, reset, formState: { errors }} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            quantity: 1,
          }
    });
    let warehouseId = watch('warehouse_id')
    useEffect(() => {
        setCurrentWarehouseId(warehouseId)
    },[warehouseId])
    const handleAddStockMovement = (formValues) => {
        const { warehouse_id, quantity, product_id, date, movement_type } = formValues
        const warehouseProducts= warehouseStockAmount
        try {
            
            if( movement_type === 'export') { 
                const products  = warehouseProducts.find(e => e.productStocks[0].product_id == product_id)
                if (!products) {
                    throw new Error('Product is not stocked here');
                }
                if(quantity > products.productStocks[0].count) {
                    throw new Error('Not enough amount');
                } 
            } else if ( movement_type === 'import') {
                const currentWarehouseSpace = warehouseStockAmount?.find(item => item.warehouseId == warehouse_id)
                const currentWarehouse = warehouses.find(item => item.id == warehouse_id)

                const freeSpace = currentWarehouse?.size - currentWarehouseSpace?.occupiedSpace
                console.log(products)
                if (freeSpace < quantity) {
                    throw new Error ('Not enough space')
                }
            }

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

        } catch (error) {
            setErrorMessages(error.message);
        }
    }

    return createPortal(
        <ModalContainer>
            <form onSubmit={handleSubmit(handleAddStockMovement)}>
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

                {errors.quantity && <span>{errors.quantity?.message}</span>}
                {errors.date && <span>{errors.date?.message}</span>}
                {errorMessages && <span>{errorMessages}</span>}
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