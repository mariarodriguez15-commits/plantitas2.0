### Nombre del proyecto: CultivaWeb
### Integrantes: Maria Jose Rodriguez, Diego Sanchez, Bastian Araneda

### Invernadero
Sistema web para gestionar un invernadero, permitiendo administrar cultivos, sensores y los datos recolectados por estos. Cada usuario puede administrar su propio invernadero y visualizar información histórica proveniente de sus sensores.

## Requisitos
Para ejecutar este proyecto, solo necesitas:
Un navegador web
Visual Studio Code (u otro editor de código).
La extensión Live Server instalada en VS Code (o cualquier servidor local como python -m http.server).

## Como ejecutarlo

1. Clonar o descargar el repositorio.
2. IMPORTANTE: No abrir los archivos haciendo doble clic. Debido al uso de fetch para cargar los JSON y módulos de JavaScript, es necesario usar un servidor local.
3. Opción A (Recomendada): Usar la extensión Live Server en Visual Studio Code. Hacer clic derecho en index.html y seleccionar "Open with Live Server".
4. Opción B: Abrir una terminal en la carpeta del proyecto y ejecutar python -m http.server 8000, luego abrir http://localhost:8000 en el navegador.

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
panel.html: Dashboard con resumen dinámico de cultivos y sensores.
cultivos.html: Gestión de cultivos (CRUD, búsqueda, filtro y paginación).
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

## Uso de Inteligencia Artificial
En el desarrollo de este proyecto se utilizó IA (Claude 3.5 Sonnet) exclusivamente como una herramienta de consulta. Le hicimos preguntas conceptuales sobre cómo funcionaban las cosas de los PDFs entregados y del proyecto del profesor.

Para guiarnos, nos basamos principalmente en los PDFs entregados en clases y en el proyecto de ejemplo del profesor. La IA nos sirvió para aclarar dudas sobre esos materiales y entender cómo adaptar la lógica a nuestro propio proyecto. Por lo tanto, no se incorporó código generado automáticamente, sino que el equipo programó y adaptó las soluciones basándose en dichos apuntes. 

Se puede revisar un ejemplo de cómo utilizamos la IA (las conversaciones y las explicaciones que nos dio) en la carpeta ia/.