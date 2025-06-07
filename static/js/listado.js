let currentIndex = 0;
const pageSize = 5;

function mostrarListado() {
  const contenedor = document.getElementById("listado");
  const detalle = document.getElementById("detalle");
  detalle.style.display = "none";

  let html = `
    <table>
      <thead>
        <tr>
          <th>Inicio</th>
          <th>Término</th>
          <th>Comuna</th>
          <th>Sector</th>
          <th>Tema</th>
          <th>Nombre organizador</th>
          <th>Total Fotos</th>
        </tr>
      </thead>
      <tbody>
        ${actividadesjson.slice(currentIndex, currentIndex + pageSize).map((act, i) => `
          <tr onclick="mostrarDetalle(${act.id})">
            <td>${act.dia_hora_inicio}</td>
            <td>${act.dia_hora_termino}</td>
            <td>${comunasjson[String(act.comuna_id)]}</td>
            <td>${escapeHTML(act.sector)}</td>
            <td>${
              temasjson[act.id][0]["actividad_glosaotro"]
                ? escapeHTML(temasjson[act.id][0]["actividad_glosaotro"])
                : escapeHTML(temasjson[act.id][0]["actividad_tema"])
            }</td>
            <td>${escapeHTML(act.nombre)}</td>
            <td>${fotosjson[act.id]?.length || 0}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="margin-top: 1em;">
      ${currentIndex >= pageSize ? `<button class="boton" onclick="cargarPrev()">Ver anteriores</button>` : ""}
      ${currentIndex + pageSize < actividadesjson.length ? `<button class="boton" onclick="cargarMas()">Ver más</button>` : ""}
    </div>
  `;

  contenedor.innerHTML = html;
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
}

function cargarMas() {
  currentIndex += pageSize;
  mostrarListado();
}

function cargarPrev() {
  currentIndex-= pageSize;
  mostrarListado();
}

function mostrarDetalle(id) {
  const actividad = actividadesjson.find(act => act.id === id);
  // const actividad = actividadesjson[index];
  const detalle = document.getElementById("detalle");
  const contenedor = document.getElementById("listado");

  cargarComentarios(id);

  contenedor.innerHTML = "";
  detalle.style.display = "block";

  const totalFotos = fotosjson[actividad.id]?.length || 0;
  const fotosHtml = (fotosjson[actividad.id] || []).map(f => `
    <img class="foto" src="/static/imgs/${f.nombre_archivo}" onclick="mostrarFoto('/static/imgs/${f.nombre_archivo}')">
  `).join("");

  detalle.innerHTML = `
    <h2>Detalle de la Actividad</h2>
    <p><strong>Inicio:</strong> ${actividad.dia_hora_inicio}</p>
    <p><strong>Término:</strong> ${actividad.dia_hora_termino}</p>
    <p><strong>Comuna:</strong> ${comunasjson[String(actividad.comuna_id)]}</p>
    <p><strong>Sector:</strong> ${escapeHTML(actividad.sector)}</p>
    <p><strong>Tema:</strong> ${
    temasjson[actividad.id][0]["actividad_glosaotro"]
      ? escapeHTML(temasjson[actividad.id][0]["actividad_glosaotro"])
      : escapeHTML(temasjson[actividad.id][0]["actividad_tema"])
    }</p>
    <p><strong>Nombre organizador:</strong> ${actividad.nombre}</p>
    <p><strong>Total Fotos:</strong> ${totalFotos}</p>
    <div>${fotosHtml}</div>

    <div id="comentariosContainer">
      <h3>Comentarios</h3>
      <ul id="comentariosLista"></ul>
    </div>

    <h3>Agregar comentario</h3>
    <form id="comentarioForm">
      <input type="hidden" name="actividad_id" value="${actividad.id}">
      
      <label for="nombre">Nombre:</label><br>
      <input type="text" id="nombre" name="nombre" required minlength="3" maxlength="80"><br><br>

      <label for="comentario">Comentario:</label><br>
      <textarea id="comentario" name="comentario" rows="4" cols="50" required minlength="5"></textarea><br><br>

      <button type="submit">Agregar comentario</button>
    </form>

    <button class="boton" onclick="mostrarListado()">Volver al listado</button>
    <button class="boton" onclick="window.location.href='/'">Volver a la portada</button>
  `;

  document.getElementById("comentarioForm").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevent the default form submission

    const nombre = document.getElementById("nombre").value.trim();
    const texto = document.getElementById("comentario").value.trim();

    let errorMsg = "";
    if (nombre.length < 3 || nombre.length > 80) {
        errorMsg += "El nombre debe tener entre 3 y 80 caracteres.<br>";
    }
    if (texto.length < 5) {
        errorMsg += "El comentario debe tener al menos 5 caracteres.<br>";
    }

    if (errorMsg) {
        document.getElementById("error").innerHTML = errorMsg;
        return;
    }

    try {
        const response = await fetch("/listado", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                comentario: texto,
                actividad_id: actividad.id
            })
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("comentarioForm").reset();
            alert("Comentario agregado exitosamente.");
            cargarComentarios(id);
        } else {
            document.getElementById("error").innerHTML = result.errores.join("<br>");
        }

    } catch (err) {
        console.error("Error al enviar comentario:", err);
        document.getElementById("error").innerHTML = "Hubo un problema al enviar el comentario.";
    }
  });

}

function mostrarFoto(src) {
  const detalle = document.getElementById("detalle");
  const contenedor = document.getElementById("listado");
  detalle.style.display = "none";
  contenedor.style.display = "none";

  const modal = document.getElementById("fotoModal");
  const img = document.getElementById("fotoGrande");
  img.src = src;
  modal.style.display = "block";
}

function cerrarFoto() {
  document.getElementById("fotoModal").style.display = "none";
  const detalle = document.getElementById("detalle");
  const contenedor = document.getElementById("listado");
  detalle.style.display = "block";
  contenedor.style.display = "block";
}

async function cargarComentarios(id) {
    try {
        const response = await fetch(`/comentarios/${id}`);
        const comentarios = await response.json();

        const lista = document.getElementById("comentariosLista");
        lista.innerHTML = "";

        comentarios.forEach(com => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${escapeHTML(com.nombre)}:</strong> ${escapeHTML(com.texto)}`;
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("Error cargando comentarios:", err);
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(m) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[m];
    });
}

mostrarListado();