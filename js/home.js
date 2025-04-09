document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".menu-box");

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            const url = box.getAttribute("data-url");
            if (url) {
                window.location.href = url;
            }
        });
    });
});