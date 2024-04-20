import React from 'react';
import './OrderResult.css'

const OrderResult = ({ packages }) => {
  return (
    <div className='order-results'>
      <h2>Order Result</h2>
      {packages.map((pkg, index) => (
        <div key={index}>
          <h3>Package {index + 1}</h3>
          <p>Items - {pkg.items.join(', ')}</p>
          <p>Total weight - {pkg.totalWeight}g</p>
          <p>Total price - ${pkg.totalPrice}</p>
          <p>Courier price - ${pkg.courierPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderResult;