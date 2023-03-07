import { useLayoutEffect, useState } from "react";
import { HomeContainer } from "./styles";

const Home = () => {
    console.log('hi')
    return (
        <HomeContainer>
            <h1>Welcome to Stockopolis</h1>
            <p>
                The superhero for your warehouse, keeping track of your inventory so you don't have to.<br/> 
                It's like having a personal assistant, but without the coffee runs.
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
        </HomeContainer>
    )
}

export default Home;