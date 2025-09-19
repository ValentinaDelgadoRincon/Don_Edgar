import inquirer from "inquirer";
import _ from "lodash";
import { conectar } from "../config/persistenciaArchivos.js";


function leerTareas() {
  return conectar.leer();
}
function guardarTareas(tareas) {
  conectar.guardar(tareas);
}


export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: "input",
      name: "descripcion",
      message: "Ingresa la descripción de la tarea:",
    },
  ]);

  const tareas = leerTareas();
  tareas.push({
    id: Date.now(),
    descripcion,
    completada: false,
  });
  guardarTareas(tareas);

  console.log("Tarea agregada con éxito!");
}

export async function listarTareas() {
  const tareas = leerTareas();
  if (tareas.length === 0) {
    console.log("No hay tareas registradas.");
    return;
  }
  console.log("\nLista de tareas:");
  tareas.forEach((t) =>
    console.log(
      `- [${t.completada ? "✔" : " "}] ${t.descripcion} (ID: ${t.id})`
    )
  );
}


export async function listarPorEstado(estado) {
  const tareas = leerTareas();
  const filtradas =
    estado === "completadas"
      ? tareas.filter((t) => t.completada)
      : tareas.filter((t) => !t.completada);

  if (filtradas.length === 0) {
    console.log(`No hay tareas ${estado}.`);
    return;
  }

  console.log(`\nTareas ${estado}:`);
  filtradas.forEach((t) =>
    console.log(
      `- [${t.completada ? "✔" : " "}] ${t.descripcion} (ID: ${t.id})`
    )
  );
}

export async function cambiarEstado() {
  const tareas = leerTareas();
  if (tareas.length === 0) {
    console.log("📭 No hay tareas para actualizar.");
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Selecciona la tarea que deseas marcar como completada:",
      choices: tareas
        .filter((t) => !t.completada)
        .map((t) => ({ name: t.descripcion, value: t.id })),
    },
  ]);

  const index = tareas.findIndex((t) => t.id === id);
  tareas[index].completada = true;
  guardarTareas(tareas);

  console.log("Tarea marcada como completada!");
}

export async function editarTarea() {
  const tareas = leerTareas();
  if (tareas.length === 0) {
    console.log("No hay tareas para editar.");
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Selecciona la tarea que deseas editar:",
      choices: tareas.map((t) => ({ name: t.descripcion, value: t.id })),
    },
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    {
      type: "input",
      name: "nuevaDescripcion",
      message: "Nueva descripción:",
    },
  ]);

  const index = tareas.findIndex((t) => t.id === id);
  tareas[index].descripcion = nuevaDescripcion;
  guardarTareas(tareas);

  console.log("Tarea editada con éxito!");
}

export async function eliminarTarea() {
  const tareas = leerTareas();
  if (tareas.length === 0) {
    console.log("No hay tareas para eliminar.");
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Selecciona la tarea que deseas eliminar:",
      choices: tareas.map((t) => ({ name: t.descripcion, value: t.id })),
    },
  ]);

  const nuevas = tareas.filter((t) => t.id !== id);
  guardarTareas(nuevas);

  console.log("Tarea eliminada con éxito!");
}
