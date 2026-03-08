//Lista donde se guardan los proyectos.
let proyectos = [];

//Carga los proyectos guardados.
window.onload = function(){
    const proyectosGuardados = localStorage.getItem("proyectos");

    if(proyectosGuardados){
        proyectos = JSON.parse(proyectosGuardados);
        
        proyectos.forEach(function(proyecto){
            if(!proyecto.miembros){
                proyecto.miembros = [];
            }

            if(!proyecto.tareas){
                proyecto.tareas = [];
            }
        });

        mostrarProyectos();
    }
}

//Función para crear proyectos.
function crearProyecto(){

    //Obtiene el input donde el usuario escribe.
    const input = document.getElementById("input_nombre_proyectos");
    
    //Obtiene el texto diligenciado en el input.
    const nombreProyecto = input.value;
    
    //Evita darle al botón con el input vació.
    if(nombreProyecto.trim() === ""){
        alert("Escribe un nombre para el proyecto.");
        return;
    }
    //Evita crear proyectos con el mismo nombre.
    if(proyectos.some(p => p.nombre === nombreProyecto)){
        alert("Ya existe un proyecto con ese nombre.");
        return;
    }

    //Crea objeto proyecto.
    const proyecto = {
        nombre: nombreProyecto,
        miembros: [],
        tareas: []
    };

    //Guarda en la lista.
    proyectos.push(proyecto);

    //Guarda los datos en localStorage.
    guardarProyectos();

    //Muestra los proyectos.
    mostrarProyectos();

    //Limpia el input.
    input.value = "";
}

//Guarda los proyectos en localStorage.
function guardarProyectos(){
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
}

//Agrega Miembros a la lista.
function agregarMiembro(indiceProyecto){
    const input = document.getElementById("input_miembro_" + indiceProyecto);
    const nombreMiembro = input.value;

    if(nombreMiembro.trim() === ""){
        alert("Escribe un nombre.");
    return;
    }

    if(proyectos[indiceProyecto].miembros.includes(nombreMiembro)){
    alert("Ese miembro ya existe.");
    return;
    }

    proyectos[indiceProyecto].miembros.push(nombreMiembro);

    guardarProyectos();

    mostrarProyectos();

    input.value = "";
}

//Agrega tareas a los proyectos.
function agregarTarea(indiceProyecto){
    const inputTarea = document.getElementById("input_tarea_" + indiceProyecto);
    const selectResponsable = document.getElementById("select_responsable_" + indiceProyecto);
    const nombreTarea = inputTarea.value;
    const responsable = selectResponsable.value;

    if(proyectos[indiceProyecto].miembros.length === 0){
    alert("Primero agrega miembros al proyecto");
    return;
    }

    if(nombreTarea.trim() === ""){
        alert("Escribe una tarea.");
        return;
    }

    if(responsable.trim() === ""){
        alert("Seleccione un responsable.");
        return;
    }

    const tarea = {
        nombre: nombreTarea,
        responsable: responsable
    };

    proyectos[indiceProyecto].tareas.push(tarea);

    guardarProyectos();

    mostrarProyectos();

    inputTarea.value = "";
}

//Muestra proyectos en pantalla.
function mostrarProyectos(){
    const contenedor = document.getElementById("div_proyectos");

    //Limpia el contenedor antes de mostrar los proyectos.
    contenedor.innerHTML = `<h2 class="subtitulo_2">Proyectos:</h2>`;

    //Si no hay proyectos, muestra un mensaje.
    if(proyectos.length === 0){
        contenedor.innerHTML = `
        <h2 class="subtitulo_2">Proyectos:</h2>
        <p>No hay proyectos creados.</p>
        `;
        return;
    }

    //Recorre los proyectos.
    proyectos.forEach(function(proyecto, indice){

        const nuevoProyecto = document.createElement("div");
        nuevoProyecto.classList.add("proyecto");

        let htmlMiembros = "";
        proyecto.miembros.forEach(function(miembro, indexMiembro){
            htmlMiembros += `
            <p>
            ${miembro} 
            <button onclick="eliminarMiembro(${indice}, ${indexMiembro})">X</button>
            </p>
            `;
        });
        
        let opcionesMiembros = "";
        proyecto.miembros.forEach(function(miembro){
            opcionesMiembros += `<option value="${miembro}">${miembro}</option>`;
        });

        let htmlTareas = "";
        proyecto.tareas.forEach(function(tarea, indexTarea){
            htmlTareas += `
            <p>
            ${tarea.nombre} - ${tarea.responsable}
            <button onclick="eliminarTarea(${indice}, ${indexTarea})">X</button>
            </p>
            `;
        });

        nuevoProyecto.innerHTML = `
        <div class="encabezado_proyecto">
            <h3>${proyecto.nombre}</h3>
            <button onclick="eliminarProyecto(${indice})">X</button>
        </div>

        <h4>Miembros</h4>

        <input 
            type="text" 
            id="input_miembro_${indice}" 
            placeholder="Nombre del miembro"
        >

        <button onclick="agregarMiembro(${indice})">
            Agregar
        </button>

        <div class="lista_miembros">
            ${htmlMiembros}
        </div>

        <h4>Tareas</h4>

        <input
            type="text"
            id="input_tarea_${indice}"
            placeholder="Nombre de la tarea"
        >

        <select id="select_responsable_${indice}">
            <option value="">Seleccionar responsable</option>
            ${opcionesMiembros}
        </select>

        <button onclick="agregarTarea(${indice})">
            Agregar tarea
        </button>

        <div class="lista_tareas">
            ${htmlTareas}
        </div>
        `;

        contenedor.appendChild(nuevoProyecto);
    });
    
}

//Elimina el proyecto en especifico.
function eliminarProyecto(indice){

    if(!confirm("¿Eliminar este proyecto?")){
        return;
    }

    proyectos.splice(indice, 1);

    guardarProyectos();

    mostrarProyectos();
}

//Elimina miembros en especifico.
function eliminarMiembro(indiceProyecto, indiceMiembro){

    proyectos[indiceProyecto].miembros.splice(indiceMiembro, 1);

    guardarProyectos();

    mostrarProyectos();
}

//Elimina Tareas en especifico.
function eliminarTarea(indiceProyecto, indiceTarea){

    proyectos[indiceProyecto].tareas.splice(indiceTarea, 1);

    guardarProyectos();

    mostrarProyectos();
}

//Borra los datos del localStorage.
function borrarProyectos(){
    if(confirm("¿Seguro que quiere borrar todos los proyectos?")){
        
    localStorage.removeItem("proyectos");

    proyectos = [];

    mostrarProyectos();
    }
}