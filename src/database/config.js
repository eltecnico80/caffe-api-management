
const mongoose = require('mongoose');


const dbConecction = async () => {

  try {
    await mongoose.connect( process.env.MONGO_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } );

    console.log('Base de datos conectada.!!!')
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar la base de datos');
    // aquí utilizar nodemailer para informar al admin
  }
};




module.exports = {
  dbConecction
};