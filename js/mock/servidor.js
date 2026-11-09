import { endpoints, usuarioDelToken } from './endpoints.js';
import { asegurarSemilla, reiniciar } from './db.js';
import { fallo } from './respuesta.js';
import { coincidirRuta } from '../utils/rutas.js';

const CLAVE_CONFIG = 'cw:mock:config';

export const CONFIG_INICIAL = Object.freeze({
  latenciaMin: 300,
  latenciaMax: 800,
  probabilidadFalla: 0, 
});

export function leerConfig() {
  let guardada = {};
  try {
    guardada = JSON.parse(localStorage.getItem(CLAVE_CONFIG)) ?? {};
  } catch {
    
  }
  const config = { ...CONFIG_INICIAL, ...guardada };
  if (new URLSearchParams(location.search).has('fallar')) config.probabilidadFalla = 1;
  return config;
}

export function guardarConfig(cambios) {
  const { latenciaMin, latenciaMax, probabilidadFalla } = { ...leerConfig(), ...cambios };
  localStorage.setItem(CLAVE_CONFIG, JSON.stringify({ latenciaMin, latenciaMax, probabilidadFalla }));
}

export { reiniciar as reiniciarDatos };

const dormir = (ms) => new Promise((resolver) => setTimeout(resolver, ms));
const azar = (min, max) => min + Math.random() * (max - min);

const copiar = (valor) => (valor === undefined ? undefined : JSON.parse(JSON.stringify(valor)));

export async function pedir(metodo, ruta, { cuerpo, token } = {}) {
  const config = leerConfig();
  await dormir(azar(config.latenciaMin, config.latenciaMax)); // la "red"

  const respuesta = await atender(metodo, ruta, copiar(cuerpo) ?? {}, token, config);
  console.debug('[mock] ' + metodo + ' ' + ruta + ' → ' + respuesta.status);
  return copiar(respuesta);
}

async function atender(metodo, ruta, cuerpo, token, config) {
  if (Math.random() < config.probabilidadFalla) {
    return fallo(500, 'El servidor no respondió (error simulado). Intenta de nuevo.');
  }

  try {
    await asegurarSemilla();
  } catch (error) {
    console.error('[mock]', error);
    return fallo(503, 'No se pudieron cargar los datos de prueba. Revisa la carpeta mocks.');
  }

  const url = new URL(ruta, 'http://mock.local');
  const yo = usuarioDelToken(token);

  for (const endpoint of endpoints) {
    if (endpoint.metodo !== metodo) continue;
    const params = coincidirRuta(endpoint.ruta, url.pathname);
    if (!params) continue;

    if (endpoint.privada && !yo) return fallo(401, 'Debes iniciar sesión para continuar.');

    try {
      return endpoint.manejar({ params, query: url.searchParams, cuerpo, yo });
    } catch (error) {
      console.error('[mock] Error al atender ' + metodo + ' ' + ruta, error);
      return fallo(500, 'Error interno del servidor simulado.');
    }
  }

  return fallo(404, 'No existe el endpoint ' + metodo + ' ' + url.pathname + '.');
}
