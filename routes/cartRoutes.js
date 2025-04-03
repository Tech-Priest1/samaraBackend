const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.post('/add', cartController.addToCart);
router.get("/:usuario", cartController.getCart);  
router.delete("/:usuario/:produto", cartController.removeFromCart);

module.exports = router;
