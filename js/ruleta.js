// Variable para guardar el saldo inicial (Dato simulado)
let saldo = 10000;

// Traer los elementos del HTML al JavaScript usando sus IDs
const saldoTxt = document.getElementById("saldo");
const montoInput = document.getElementById("monto");
const colorSelect = document.getElementById("color");
const btnGirar = document.getElementById("btnGirar");
const mensajeTxt = document.getElementById("mensaje");
const resultadoTxt = document.getElementById("resultado");
const historialLista = document.getElementById("historial");

// Click del boton
btnGirar.addEventListener("click", function() {
    // Limpiar mensajes anteriores
    mensajeTxt.textContent = "";

    // Leer lo que escribio el usuario
    const apuesta = parseInt(montoInput.value);
    const colorElegido = colorSelect.value;

    // Validacion (Revisar que los datos sean correctos)
    if (isNaN(apuesta) || apuesta <= 0) {
        mensajeTxt.textContent = "Error: Debes ingresar un monto mayor a 0.";
        return; // Detiene el código aquí si hay error
    }

    if (apuesta > saldo) {
        mensajeTxt.textContent = "Error: No tienes saldo suficiente para esta apuesta.";
        return; // Detiene el código si no le alcanza
    }

    // Azar (Simular la ruleta con Math.random)
    const numero = Math.floor(Math.random() * 37);

    // Si es par es rojo, si es impar es negro
    let colorGanador = (numero % 2 === 0) ? "rojo" : "negro";

    // Revisar si gano o perdio y calcular saldo
    let resultadoTexto = "";
    if (colorElegido === colorGanador) {
        saldo = saldo + apuesta; // Gana el monto apostado
        resultadoTexto = "¡Ganaste! Salió " + numero + " (" + colorGanador + ")";
        mensajeTxt.style.color = "green";
        mensajeTxt.textContent = "¡Felicidades, duplicaste tu apuesta!";
    } else {
        saldo = saldo - apuesta; // Pierde la apuesta
        resultadoTexto = "Perdiste. Salió " + numero + " (" + colorGanador + ")";
        mensajeTxt.style.color = "red";
        mensajeTxt.textContent = "Mala suerte, perdiste tu dinero.";
    }

    // Actualizacion dinámica de contenido (DOM)
    saldoTxt.textContent = saldo;
    // Mostramos el numero y color que salio
    resultadoTxt.textContent = resultadoTexto;

    // Agregamos un elemento <li> a la lista de historial
    const nuevaJugada = document.createElement("li");
    nuevaJugada.textContent = resultadoTexto + " - Saldo restante: $" + saldo;
    historialLista.appendChild(nuevaJugada);

    montoInput.value = "";
});