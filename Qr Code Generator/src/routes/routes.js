// Express to handle nodejs (nodejs framework)
const express = require("express");
// Assigne the Express router method to a constant variable
const router = express.Router();
// Import the controllers
const QRController = require("../controllers/qr");
// Create a route to handle the incoming GET requests
router.get("/qr:value", QRController.create_qr);
// Export the routers
module.exports = router;
