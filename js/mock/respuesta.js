export const ok = (data, meta) => ({ ok: true, status: 200, data, error: null, ...(meta && { meta }) });

export const creado = (data) => ({ ok: true, status: 201, data, error: null });

export const sinContenido = () => ({ ok: true, status: 204, data: null, error: null });

export const fallo = (status, error, errores) => ({
  ok: false,
  status,
  data: null,
  error,
  ...(errores && { errores }),
});
