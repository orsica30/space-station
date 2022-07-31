const { Schema, model } = require("mongoose");

const NaveSchema = Schema({
  tipo: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true    
  },
  peso: {
    type: Number,
    required: true,    
  },
  empuje:{
      type:Number,
      required: true,
  },
  combustible: {
    type: String,
    required: true,
  },
  pais:{
    type: String,
    required: true
  }

});

module.exports = model("nave", NaveSchema);