import { endpointsAuth, usuarioDelToken } from './auth.js';
import { endpointsCultivos } from './cultivos.js'; 
import { endpointsSensores } from './sensores.js';

export const endpoints = [
  ...endpointsAuth, 
  ...endpointsCultivos, 
  ...endpointsSensores
];

export { usuarioDelToken };
