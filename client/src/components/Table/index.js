const Table = ({ items, headers, type, ...rest }) => {

    return (
        <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {headers.map((element, index) => {
                            return (
                                <th scope="col" key={index}>{element}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
    
                    {items && type === 'products' && (
                         items.map((element, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.size_per_unit}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.hazardous ? 'Yes' : 'No' }</td>
                                </tr>
                            )
                         })) 
                    }

                    {items && type === 'warehouses-stock' && (
                        items.map((element, index) => {
                            const warehouseStock = rest.warehouseStockAmount?.find(item => item.warehouseId == element.id)
                            return (
                                <tr key={element.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{warehouseStock?.totalStock}</td>
                                    <td>{warehouseStock && warehouseStock?.occupiedSpace}</td>
                                    <td>{element.hazardous_stock ? 'Yes' : 'No' }</td>
                                </tr>
                            )
                         }) 
                    )}

                    {items && type === 'stock-movements' && (
                        items.map((element, index) => {
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
                      )
                    )}

                </tbody>
            </table>
    )
    
}

export default Table