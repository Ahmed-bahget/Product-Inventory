import express from "express";
import { allProducts, createProducts, deleteProduct, singleProduct, updateProduct } from "../controller/products.controller.js";

const router = express.Router();

router.route('/').post(createProducts);
router.route('/').get(allProducts);
router.route('/:id').get(singleProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

export default router;