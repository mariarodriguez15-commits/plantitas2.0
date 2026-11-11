# Consultas sobre formulario de Login

Fecha: 2026-11-09
Integrante: Bastián Araneda
Herramienta y modelo: Claude 3.5 Sonnet
Archivos afectados: Ninguno (consulta conceptual)

## Objetivo
Entender cómo manejar el estado de un formulario de login en Alpine.js y cómo procesar los errores de la API.

## Conversación (texto completo, sin editar)

### Prompt 1
"Estoy haciendo el login y no caxo lo de alpine bien para esto, Como puedo estructurar los datos para que valide los campos y el boton se desactive mientras carga"

### Respuesta 1
"Para armar la estructura del componente en Alpine, te recomiendo declarar en tu x-data un objeto form que contenga las propiedades correo y clave. Además, agrega un booleano enviando inicializado en false y un objeto errores vacío.
En el HTML, vincula los inputs usando x-model="form.correo" y x-model="form.clave" para que se mantengan sincronizados con el estado. Para el botón de envío, utiliza la directiva :disabled="enviando" para que se bloquee automáticamente cuando el usuario haga clic.
En tu función asíncrona encargada del envío, lo primero que debes hacer es cambiar el estado a this.enviando = true (para bloquear el botón), luego ejecutar la petición a tu API usando await, y finalmente (pase lo que pase, idealmente dentro de un bloque finally o al final de la función) volver a dejar this.enviando = false para que el botón se reactive si hay algún error o termine la carga."

### Prompt 2
"pero como hago para que si la API me tira un error, no se recargue la página y me muestre el mensaje arriba"

### Respuesta 2
"Para evitar que la página se recargue y mostrar el error de forma limpia, lo principal es asegurarte de que tu formulario tenga el modificador @submit.prevent="enviar()" en el HTML, y agregarle también el atributo novalidate para que el navegador no interfiera con sus propios mensajes automáticos.
Dentro de tu función enviar(), cuando proceses la respuesta de la API, revisa la propiedad ok. Si ok es false (lo que indica que hubo un error), no redirijas al usuario. En su lugar, asigna el texto del error a una variable de estado, por ejemplo: this.errorGeneral = res.error;.
Para mostrarlo en pantalla, coloca un elemento en la parte superior de tu formulario (arriba de los inputs) con la directiva x-show="errorGeneral" y usa x-text="errorGeneral" para inyectar el mensaje. Así, Alpine hará que el párrafo aparezca mágicamente solo cuando haya un error que mostrar, manteniendo al usuario en la misma página."

## Qué se incorporó al proyecto
Usamos las explicaciones como guía para escribir js/login.js. Implementamos los estados con Alpine y la conexión con api.auth.iniciarSesion(). No se copiaron bloques de código, sino que aplicamos los conceptos explicados.

## Verificación
Se probó en Live Server: los campos vacíos muestran error, las credenciales incorrectas muestran el mensaje general, y las credenciales correctas redirigen al panel.