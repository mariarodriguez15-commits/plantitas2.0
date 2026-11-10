### Nombre del proyecto: CultivaWeb
### Integrantes: Maria Jose Rodriguez, Diego Sanchez, Bastian Araneda

### Invernadero
Sistema web para gestionar un invernadero, permitiendo administrar cultivos, sensores y los datos recolectados por estos. Cada usuario puede administrar su propio invernadero y visualizar información histórica proveniente de sus sensores.

## Tecnologías
* HTML5
* Tailwind CSS (v4, vía CDN)
* Alpine.js (v3, vía CDN)
* JavaScript (ES6 Modules)

### Como ejecutarlo

1. Clonar o descargar el repositorio.
2. IMPORTANTE: No abrir los archivos haciendo doble clic. Debido al uso de fetch para cargar los JSON y módulos de JavaScript, es necesario usar un servidor local.
3. Opción A (Recomendada): Usar la extensión Live Server en Visual Studio Code. Hacer clic derecho en index.html y seleccionar "Open with Live Server".

## Credenciales de prueba
Usuario Administrador:
  Correo: admin@cultivaweb.cl
  Contraseña: admin321321
Usuario Normal:
  Correo: prueba@cultivaweb.cl
  Contraseña: prueba321

## Vistas disponibles
index.html: Inicio de sesión.
registro.html: Creación de cuenta.
panel.html: Dashboard con resumen de cultivos y sensores.
cultivos.html: Gestión de cultivos.
sensores.html: Gestión de sensores asociados a cultivos.

## Documentación de Endpoints Simulados (Mocks)
Todas las llamadas a datos las maneja el archivo js/api.js. Para que las vistas funcionen sin un backend real todavía, esta capa simula las peticiones REST (con su respectiva latencia) y devuelve siempre el mismo formato de respuesta: { ok, status, data, error }.

Aquí está la equivalencia de lo que tenemos programado con lo que será la API real:

| Función en nuestro JS | Método | Ruta de la API | ¿Qué hace? |
| :--- | :--- | :--- | :--- |
| api.auth.iniciarSesion() | POST | /auth/login | Valida las credenciales y crea la sesión. |
| api.auth.registrar() | POST | /auth/registro | Crea un usuario nuevo. |
| api.cultivos.listar() | GET | /cultivos | Trae la lista de todos los cultivos. |
| api.cultivos.crear() | POST | /cultivos | Guarda un cultivo nuevo. |
| api.cultivos.actualizar() | PUT | /cultivos/:id | Modifica los datos de un cultivo. |
| api.cultivos.eliminar() | DELETE | /cultivos/:id | Borra un cultivo del sistema. |
| api.sensores.listar() | GET | /sensores | Trae la lista de los sensores. |
| api.sensores.crear() | POST | /sensores | Registra un sensor nuevo. |
| api.sensores.eliminar() | DELETE | /sensores/:id | Borra un sensor. |