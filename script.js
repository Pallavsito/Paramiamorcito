const boton = document.getElementById("botonAmor");
const contenedor = document.getElementById("mensajes");

const mensajes = [
  "Eres lo mejor que me ha pasado ❤️",
  "Cada día contigo es un regalo 💖",
  "Tu sonrisa ilumina mi mundo ✨",
  "Te amo más de lo que puedo decir 💕",
  "Siempre voy a cuidarte 💫"
];

function generarMensajeAleatorio() {
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];

  const margen = Math.min(200, window.innerWidth * 0.35, window.innerHeight * 0.25);
  const maxWidth = Math.max(60, window.innerWidth - margen);
  const maxHeight = Math.max(120, window.innerHeight - margen);

  mensaje.style.left = `${Math.random() * maxWidth}px`;
  mensaje.style.top = `${Math.random() * maxHeight}px`;

  contenedor.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 4000);
}

boton.addEventListener("click", () => {
  generarMensajeAleatorio();
  explosionCorazones();
});

function explosionCorazones() {
  for (let i = 0; i < 25; i++) {
    const corazon = document.createElement("div");
    corazon.className = "corazon";
    corazon.textContent = "❤️";

    corazon.style.position = "fixed";
    corazon.style.left = `${window.innerWidth / 2}px`;
    corazon.style.top = `${window.innerHeight / 2}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 200 + 50;

    corazon.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;

    document.body.appendChild(corazon);

    setTimeout(() => corazon.remove(), 1500);
  }
}

/* BOTONES OCULTOS (funcionan en celular) */

document.querySelectorAll(".mensajeOculto").forEach(boton => {

  const disparar = () => {
    const rect = boton.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
      crearCorazonEn(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    mostrarMensajeLateral(boton);
  };

  boton.addEventListener("mouseenter", disparar);
  boton.addEventListener("click", disparar);
  boton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    disparar();
  }, { passive: false });
});

function crearCorazonEn(x, y) {
  const corazon = document.createElement("div");
  corazon.className = "corazon";
  corazon.textContent = "❤️";

  corazon.style.position = "fixed";
  corazon.style.left = `${x}px`;
  corazon.style.top = `${y}px`;

  document.body.appendChild(corazon);

  setTimeout(() => corazon.remove(), 1200);
}

function mostrarMensajeLateral(boton) {
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.textContent = boton.dataset.text;

  mensaje.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
  mensaje.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

  contenedor.appendChild(mensaje);

  setTimeout(() => mensaje.remove(), 4000);
}

/* CORAZONES SIGUIENDO EL MOUSE */

document.addEventListener("mousemove", function(e) {
  crearRastroCorazon(e.clientX, e.clientY);
});

/* CORAZONES SIGUIENDO EL DEDO EN CELULAR */

document.addEventListener("touchmove", function(e) {
  const t = e.touches[0];
  if (!t) return;
  crearRastroCorazon(t.clientX, t.clientY);
}, { passive: true });

function crearRastroCorazon(x, y) {
  const corazon = document.createElement("div");
  corazon.className = "corazon";
  corazon.textContent = "❤️";

  corazon.style.position = "fixed";
  corazon.style.left = `${x}px`;
  corazon.style.top = `${y}px`;
  corazon.style.fontSize = `${Math.random() * 10 + 12}px`;

  document.body.appendChild(corazon);

  setTimeout(() => corazon.remove(), 800);
}
