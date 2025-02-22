import request from 'supertest';
import app from '../app.js'; 
import { Products } from '../models/products.model.js';

describe('Products API', () => {
    beforeEach(async () => {
        await Products.deleteMany({}); 
    });

    describe('POST /api/products', () => {
        it('should create a new product', async () => {
            const res = await request(app)
                .post('/api/products')
                .send({
                    name: 'Test Product',
                    price: 100,
                    quantity: 10,
                    description: 'This is a test product',
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('product created successfully'); 
        });

        it('should return an error if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/products')
                .send({
                    name: 'Incomplete Product',
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('something missing'); 
        });
    });

    describe('GET /api/products', () => {
        it('should return all products', async () => {
            await Products.create({
                name: 'Test Product 1',
                price: 100,
                quantity: 10,
            });

            const res = await request(app).get('/api/products');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.products.length).toBe(1);
        });

        it('should return an error if no products exist', async () => {
            const res = await request(app).get('/api/products');

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe("there are'nt any products"); 
        });
    });

    describe('GET /api/products/:id', () => {
        it('should return a single product', async () => {
            const product = await Products.create({
                name: 'Test Product',
                price: 100,
                quantity: 10,
            });

            const res = await request(app).get(`/api/products/${product._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.product.name).toBe('Test Product');
        });

        it('should return an error if the product does not exist', async () => {
            const res = await request(app).get('/api/products/123456789012');

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Product not found'); 
        });
    });

    describe('PUT /api/products/:id', () => {
        it('should update a product', async () => {
            const product = await Products.create({
                name: 'Test Product',
                price: 100,
                quantity: 10,
            });

            const res = await request(app)
                .put(`/api/products/${product._id}`)
                .send({
                    name: 'Updated Product',
                    price: 200,
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.product.name).toBe('Updated Product');
            expect(res.body.product.price).toBe(200);
        });

        it('should return an error if the product does not exist', async () => {
            const res = await request(app)
                .put('/api/products/123456789012')
                .send({
                    name: 'Updated Product',
                });

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Product not found'); 
        });
    });

    
    describe('DELETE /api/products/:id', () => {
        it('should delete a product', async () => {
            const product = await Products.create({
                name: 'Test Product',
                price: 100,
                quantity: 10,
            });

            const res = await request(app).delete(`/api/products/${product._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Product deleted successfully'); 
        });

        it('should return an error if the product does not exist', async () => {
            const res = await request(app).delete('/api/products/123456789012');

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Product not found'); 
        });
    });
});