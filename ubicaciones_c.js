async function listarUbicacionesConElementos() {
    try {
        const resUbicaciones = await fetch('http://localhost:3000/ubicaciones');
        const resProductos = await fetch('http://localhost:3000/productos');

        if (!resUbicaciones.ok || !resProductos.ok) throw new Error('Error al cargar datos');

        const ubicaciones = await resUbicaciones.json();
        const productos = await resProductos.json();

        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Ubicación</th>
                        <th>Descripción</th>
                        <th>Elementos</th>
                    </tr>
                </thead>
                <tbody>
        `;

        ubicaciones.forEach(u => {
            const elementosEnUbicacion = productos
                .filter(p => p.ubicacion == u.id)
                .map(p => p.nombre)
                .join(', ');

            tablaHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.descripcion}</td>
                    <td>${elementosEnUbicacion || 'Sin elementos'}</td>
                </tr>
            `;
        });

        tablaHTML += `</tbody></table>`;
        document.getElementById('tabla-ubicaciones-elementos').innerHTML = tablaHTML;

    } catch (error) {
        console.error("Error al obtener ubicaciones y elementos:", error);
        alert("No se pudieron cargar las ubicaciones.");
    }
}

async function listarElementosConUbicaciones() {
    try {
        const resProductos = await fetch('http://localhost:3000/productos');
        const resUbicaciones = await fetch('http://localhost:3000/ubicaciones');

        if (!resProductos.ok || !resUbicaciones.ok) throw new Error('Error al cargar datos');

        const productos = await resProductos.json();
        const ubicaciones = await resUbicaciones.json();

        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Elemento</th>
                        <th>Ubicación</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
        `;

        productos.forEach(p => {
            const ubicacion = ubicaciones.find(u => u.id == p.ubicacion);
            tablaHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${ubicacion ? ubicacion.descripcion : 'Ubicación no encontrada'}</td>
                    <td>${p.stock}</td> <!-- Se añade la cantidad del producto -->
                </tr>
            `;
        });

        tablaHTML += `</tbody></table>`;
        document.getElementById('tabla-elementos-ubicaciones').innerHTML = tablaHTML;

    } catch (error) {
        console.error("Error al obtener elementos y ubicaciones:", error);
        alert("No se pudieron cargar los elementos.");
    }
}

function actualizarHora() {
    let ahora = new Date();

    // Hora UTC
    let horaUTC = ahora.getUTCHours().toString().padStart(2, '0');
    let minutosUTC = ahora.getUTCMinutes().toString().padStart(2, '0');
    document.getElementById("utc").innerText = `${horaUTC}:${minutosUTC} Z`;

    // Hora local en España (Zona Horaria de Madrid)
    let opciones = { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
    let horaLocal = new Intl.DateTimeFormat("es-ES", opciones).format(ahora);
    document.getElementById("local").innerText = `${horaLocal} L`;
}

// Actualizar cada segundo
setInterval(actualizarHora, 1000);
actualizarHora();
