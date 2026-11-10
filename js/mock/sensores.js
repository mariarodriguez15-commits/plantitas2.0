import { leer, escribir, siguienteId } from './db.js';
import { ok, creado, sinContenido, fallo } from './respuesta.js';

function listar() {
  return ok(leer('sensores'));
}

function crear({ cuerpo }) {
  const { nombre = '', tipo = '', estado = 'Activo', cultivoId } = cuerpo;
  const errores = {};
  
  if (nombre.trim().length < 2) errores.nombre = 'El nombre es obligatorio.';
  if (tipo.trim().length < 2) errores.tipo = 'El tipo es obligatorio.';
  if (!cultivoId) errores.cultivoId = 'Debe asociarse a un cultivo.';
  
  if (Object.keys(errores).length) return fallo(422, 'Revisa los datos.', errores);

  const sensores = leer('sensores');
  const nuevo = { 
    id: siguienteId(sensores), 
    nombre: nombre.trim(), 
    tipo: tipo.trim(), 
    estado,
    cultivoId: Number(cultivoId)
  };
  
  escribir('sensores', [...sensores, nuevo]);
  return creado(nuevo);
}

function eliminar({ params }) {
  const id = Number(params.id);
  const sensores = leer('sensores');
  const filtrados = sensores.filter(s => s.id !== id);
  
  if (sensores.length === filtrados.length) {
    return fallo(404, 'Sensor no encontrado.');
  }
  
  escribir('sensores', filtrados);
  return sinContenido();
}

export const endpointsSensores = [
  { metodo: 'GET', ruta: '/sensores', privada: true, manejar: listar },
  { metodo: 'POST', ruta: '/sensores', privada: true, manejar: crear },
  { metodo: 'DELETE', ruta: '/sensores/:id', privada: true, manejar: eliminar },
];