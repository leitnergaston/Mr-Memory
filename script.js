
let intentos
let puntos
let cantidadTarjetas = 24
let iconos = []
let selecciones = []

generarTablero()

function cargarIconos() {
    iconos = [
        '<i><img src="img/1.jpg" alt=""></i>',
        '<i><img src="img/2.jpg" alt=""></i>',
        '<i><img src="img/3.jpg" alt=""></i>',
        '<i><img src="img/4.jpg" alt=""></i>',
        '<i><img src="img/5.jpg" alt=""></i>',
        '<i><img src="img/6.jpg" alt=""></i>',
        '<i><img src="img/7.jpg" alt=""></i>',
        '<i><img src="img/8.jpg" alt=""></i>',
        '<i><img src="img/9.jpg" alt=""></i>',
        '<i><img src="img/10.jpg" alt=""></i>',
        '<i><img src="img/11.jpg" alt=""></i>',
        '<i><img src="img/12.jpg" alt=""></i>',

    ]
}

function generarTablero() {
    puntos = 0
    document.getElementById("puntos").innerHTML = "Puntos: " + puntos
    intentos = 0
    document.getElementById("intentos").innerHTML = "Intentos: " + intentos
    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < cantidadTarjetas; i++) {
        tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            <i class="far fa-question-circle"></i>
                        </div>
                    </div>
                </div>        
                `)
        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []

    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
            intentos++
            document.getElementById("intentos").innerHTML = "Intentos: " + intentos

        } else {
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
            puntos++
            document.getElementById("puntos").innerHTML = "Puntos: " + puntos
            intentos++
            document.getElementById("intentos").innerHTML = "Intentos: " + intentos
        }
        if (verificarFin()) {
            setTimeout(() => {
                alert(`¡Felicidades! Has encontrado todas las parejas en ${intentos} intentos. Tu puntuación es ${puntos}.`);
            }, 500);
        }
    }, 1000);
}

function verificarFin() {
    for (let i = 0; i < cantidadTarjetas; i++) {
        let trasera = document.getElementById("trasera" + i)
        if (trasera.style.background != "plum") {
            return false
        }
    }
    return true
}