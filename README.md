# Casino 67aura - Entrega 2

Plataforma interactiva de simulación de juegos de azar con créditos virtuales.

## Integrantes
- Vicente Baeza
- Maillén Andrade

## Proyecto Seleccionado
- **Casino Online con créditos virtuales**

## Tecnologías Utilizadas
- **HTML5 y CSS3** (Estructura y diseño responsivo)
- **Bootstrap 5.3** (Layout y componentes de interfaz)
- **JavaScript y Alpine.js** (Manejo del estado, reactividad y peticiones asincrónicas)
- **AWS EC2 y Nginx** (Servidor de alojamiento con IP Elástica)

## Estructura de Carpetas
```text
.
├── datos/
│   └── juegos.json          # Archivo de datos estáticos de los juegos
├── diseñoDePágina.css       # Hoja de estilos personalizados (Casino VIP)
├── hub.html                 # Lobby/Catálogo de juegos con Alpine.js
├── index.html               # Página de bienvenida e información del proyecto
├── registro.html            # Formulario interactivo con validación reactiva
├── Ruleta_Francesa_rueda.jpg # Recurso gráfico de la ruleta
├── ruleta.html              # Mesa de juego interactiva 
└── ruleta.js                # Controla logica de fichas y actualizacion de saldo

Funcionalidades Agregadas en la Tarea 2

Se dotó de interactividad a la interfaz utilizando Alpine.js para gestionar el estado del frontend. Las principales características incluyen:
- Carga asíncrona de un catálogo de juegos desde un archivo JSON externo.
- Filtrado de juegos en tiempo real mediante un buscador que no recarga la página.
- Validación interactiva de formularios en el navegador (comparación de contraseñas y longitud mínima).
- Visualización condicional de secciones de ayuda y estados de carga/error.

Ubicación y Estructura del Archivo JSON

El archivo de datos estáticos se encuentra en la ruta datos/juegos.json. Su estructura consiste en un arreglo de objetos, donde cada registro representa un juego de casino. Cada objeto contiene campos clave para su renderizado y búsqueda: “id” (identificador único), “nombre”, “categoría”, “descripción”, “estado”, “minApuesta”, “imagen” y “ur”`.

Flujo de Carga y Filtrado de los Datos

Carga: Al entrar a la vista hub.html, Alpine.js inicializa el estado con x-data=hubCasino() y ejecuta el método cargarJuegos() mediante la directiva x-init. Este método utiliza fetch() para solicitar datos/juegos.json y guardar la respuesta en el estado local.
Filtrado: El input de búsqueda está vinculado al estado mediante x-model=busqueda. A medida que el usuario escribe, la propiedad computada juegosFiltrados() evalúa el texto ingresado (ignorando mayúsculas y minúsculas) y devuelve un nuevo arreglo solo con los juegos cuyo nombre o categoría coincidan, actualizando el DOM instantáneamente gracias a “x-for”.

Instrucciones de Prueba

Listado y Búsqueda: En la página "Catálogo de Juegos" (hub.html), se observa la lista completa de juegos. Si se escribe palabras como "Ruleta" o "Cartas" en el buscador; se verá que los resultados cambian en vivo. Si se borra el texto se recuperar el listado completo.
Sección Oculta: En el mismo Hub, presiona el botón "Ver Instrucciones del Hub" para desplegar y ocultar dinámicamente un cuadro de texto (controlado por x-show=mostrarAyuda).
Formulario de Registro: Dirígete a la vista "Registrarse" (registro.html). Intenta enviar el formulario con contraseñas que no coincidan o que tengan menos de 4 caracteres para ver las validaciones interactivas (`x-show=mensajeError). Si ingresas datos válidos, se mostrará el mensaje de éxito.

Instrucciones para Comprobar el Estado de Error de Carga

Para visualizar el mensaje de error de carga en hub.html, puedes forzar un fallo en la petición fetch(). Esto se logra renombrando temporalmente la carpeta “datos/” en el servidor, o simulando un corte de red desde la pestaña "Network" de las herramientas de desarrollador del navegador (F12). Al no encontrar el archivo, se activará el estado x-show=error.

Dirección Pública del Despliegue

La aplicación está publicada y accesible mediante la siguiente Elastic IP en AWS: http://23.23.163.220

Limitaciones Conocidas

Al tratarse de una maqueta frontend sin conexión a un backend real o base de datos, toda la interactividad ocurre en memoria:
Las fichas depositadas en la ruleta y las cuentas creadas en el formulario de registro se pierden al recargar la página o al navegar hacia otra sección.
Ocultar secciones o comprobar datos de formulario en el navegador web no representa un sistema de seguridad ni autenticación real.