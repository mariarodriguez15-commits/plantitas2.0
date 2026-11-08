import { leer, escribir, siguienteId } from './db.js';
import { ok, creado, sinContenido, fallo } from './respuesta.js';

const publico = ({ clave, ...resto }) => resto;

export function usuarioDelToken(token) {
  if (!token || !token.startsWith('mock-')) return null;
  const id = Number(token.slice(5));
  return leer('usuarios').find((u) => u.id === id) ?? null;
}

function registro({ cuerpo }) {
  const { nombre = '', correo = '', clave = '' } = cuerpo;
  const errores = {};
  if (nombre.trim().length < 2) errores.nombre = 'El nombre debe tener al menos 2 caracteres.';
  if (!/^\S+@\S+\.\S+$/.test(correo)) errores.correo = 'Ingresa un correo válido.';
  if (clave.length < 8) errores.clave = 'La contraseña debe tener al menos 8 caracteres.';
  if (Object.keys(errores).length) return fallo(422, 'Revisa los datos.', errores);

  const usuarios = leer('usuarios');
  if (usuarios.some((u) => u.correo.toLowerCase() === correo.toLowerCase())) {
    return fallo(409, 'Ese correo ya está registrado.', { correo: 'Ese correo ya está registrado.' });
  }

  const nuevo = { id: siguienteId(usuarios), nombre: nombre.trim(), correo, clave, rol: 'usuario' };
  escribir('usuarios', [...usuarios, nuevo]);
  return creado({ token: 'mock-' + nuevo.id, usuario: publico(nuevo) });
}

function login({ cuerpo }) {
  const { correo = '', clave = '' } = cuerpo;
  const errores = {};
  if (!correo.trim()) errores.correo = 'Ingresa tu correo.';
  if (!clave) errores.clave = 'Ingresa tu contraseña.';
  if (Object.keys(errores).length) return fallo(422, 'Revisa los datos.', errores);

  const usuario = leer('usuarios').find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.clave === clave,
  );
  if (!usuario) return fallo(401, 'Correo o contraseña incorrectos.');
  return ok({ token: 'mock-' + usuario.id, usuario: publico(usuario) });
}

const logout = () => sinContenido();

const miPerfil = ({ yo }) => ok(publico(yo));

function actualizarPerfil({ cuerpo, yo }) {
  const { nombre = '' } = cuerpo;
  if (nombre.trim().length < 2) {
    return fallo(422, 'Revisa los datos.', { nombre: 'El nombre debe tener al menos 2 caracteres.' });
  }
  const usuarios = leer('usuarios');
  const posicion = usuarios.findIndex((u) => u.id === yo.id);
  usuarios[posicion] = { ...usuarios[posicion], nombre: nombre.trim() };
  escribir('usuarios', usuarios);
  return ok(publico(usuarios[posicion]));
}

export const endpointsAuth = [
  { metodo: 'POST', ruta: '/auth/registro', manejar: registro },
  { metodo: 'POST', ruta: '/auth/login', manejar: login },
  { metodo: 'POST', ruta: '/auth/logout', manejar: logout },
  { metodo: 'GET', ruta: '/yo', privada: true, manejar: miPerfil },
  { metodo: 'PUT', ruta: '/yo', privada: true, manejar: actualizarPerfil },
];
