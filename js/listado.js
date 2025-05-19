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
  <button class="boton" onclick="mostrarListado()">Volver al listado</button>
  <button class="boton" onclick="window.location.href='/'">Volver a la portada</button>
`;
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

mostrarListado();