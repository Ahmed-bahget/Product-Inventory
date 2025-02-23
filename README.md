# Product Inventory API

This project is a RESTful API for managing product inventory, built with Node.js, Express.js, and MongoDB.

## Features
- Create, Read, Update, and Delete (CRUD) operations for products.
- MongoDB for data storage.
- Input validation to ensure data integrity.
- Proper error handling with meaningful response messages.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://bitbucket.org/review2501/technical-assessment.git
   cd technical-assessment
   git checkout ahmed-bahget
   npm install
   npm start
2. The API will run on http://localhost:5800

Method	Endpoint	Description
POST	/api/products	Create a new product
GET	/api/products	Retrieve all products
GET	/api/products/:id	Get a single product by ID
PUT	/api/products/:id	Update a product by ID
DELETE	/api/products/:id	Delete a product by ID