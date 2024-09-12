import express from "express";
import { addToCart, getCart, deleteCartItem } from "../controller/cart.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/add-to-cart",addToCart);
router.get("/:userId",verifyToken,getCart);
router.delete("/:productId/:userId",deleteCartItem);
export default router;