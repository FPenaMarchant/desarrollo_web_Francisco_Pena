const start_date_placeholder = document.getElementById("input_start_datetime");
const end_date_placeholder= document.getElementById("input_end_datetime");

const selectTema = document.getElementById("tema");
const otroTemaContainer = document.getElementById("otro-tema-container");

const formularioContainer = document.getElementById("main-form");
const confirmacionContainer = document.getElementById("confirmacion-container");
const mensajeFinal = document.getElementById("mensaje-final");

const confirmarBtn = document.getElementById("confirmar-btn");
const confirmarSi = document.getElementById("confirmar-si");
const confirmarNo = document.getElementById("confirmar-no");

const mesajeFinal = document.getElementById("mensaje-final");

document.addEventListener("DOMContentLoaded", function () {
    const selectRegion = document.getElementById("select_region");
    const selectComuna = document.getElementById("select_comuna");

    selectRegion.addEventListener("change", function () {
        const regionId = selectRegion.value;
        selectComuna.innerHTML = '<option value="">Cargando comunas...</option>';

        if (!regionId) {
            selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
            return;
        }

        fetch(`/api/comunas/${regionId}`)
            .then(response => response.json())
            .then(data => {
                selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>';
                data.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna.id;
                    option.textContent = comuna.nombre;
                    selectComuna.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error fetching comunas:", error);
                selectComuna.innerHTML = '<option value="">Error al cargar comunas</option>';
            });
    });
});

const poblarSocialNets = () => {
  const socialNetSelect = document.getElementById("select_contact_means");

  social_net.social_nets.forEach(sn => {
      const option = document.createElement("option");
      option.value = sn.nombre;
      option.text = sn.nombre;
      socialNetSelect.appendChild(option);
  });
};

document.addEventListener("DOMContentLoaded", () => {
    const selectContactMeans = document.getElementById("select_contact_means");
    const contactDetailContainer = document.getElementById("contact-detail-container");

    const now = new Date();
    const localISOTime = now.toISOString().slice(0, 16);

    const end_time= new Date();
    end_time.setHours(end_time.getHours() + 3);
    const localISOEnd= end_time.toISOString().slice(0, 16);
    
    start_date_placeholder.value = localISOTime;
    end_date_placeholder.value = localISOEnd;

    selectContactMeans.addEventListener("change", function () {
      if (this.value !== "") {
        contactDetailContainer.style.display = "block";
      } else {
        contactDetailContainer.style.display = "none";
      }
    });

});

selectTema.addEventListener("change", function () {
  if (this.value === "otro") {
    otroTemaContainer.style.display = "block";
  } else {
    otroTemaContainer.style.display = "none";
  }
});

function showNextInput(currentIndex) {
    const allInputs = document.querySelectorAll('#image-inputs .image-input');
    if (currentIndex < allInputs.length) {
      allInputs[currentIndex].style.display = 'block';
      allInputs[currentIndex - 1].children[1].style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms["add_form"];
    const confirmacionContainer = document.getElementById("confirmacion-container");
    const mainFormContainer = document.getElementById("main-form");
    const confirmarSiBtn = document.getElementById("confirmar-si");
    const confirmarNoBtn = document.getElementById("confirmar-no");

    let allowSubmit = false;

    form.addEventListener("submit", function (e) {
        if (!allowSubmit) {
            e.preventDefault(); 

            const errores = validarFormulario();
            if (errores.length > 0) {
                alert("Errores:\n" + errores.join("\n"));
                return;
            }

            mainFormContainer.style.display = "none";
            confirmacionContainer.style.display = "block";
        }
    });

    confirmarSiBtn.addEventListener("click", () => {
        allowSubmit = true;
        form.submit();
        localStorage.setItem("mensajeExito", "Actividad registrada");
    });

    confirmarNoBtn.addEventListener("click", () => {
        allowSubmit = false;
        confirmacionContainer.style.display = "none";
        mainFormContainer.style.display = "block";
    });
});

window.onload = () => {
    //poblarRegiones();
    poblarSocialNets();
};