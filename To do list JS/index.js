// Paso 1: Referencia al formulario
const formulario = document.getElementById('formulario');
const inputTarea = document.getElementById('tareaInput');
const listaTareas = document.getElementById('listaTareas');

// Paso 4: Array para almacenar tareas
const tareas = [];

// Paso 2: Evento submit del formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar recarga

  // Paso 3: Captura del texto ingresado
  const descripcion = inputTarea.value.trim();

  if (descripcion !== '') {
    // Paso 4: Crear objeto y guardar en array
    const nuevaTarea = {
      descripcion: descripcion,
      completada: false
    };
    tareas.push(nuevaTarea);

    // Limpiar input
    inputTarea.value = '';

    // Paso 7: Refrescar lista
    mostrarTareas();
  }
});

// Paso 5: Función para mostrar tareas
function mostrarTareas() {
  listaTareas.innerHTML = '';

  tareas.forEach((tarea, index) => {
    const div = document.createElement('div');
    div.textContent = tarea.descripcion;

    if (tarea.completada) {
      div.style.textDecoration = 'line-through';
    }

    // Botón: Marcar como completada
    const botonCompletar = document.createElement('button');
    botonCompletar.textContent = '✅';
    botonCompletar.addEventListener('click', function() {
      tareas[index].completada = !tareas[index].completada;
      mostrarTareas();
    });

    // 🔹 BONUS: Botón para eliminar tarea
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '❌';
    botonEliminar.style.marginLeft = '10px'; // Espacio entre botones
    botonEliminar.addEventListener('click', function() {
      tareas.splice(index, 1); // Eliminar tarea por índice
      mostrarTareas();
    });

    // Agregar ambos botones
    div.appendChild(botonCompletar);
    div.appendChild(botonEliminar);
    listaTareas.appendChild(div);
  });
}
