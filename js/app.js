/* ==========================================================
   SIMIVOZ – Archivo Central (app.js)
   Maneja Protección de Rutas, Configuración Global de Accesibilidad y Utilidades
   ========================================================== */

(function() {
  function getPageName() {
    var path = window.location.pathname;
    var page = path.split('/').pop();
    // Si no hay nombre de página (ej. localhost:5500/), asume index.html
    return page || 'index.html';
  }

  var page = getPageName();
  var logeado = localStorage.getItem('simivoz_usuario_logeado') === 'true';
  var tutorial = localStorage.getItem('simivoz_tutorial_completado') === 'true';

  // --- 1. PROTECCIÓN DE RUTAS ---
  if (page === 'index.html' || page === 'registrarse.html') {
    if (logeado) {
      if (tutorial) window.location.replace('inicio.html');
      else window.location.replace('bienvenido.html');
    }
  } else if (page === 'bienvenido.html' || page === 'lector-inteligente.html') {
    if (!logeado) window.location.replace('index.html');
    else if (tutorial) window.location.replace('inicio.html');
  } else if (page === 'elegir-voz.html') {
    // Se usa durante el tutorial Y como página de ajustes ("Voz Narradora")
    // después del onboarding, así que aquí solo exigimos sesión iniciada.
    if (!logeado) window.location.replace('index.html');
  } else if (page === 'configuracion.html') {
    if (!logeado) window.location.replace('config-nologin.html');
    else if (!tutorial) window.location.replace('bienvenido.html');
  } else if (page !== 'config-nologin.html') {
    // Páginas internas (inicio, servicios, mapa, etc.) excepto configuracion
    if (!logeado) window.location.replace('index.html');
    else if (!tutorial) window.location.replace('bienvenido.html');
  }

  // --- 2. CONFIGURACIÓN GLOBAL (Aplicar CSS) ---
  window.simivozAplicarConfiguracion = function() {
    try {
      var config = JSON.parse(localStorage.getItem('simivoz_config'));
      if (config) {
        // Modo Alto Contraste
        document.body.classList.toggle('high-contrast', !!config.contrast);
        
        // Modo Simplificado (Carga Cognitiva Reducida)
        document.body.classList.toggle('modo-simplificado', !!config.simplified);
        
        // Escalado de Fuente (Aplicado a HTML para afectar a unidades rem)
        if (config.fontSize) {
          document.documentElement.classList.remove('small-font', 'big-font', 'massive-font', 'ultra-font');
          var fs = config.fontSize;
          if (fs === '0.75rem' || fs === '0.875rem' || fs === 'A-') {
            document.documentElement.classList.add('small-font');
          } else if (fs === '1.125rem' || fs === '1.15rem' || fs === 'A+') {
            document.documentElement.classList.add('big-font');
          } else if (fs === '1.25rem' || fs === '1.3rem' || fs === 'A++') {
            document.documentElement.classList.add('massive-font');
          } else if (fs === '1.4rem' || fs === '1.40rem' || fs === 'A+++') {
            document.documentElement.classList.add('ultra-font');
          }
        }
      }
    } catch (err) {
      console.error("Error aplicando configuración de SIMIVOZ:", err);
    }
  };
  
  // Ejecutar inmediatamente para evitar parpadeos (solo si el <body> ya existe)
  if (document.body) {
    window.simivozAplicarConfiguracion();
  }
  
  // Y volver a ejecutar al terminar de cargar el DOM (por si el body/html no estaban listos)
  document.addEventListener('DOMContentLoaded', window.simivozAplicarConfiguracion);
})();
