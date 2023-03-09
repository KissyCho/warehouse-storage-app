const Table = ({products}) => {

    return (
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
    )
    
}

export default Table