import React, { useState } from 'react';
import ProductList from './components/ProductList';
import OrderResult from './components/OrderResult';
import './App.css'

function App() {
  const [products] = useState([
    { id: 1, name: 'Item 1', price: 10, weight: 200 },
    { id: 2, name: 'Item 2', price: 100, weight: 20 },
    { id: 3, name: 'Item 3', price: 30, weight: 300 },
    { id: 4, name: 'Item 4', price: 10, weight: 200 },
    { id: 5, name: 'Item 5', price: 100, weight: 20 },
    { id: 6, name: 'Item 6', price: 30, weight: 300 },
    { id: 7, name: 'Item 7', price: 10, weight: 200 },
    { id: 8, name: 'Item 8', price: 100, weight: 20 },
    { id: 9, name: 'Item 9', price: 30, weight: 300 },
    { id: 10, name: 'Item 10', price: 10, weight: 200 },
    { id: 11, name: 'Item 11', price: 100, weight: 20 },
    { id: 12, name: 'Item 12', price: 30, weight: 300 },
    { id: 13, name: 'Item 13', price: 10, weight: 200 },
    { id: 14, name: 'Item 14', price: 100, weight: 20 },
    { id: 15, name: 'Item 15', price: 30, weight: 300 },
    { id: 16, name: 'Item 16', price: 10, weight: 200 },
    { id: 17, name: 'Item 17', price: 100, weight: 20 },
    { id: 18, name: 'Item 18', price: 30, weight: 300 },
    { id: 19, name: 'Item 19', price: 10, weight: 200 },
    { id: 20, name: 'Item 20', price: 100, weight: 20 },
    { id: 21, name: 'Item 21', price: 30, weight: 300 },
    { id: 22, name: 'Item 22', price: 10, weight: 200 },
    { id: 23, name: 'Item 23', price: 100, weight: 20 },
    { id: 24, name: 'Item 24', price: 30, weight: 300 },
    { id: 25, name: 'Item 25', price: 10, weight: 200 },
    { id: 26, name: 'Item 26', price: 100, weight: 20 },
    { id: 27, name: 'Item 27', price: 30, weight: 300 },
    { id: 28, name: 'Item 28', price: 10, weight: 200 },
    { id: 29, name: 'Item 29', price: 100, weight: 20 },
    { id: 30, name: 'Item 30', price: 220, weight: 800 },
    { id: 31, name: 'Item 31', price: 10, weight: 200 },
    { id: 32, name: 'Item 32', price: 100, weight: 20 },
    { id: 33, name: 'Item 33', price: 190, weight: 700 },
    { id: 34, name: 'Item 34', price: 10, weight: 200 },
    { id: 35, name: 'Item 35', price: 100, weight: 20 },
    { id: 36, name: 'Item 36', price: 30, weight: 300 },
    { id: 37, name: 'Item 37', price: 10, weight: 200 },
    { id: 38, name: 'Item 38', price: 100, weight: 20 },
    { id: 39, name: 'Item 39', price: 30, weight: 300 },
    { id: 40, name: 'Item 40', price: 10, weight: 200 },
    { id: 41, name: 'Item 41', price: 100, weight: 20 },
    { id: 42, name: 'Item 42', price: 30, weight: 300 },
    { id: 43, name: 'Item 43', price: 10, weight: 200 },
    { id: 44, name: 'Item 44', price: 100, weight: 20 },
    { id: 45, name: 'Item 45', price: 30, weight: 300 },
    { id: 46, name: 'Item 46', price: 10, weight: 200 },
    { id: 47, name: 'Item 47', price: 100, weight: 20 },
    { id: 48, name: 'Item 48', price: 190, weight: 800 },
    { id: 49, name: 'Item 49', price: 199, weight: 200 },
    { id: 50, name: 'Item 50', price: 12, weight: 20 },
    // Add more products here
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [packages, setPackages] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (productId) => {
    const index = selectedItems.indexOf(productId);
    if (index > -1) {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  // Function to handle place order button click
const handlePlaceOrder = () => {
  // Logic to divide selected items into packages
  const packages = [];
  let currentPackage = { items: [], totalWeight: 0, totalPrice: 0, courierPrice: 0 };

  selectedItems.forEach(itemId => {
    const item = products.find(product => product.id === itemId);
    if (item) {
      // Check if adding the current item exceeds package limits
      if (
        (currentPackage.totalPrice + item.price) > 250 || 
        (currentPackage.totalWeight + item.weight) > 5000 || 
        currentPackage.items.length >= 3 // Maximum 3 items per package
      ) {
        packages.push({ ...currentPackage });
        currentPackage = { items: [], totalWeight: 0, totalPrice: 0, courierPrice: 0 };
      }
      currentPackage.items.push(item.name);
      currentPackage.totalWeight += item.weight;
      currentPackage.totalPrice += item.price;
      // Calculate courier price based on weight range
      if (currentPackage.totalWeight <= 200) {
        currentPackage.courierPrice = 5;
      } else if (currentPackage.totalWeight <= 500) {
        currentPackage.courierPrice = 10;
      } else if (currentPackage.totalWeight <= 1000) {
        currentPackage.courierPrice = 15;
      } else {
        currentPackage.courierPrice = 20;
      }
    }
  });

  // Push the last package
  if (currentPackage.items.length > 0) {
    packages.push({ ...currentPackage });
  }
  
  setPackages(packages);
};


  return (
    <div>
      <ProductList
        products={products}
        selectedItems={selectedItems}
        handleCheckboxChange={handleCheckboxChange}
      />
      <button className='place-order' onClick={handlePlaceOrder}>Place Order</button>
      {packages.length > 0 && <OrderResult packages={packages} />}
    </div>
  );
}

export default App;
