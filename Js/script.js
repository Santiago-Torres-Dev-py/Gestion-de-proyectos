//Lista donde se guardan los proyectos.
let proyectos = [];

//Carga los proyectos guardados.
window.onload = function(){
    const proyectosGuardados = localStorage.getItem("proyectos");

    if(proyectosGuardados){
        proyectos = JSON.parse(proyectosGuardados);
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
        nombre: nombreProyecto
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

//Muestra proyectos en pantalla.
function mostrarProyectos(){
    const contenedor = document.getElementById("div_proyectos");

    //Limpia el contenedor
    contenedor.innerHTML = "<h2 class='subtitulo_2'>Proyectos:</h2>";

    //Recorre los proyectos.
    proyectos.forEach(function(proyecto, indice){
        const nuevoProyecto = document.createElement("div");

        nuevoProyecto.classList.add("proyecto");

        nuevoProyecto.innerHTML = `
        <h3>${proyecto.nombre}</h3>
        <button onclick="eliminarProyecto(${indice})">X</button>
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