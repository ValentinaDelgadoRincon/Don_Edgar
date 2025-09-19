import readline from "readline";
import { agregarTarea,listarTareas,cambiarEstado,buscarTareas } from "./controllers/tareasController.js";
import { mostrarMenu } from "./utils/menu.js";
// const {
//   agregarTarea,
//   listarTareas,
//   cambiarEstado,
//   buscarTareas
// } = require("./controllers/tareasController");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function iniciar() {
  mostrarMenu();
  rl.question("selecciona una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        rl.question("Título de la tarea: ", (titulo) => {
          rl.question("Descripción: ", (descripcion) => {
            rl.question("Prioridad (alta, media, baja): ", (prioridad) => {
              agregarTarea(titulo, descripcion, prioridad);
              iniciar();
            });
          });
        });
        break;
      case "2":
        listarTareas();
        iniciar();
        break;
      case "3":
        rl.question("ID de la tarea: ", (id) => {
          rl.question("Nuevo estado (pendiente, en progreso, completada): ", (estado) => {
            cambiarEstado(id, estado);
            iniciar();
          });
        });
        break;
      case "4":
        rl.question("Palabra clave a buscar: ", (palabra) => {
          buscarTareas(palabra);
          iniciar();
        });
        break;
      case "5":
        console.log("Saliendo del sistema...");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        iniciar();
    }
  });
}

iniciar();
