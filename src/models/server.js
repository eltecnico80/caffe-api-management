const express = require('express');
const cors = require('cors');

// ----> db connection importation
const { dbConecction } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/v1/usuarios';

    // ---->
    this.conectarDB(); 

    // middlewares
    this.middlewares();

    // rutas de mi app
    this.routes();


  }

  // db connection
  async conectarDB() {

    await dbConecction()
  }

  middlewares() {

    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json());


    // directorio público
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user.routes'));
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log(`APP Listen on port ${this.port}`)
    })
  }


}


module.exports = Server;