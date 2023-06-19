let intentos;
let puntos;
let tiempoLimite = 60;
let tiempoTotal = 0;
let temporizadorActivo;
let cantidadTarjetas;
let iconos = [];
let selecciones = [];
let nivelActual = 0;
let niveles = [
  { nivel: 1, cantidadCartas: 6 },
  { nivel: 2, cantidadCartas: 10 },
  { nivel: 3, cantidadCartas: 14 },
  { nivel: 4, cantidadCartas: 18 },
  { nivel: 5, cantidadCartas: 22 },
  // Agrega más niveles según sea necesario
];



// iniciarJuego();

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
      <div class="tarjeta nivel-${nivelActual + 1}" id="tarjeta${i}">
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
      // Verifica si se han completado todos los niveles
      if (nivelActual === niveles.length - 1) {
        setTimeout(juegoFinalizado, 1000);
      } else {
        setTimeout(() => {
          alert(
            `¡Felicidades! Has encontrado todas las parejas en ${intentos} intentos. Tu puntuación es ${puntos}. Pasa al siguiente nivel.`
          );
          nivelActual++;
          document.getElementById("nivel").innerHTML = "Nivel actual: " + niveles[nivelActual].nivel;
          generarTablero();

          clearInterval(temporizador);
          if (nivelActual === 1){ //nivel 2
            setTimeout(iniciarTemporizador, 2500);
          } else if (nivelActual === 2){ //nivel 3
            setTimeout(iniciarTemporizador, 3000);
          } else if (nivelActual === 3){ //nivel 4
            setTimeout(iniciarTemporizador, 3500);
          } else if (nivelActual === 4){ // nivel 5
            setTimeout(iniciarTemporizador, 3500);
          }

        }, 500);
      }
    }
  }, 1000);
}

function verificarFin() {
  for (let i = 0; i < cantidadTarjetas; i++) {
    let trasera = document.getElementById("trasera" + i);
    if (trasera.style.background !== "plum") {
      return false;
    }
  }
  return true;
}







let temporizador;

function iniciarJuego() {
  clearInterval(temporizador); // Detener el temporizador actual (si existe)

  

  // Restablecer valores iniciales
  puntos = 0;
  intentos = 0;
  nivelActual = 0;
  tiempoLimite = 60;
  tiempoTotal = 0;

  // Actualizar elementos HTML
  document.getElementById("puntos").innerHTML = "Puntos: " + puntos;
  document.getElementById("intentos").innerHTML = "Intentos: " + intentos;
  document.getElementById("nivel").innerHTML = "Nivel actual: " + niveles[nivelActual].nivel;
  document.getElementById("tiempoRestante").innerHTML = "Tiempo restante: " + tiempoLimite + "s";


  cargarIconos();
  generarTablero();

  setTimeout(() => {
    iniciarTemporizador();
  }, 1500);


  

}



function iniciarTemporizador() {

  temporizador = setInterval(() => {
    tiempoLimite--;
    tiempoTotal++;
    mostrarTiempoRestante();

    if (tiempoLimite === 0) {
      clearInterval(temporizador);
      tiempoAgotado();
    }
  }, 1000);
}

function mostrarTiempoRestante() {
  document.getElementById("tiempoRestante").innerHTML = "Tiempo restante: " + tiempoLimite + "s";
}

function tiempoAgotado() {
  //detener el temporizador
  clearInterval(temporizador);
  alert("¡Tiempo agotado! Juego terminado.");
}

function juegoFinalizado() {
  const nombreJugador = document.getElementById("nombreJugador").value;
  const registro = {
    nombre: nombreJugador,
    puntuacion: puntos,
    intentos: intentos,
    tiempo: tiempoTotal
  };

  // Obtener la tabla de clasificación actual desde el almacenamiento local
  let clasificacion = JSON.parse(localStorage.getItem("clasificacion")) || [];

  // Agregar el nuevo registro a la tabla de clasificación
  clasificacion.push(registro);

  // Ordenar la tabla de clasificación por puntuación de mayor a menor
  clasificacion.sort((a, b) => b.puntuacion - a.puntuacion);

  // Guardar la tabla de clasificación actualizada en el almacenamiento local
  localStorage.setItem("clasificacion", JSON.stringify(clasificacion));


  clearInterval(temporizador);
  alert(
    `¡Felicidades! Has completado todos los niveles.\n\nPuntos totales: ${puntos}\nIntentos totales: ${intentos}\nTiempo total: ${tiempoTotal} segundos`
  );
  mostrarClasificacion();

}


function mostrarClasificacion() {
  document.getElementById("tablero").style.display = 'none';

  const clasificacion = JSON.parse(localStorage.getItem("clasificacion"));

  if (clasificacion) {
    let tablaHTML = "<h2>Tabla de Clasificación</h2>";
    tablaHTML += "<table>";
    tablaHTML += "<tr><th>Nombre</th><th>Puntuación</th><th>Intentos</th><th>Tiempo</th></tr>";

    for (let i = 0; i < clasificacion.length; i++) {
      tablaHTML += `<tr><td>${clasificacion[i].nombre}</td><td>${clasificacion[i].puntuacion}</td><td>${clasificacion[i].intentos}</td><td>${clasificacion[i].tiempo} seg</td></tr>`;
    }

    tablaHTML += "</table>";

    document.getElementById("tablaClasificacion").innerHTML = tablaHTML;
  }
}










