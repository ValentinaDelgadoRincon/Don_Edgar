import inquirer from "inquirer";
import {
  agregarTarea,
  listarTareas,
  listarPorEstado,
  cambiarEstado,
  editarTarea,
  eliminarTarea,
} from "./controllers/tareasController.js";
import { mostrarMenu } from "./utils/menu.js";

async function iniciar() {
  mostrarMenu();

  const { opcion } = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "Ingresa una opción:",
      choices: [
        { name: "1. Agregar tarea", value: "1" },
        { name: "2. Listar tareas", value: "2" },
        { name: "3. Marcar tarea como completada", value: "3" },
        { name: "4. Editar tarea", value: "4" },
        { name: "5. Eliminar tarea", value: "5" },
        { name: "6. Salir", value: "6" },
      ],
    },
  ]);

  switch (opcion) {
    case "1":
      await agregarTarea();
      break;

    case "2":
      const { filtro } = await inquirer.prompt([
        {
          type: "list",
          name: "filtro",
          message: "¿Qué tareas quieres listar?",
          choices: [
            { name: "Todas", value: "todas" },
            { name: "Completadas", value: "completadas" },
            { name: "Pendientes", value: "pendientes" },
          ],
        },
      ]);
      if (filtro === "todas") {
        await listarTareas();
      } else {
        await listarPorEstado(filtro);
      }
      break;

    case "3":
      await cambiarEstado();
      break;

    case "4":
      await editarTarea();
      break;

    case "5":
      await eliminarTarea();
      break;

    case "6":
      console.log("Saliendo del programa...");
      return;

    default:
      console.log("Opción inválida");
  }

  await iniciar();
}

iniciar();
