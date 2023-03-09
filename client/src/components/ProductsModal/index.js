import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { ModalContainer } from '../Modal/styles';
import { ModalContext } from '../../context/ModalContext';
import { gql, useQuery, useMutation } from '@apollo/client';

const NEW_PRODUCT = gql`
    mutation createNewStockMovement($warehouse_id: Int!, $product_id: Int!, $date: String!, $quantity: Int!) {
        createNewStockMovement(input: {warehouse_id: $warehouse_id, product_id: $product_id, date: $date, quantity: $quantity }) {
           warehouse_id
           product_id
           date 
           quantity
        }
    }
`

const Modal = () => {
    const { toggleModal } = useContext(ModalContext)

    return createPortal(
        <ModalContainer>
           <button type="button" className="btn btn-danger" onClick={() => { toggleModal() }}>Close</button>
        </ModalContainer>
        ,
        document.getElementById('portal')
    )
}

export default Modal;