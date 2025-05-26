const modelViewer = document.getElementById('model-viewer');



////////////// Configuracion del boton de AR y boton de QR //////////////////
document.querySelector("#ar-button")?.addEventListener('click', function () {
  this.classList.toggle("dipped");
});

// Modal para compartir QR
document.getElementById('ar-badge')?.addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('qr-code-container').classList.add('show'); // Muestra el modal
});

// Cerrar el modal cuando se hace clic en el botón de cerrar
document.querySelector('.qr-code__close-button')?.addEventListener('click', function() {
  document.getElementById('qr-code-container').classList.remove('show'); // Oculta el modal
});

// Cerrar el modal si se hace clic en el fondo (overlay)
document.getElementById('qr-code-container')?.addEventListener('click', function(event) {
  // Verifica si el clic fue en el área del fondo oscuro (overlay), no en el contenido
  if (event.target === document.getElementById('qr-code-container')) {
    document.getElementById('qr-code-container').classList.remove('show'); // Cierra el modal
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////


////////////////// Función para mostrar el QR expandido ///////////////////////
const qrCodeExpanded = document.getElementById('qr-code-expanded');

// Función para abrir la imagen expandida
document.getElementById('qr-code-img').addEventListener('click', () => {
  qrCodeExpanded.style.display = 'flex';  // Mostrar el modal
  document.getElementById('expanded-img').src = document.getElementById('qr-code-img').src;  // Poner la misma imagen en el modal expandido
});

// Función para cerrar la imagen expandida cuando se hace clic en la X
document.getElementById('close-expanded').addEventListener('click', () => {
  qrCodeExpanded.style.display = 'none';  // Ocultar el modal
});

// También puedes cerrar la imagen expandida si se hace clic fuera de la imagen
qrCodeExpanded.addEventListener('click', (e) => {
  if (e.target === qrCodeExpanded) {
    qrCodeExpanded.style.display = 'none';  // Ocultar el modal si se hace clic en el fondo
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////


////////////////// Función para limpiar la cache y forzar la recarga ///////////////////////
function limpiarCache() {
  // Verificar si es una recarga manual
  if (performance.navigation.type === 1) {
    console.log("Página recargada manualmente");
  } else {
    // Si no es recarga manual, evitar forzar la recarga
    if (!sessionStorage.getItem('cargar')) {
      sessionStorage.setItem('cargar', 'true');
      location.reload(true);  // Recarga forzada desde el servidor
    } else {
      sessionStorage.removeItem('cargar');
    }
  }
}

// Limpiar cache solo cuando la página se carga por primera vez
window.onload = limpiarCache;

// Al salir de la página
window.onbeforeunload = function() {
  // Aquí puedes limpiar datos o gestionar antes de que la página cierre
  console.log("Limpiando antes de cerrar");
};
/////////////////////////////////////////////////////////////////////////////////////////////


////// Funcion para mostrar el boton de compartir QR en dispositivos que no soportan WebXR //////

function checkWebXR() {
  const arBadge = document.getElementById('ar-badge');
  
  adjustModelViewerSize(0.8);

  if ('xr' in navigator && navigator.xr.isSessionSupported) {
    // Verificamos si el dispositivo soporta AR en WebXR
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      if (supported) {
        // Si WebXR está disponible y soporta AR, ocultamos el ícono
        arBadge.classList.add('hidden');
        
      } else {
        // Si no soporta AR, mostramos el ícono
        arBadge.classList.remove('hidden');
      }
    });
  } else {
    // Si WebXR no está disponible, mostramos el ícono
    arBadge.classList.remove('hidden');
  }
}

function adjustModelViewerSize(percent) {
  // Calculamos la altura del viewport sin la barra de direcciones
  const viewportHeight = window.innerHeight;

  // Establecemos un valor del porcentaje de la altura del viewport
  modelViewer.style.height = `${viewportHeight * percent}px`; // Usando el valor pasado como parámetro
}

// Ejecutamos la función después de que la página haya cargado completamente
window.addEventListener('load', checkWebXR);
/////////////////////////////////////////////////////////////////////////////////////////////


/////////////////// Variables y constantes //////////////////////

const projectTitle = document.getElementById('project-title');
const projectName = "Modelo";


// Obtener elementos
const developerModal = document.getElementById('developer-modal');
/////////////////////////////////////////////////////////////////////////////////////////////


/////////// Mostrar Titulo del modelo que se visualiza ///////////////
projectTitle.innerText = projectName;

projectTitle.style.opacity = '0';

// Funcion para mostrar el titulo
function showTitle() {
  // Eliminar la clase fade-out si está presente
  projectTitle.classList.remove('fade-out');
  // Hacer que el título se desvanezca a visible con opacidad 1
  projectTitle.style.opacity = '1';

  // Mantener el título visible durante 10 segundos antes de aplicar la animación
  setTimeout(function() {
    projectTitle.classList.add('fade-out'); // Después de 10 segundos, inicia la animación de desvanecimiento
  }, 3000);  // Espera 10 segundos antes de ejecutar la animación
}

let initialRotation = '0 0 0';

// Esperar a que el modelo se cargue completamente
modelViewer.addEventListener('load', function() {
  // Mostrar el título cuando el modelo haya sido cargado
  projectTitle.style.opacity = '1';
  

  // Mantener el título visible durante 10 segundos antes de aplicar la animación
  setTimeout(function() {
    projectTitle.classList.add('fade-out'); // Después de 10 segundos, inicia la animación de desvanecimiento
  }, 3000);  // Espera 10 segundos antes de ejecutar la animación
});
/////////////////////////////////////////////////////////////////////////////////////////////


/////////////// Funciones y eventos para los distintos modales de la barra de opciones ///////////////


// Mostrar el modal de desarrollador al hacer clic en el botón de desarrollador
document.getElementById('floating-image').addEventListener('click', function() {
  developerModal.classList.add('show'); // Muestra el modal de desarrollador
});

// Cerrar el modal de desarrollador cuando se hace clic fuera de él
developerModal.addEventListener('click', function(event) {
  if (event.target === developerModal) {
    developerModal.classList.remove('show'); // Cierra el modal de desarrollador
  }
});

// Cerrar el modal cuando se hace clic en el botón de cerrar
document.querySelector('.close-button')?.addEventListener('click', function() {
  developerModal.classList.remove('show'); // Cierra el modal de desarrollador
});

////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////



window.addEventListener('DOMContentLoaded', () => {
  const gestureContainer = document.getElementById('gesture-indicator-container');

  if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    gestureContainer.style.display = 'none';
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////

