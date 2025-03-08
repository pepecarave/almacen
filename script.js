window.onload = () => {
    cargarUbicacionesEnSelect();  // Llenar el select de ubicaciones
    cargarUbicaciones();  // Mostrar la tabla de ubicaciones
};


async function cargarProductos() {
    try {
        const res = await fetch('http://localhost:3000/productos');
        if (!res.ok) throw new Error('Error al cargar productos');

        const productos = await res.json();

        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Elemento</th>
                        <th>Ubicación</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        productos.forEach(p => {
            tablaHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.ubicacion}</td>
                    <td>${p.stock}</td>
                    <td>
                        <button onclick="eliminarProducto('${p._id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        tablaHTML += `</tbody></table>`;
        document.getElementById('tabla-productos').innerHTML = tablaHTML;

    } catch (error) {
        console.error("Error al obtener productos:", error);
        alert("No se pudieron cargar los productos.");
    }
}

async function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const ubicacion = document.getElementById('ubicacion').value; // ID de la ubicación
    const stock = parseInt(document.getElementById('stock').value);

    if (!nombre || ubicacion === "" || isNaN(stock)) {
        alert("Por favor, ingresa valores válidos y selecciona una ubicación.");
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, ubicacion, stock })
        });

        if (!res.ok) throw new Error('Error al agregar producto');

        alert('Producto agregado con éxito');
        cargarProductos();
    } catch (error) {
        console.error("Error al agregar producto:", error);
        alert("No se pudo agregar el producto.");
    }
}

async function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
        const res = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) throw new Error('Error al eliminar producto');

        alert("Producto eliminado con éxito");
        cargarProductos();  // Recargar la lista
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("No se pudo eliminar el producto.");
    }
}


async function cargarUbicaciones() {
    try {
        const res = await fetch('http://localhost:3000/ubicaciones');
        if (!res.ok) throw new Error('Error al cargar ubicaciones');

        const ubicaciones = await res.json();

        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>ID Ubicación</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        ubicaciones.forEach(u => {
            tablaHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.descripcion}</td>
                    <td>
                        <button onclick="eliminarUbicacion('${u._id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        tablaHTML += `</tbody></table>`;
        document.getElementById('tabla-ubicaciones').innerHTML = tablaHTML;

    } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
        alert("No se pudieron cargar las ubicaciones.");
    }
}

async function agregarUbicacion() {
    const id = parseInt(document.getElementById('ubicacion-id').value);
    const descripcion = document.getElementById('descripcion').value;

    if (isNaN(id) || !descripcion) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/ubicaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, descripcion })
        });

        if (!res.ok) throw new Error('Error al agregar ubicación');

        alert('Ubicación agregada con éxito');
        cargarUbicaciones();
    } catch (error) {
        console.error("Error al agregar ubicación:", error);
        alert("No se pudo agregar la ubicación.");
    }
}

async function cargarUbicaciones() {
    try {
        const res = await fetch('http://localhost:3000/ubicaciones');
        if (!res.ok) throw new Error('Error al cargar ubicaciones');

        const ubicaciones = await res.json();

        let tablaHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>ID Ubicación</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        ubicaciones.forEach(u => {
            tablaHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.descripcion}</td>
                    <td>
                        <button onclick="eliminarUbicacion('${u.id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        tablaHTML += `</tbody></table>`;
        document.getElementById('tabla-ubicaciones').innerHTML = tablaHTML;

    } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
        alert("No se pudieron cargar las ubicaciones.");
    }
}

async function agregarUbicacion() {
    const id = parseInt(document.getElementById('ubicacion-id').value);
    const descripcion = document.getElementById('descripcion').value;

    if (isNaN(id) || !descripcion) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/ubicaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, descripcion })
        });

        if (!res.ok) throw new Error('Error al agregar ubicación');

        alert('Ubicación agregada con éxito');
        cargarUbicaciones();
    } catch (error) {
        console.error("Error al agregar ubicación:", error);
        alert("No se pudo agregar la ubicación.");
    }
}

async function eliminarUbicacion(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar esta ubicación?")) return;

    try {
        const res = await fetch(`http://localhost:3000/ubicaciones/${id}`, { method: 'DELETE' });

        if (!res.ok) throw new Error('Error al eliminar ubicación');

        alert("Ubicación eliminada con éxito");
        cargarUbicaciones();
    } catch (error) {
        console.error("Error al eliminar ubicación:", error);
        alert("No se pudo eliminar la ubicación.");
    }
}

async function cargarUbicacionesEnSelect() {
    try {
        const res = await fetch('http://localhost:3000/ubicaciones');
        if (!res.ok) throw new Error('Error al cargar ubicaciones');

        const ubicaciones = await res.json();
        const selectUbicacion = document.getElementById('ubicacion');

        // Limpiar el select y agregar opción por defecto
        selectUbicacion.innerHTML = '<option value="">Seleccionar Ubicación</option>';

        // Si no hay ubicaciones, mostrar alerta
        if (ubicaciones.length === 0) {
            alert("Debe definir ubicaciones antes de agregar productos.");
        }

        // Agregar ubicaciones al select
        ubicaciones.forEach(u => {
            const option = document.createElement('option');
            option.value = u.id;  // Guardamos el ID de la ubicación
            option.textContent = u.descripcion;
            selectUbicacion.appendChild(option);
        });

    } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
        alert("No se pudieron cargar las ubicaciones.");
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
