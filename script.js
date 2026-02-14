const frasesOriginales = [
  "Desde que te conocí, todo tiene sentido ",
  "Contigo todo es mejor ",
  "Gracias por existir ",
  "Eres mi felicidad ",
  "Te amo más de lo que imaginas ",
  "Eres mi sol en los días nublados ",
  "Cada momento contigo es mágico ",
  "Tu sonrisa ilumina hasta mis días más grises ",
  "Cada segundo contigo vale más que mil vidas sin ti ",
  "Eres mi paz en medio del caos ",
  "Me haces creer en lo imposible ",
  "No necesito nada más cuando te tengo a ti",
  "En tu mirada encontré mi destino, aunque eres un poquito vizca jajaja",
  "Siempre serás mi persona favorita ",
  "Tu amor transforma mi mundo cada día ",
  "Desde que llegaste, todo es luz en mi vida ",
  "Eres el latido que le da ritmo a mi corazón ",
  "Contigo aprendí que el amor se siente, no se explica",
  "Tu risa es mi melodía favorita , ajio ajioo",
  "A tu lado, cada momento es eterno ",
  "Tu presencia me da paz y alegría ",
  "No necesitas decir te quiero, con tus 'sapos' me conformo",
  "Se que llevamos poco tiempo conociendonos, pero ya eres especial para mi",
  "Aunque seas un poco bipolar todo el tiempo, me gusta la forma como eres",
  "Espero pronto volver a salir contigo c: ",
];

let frasesDisponibles = [...frasesOriginales];

function obtenerFraseSinRepetir() {
  if (frasesDisponibles.length === 0) {
    frasesDisponibles = [...frasesOriginales];
  }
  const indice = Math.floor(Math.random() * frasesDisponibles.length);
  const frase = frasesDisponibles[indice];
  frasesDisponibles.splice(indice, 1);
  return frase;
}

function generarMensajeAleatorio() {
  const nuevoMensaje = document.createElement("div");
  nuevoMensaje.className = "mensaje";

  // Definir márgenes para que no salga fuera
  const margen = 250;
  const maxWidth = window.innerWidth - margen;
  const maxHeight = window.innerHeight - margen;

  // Posiciones limitadas dentro del viewport
  nuevoMensaje.style.top = Math.min(Math.random() * maxHeight, maxHeight) + "px";
  nuevoMensaje.style.left = Math.min(Math.random() * maxWidth, maxWidth) + "px";

  nuevoMensaje.textContent = obtenerFraseSinRepetir();
  document.getElementById("mensajes").appendChild(nuevoMensaje);

  setTimeout(() => {
    nuevoMensaje.classList.add("despedirse");
    setTimeout(() => nuevoMensaje.remove(), 1000);
  }, 3000);
}

function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.className = "corazon";
  corazon.textContent = "💖";
  corazon.style.left = Math.random() * window.innerWidth + "px";
  corazon.style.bottom = "0px";
  corazon.style.fontSize = (Math.random() * 20 + 20) + "px";
  document.getElementById("corazones").appendChild(corazon);
  setTimeout(() => corazon.remove(), 4000);
}

function crearCorazonEn(x, y) {
  const corazon = document.createElement("div");
  corazon.className = "corazon";
  corazon.textContent = "💖";
  corazon.style.left = x + "px";
  corazon.style.top = y + "px";
  corazon.style.fontSize = (Math.random() * 20 + 20) + "px";
  document.getElementById("corazones").appendChild(corazon);
  setTimeout(() => corazon.remove(), 4000);
}

function mostrarMensajeLateral(boton) {
  const texto = boton.getAttribute("data-text");
  if (!texto) return;

  const mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.textContent = texto;

  const rect = boton.getBoundingClientRect();

  // Margen para evitar que el mensaje salga de pantalla
  const margen = 230;
  const pantallaMitad = window.innerWidth / 2;
  let left, top;

  top = rect.top + window.scrollY + rect.height / 2 - 20;
  if (rect.left > pantallaMitad) {
    left = Math.max(rect.left + window.scrollX - margen, 10);
  } else {
    left = Math.min(rect.right + window.scrollX + 10, window.innerWidth - margen);
  }

  // Ajustar top para que no se salga por arriba o abajo
  if (top < 10) top = 10;
  if (top > window.innerHeight - 50) top = window.innerHeight - 50;

  mensaje.style.position = "absolute";
  mensaje.style.top = top + "px";
  mensaje.style.left = left + "px";

  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.classList.add("despedirse");
    setTimeout(() => mensaje.remove(), 1000);
  }, 3000);
}

// Botón principal
document.getElementById("botonAmor").addEventListener("click", () => {
  generarMensajeAleatorio();
  for (let i = 0; i < 10; i++) {
    setTimeout(crearCorazon, i * 100);
  }
});

// Botones ocultos hover
document.querySelectorAll(".mensajeOculto").forEach(boton => {
  boton.addEventListener("mouseenter", () => {
    const rect = boton.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * rect.width * 2;
      const offsetY = (Math.random() - 0.5) * rect.height * 2;
      crearCorazonEn(rect.left + rect.width / 2 + offsetX, rect.top + rect.height / 2 + offsetY);
    }
    mostrarMensajeLateral(boton);
  });
});



// Rastro de corazones al mover el mouse
document.addEventListener("mousemove", function(e) {
  const corazon = document.createElement("div");
  corazon.className = "corazon";
  corazon.textContent = "❤️";
  corazon.style.position = "fixed";
  corazon.style.left = `${e.clientX}px`;
  corazon.style.top = `${e.clientY}px`;
  corazon.style.fontSize = `${Math.random() * 10 + 10}px`;
  corazon.style.opacity = "1";
  corazon.style.pointerEvents = "none";
  corazon.style.transition = "opacity 0.8s ease-out, transform 1s ease-out";

  // Movimiento flotante leve
  const offsetX = (Math.random() - 0.5) * 30;
  const offsetY = (Math.random() - 0.5) * 30;
  corazon.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

  document.body.appendChild(corazon);

  // Desaparecer y eliminar
  setTimeout(() => {
    corazon.style.opacity = "0";
  }, 100);
  setTimeout(() => {
    corazon.remove();
  }, 1000);
});

