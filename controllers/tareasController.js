
import inquirer from 'inquirer';
import { tareas } from '../data/tareas.js';
import { conectar } from '../config/persistenciaArchivos.js';

export async function agregarTarea() {
  try {
    const { descripcion } = await inquirer.prompt([
      { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
    ]);

    const nueva = {
      id: Date.now(),
      descripcion: descripcion.trim(),
      completada: false
    };

    const db = await conectar();
    const coleccion = db.collection("edgarEnLaNube");
    await coleccion.insertOne(nueva);
    tareas.push(nueva);

    console.log('✅ Tarea agregada.');
  } catch (error) {
    console.log("Error al insertar nueva tarea", error)
  }

}

export async function listarTareas() {
  const db = await conectar();
  const coleccion = db.collection("edgarEnLaNube");
  const tareas = await coleccion.find().toArray();
  if (tareas.length === 0) {
    console.log('📭 No hay tareas registradas.');

import _ from "lodash";
import {tareas} from "../data/tareas.js";


function agregarTarea(titulo, descripcion, prioridad = "media") {
  if (_.isEmpty(titulo.trim())) {
    console.log("El título no puede estar vacío.");
    return;
  }

  const nuevaTarea = {
    id: _.uniqueId("tarea_"),
    titulo,
    descripcion,
    estado: "pendiente",
    prioridad
  };

  tareas.push(nuevaTarea);


tareas.splice(0, tareas.length, ..._.uniqBy(tareas, "titulo"));

  console.log("Tarea agregada correctamente.");
}

function listarTareas() {
  if (_.isEmpty(tareas)) {
    console.log("No hay tareas registradas.");

    return;
  }


  const ordenadas = _.orderBy(tareas, ["prioridad", "titulo"], ["asc", "asc"]);
  const agrupadas = _.groupBy(ordenadas, "estado");

  console.log("\nPendientes:");
  console.table(agrupadas["pendiente"] || []);

  console.log("\nEn progreso:");
  console.table(agrupadas["en progreso"] || []);

  console.log("\nCompletadas:");
  console.table(agrupadas["completada"] || []);
}


export async function editarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);

  const db = await conectar();
  const coleccion = db.collection("edgarEnLaNube");
  await coleccion.updateOne(
  {id:tareas[indice].id},
  {$set:{descripcion:nuevaDescripcion.trim()}}
  );

  tareas[indice].descripcion = nuevaDescripcion.trim();
  console.log('✏️ Tarea actualizada.');
}

export async function eliminarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const tareaEliminada = tareas[indice];

  const db = await conectar();
  const coleccion = db.collection("edgarEnLaNube");
  await coleccion.deleteOne({
    id:tareaEliminada.id
  })

  tareas.splice(indice, 1);
  console.log('🗑️ Tarea eliminada.');


function cambiarEstado(id, nuevoEstado) {
  const tarea = _.find(tareas, { id });
  if (!tarea) {
    console.log("Tarea no encontrada.");
    return;
  }
  tarea.estado = nuevoEstado;
  console.log("Estado actualizado correctamente.");
}


function buscarTareas(palabraClave) {
  const resultados = _.filter(tareas, (t) =>
    _.includes(t.titulo.toLowerCase(), palabraClave.toLowerCase())
  );

  if (_.isEmpty(resultados)) {
    console.log("No se encontraron coincidencias.");
    return;
  }

  console.log("Resultados de la búsqueda:");
  console.table(resultados);
}

export {
  agregarTarea,
  listarTareas,
  cambiarEstado,
  buscarTareas
};
