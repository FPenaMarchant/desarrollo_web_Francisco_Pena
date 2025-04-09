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

const poblarRegiones = () => {
    const regionSelect = document.getElementById("select_region");

    region_comuna.regiones.forEach(region => {
        const option = document.createElement("option");
        option.value = region.nombre;
        option.text = region.nombre;
        regionSelect.appendChild(option);
    });
};

const updateComunas = () => {
    const regionSelect = document.getElementById("select_region");
    const comunaSelect = document.getElementById("select_comuna");
    const selectedRegion = regionSelect.value;

    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    const region = region_comuna.regiones.find(r => r.nombre === selectedRegion);
    if (region) {
        region.comunas.forEach(comuna => {
            const option = document.createElement("option");
            option.value = comuna.nombre;
            option.text = comuna.nombre;
            comunaSelect.appendChild(option);
        });
    }
};

document.getElementById("select_region").addEventListener("change", updateComunas);

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

confirmarBtn.addEventListener("click", () => {
  if (validarFormulario()) {
    formularioContainer.style.display = "none";
    confirmacionContainer.style.display = "block";
  }
});
  
  confirmarNo.addEventListener("click", () => {
    confirmacionContainer.style.display = "none";
    formularioContainer.style.display = "block";
});
  
  confirmarSi.addEventListener("click", () => {
    confirmacionContainer.style.display = "none";
    mensajeFinal.style.display = "block";
});

window.onload = () => {
    poblarRegiones();
    poblarSocialNets();
};