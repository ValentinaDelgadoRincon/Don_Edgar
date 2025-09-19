import inquirer from "inquirer";
import _ from "lodash";
import { conectar } from "../config/persistenciaArchivos.js";


async function leerTareas() {
  const db = await conectar();
  return await db.collection("tareas").find().toArray();
}

export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: "input",
      name: "descripcion",
      message: "Ingresa la descripción de la tarea:",
    },
  ]);

  const nuevaTarea = {
    id: Date.now(),
    descripcion,
    completada: false,
  };

  const db = await conectar();
  await db.collection("tareas").insertOne(nuevaTarea);

  console.log("Tarea agregada con éxito!");
}

export async function listarTareas() {
  const tareas = await leerTareas();
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
  const db = await conectar();
  const filtro = estado === "completadas" ? { completada: true } : { completada: false };
  const filtradas = await db.collection("tareas").find(filtro).toArray();

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
  const pendientes = await (await conectar())
    .collection("tareas")
    .find({ completada: false })
    .toArray();

  if (pendientes.length === 0) {
    console.log("Todas las tareas ya están completadas.");
    return;
  }

  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Selecciona la tarea que deseas marcar como completada:",
      choices: pendientes.map((t) => ({ name: t.descripcion, value: t.id })),
    },
  ]);

  const db = await conectar();
  await db.collection("tareas").updateOne({ id }, { $set: { completada: true } });

  console.log("Tarea marcada como completada!");
}

export async function editarTarea() {
  const tareas = await leerTareas();
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

  const db = await conectar();
  await db.collection("tareas").updateOne({ id }, { $set: { descripcion: nuevaDescripcion } });

  console.log("Tarea editada con éxito!");
}

export async function eliminarTarea() {
  const tareas = await leerTareas();
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

  const db = await conectar();
  await db.collection("tareas").deleteOne({ id });

  console.log("Tarea eliminada con éxito!");
}