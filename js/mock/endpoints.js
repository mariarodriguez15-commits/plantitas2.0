import { endpointsAuth, usuarioDelToken } from './auth.js';
import { endpointsCultivos } from './mock/cultivos.js'; 
import { endpointsSensores } from './mock/sensores.js'; 

export const endpoints = [
  ...endpointsAuth, 
  ...endpointsCultivos, 
  ...endpointsSensores
];

export { usuarioDelToken };