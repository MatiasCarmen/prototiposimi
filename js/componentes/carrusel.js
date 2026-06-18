export const carrusel = {
  iniciar(contenedorSelector) {
    const contenedor = document.querySelector(contenedorSelector);
    if (!contenedor) return;
    let indice = 0;
    const items = contenedor.children;

    setInterval(() => {
      items[indice]?.classList.remove('activo');
      indice = (indice + 1) % items.length;
      items[indice]?.classList.add('activo');
    }, 4000);
  },
};
