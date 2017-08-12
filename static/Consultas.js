function modificarNivel(){

    $(".alert").hide()

    var elMenuDeCiclos = document.getElementById("ciclo");
    var elCiclo = elMenuDeCiclos.options[elMenuDeCiclos.selectedIndex].text;

    var elMenuDeNiveles= document.getElementById("nivel");
    $('#nivel').empty();
    var elementoVacio = document.createElement("option");
    elementoVacio.text = "";
    elMenuDeNiveles.add(elementoVacio);

    switch (elCiclo)
    {
        case 'Primer':
        for(elNivel = 1; elNivel < 4; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
        }
        break;

        case 'Segundo':
        for(elNivel = 4; elNivel < 7; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
        }
        break;

        case 'Tercer':
        for(elNivel = 7; elNivel < 10; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
        }
        break;

        case 'Cuarto':
        for(elNivel = 10; elNivel < 12; elNivel++){
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elNivel.toString();
            elMenuDeNiveles.add(nuevoElemento);
        }
        break;

        default:
            $("#errorCiclo").show()
    }
}

function modificarSeccion(){

    $(".alert").hide()

    var elMenuDeNiveles = document.getElementById("nivel");
    var elNivel = elMenuDeNiveles.options[elMenuDeNiveles.selectedIndex].text;

    var elMenuDeSecciones= document.getElementById("seccion");
    $('#seccion').empty();
    var elementoVacio = document.createElement("option");
    elementoVacio.text = "";
    elMenuDeSecciones.add(elementoVacio);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:5000/obtengaSecciones",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "1daca2df-ebcd-1314-f917-4f39bd27a675"
        },
        "processData": false,
        "data": JSON.stringify({"nivel": elNivel})
}

$.ajax(settings).done(function (response) {
  lasSecciones = response['secciones'];
  laCantidadDeSecciones = lasSecciones.length;
  elContador = 0
  while (elContador < laCantidadDeSecciones){
    var nuevoElemento = document.createElement("option");
    nuevoElemento.text = lasSecciones[elContador];
    elMenuDeSecciones.add(nuevoElemento);
    elContador += 1
  }
});

}