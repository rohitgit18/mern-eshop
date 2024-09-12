import express from "express";
import { deleteProduct, getProduct, getProductList, saveInBulk } from "../controller/product.controller.js";
const router = express.Router();

router.post("/save-in-bulk",saveInBulk);
router.get("/list",getProductList);
router.get("/:id",getProduct);
router.delete("/:id",deleteProduct);
export default router; 