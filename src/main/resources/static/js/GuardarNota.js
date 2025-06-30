function guardarNota() {
    const actividadId = document.getElementById("actividadId").value;
    const nota = document.getElementById("nota").value;

    fetch("/api/notas/guardar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ actividadId: actividadId, nota: nota })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(msg => { throw new Error(msg); });
        }
        return response.text();
    })
    .then(msg => {
        alert(msg);
        window.location.href = "/resumen";
    })
    .catch(error => {
        document.getElementById("error").textContent = error.message;
    });
}