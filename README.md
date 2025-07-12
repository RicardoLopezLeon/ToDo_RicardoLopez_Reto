# ToDo_RicardoLopez_Reto

ToDo_RicardoLopez_Reto es una aplicación web de lista de tareas (To-Do App), desarrollada como reto técnico para evaluación Front-End. Permite crear, editar, eliminar y organizar tareas, con persistencia local y un diseño responsivo adaptable a distintos dispositivos.

# Funcionalidades

- Crear tareas con nombre, descripción y fecha programada.
- Editar tareas existentes.
- Cambiar el estado de la tarea entre “Pendiente”, “En Proceso” y “Completada”.
- Eliminar tareas.
- Filtro por estado o descripción.
- Persistencia local usando localStorage.
- Diseño responsivo adaptable a pantallas móviles.
- Alertas visuales amigables con SweetAlert2.


## Tech

Concentration o Memory utiliza varios proyectos de código abierto para el funcionamineto correcto
- [ReactJS] - Biblioteca para construir interfaces de usuario.
- [Vite] - Bundler moderno y rápido para desarrollo frontend.
- [Visual Studio Code] - Editor de código fuente.
- [localStorage] - Para persistencia de tareas en el navegador.
- [Material UI] - Librería de para el diseño de páginas web.
- [sweetalert2] - Notificaciones modales personalizadas.

Y, por supuesto, ToDo_RicardoLopez_Reto es de código abierto y cuenta con un repositorio público en GitHub.

## Instalation

Concentration o Memory fue desarrollado con React v19+.

Descargar el proyecto desde el reposirotio de GitHub y posteriormente instalar las dependencias.

```sh
git clone https://github.com/RicardoLopezLeon/ToDo_RicardoLopez_Reto
cd ToDo_RicardoLopez_Reto
npm install
```

Posteriormente de hacer la instalación del proyecto en la raiz de ToDo_RicardoLopez_Reto. Para la ejecución del proyecto tanto en desarrollo o producción son los siguientes:

Para entorno de desarrollo...

```sh
npm run dev
```
Despues de ejeutar el script para el funcionamiento del proyecto en desarrollo se debe ingresar en el navegador la url siguiente: http://localhost:5173/


Para entorno de producción...

```sh
npm run build
npm run preview
```
Despues de ejeutar el script para el funcionamiento del proyecto en producción se debe ingresar en el navegador la url siguiente: http://localhost:4173/


## Observaciones

- Las tareas se almacenan en localStorage, por lo que no se pierden al recargar la página o cerrar el navegador.
- La aplicación es responsiva y se adapta a pantallas menores a 700px de ancho.
- No es posible seleccionar fechas pasadas al crear o modificar una tarea, lo que garantiza consistencia en la planificación.


# Ideas para Mejorar

- Validación para evitar redundancia o tareas repetidas con el mismo nombre.
- Desabilitar el cambio de estado a las tareas completadas.
- Mejores validaciones en las casillas de nombre y descripcion indicando al usuario errores.
