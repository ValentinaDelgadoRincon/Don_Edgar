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
