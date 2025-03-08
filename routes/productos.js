const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos", error });
    }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { nombre, ubicacion, stock } = req.body;  // Cambié "precio" por "ubicacion"
        const nuevoProducto = new Producto({ nombre, ubicacion, stock });
        await nuevoProducto.save();
        res.json({ mensaje: "Producto agregado con éxito", producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al agregar producto", error });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado", producto: productoEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar producto", error });
    }
});

module.exports = router;

