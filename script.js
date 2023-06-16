let intentos;
let puntos;
let cantidadTarjetas;
let iconos = [];
let selecciones = [];
let niveles = [
  { nivel: 1, cantidadCartas: 6 },
  { nivel: 2, cantidadCartas: 10 },
  { nivel: 3, cantidadCartas: 14 },
  { nivel: 4, cantidadCartas: 18 },
  { nivel: 5, cantidadCartas: 22 },
  { nivel: 6, cantidadCartas: 26 },
  { nivel: 7, cantidadCartas: 30 },
  // Agrega más niveles según sea necesario
];
let nivelActual = 0;

nuevoJuego();

function cargarIconos() {
  iconos = [
    '<i><img src="img/1.png" alt=""></i>',
    '<i><img src="img/2.png" alt=""></i>',
    '<i><img src="img/3.png" alt=""></i>',
    '<i><img src="img/4.png" alt=""></i>',
    '<i><img src="img/5.png" alt=""></i>',
    '<i><img src="img/6.png" alt=""></i>',
    '<i><img src="img/7.png" alt=""></i>',
    '<i><img src="img/8.png" alt=""></i>',
    '<i><img src="img/9.png" alt=""></i>',
    '<i><img src="img/10.png" alt=""></i>',
    '<i><img src="img/11.png" alt=""></i>',
    '<i><img src="img/12.png" alt=""></i>',
    '<i><img src="img/special.png" alt="" class="efecto-rainbow"></i>',
    
  ];
}

function generarTablero() {
  cantidadTarjetas = niveles[nivelActual].cantidadCartas;
  document.getElementById("nivel").innerHTML =
    "Nivel actual: " + niveles[nivelActual].nivel;
  selecciones = [];
  let tablero = document.getElementById("tablero");
  let tarjetas = [];
  for (let i = 0; i < cantidadTarjetas; i++) {
    tarjetas.push(`
      <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
          <div class="tarjeta" id="tarjeta${i}">
              <div class="cara trasera" id="trasera${i}">
                  ${iconos[i % (cantidadTarjetas / 2)]}
              </div>
              <div class="cara superior">
                  <i class="far fa-question-circle"></i>
              </div>
          </div>
      </div>
    `);
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) {
  let tarjeta = document.getElementById("tarjeta" + i);
  if (tarjeta.style.transform != "rotateY(180deg)") {
    tarjeta.style.transform = "rotateY(180deg)";
    selecciones.push(i);
  }
  if (selecciones.length == 2) {
    deseleccionar(selecciones);
    selecciones = [];
  }

  // efecto especial para carta special
  if (trasera1.innerHTML === '<div class="carta-especial"></div>' && trasera2.innerHTML === '<div class="carta-especial"></div>') {
    tarjeta1.classList.add("efecto-rainbow");
    tarjeta2.classList.add("efecto-rainbow");
  }
  
}

function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
      tarjeta1.style.transform = "rotateY(0deg)";
      tarjeta2.style.transform = "rotateY(0deg)";
      intentos++;
      document.getElementById("intentos").innerHTML = "Intentos: " + intentos;
    } else {
      trasera1.style.background = "plum";
      trasera2.style.background = "plum";
      if (
        trasera1.innerHTML.includes("special.png") ||
        trasera2.innerHTML.includes("special2.png")
      ) {
        puntos += 20
      } else {
        puntos++;
      }
      document.getElementById("puntos").innerHTML = "Puntos: " + puntos;
      intentos++;
      document.getElementById("intentos").innerHTML = "Intentos: " + intentos;
    }

    if (verificarFin()) {
      setTimeout(() => {
        alert(
          `¡Felicidades! Has encontrado todas las parejas en ${intentos} intentos. Tu puntuación es ${puntos}.`
        );
        if (nivelActual < niveles.length - 1) {
          nivelActual++;
          document.getElementById("nivel").innerHTML =
            "Nivel actual: " + niveles[nivelActual].nivel;
          generarTablero();
        }
      }, 500);
    }
  }, 1000);
}

function verificarFin() {
  for (let i = 0; i < cantidadTarjetas; i++) {
    let trasera = document.getElementById("trasera" + i);
    if (trasera.style.background != "plum") {
      return false;
    }
  }
  return true;
}

function nuevoJuego() {
  puntos = 0;
  intentos = 0;
  document.getElementById("puntos").innerHTML = "Puntos: " + puntos;
  document.getElementById("intentos").innerHTML = "Intentos: " + intentos;
  nivelActual = 0;
  document.getElementById("nivel").innerHTML =
    "Nivel actual: " + niveles[nivelActual].nivel;
  cargarIconos();
  generarTablero();
}
