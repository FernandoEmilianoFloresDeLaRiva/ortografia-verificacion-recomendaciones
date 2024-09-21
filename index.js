import nspell from "https://cdn.jsdelivr.net/npm/nspell@2.1.5/+esm";
import dictionary from "./assets/js/dictionary-es/index.js";
const spell = nspell(dictionary);

const textarea = document.getElementById("textoEntrada");
const highlightedText = document.getElementById("highlightedText");
const revisarBtn = document.getElementById("revisarBtn");

textarea.addEventListener("input", () => {
  const texto = textarea.value;
  mostrarErrores(texto);
});

revisarBtn.addEventListener("click", () => {
  revisarTexto();
});

function mostrarErrores(texto) {
  const palabras = texto.split(/(\s+)/);
  const errores = [];

  palabras.forEach((palabra) => {
    const trimmedPalabra = palabra.trim();
    if (!spell.correct(trimmedPalabra) && trimmedPalabra) {
      errores.push({
        palabra: trimmedPalabra,
        sugerencias: spell.suggest(trimmedPalabra),
      });
    }
  });

  resaltarErrores(palabras, errores);
}

function resaltarErrores(palabras, errores) {
  const contenidoResaltado = palabras
    .map((palabra) => {
      const error = errores.find((e) => e.palabra === palabra.trim());
      if (error) {
        return `<span class="highlight-error" data-palabra="${error.palabra}">${palabra}</span>`;
      }
      return palabra;
    })
    .join("");

  highlightedText.innerHTML = contenidoResaltado.replace(/\n/g, "<br>");

  const erroresElementos = document.querySelectorAll(".highlight-error");
  erroresElementos.forEach((elemento) => {
    elemento.addEventListener("click", () => {
      const palabra = elemento.getAttribute("data-palabra");
      mostrarSugerencias(palabra, elemento);
    });
  });
}

function revisarTexto() {
  const texto = textarea.value;
  const palabras = texto.split(/(\s+)/);
  const errores = [];

  palabras.forEach((palabra, index) => {
    const trimmedPalabra = palabra.trim();
    if (!spell.correct(trimmedPalabra) && trimmedPalabra) {
      const sugerencias = spell.suggest(trimmedPalabra);
      const seleccion = prompt(
        `Corrige la palabra "${trimmedPalabra}":\nSugerencias: ${sugerencias.join(
          ", "
        )}\nEscribe tu corrección o deja en blanco para mantener la palabra actual.`
      );

      if (seleccion) {
        palabras[index] = seleccion;
      }
    }
  });

  textarea.value = palabras.join("");
  mostrarErrores(textarea.value);
}
