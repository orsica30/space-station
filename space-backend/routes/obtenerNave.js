const { Router } = require("express");
const router = Router();

const { getObtenerNave } = require("../controllers/obtenerNave");

router.get("/obtener", getObtenerNave);

module.exports = router;
