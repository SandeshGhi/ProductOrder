import React from 'react';
import './ProductList.css'; // Import CSS file for styling

const ProductList = ({ products, selectedItems, handleCheckboxChange }) => {
  return (
    <div className="tables">
        <div>
      <h1>Product List</h1>
            
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Weight (g)</th>
            <th>Checkbox</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.weight}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Courier Charge Table */}
      <div>
      <h1>Courier Charge</h1>
      <table className="courier-charge-table">
        <thead>
          <tr>
            <th>Weight (g)</th>
            <th>Charge ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1-200</td>
            <td>5</td>
          </tr>
          <tr>
            <td>201-500</td>
            <td>10</td>
          </tr>
          <tr>
            <td>501-1000</td>
            <td>15</td>
          </tr>
          <tr>
            <td>1001-5000</td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ProductList;
