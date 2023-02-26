var express = require('express');
var router = express.Router();
const Estudiante = require('../model/turista');
/* GET users listing. */
router.get('/', function (req, res, next) {
  Estudiante
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  Estudiante
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// POST un elemento nuevo en la base de datos
router.post('/', (req, res) => {
  const est = new Estudiante(req.body);
  est
    .save()
    .then((data) => res.json(est))
    .catch((error) => res.json({ message: error }));
});
// PUT un elemento nuevo en la base de datos
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { _id, carne, nombre, edad } = req.body
  Estudiante
    .updateOne({ _id: id }, { $set: { carne, nombre, edad } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
// PATCH un elemento de la base de datos indicando su id
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const nombre = req.body.nombre;
  const carne = req.body.carne;

  Estudiante
    .updateOne({ _id: id }, { $set: { nombre, carne } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// DELETE un elemento nuevo en la base de datos
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Estudiante
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = router;


