var elIndiceDelEstudiante = document.getElementById("estudiante").selectedIndex;
var laIdentificacion = sessionStorage.getItem(elIndiceDelEstudiante);
document.getElementById("identificacion").innerHTML = laIdentificacion;

var elEstudiante = localStorage.getItem('estudiante');
var elEstudianteComoJSON = JSON.parse(elEstudiante);

var elNombre = elEstudianteComoJSON["datos"]["nombre"];
var elApellido1 = elEstudianteComoJSON["datos"]["apellido1"];
var elApellido2 = elEstudianteComoJSON["datos"]["apellido2"];
var elNombreCompleto = elApellido1 + " " + elApellido2 + " " + elNombre;
elContenido = document.getElementById("estudianteInforme").innerHTML = elNombreCompleto;

var elCiclo = elEstudianteComoJSON["datos"]["ciclo"];
document.getElementById("cicloInforme").innerHTML = elCiclo;

var elNivel = elEstudianteComoJSON["datos"]["nivel"];
document.getElementById("nivelInforme").innerHTML = elNivel;

var laSeccion = elEstudianteComoJSON["datos"]["seccion"];
document.getElementById("seccionInforme").innerHTML = laSeccion;