const express = require( "express" );
const router = express.Router();
const mainControllers = require( "../controllers/mainControllers")

router.get("/", mainControllers.index);

router.get("/register", mainControllers.register);

router.get("/login", mainControllers.login); 

router.get("/about", mainControllers.about);

router.get("/offers", mainControllers.offers);

router.get("/search", mainControllers.search);


module.exports = router;