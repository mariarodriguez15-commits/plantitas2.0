import { leer, escribir, siguienteId } from './db.js';
import { ok, creado, sinContenido, fallo } from './respuesta.js';

function listar({ yo }) {
  const cultivos = leer('cultivos');
  return ok(cultivos);
}

function crear({ cuerpo, yo }) {
  const { nombre = '', tipo = '', estado = 'En crecimiento' } = cuerpo;
  const errores = {};
  
  if (nombre.trim().length < 2) errores.nombre = 'El nombre debe tener al menos 2 caracteres.';
  if (tipo.trim().length < 2) errores.tipo = 'El tipo es obligatorio.';
  
  if (Object.keys(errores).length) return fallo(422, 'Revisa los datos.', errores);

  const cultivos = leer('cultivos');
  const nuevo = { 
    id: siguienteId(cultivos), 
    nombre: nombre.trim(), 
    tipo: tipo.trim(), 
    estado 
  };
  
  escribir('cultivos', [...cultivos, nuevo]);
  return creado(nuevo);
}

function actualizar({ params, cuerpo }) {
  const id = Number(params.id);
  const { nombre, tipo, estado } = cuerpo;
  const cultivos = leer('cultivos');
  const index = cultivos.findIndex(c => c.id === id);

  if (index === -1) return fallo(404, 'Cultivo no encontrado.');

  const errores = {};
  if (nombre !== undefined && nombre.trim().length < 2) errores.nombre = 'Nombre inválido.';
  if (tipo !== undefined && tipo.trim().length < 2) errores.tipo = 'Tipo inválido.';
  if (Object.keys(errores).length) return fallo(422, 'Revisa los datos.', errores);

  cultivos[index] = { ...cultivos[index], ...cuerpo };
  escribir('cultivos', cultivos);
  
  return ok(cultivos[index]);
}

function eliminar({ params }) {
  const id = Number(params.id);
  const cultivos = leer('cultivos');
  const filtrados = cultivos.filter(c => c.id !== id);
  
  if (cultivos.length === filtrados.length) {
    return fallo(404, 'Cultivo no encontrado.');
  }
  
  escribir('cultivos', filtrados);
  return sinContenido();
}

export const endpointsCultivos = [
  { metodo: 'GET', ruta: '/cultivos', privada: true, manejar: listar },
  { metodo: 'POST', ruta: '/cultivos', privada: true, manejar: crear },
  { metodo: 'PUT', ruta: '/cultivos/:id', privada: true, manejar: actualizar },
  { metodo: 'DELETE', ruta: '/cultivos/:id', privada: true, manejar: eliminar },
];