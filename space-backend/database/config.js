const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false); //Evitar error en consola al hacer update

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });    

    console.log("DB connection successful");
  } catch (e) {
    console.log(e);
    throw new Error("Error in DB connection!");
  }
};

module.exports = {
  dbConnection,
};
