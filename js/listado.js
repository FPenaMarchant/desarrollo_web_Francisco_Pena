const actividades = [
    {
      inicio: "2025-04-01 10:00",
      termino: "2025-04-01 12:00",
      comuna: "Santiago",
      sector: "Centro",
      tema: "Medio Ambiente",
      nombre: "Limpieza del Parque Forestal",
      organizador: "EcoJoven",
      fotos: ["../imgs/foto1a.jpg", "../imgs/foto1b.jpg"]
    },
    {
      inicio: "2025-04-02 14:00",
      termino: "2025-04-02 16:30",
      comuna: "Providencia",
      sector: "Bellavista",
      tema: "Arte Urbano",
      nombre: "Murales Comunitarios",
      organizador: "ArteActivo",
      fotos: ["../imgs/foto2a.jpg", "../imgs/foto2b.jpg"]
    },
    {
      inicio: "2025-04-03 09:00",
      termino: "2025-04-03 11:00",
      comuna: "Maipú",
      sector: "Villa Los Héroes",
      tema: "Salud",
      nombre: "Operativo Médico Gratuito",
      organizador: "Salud para Todos",
      fotos: ["../imgs/foto3a.jpg", "../imgs/foto3b.jpg"]
    },
    {
      inicio: "2025-04-04 17:00",
      termino: "2025-04-04 19:00",
      comuna: "Ñuñoa",
      sector: "Plaza Ñuñoa",
      tema: "Cultura",
      nombre: "Taller de breakdance",
      organizador: "Tradiciones Vivas",
      fotos: ["../imgs/foto4a.jpg", "../imgs/foto4b.jpg"]
    },
    {
      inicio: "2025-04-05 08:00",
      termino: "2025-04-05 13:00",
      comuna: "La Florida",
      sector: "Walker Martínez",
      tema: "Deporte",
      nombre: "Corrida Familiar",
      organizador: "Corre Chile",
      fotos: ["../imgs/foto5a.jpg", "../imgs/foto5b.jpg"]
    }
  ];
  
  function mostrarListado() {
    const contenedor = document.getElementById("listado");
    const detalle = document.getElementById("detalle");
    detalle.style.display = "none";
    contenedor.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Inicio</th>
            <th>Término</th>
            <th>Comuna</th>
            <th>Sector</th>
            <th>Tema</th>
            <th>Nombre</th>
            <th>Organizador</th>
            <th>Total Fotos</th>
          </tr>
        </thead>
        <tbody>
          ${actividades.map((act, i) => `
            <tr onclick="mostrarDetalle(${i})">
              <td>${act.inicio}</td>
              <td>${act.termino}</td>
              <td>${act.comuna}</td>
              <td>${act.sector}</td>
              <td>${act.tema}</td>
              <td>${act.nombre}</td>
              <td>${act.organizador}</td>
              <td>${act.fotos.length}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
  
  function mostrarDetalle(index) {
    const actividad = actividades[index];
    const detalle = document.getElementById("detalle");
    const contenedor = document.getElementById("listado");
    contenedor.innerHTML = "";
    detalle.style.display = "block";
    detalle.innerHTML = `
      <h2>Detalle de la Actividad</h2>
      <p><strong>Inicio:</strong> ${actividad.inicio}</p>
      <p><strong>Término:</strong> ${actividad.termino}</p>
      <p><strong>Comuna:</strong> ${actividad.comuna}</p>
      <p><strong>Sector:</strong> ${actividad.sector}</p>
      <p><strong>Tema:</strong> ${actividad.tema}</p>
      <p><strong>Nombre:</strong> ${actividad.nombre}</p>
      <p><strong>Organizador:</strong> ${actividad.organizador}</p>
      <p><strong>Total Fotos:</strong> ${actividad.fotos.length}</p>
      <div>
        ${actividad.fotos.map(f => `<img class="foto" src="${f}" onclick="mostrarFoto('${f}')">`).join("")}
      </div>
      <button class="boton" onclick="mostrarListado()">Volver al listado</button>
      <button class="boton" onclick="window.location.href='home.html'">Volver a la portada</button>
    `;
  }
  
  function mostrarFoto(src) {
    const modal = document.getElementById("fotoModal");
    const img = document.getElementById("fotoGrande");
    img.src = src;
    modal.style.display = "block";
  }
  
  function cerrarFoto() {
    document.getElementById("fotoModal").style.display = "none";
  }
  
  mostrarListado();
  