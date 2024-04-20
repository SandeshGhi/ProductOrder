const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

const products = [
  { id: 1, name: 'Item 1', price: 100, weight: 200 },
  { id: 2, name: 'Item 2', price: 150, weight: 300 },
  { id: 3, name: 'Item 3', price: 120, weight: 250 },
  // Add more products here...
];

// Function to calculate shipping cost based on weight
function calculateShippingCost(weight) {
  // Sample shipping cost calculation logic
  return 10 + weight / 100; // Sample calculation: $10 base + $0.01 per gram
}

// Function to process the order and divide into packages
function processOrder(selectedItems) {
    // Initialize packages array to store the result
    const packages = [];
  
    // Initialize variables to track current package
    let currentPackage = {
      items: [],
      totalWeight: 0,
      totalPrice: 0
    };
  
    // Iterate through selected items
    selectedItems.forEach(itemId => {
      const product = products.find(p => p.id === itemId); // Find product by ID
  
      // Check if adding the product exceeds maximum price per package
      if (currentPackage.totalPrice + product.price > 250) {
        // If adding the product exceeds maximum price, push the current package to packages array
        packages.push(currentPackage);
        
        // Create a new package
        currentPackage = {
          items: [],
          totalWeight: 0,
          totalPrice: 0
        };
      }
  
      // Add product to the current package
      currentPackage.items.push(product.name);
      currentPackage.totalWeight += product.weight;
      currentPackage.totalPrice += product.price;
    });
  
    // Push the last package to packages array
    if (currentPackage.items.length > 0) {
      packages.push(currentPackage);
    }
  
    // Calculate courier price for each package
    const courierPrice = 15; // Sample courier price
    packages.forEach(pkg => {
      pkg.courierPrice = courierPrice;
    });
  
    return packages;
} 

// POST endpoint to process order
app.post('/processOrder', (req, res) => {
  const selectedItems = req.body.selectedItems; // Assuming selectedItems is an array of product IDs

  // Call function to process the order and divide into packages
  const packages = processOrder(selectedItems);

  // Return the result as JSON
  res.json({ packages });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
