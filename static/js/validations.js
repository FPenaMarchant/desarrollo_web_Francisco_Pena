function validarFormulario() {
    const selectRegion = document.getElementById("select_region");
    const selectComuna = document.getElementById("select_comuna");
    const inputNombre = document.getElementById("input_nombre");
    const inputEmail = document.getElementById("input_email");
    const inputCellphoneNumber = document.getElementById("input_cellphone_number");
    const selectContactMeans = document.getElementById("select_contact_means");
    const inputContactDetail = document.getElementById("contact_detail");
    const selectTema = document.getElementById("tema");
    const inputOtroTema = document.getElementById("otro-tema");
    const imageInputs = document.querySelectorAll('#image-inputs input[type="file"]');

    let esValido = true;
  
    if (selectRegion.value === "") {
        selectRegion.style.border = "2px solid red";
        esValido = false;
    } else {
        selectRegion.style.border = "";
    }

    if (selectComuna.value === "") {
        selectComuna.style.border = "2px solid red";
        esValido = false;
    } else {
        selectComuna.style.border = "";
    }

    if (inputNombre.value.trim() === "") {
        inputNombre.style.border = "2px solid red";
        esValido = false;
    } else {
        inputNombre.style.border = "";
    }

    if (inputEmail.value) {
        const emailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!emailRegex.test(inputEmail.value)) {
            inputEmail.style.border = "2px solid red";
            esValido = false;
        } else {
            inputEmail.style.border = "";
        }
    }

    if (inputCellphoneNumber.value) {
        const cellphoneRegex = /^\+\d{3}\.\d{8}$/;
        if (!cellphoneRegex.test(inputCellphoneNumber.value)) {
            inputCellphoneNumber.style.border = "2px solid red";
            esValido = false;
        } else {
            inputCellphoneNumber.style.border = "";
        }
    }

    if (selectContactMeans.value !== "") {
        const contactValue = inputContactDetail.value.trim();
        if (contactValue.length < 3 || contactValue.length > 15) {
          inputContactDetail.style.border = "2px solid red";
          esValido = false;
        } else {
          inputContactDetail.style.border = "";
        }
      } else {
        inputContactDetail.style.border = "";
    }

    if (selectTema.value === "") {
        selectTema.style.border = "2px solid red";
        esValido = false;
    } else {
        selectTema.style.border = "";
    }

    if (selectTema.value === "otro") {
        const otroTemaValue = inputOtroTema.value.trim();
        if (otroTemaValue.length < 3 || otroTemaValue.length > 5) {
        inputOtroTema.style.border = "2px solid red";
        esValido = false;
        } else {
            inputOtroTema.style.border = "";
        }
    } else {
        inputOtroTema.style.border = "";
    }

    let hayImagenSeleccionada = false;

    imageInputs.forEach(input => {
      if (input.files && input.files.length > 0) {
        hayImagenSeleccionada = true;
      }
      input.style.border = "";
    });
  
    if (!hayImagenSeleccionada) {
        imageInputs[0].style.border = "2px solid red";
        esValido = false;
    }
  
    return esValido;
  }