
const { Router } = require('express');

const { check } = require('express-validator');

// Controllers
const { getUsuarios, putUsuarios, postUsuarios, deleteUsuarios } = require('../controllers/user.controller');

const router = Router();


router.get('/', getUsuarios);

router.put('/', putUsuarios);

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe ser más de 6 caracteres').isLength({ min: 6 }),
  check('email', 'El correo no es valido').isEmail(),
], postUsuarios);

router.delete('/', deleteUsuarios);





module.exports = router; 
