const { response } = require("express");
const Naves = require("../models/nave");

const getObtenerNave = async (req, res = response) => {  
  
  try {
    const listaNave = await Naves.find();

    if (listaNave) {
      res.status(200).json({
        ok: true,
        msg: "Se han encontrado " + listaNave.length + ' naves.',
        rows: listaNave
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
      msg: "Error 500",
      error,
    });
  }

};

module.exports = { getObtenerNave };