import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { ModalContainer } from './styles';
import { ModalContext } from '../../context/ModalContext';
import { NEW_PRODUCT } from '../../data/queries';
import { useMutation } from '@apollo/client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1, { message: 'Please enter product name' }).max(50, {message: 'Product name too long'}),
    size: z.number().min(1, { message: 'Please enter size above 1' }),
    quantity: z.number().min(1, {message: 'Please enter quantity above 1'})
})

const Modal = () => {
    const { toggleModal } = useContext(ModalContext)

    const [createProduct] = useMutation(NEW_PRODUCT)


    const { register, handleSubmit, watch, reset, formState: { errors }} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            size: 1,
            quantity: 1,
            hazardous: 0
          }
    });

    const handleAddProduct = (formValues) => {
        const { name, quantity, size } = formValues
        const hazardous = watch('hazardous')

        createProduct({
            variables: {
                    name: name,
                    quantity: quantity,
                    size_per_unit: size,
                    hazardous: Boolean(+hazardous)
            
            }
        })
        toggleModal()
    }

    return createPortal(
        <ModalContainer>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <label>
                    Product Name
                    <input placeholder='Product Name' {...register('name', { required: true, maxLength: 50 })} />
                </label>
                <label>
                    Size Per Unit
                    <input placeholder='Size' type="number" {...register('size', {required: true, min: 1, valueAsNumber: true})} />
                </label>
                <label>
                    Quantity
                    <input placeholder='Quantity' type="number" {...register('quantity', {required: true, min: 1, valueAsNumber: true })}/>
                </label>
    
                <div className="radios">
                    Hazardous
                    <div>
                        <label className="radios">
                         <input type='radio' {...register('hazardous')} value={1} /> Yes
                    </label>
                    <label className="radios">
                         <input type='radio' {...register('hazardous')} value={0} defaultChecked={watch('hazardous') === undefined || watch('hazardous') === 0}/> No 
                    </label> 
                    </div>
                   
                   
                </div>
                {errors.name && <span>{errors.name?.message}</span>}
                {errors.size && <span>{errors.size?.message}</span>}
                {errors.quantity && <span>{errors.quantity?.message}</span>}
                
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

export default Modal;