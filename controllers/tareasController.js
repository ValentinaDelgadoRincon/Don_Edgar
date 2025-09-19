
import inquirer from 'inquirer';
import _ from "lodash";
import { tareas } from '../data/tareas.js';
import { conectar } from '../config/persistenciaArchivos.js';

export async function agregarTarea() {
  try {
    const { titulo, descripcion, prioridad } = await inquirer.prompt([
      { type: "input", name: "titulo", message: "Título de la tarea:" },
      { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' },
      {
        type: "list",
        name: "prioridad",
        message: "Prioridad:",
        choices: ["alta", "media", "baja"],
        default: "media"
      }
    ]);

    if (_.isEmpty(titulo.trim())) {
      console.log(" El título no puede estar vacío.");
      return;
    }
    const nueva = {
      id: Date.now(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      prioridad,
      estado: "pendiente"
    };

    const db = await conectar();
    const coleccion = db.collection("edgarEnLaNube");
    await coleccion.insertOne(nueva);
    tareas.push(nueva);

    tareas.splice(0, tareas.length, ..._.uniqBy(tareas, "titulo"));

    console.log('✅ Tarea agregada.');
  } catch (error) {
    console.log("Error al insertar nueva tarea", error)
  }

}

export async function listarTareas() {
  try {
    const db = await conectar();
    const coleccion = db.collection("edgarEnLaNube");
    const tareas = await coleccion.find().toArray();
    if (_.isEmpty(tareas)) {
      console.log('📭 No hay tareas registradas.');
      return;
    }
    const ordenadas = _.orderBy(tareas, ["prioridad", "descripcion"], ["asc", "asc"]);
    const agrupadas = _.groupBy(ordenadas, "estado");

    console.log("\n📋 Pendientes:");
    console.table(agrupadas["pendiente"] || []);

    console.log("\n📋 En progreso:");
    console.table(agrupadas["en progreso"] || []);

    console.log("\n📋 Completadas:");
    console.table(agrupadas["completada"] || []);

  } catch (error) {
    console.log(" Error al listar tareas:", error);
  }
}


export async function editarTarea() {
  try {
    const db = await conectar();
    const coleccion = db.collection("edgarEnLaNube");
    const tareas = await coleccion.find().toArray();

    if (_.isEmpty(tareas)) return console.log('⚠️ No hay tareas para editar.');

    const { tareaId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tareaId',
        message: 'Selecciona una tarea para editar:',
        choices: tareas.map((t) => ({
          name: t.descripcion,
          value: t.id
        }))
      }
    ]);

    const { nuevaDescripcion } = await inquirer.prompt([
      { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
    ]);

    await coleccion.updateOne(
      { id: tareaId },
      { $set: { descripcion: nuevaDescripcion.trim() } }
    );

    console.log('✏️ Tarea actualizada.');
  } catch (error) {
    console.log("Error al actualizar la tarea...", error);
  }

}

export async function eliminarTarea() {
  try {
    const db = await conectar();
    const coleccion = db.collection("edgarEnLaNube");
    const tareas = await coleccion.find().toArray();

    if (_.isEmpty(tareas)) return console.log('⚠️ No hay tareas para eliminar.');

    const { tareaId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tareaId',
        message: 'Selecciona una tarea para eliminar:',
        choices: tareas.map((t) => ({
          name: t.descripcion,
          value: t.id
        }))
      }
    ]);

    await coleccion.deleteOne({ id: tareaId })

    console.log('🗑️ Tarea eliminada.');
  } catch (error) {
    console.log("Error al eliminar tarea", error)
  }

}

export async function cambiarEstado(id, nuevoEstado) {
  try {
    const db = await conectar();
    const coleccion = db.collection("edgarEnLaNube");
    const tarea = await coleccion.findOne({ id });

    if (_.isEmpty(tarea)) {
      console.log("Tarea no encontrada");
      return;
    };

    await coleccion.updateOne(
      { id },
      { $set: { estado: nuevoEstado } }
    )
    console.log("Estado actualizado correctamente.");
  } catch (error) {
    console.log("Error al cambiar estado", error)
  }
}


export async function buscarTareas(palabraClave) {
  try {
    const db = await conectar();
    const coleccion = db.collection("edgarEnLaNube");
    const tareas = await coleccion.find({
      $or: [
        { titulo: { $regex: palabraClave, $options: "i" } },
        { descripcion: { $regex: palabraClave, $options: "i" } }
      ]
    }).toArray();

    if (_.isEmpty(tareas)) {
      console.log("No se encontraron coincidencias");
      return;
    }
    console.log(" Resultados de la búsqueda:");
    console.table(tareas);
  } catch (error) {
    console.log(" Error al buscar tarea", error);
  }
}

