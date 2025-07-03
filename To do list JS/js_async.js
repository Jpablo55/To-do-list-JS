const formulario = document.getElementById('formulario');
const inputTarea = document.getElementById('tareaInput');
const listaTareas = document.getElementById('listaTareas');

const API_URL = 'http://localhost:3000/tareas';

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', mostrarTareas);

// Evento submit para agregar tarea
formulario.addEventListener('submit', async function (event) {
  event.preventDefault();
  const descripcion = inputTarea.value.trim();

  if (descripcion !== '') {
    const nuevaTarea = {
      descripcion: descripcion,
      completada: false
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaTarea)
      });
      inputTarea.value = '';
      await mostrarTareas();
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  }
});

// Mostrar tareas en pantalla
async function mostrarTareas() {
  listaTareas.innerHTML = '';

  try {
    const respuesta = await fetch(API_URL);
    const tareas = await respuesta.json();

    tareas.forEach(tarea => {
      const div = document.createElement('div');
      div.textContent = tarea.descripcion;

      if (tarea.completada) {
        div.style.textDecoration = 'line-through';
      }

      // Botón: Marcar como completada
      const botonCompletar = document.createElement('button');
      botonCompletar.textContent = '✅';
      botonCompletar.addEventListener('click', async () => {
        try {
          await fetch(`${API_URL}/${tarea.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completada: !tarea.completada })
          });
          await mostrarTareas();
        } catch (error) {
          console.error('Error al actualizar tarea:', error);
        }
      });

      // Botón: Eliminar
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = '❌';
      botonEliminar.style.marginLeft = '10px';
      botonEliminar.addEventListener('click', async () => {
        try {
          await fetch(`${API_URL}/${tarea.id}`, {
            method: 'DELETE'
          });
          await mostrarTareas();
        } catch (error) {
          console.error('Error al eliminar tarea:', error);
        }
      });

      div.appendChild(botonCompletar);
      div.appendChild(botonEliminar);
      listaTareas.appendChild(div);
    });
  } catch (error) {
    console.error('Error al mostrar tareas:', error);
  }
}
