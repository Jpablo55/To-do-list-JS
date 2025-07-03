const formulario = document.getElementById('formulario');
const inputTarea = document.getElementById('tareaInput');
const listaTareas = document.getElementById('listaTareas');

const API_URL = 'http://localhost:3000/tareas';

// Obtener y mostrar tareas al cargar
document.addEventListener('DOMContentLoaded', mostrarTareas);

// Envío del formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const descripcion = inputTarea.value.trim();
  if (descripcion !== '') {
    const nuevaTarea = {
      descripcion: descripcion,
      completada: false
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaTarea)
    })
    .then(() => {
      inputTarea.value = '';
      mostrarTareas();
    });
  }
});

// Mostrar todas las tareas
function mostrarTareas() {
  listaTareas.innerHTML = '';

  fetch(API_URL)
    .then(response => response.json())
    .then(tareas => {
      tareas.forEach(tarea => {
        const div = document.createElement('div');
        div.textContent = tarea.descripcion;
        if (tarea.completada) {
          div.style.textDecoration = 'line-through';
        }

        // Botón completar
        const botonCompletar = document.createElement('button');
        botonCompletar.textContent = '✅';
        botonCompletar.addEventListener('click', () => {
          fetch(`${API_URL}/${tarea.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completada: !tarea.completada })
          }).then(mostrarTareas);
        });

        // Botón eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '❌';
        botonEliminar.style.marginLeft = '10px';
        botonEliminar.addEventListener('click', () => {
          fetch(`${API_URL}/${tarea.id}`, {
            method: 'DELETE'
          }).then(mostrarTareas);
        });

        div.appendChild(botonCompletar);
        div.appendChild(botonEliminar);
        listaTareas.appendChild(div);
      });
    });
}
