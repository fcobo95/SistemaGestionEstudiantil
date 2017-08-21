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

lasNotas = elEstudianteComoJSON["notas"];
jQuery.each(lasNotas, function(laLlave, elValor) {
    laMateria = laLlave.substring(0, 3);
    switch(laMateria) {
    case "SOC":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Soc").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Soc").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Soc").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalSoc").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condSoc").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Soc").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Soc_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Soc").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Soc_cond").innerHTML = elValor["condicion2"];
        }
        break;
    case "ECI":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Eci").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Eci").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Eci").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalEci").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condEci").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Eci").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Eci_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Eci").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Eci_cond").innerHTML = elValor["condicion2"];
        }
        break;
    case "ESP":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Esp").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Esp").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Esp").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalEsp").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condEsp").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Esp").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Esp_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Esp").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Esp_cond").innerHTML = elValor["condicion2"];
        }
        break;
}
});