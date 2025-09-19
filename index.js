import inquirer from "inquirer";
import { agregarTarea, listarTareas, cambiarEstado, buscarTareas, editarTarea, eliminarTarea } from "./controllers/tareasController.js";
import { mostrarMenu } from "./utils/menu.js";

async function iniciar() {
  mostrarMenu();
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Ingresa una opcion:',
      choices: [
        { name: "1. Agregar tarea", value: "1" },
        { name: "2. Listar tareas", value: "2" },
        { name: "3. Editar tarea", value: "3" },
        { name: "4. Eliminar tarea", value: "4" },
        { name: "5. Salir", value: "5" },
      ],
    },
  ]);
  switch (opcion) {
    case "1":
      await agregarTarea();
      break;
    case "2":
      await listarTareas();
      break;
    case "3":
      await editarTarea();
      break;
    case "4":
      await eliminarTarea();
      break
    case "5":
      console.log("Saliendo del programa...");
      return;
    default:
      console.log("Opcion inválida")
  }

  await iniciar();
}

iniciar();
