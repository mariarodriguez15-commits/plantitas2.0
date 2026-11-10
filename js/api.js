import * as servidorMock from './mock/servidor.js';

const transporte = servidorMock;

const CLAVE_SESION = 'cw:sesion';

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION));
  } catch {
    return null;
  }
}

function guardarSesion(sesion) {
  if (sesion) localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  else localStorage.removeItem(CLAVE_SESION);
}

async function pedir(metodo, ruta, cuerpo) {
  const sesion = leerSesion();
  const respuesta = await transporte.pedir(metodo, ruta, { cuerpo, token: sesion?.token });

  if (respuesta.status === 401 && sesion?.token) {
    guardarSesion(null);
    window.dispatchEvent(new CustomEvent('cw:sesion-expirada'));
  }
  return respuesta;
}

function consulta(parametros = {}) {
  const query = new URLSearchParams();
  for (const [clave, valor] of Object.entries(parametros)) {
    if (valor !== undefined && valor !== null && valor !== '') query.set(clave, valor);
  }
  const texto = query.toString();
  return texto ? '?' + texto : '';
}

const segmento = (valor) => encodeURIComponent(valor);


export const api = {
  auth: {
    
    async registrar(datos) {
      const res = await pedir('POST', '/auth/registro', datos);
      if (res.ok) guardarSesion(res.data);
      return res;
    },

    
    async iniciarSesion(credenciales) {
      const res = await pedir('POST', '/auth/login', credenciales);
      if (res.ok) guardarSesion(res.data);
      return res;
    },

    
    async cerrarSesion() {
      const res = await pedir('POST', '/auth/logout');
      guardarSesion(null);
      return res;
    },

   
    async yo() {
      const res = await pedir('GET', '/yo');
      if (res.ok) guardarSesion({ ...leerSesion(), usuario: res.data });
      return res;
    },

    
    async actualizarPerfil(datos) {
      const res = await pedir('PUT', '/yo', datos);
      if (res.ok) guardarSesion({ ...leerSesion(), usuario: res.data });
      return res;
    },

    usuarioGuardado() {
      return leerSesion()?.usuario ?? null;
    },
  },

  cultivos: {
    async listar() {
      return await pedir('GET', '/cultivos');
    },
    async crear(datos) {
      return await pedir('POST', '/cultivos', datos);
    },
    async actualizar(id, datos) {
      return await pedir('PUT', `/cultivos/${id}`, datos);
    },
    async eliminar(id) {
      return await pedir('DELETE', `/cultivos/${id}`);
    }
  },

  sensores: {
    async listar() {
      return await pedir('GET', '/sensores');
    },
    async crear(datos) {
      return await pedir('POST', '/sensores', datos);
    },
    async eliminar(id) {
      return await pedir('DELETE', `/sensores/${id}`);
    }
  },

  preferencias: {
    leer(clave, porDefecto = null) {
      try {
        return JSON.parse(localStorage.getItem('cw:pref:' + clave)) ?? porDefecto;
      } catch {
        return porDefecto;
      }
    },
    guardar(clave, valor) {
      localStorage.setItem('cw:pref:' + clave, JSON.stringify(valor));
    },
  },

  simulador: {
    leerConfig: servidorMock.leerConfig,
    guardarConfig: servidorMock.guardarConfig,
    configInicial: servidorMock.CONFIG_INICIAL,
    reiniciarDatos: servidorMock.reiniciarDatos,
  },
};