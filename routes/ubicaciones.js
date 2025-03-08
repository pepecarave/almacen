const express = require('express');
const Ubicacion = require('../models/Ubicacion');
const router = express.Router();

// Obtener todas las ubicaciones
router.get('/', async (req, res) => {
    try {
        const ubicaciones = await Ubicacion.find();
        res.json(ubicaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener ubicaciones", error });
    }
});

// Agregar una nueva ubicación
router.post('/', async (req, res) => {
    try {
        const nuevaUbicacion = new Ubicacion(req.body);
        await nuevaUbicacion.save();
        res.json({ mensaje: "Ubicación agregada con éxito", ubicacion: nuevaUbicacion });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar ubicación", error });
    }
});

// Eliminar una ubicación
router.delete('/:id', async (req, res) => {
    try {
        await Ubicacion.findOneAndDelete({ id: req.params.id });
        res.json({ mensaje: "Ubicación eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar ubicación", error });
    }
});

module.exports = router;
