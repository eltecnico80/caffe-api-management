
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');



const getUsuarios = async (request, response) => {
  // res.json({
  //   msg: 'get API - controller'
  // });

  try {
    const usuarios = await Usuario.find();

    if (!usuarios[0]) {
      response.status(404).json({ msg: 'NOT_FOUND' }); // ----> este mensaje es para el front end developer
    } else {
      response.status(200).json(usuarios);
    }
  } catch (error) {
    console.log(`Ocurrió un error al intentar recuperarlos de la base de datos ${error}`)
    // ----> aquí en realidad se enviará un correo al administrador cuando ocurrá un error, utilizando la libreria nodemailer
  }

};

const putUsuarios = (request, response) => {
  response.json({
    msg: 'put API - controller'
  });
};

// -----> post router to create a new user
const postUsuarios = async (request, response) => {

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json(errors);
  }

  const { name, email, password, role } = request.body;

  const usuario = new Usuario({ name, email, password, role });

  // verify if email exists
  const existsEmail = await Usuario.findOne({ email });

  if (existsEmail) {
    return response.status(400).json({
      msg: 'existe'
    });
  }

  // encrypt the password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();




  response.json({
    msg: 'post API - controller',
    usuario
  });
};


const deleteUsuarios = (request, response) => {
  response.json({
    msg: 'delete API - controller'
  });
};




module.exports = {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios
}