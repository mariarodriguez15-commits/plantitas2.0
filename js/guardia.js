import { api } from './api.js';

export function protegerRuta() {
  const usuario = api.auth.usuarioGuardado();
  if (!usuario) {
    window.location.href = 'index.html';
  }
}

export function configurarCerrarSesion() {
  const enlaces = document.querySelectorAll('a');
  
  enlaces.forEach(enlace => {
    if (enlace.textContent.includes('Cerrar Sesión') || enlace.textContent.includes('Cerrar sesión')) {
      enlace.addEventListener('click', async (e) => {
        e.preventDefault(); 
        await api.auth.cerrarSesion(); 
        window.location.href = 'index.html'; 
      });
    }
  });
}