export const utils = {
  formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-PE');
  },

  capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  },

  $(selector, contexto = document) {
    return contexto.querySelector(selector);
  },

  $$(selector, contexto = document) {
    return [...contexto.querySelectorAll(selector)];
  },
};
