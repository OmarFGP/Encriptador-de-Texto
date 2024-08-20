const btnEncriptar = document.querySelector(".btn-encriptar");
const text = document.querySelector(".txt-area");
const alerta = document.querySelector(".texto-alerta");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".contenedor-salida");
const btnCopiar = document.querySelector(".btn-copiar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");

/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/

// Función para validar el texto ingresado
function validarTexto(texto) {
    if (texto === "") {
        return "No se encontró ningún texto";
    }
    if (/[A-Z]/.test(texto)) {
        return "No debe usar letras Mayúsculas";
    }
    if (/[^a-z\s]/.test(texto)) {
        return "No deben ser utilizados letras con acentos ni caracteres especiales";
    }
    return "valido";
}

// Funciones para remplazar letras
function encriptarTexto(texto) {
  return texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
}

function desencriptarTexto(texto) {
  return texto
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
}

// Encriptar
btnEncriptar.addEventListener("click", function () {
    let texto = text.value;
    let validacion = validarTexto(texto);

    if (validacion === "valido") {
        let textoEncriptado = encriptarTexto(texto);
        respuesta.value = textoEncriptado;
        contenido.style.display = "none"; // Oculta el contenido
        btnCopiar.style.visibility = "inherit"; // Visibilizar el botón Copiar
    } else {
        alerta.textContent = validacion; // Mostrar alerta según el caso
    }
});

// Desencriptar
btnDesencriptar.addEventListener("click", function () {
    let texto = text.value;
    let validacion = validarTexto(texto);

    if (validacion === "valido") {
        let textoDesencriptado = desencriptarTexto(texto);
        respuesta.value = textoDesencriptado;
        contenido.style.display = "none"; 
        btnCopiar.style.visibility = "inherit"; 
    } else {
        alerta.textContent = validacion; 
    }
});

// Copiado de texto encriptado aplicando un pequeño efecto en el mensaje
btnCopiar.addEventListener("click", function () {
    respuesta.select();
    document.execCommand("copy");
    alerta.textContent = "";
    const texto = "Texto copiado al portapapeles";
    let i = 0;

    function mostrarTextoLetraPorLetra() {
        if (i < texto.length) {
            alerta.textContent += texto.charAt(i);
            i++;
            setTimeout(mostrarTextoLetraPorLetra, 70);
        }
    }
    mostrarTextoLetraPorLetra();
});

// Restablecer alerta al mensaje predeterminado si el área de texto se vacía
text.addEventListener("input", function () {
    if (text.value.trim() === "") {
        alerta.textContent = "Solo letras minúsculas y sin acentos"; // Mensaje predeterminado
    }
});