# ☁️ Don Edgar CLI - Versión MongoDB 🚀

![MongoDB Badge](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

> “Muy bonito tu sistemita con `fs`, muchach@...  
> Pero eso ya no es suficiente. ¡Quiero la nube! ¡Quiero MongoDB!” – Don Edgar 😎☕

Este proyecto es la evolución del gestor de tareas en consola.  
Ahora toda la persistencia se realiza en **MongoDB**, dejando atrás los archivos `.json`.  
Con esto, tu sistema ya no depende de un pendrive: ¡está listo para la nube! 🌩️✨

---

## ✨ Características principales

- 📦 **Persistencia en MongoDB** (adiós `fs`, hola base de datos real).
- 🧩 **Arquitectura modular** con separación de responsabilidades:
  - 📁 `config/` → conexión con MongoDB.
  - 📝 `controllers/` → lógica principal de tareas.
  - 🛠️ `utils/` → utilidades de menú y CLI.
- 🎛️ **Interfaz CLI con Inquirer**.
- ✅ Operaciones soportadas:
  - ➕ Crear tareas.
  - 📋 Listar todas o por estado.
  - ✔️ Marcar tareas como completadas.
  - 🗑️ Eliminar tareas.
- 🚫 Validaciones claras (no se permiten tareas vacías, mensajes amigables en consola).

---

## ⚙️ Instalación ⚡

1. Clonar este repositorio (en la rama correspondiente a MongoDB):

```bash
git clone <URL_DEL_REPO>
cd Don_Edgar
git checkout mongo
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar la conexión a MongoDB:  
   Crea un archivo `.env` en la raíz con el siguiente contenido:

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=edgarEnLaNube
```


---

## ▶️ Ejecución 🚀

Inicia la aplicación con:

```bash
npm start
```

o directamente con:

```bash
node index.js
```

---

## 🧪 Ejemplo de uso

- **Crear tarea**  
  ```
  > Nueva tarea: "Preparar café para Don Edgar ☕"
  ```

- **Listar tareas**  
  ```
  > Tareas pendientes:
    [ ] Preparar café para Don Edgar
  ```

- **Marcar como completada**  
  ```
  > ✔️ Tarea completada: "Preparar café para Don Edgar"
  ```

- **Eliminar tarea**  
  ```
  > 🗑️ Tarea eliminada
  ```

---

## 📁 Estructura del proyecto 📂

```
Don_Edgar/
├── index.js               # 🎬 Punto de entrada
├── package.json           # 📦 Dependencias y scripts
├── config/
│   └── persistenciaArchivos.js   # 🔗 Conexión MongoDB
├── controllers/
│   └── tareasController.js       # 📝 Lógica de tareas
├── data/
│   └── tareas.js                 # 📊 Datos iniciales / dummy
└── utils/
    └── menu.js                   # 🛠️ Menú CLI con Inquirer
```

---

## 🎩 Créditos

Reto realizado como parte del taller de migración a MongoDB.  
Don Edgar **no acepta excusas… pero sí aplaude el buen código**. 👏💻🚀

## 📩 Contacto GitHub
- https://github.com/ValentinaDelgadoRincon
- https://github.com/CamilaFlorez12 
