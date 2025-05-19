let social_net= {
    "social_nets": [
        {"nombre": "Whatsapp"}, {"nombre" :"Telegram"}, {"nombre" :"X"}, {"nombre" :"Instagram"}, {"nombre" :"Tiktok"}, {"nombre" :"otra"}]};

document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("select_contact_means");
    if (!select || !window.social_net) return;

    social_net.social_nets.forEach(social => {
        const option = document.createElement("option");
        option.value = social.nombre.toLowerCase();
        option.textContent = social.nombre;

        if (select.dataset.selected && select.dataset.selected.toLowerCase() === option.value) {
            option.selected = true;
        }

        select.appendChild(option);
    });
});