const header = document.querySelector("header");
const nav = document.querySelector("nav");
const glow = document.querySelector(".nav-glow");
const links = document.querySelectorAll("nav a");

links.forEach(link => {

    link.addEventListener("mouseenter", () => {

        const headerRect = header.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        glow.style.left = (linkRect.left - headerRect.left) + "px";
        glow.style.width = linkRect.width + "px";
        glow.style.opacity = "1";

    });

});

nav.addEventListener("mouseleave", () => {

    glow.style.opacity = "0";

});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    console.log(navLinks.className);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

const form = document.querySelector(".contact-form");
const result = document.getElementById("form-result");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch(form.action,{
        method:"POST",
        body:formData
    });

    const data = await response.json();

    if(data.success){

        result.className="success";

        result.innerHTML=`
            <h3>✓ Anfrage erfolgreich übermittelt</h3>
            <p>
                Vielen Dank für Ihr Vertrauen.
                Wir haben Ihre Nachricht erhalten und werden uns
                schnellstmöglich mit Ihnen in Verbindung setzen.
            </p>
        `;

        form.reset();

    }else{

        result.className="error";

        result.innerHTML=`
            <h3>Fehler</h3>
            <p>
                Ihre Anfrage konnte leider nicht übermittelt werden.
                Bitte versuchen Sie es erneut.
            </p>
        `;

    }

});