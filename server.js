require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error(err));

// Importar rutas
const productosRoutes = require('./routes/productos');
const ubicacionesRoutes = require('./routes/ubicaciones');

app.use('/productos', productosRoutes);
app.use('/ubicaciones', ubicacionesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});