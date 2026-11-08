const PREFIJO = 'cw:db:';
export const RECURSOS = ['usuarios']; 

let siembra = null;

export function asegurarSemilla() {
  siembra ??= sembrar().catch((error) => {
    siembra = null; 
    throw error;
  });
  return siembra;
}

async function sembrar() {
  const pendientes = RECURSOS.filter((recurso) => localStorage.getItem(PREFIJO + recurso) === null);
  await Promise.all(
    pendientes.map(async (recurso) => {
      const res = await fetch('mocks/' + recurso + '.json');
      if (!res.ok) throw new Error('No se pudo cargar mocks/' + recurso + '.json (HTTP ' + res.status + ')');
      escribir(recurso, await res.json());
    }),
  );
}

export function leer(recurso) {
  return JSON.parse(localStorage.getItem(PREFIJO + recurso)) ?? [];
}

export function escribir(recurso, filas) {
  localStorage.setItem(PREFIJO + recurso, JSON.stringify(filas));
}


export function siguienteId(filas) {
  return filas.reduce((max, fila) => Math.max(max, fila.id), 0) + 1;
}

export async function reiniciar() {
  RECURSOS.forEach((recurso) => localStorage.removeItem(PREFIJO + recurso));
  siembra = null;
  await asegurarSemilla();
}

