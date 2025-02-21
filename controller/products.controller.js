import { Products } from '../models/products.model.js'

export const createProducts = async (req, res) => {
    try {
        const { name, price, quantity, description } = req.body;

        if (!name || !price || !quantity) {
            return res.status(400).json({
                message: 'something missing',
                success: false
            });
        }

        await Products.create({
            name,
            price,
            quantity,
            description
        });

        return res.status(201).json({
            message: "product created successfully",
            success: true
        })

    } catch (error) {
        res.status(404).json({
            message: error.message || "an error occured",
            success: false
        });
    }
};

export const allProducts = async (req, res) => {
    try {
        const products = await Products.find();
        if (products.length == 0) {
            return res.status(404).json({
                message: "there are'nt any products",
                success: false
            })
        }
        return res.status(200).json({
            products,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while retrieving products",
            success: false
        });
    }
};

export const singleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            product,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while retrieving the product",
            success: false
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, price, quantity, description } = req.body;
        const id = req.params.id;
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { name, price, quantity, description },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            product: updatedProduct,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "something wrong",
            status: false
        })
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json(
                { 
                    message: "Product not found", 
                    success:true
                }
            );
        }

        await Products.findByIdAndDelete(id);

        res.status(200).json(
            { 
            message: "Product deleted successfully" ,
            success:false
            }
        );

    } catch (error) {
        res.status(500).json(
            { 
                message: error.message ||"Server error",
                success: false
            }
        );
    }
};

