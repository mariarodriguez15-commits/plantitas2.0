# Consultas sobre formulario de Registro

Fecha: 2026-11-11
Integrante: Bastián Araneda
Herramienta y modelo: Claude 3.5 Sonnet
Archivos afectados: Ninguno (consulta conceptual)

## Objetivo
Aclarar cómo validar múltiples campos (nombre, correo, clave, confirmación) y mostrar los errores específicos bajo cada input.

## Conversación (texto completo, sin editar)

### Prompt 1
"ya termine el login y quedo god, ahora tengo q pasar la logica al registro. tengo 4 inputs pero como hago le para validar que la clave y la confirmacion coincidan sin llenar el código de tanto if"

### Respuesta 1
"Para manejar la validación de forma limpia en Alpine, te sugiero que en tu componente de x-data declares un objeto vacío para los errores, por ejemplo: errores: {}. Luego, en tu función validar(), en lugar de retornar true o false, te dedicas a poblar ese objeto. 
Por ejemplo, evalúas if (!this.form.nombre) this.errores.nombre = 'El nombre es requerido'; o if (this.form.clave !== this.form.confirmarClave) this.errores.confirmarClave = 'Las contraseñas no coinciden'. 
Es fundamental que antes de empezar a validar, limpies el objeto con this.errores = {}; para que no queden errores viejos pegados. 
Después, en tu HTML, debajo de cada input, colocas un elemento (como un span o un p) con la directiva x-show apuntando a la propiedad correspondiente (ej. x-show="errores.clave") y usando x-text para inyectar el mensaje. Al hacer esto, Alpine se encarga de ocultar o mostrar el mensaje de error de forma reactiva sin que tengas que manipular el DOM a mano."

### Prompt 2
"y si el correo ya existe como hago para que el error de la API salga específicamente abajo de ese campo y se muestre bien"

### Respuesta 2
"Para lograr eso, tu función asíncrona enviar() debe estar preparada para manejar las respuestas de error que vienen de tu capa de datos. Lo ideal es que tu API, cuando detecta un conflicto (como un error 409 de correo duplicado), devuelva un objeto estructurado que separe el error general de los errores por campo.
Si tu respuesta tiene una propiedad llamada errores (por ejemplo, res.errores = { correo: 'Este correo ya está en uso' }), lo que tienes que hacer dentro del bloque en el que procesas la respuesta es reasignar tu objeto local: this.errores = res.errores;. 
Al hacer esto, automáticamente las propiedades de tu objeto se actualizan, y como en el HTML tú ya tienes el x-show="errores.correo" configurado, el mensaje aparecerá justo debajo del input del correo, dándole un feedback preciso al usuario sobre qué campo específico está mal, en lugar de un mensaje genérico de error."

### Prompt 3
"y por ultimo cómo hago para decirle al usuario de que se creó la cuenta antes de mandarlo al panel"

### Respuesta 3
"Para lograr esa experiencia de usuario, puedes agregar una variable booleana o de texto en tu estado, por ejemplo: exito: ''. Cuando tu función enviar() reciba una respuesta exitosa (donde res.ok sea true), en lugar de redirigir inmediatamente, asignas un mensaje a esa variable: this.exito = '¡Cuenta creada! Redirigiendo al panel...';
En el HTML, agregas un contenedor con la directiva x-show="exito" (y con clases de Tailwind para que se vea como una alerta verde) y usas x-text="exito". 
Finalmente, para que el usuario alcance a leer el mensaje, envuelves la redirección en un setTimeout. Algo como: setTimeout(() => { window.location.href = 'panel.html'; }, 1500);. Así, le das 1.5 segundos al usuario para procesar que la acción fue exitosa antes de cambiar de página."

## Qué se incorporó al proyecto
Aplicamos estas explicaciones para escribir la lógica en js/registro.js. La validación de campos y el manejo de errores por campo se hicieron siguiendo estas pautas, adaptándolas a nuestro código base.

## Verificación
Se probó en el navegador: se validó que los campos vacíos muestren error, que la confirmación de clave no coincida y que el correo duplicado muestre el mensaje bajo el input. También se verificó el mensaje de éxito y la redirección.