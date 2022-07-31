const { response } = require("express");
const Naves = require("../models/nave");

const postGuardarNave = async (req, res = response) => {
  const { tipo, nombre, peso, empuje, combustible, pais } = req.body;

  const nuevaNave = new Naves({
    tipo,
    nombre,
    peso,
    empuje,
    combustible,
    pais,
  });
  try {
    const guardarNave = await nuevaNave.save();

    if (guardarNave) {
      res.status(200).json({
        ok: true,
        msg: "Nave guardada exitosamente",
      });
    } else {
      return res.status(500).send({
        ok: false,        
        msg: "Something happen!",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msgUX: "ERROR",
      msg: "Refresh this page",
      error,
    });
  }

};

module.exports = { postGuardarNave };
