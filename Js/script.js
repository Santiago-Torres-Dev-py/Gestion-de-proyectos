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
        alert("Escribe un nombre para el proyecto.")
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
        alert("Escribe un nombre.")
    return;
    }

    proyectos[indiceProyecto].miembros.push(nombreMiembro);

    guardarProyectos();

    mostrarProyectos();

    input.value = "";
}

//Muestra proyectos en pantalla.
function mostrarProyectos(){
    const contenedor = document.getElementById("div_proyectos");

    //Limpia el contenedor
    contenedor.innerHTML = "<h2 class='subtitulo_2'>Proyectos:</h2>";

    //Recorre los proyectos.
    proyectos.forEach(function(proyecto, indice){
        const nuevoProyecto = document.createElement("div");
        nuevoProyecto.classList.add("proyecto");

        let htmlMiembros = "";
        proyecto.miembros.forEach(function(miembro){
            htmlMiembros += `<p>${miembro}</p>`;
        });

        nuevoProyecto.innerHTML = `
        <h3>${proyecto.nombre}</h3>
        <button onclick="eliminarProyecto(${indice})">X</button>

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
        `;

        contenedor.appendChild(nuevoProyecto);
    });
    
}

//Elimina el proyecto en especifico.
function eliminarProyecto(indice){
    proyectos.splice(indice, 1);

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