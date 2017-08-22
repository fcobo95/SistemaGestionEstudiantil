//Se "rellena" PlantillaInformaHogar.html, la misma es cargada en la vista de Consultas.
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
    case "MAT":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Mat").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Mat").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Mat").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalMat").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condMat").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Mat").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Mat_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Mat").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Mat_cond").innerHTML = elValor["condicion2"];
        }
        break;

    case "ING":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Ing").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Ing").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Ing").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalIng").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condIng").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Ing").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Ing_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Ing").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Ing_cond").innerHTML = elValor["condicion2"];
        }
        break;

    case "EFI":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Efi").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Efi").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Efi").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalEfi").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condEfi").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Efi").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Efi_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Efi").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Efi_cond").innerHTML = elValor["condicion2"];
        }
        break;
    case "MUS":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Mus").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Mus").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Mus").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalMus").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condMus").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Mus").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Mus_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Mus").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Mus_cond").innerHTML = elValor["condicion2"];
        }
        break;
    case "REL":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Rel").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Rel").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Rel").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalRel").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condRel").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Rel").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Rel_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Rel").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Rel_cond").innerHTML = elValor["condicion2"];
        }
        break;
    case "INF":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Inf").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Inf").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Inf").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalInf").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condInf").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Inf").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Inf_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Inf").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Inf_cond").innerHTML = elValor["condicion2"];
        }
        break;
    case "CON":
        if (elValor["periodo1"] != null) {
            document.getElementById("p1Con").innerHTML = elValor["periodo1"];
        }
        if (elValor["periodo2"] != null) {
            document.getElementById("p2Con").innerHTML = elValor["periodo2"];
        }
        if (elValor["periodo3"] != null) {
            document.getElementById("p3Con").innerHTML = elValor["periodo3"];
        }
        if (elValor["final"] != null) {
            document.getElementById("finalCon").innerHTML = elValor["final"];
        }
        if (elValor["condicion"] != null) {
            document.getElementById("condCon").innerHTML = elValor["condicion"];
        }
        if (elValor["convocatoria1"] != null) {
            document.getElementById("conv1Con").innerHTML = elValor["convocatoria1"];
        }
        if (elValor["condicion1"] != null) {
            document.getElementById("conv1Con_cond").innerHTML = elValor["condicion1"];
        }
        if (elValor["convocatoria2"] != null) {
            document.getElementById("conv2Con").innerHTML = elValor["convocatoria2"];
        }
        if (elValor["condicion2"] != null) {
            document.getElementById("conv2Con_cond").innerHTML = elValor["condicion2"];
        }
        break;
}
});