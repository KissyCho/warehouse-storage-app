import { useLayoutEffect, useState } from "react";
import { HomeContainer } from "./styles";
import { gql, useQuery } from '@apollo/client';

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

    const { loading, error, data } = useQuery(GET_PRODUCT, {
        onCompleted: (queryData) => {
            setProducts(queryData?.products)
        }
    });
    return (
        <HomeContainer>
            <h1>Welcome to Stockopolis</h1>
            <p>
                The superhero for your warehouse, keeping track of your inventory so you don't have to.<br/> 
                It's like having a personal assistant, but without the coffee runs.
            </p>
            <div className="d-flex mt-5 mb-5">
                <input className="form-control form-control-lg"></input>
                <button type="button" class="btn btn-primary"> Add Product</button>
            </div>
            
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