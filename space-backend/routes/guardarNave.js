const { Router } = require("express");
const router = Router();

const { postGuardarNave } = require("../controllers/guardarNave");

// Logica para guardar datos nuevos.
router.post("/guardar", postGuardarNave);

module.exports = router;
