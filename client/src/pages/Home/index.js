import { useEffect, useState, useContext } from "react";
import { HomeContainer } from "./styles";
import { gql, useQuery, useMutation } from '@apollo/client';
import Modal from "../../components/Modal";
import { ModalContext } from "../../context/ModalContext";
import {Link} from 'react-router-dom'

const Home = () => {
    const GET_PRODUCT = gql`
        query GetAllPRoducts {
            products {
                id
                name
                hazardous,
                size_per_unit,
                quantity
            }
        }
    `
    const [products, setProducts] = useState();

    const { state, toggleModal } = useContext(ModalContext)
    const { isModalVisible } = state

    const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
        onCompleted: (queryData) => {
            setProducts(queryData?.products)
        }
    });

    useEffect(() => {
        refetch();
    }, [isModalVisible]);

    return (
        <HomeContainer>
            <h1>Welcome to Stockopolis</h1>
            <p>
                The superhero for your warehouse, keeping track of your inventory so you don't have to.<br/> 
                It's like having a personal assistant, but without the coffee runs.
            </p>

            {isModalVisible && <Modal/>}

            <button type="button" className="btn btn-primary mb-5" onClick={() => toggleModal()}> Add Product</button>
            <button type="button" className="btn btn-info mb-5 ms-2"><Link to="/warehouses">Manage Warehouses</Link></button>
            
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Size Per Unit</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Hazardous</th>
                    </tr>
                </thead>
                <tbody>
    
                    {products && (
                         products.map((element, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.size_per_unit}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.hazardous ? 'Yes' : 'No' }</td>
                                </tr>
                            )
                         }
                      
                    ))
                       
                    }
                  
                </tbody>
            </table>
        </HomeContainer>
    )
}

export default Home;