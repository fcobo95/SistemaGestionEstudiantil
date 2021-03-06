/*
   Consultas.js es implementado en AsignaciónNotas y Asistencias para filtrar información.
   Acá se tiene métodos para ir modificando las opciones de cada select en Consultas.html.
   Estas Consultas son para reportes principalmente, acá se tienen los reportes existentes
   y se le cargan los datos que son obtenidos desde el servidor.
*/

function modificarNivel() {

    $(".alert").hide();

    var elMenuDeCiclos = document.getElementById("ciclo");
    var elCiclo = elMenuDeCiclos.options[elMenuDeCiclos.selectedIndex].text;

    var elMenuDeNiveles = document.getElementById("nivel");
    $('#nivel').empty();
    var elementoVacio = document.createElement("option");
    elementoVacio.text = "";
    elMenuDeNiveles.add(elementoVacio);

    switch (elCiclo) {
        case 'Primer':
            for (elNivel = 1; elNivel < 4; elNivel++) {
                var nuevoElemento = document.createElement("option");
                nuevoElemento.text = elNivel.toString();
                elMenuDeNiveles.add(nuevoElemento);
            }
            break;

        case 'Segundo':
            for (elNivel = 4; elNivel < 7; elNivel++) {
                var nuevoElemento = document.createElement("option");
                nuevoElemento.text = elNivel.toString();
                elMenuDeNiveles.add(nuevoElemento);
            }
            break;

        case 'Tercer':
            for (elNivel = 7; elNivel < 10; elNivel++) {
                var nuevoElemento = document.createElement("option");
                nuevoElemento.text = elNivel.toString();
                elMenuDeNiveles.add(nuevoElemento);
            }
            break;

        case 'Cuarto':
            for (elNivel = 10; elNivel < 12; elNivel++) {
                var nuevoElemento = document.createElement("option");
                nuevoElemento.text = elNivel.toString();
                elMenuDeNiveles.add(nuevoElemento);
            }
            break;

        default:
            $("#errorCiclo").show()
    }
}

function modificarSeccion() {

    $(".alert").hide();

    var elMenuDeNiveles = document.getElementById("nivel");
    var elNivel = elMenuDeNiveles.options[elMenuDeNiveles.selectedIndex].text;
    var elMenuDeSecciones = document.getElementById("seccion");

    if (elNivel == "") {
        $("#errorNivel").show();
        $('#seccion').empty();
        var elementoVacio = document.createElement("option");
        elementoVacio.text = "";
        elMenuDeSecciones.add(elementoVacio);
    } else {
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
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify({"nivel": elNivel})
        };
        $.ajax(settings).done(function (response) {
            lasSecciones = response['secciones'];
            laCantidadDeSecciones = lasSecciones.length;
            elContador = 0;
            while (elContador < laCantidadDeSecciones) {
                var nuevoElemento = document.createElement("option");
                nuevoElemento.text = lasSecciones[elContador];
                elMenuDeSecciones.add(nuevoElemento);
                elContador += 1
            }
        });
    }
}

function modificarEstudiante() {

    $(".alert").hide();

    var elMenuDeSecciones = document.getElementById("seccion");
    var laSeccion = elMenuDeSecciones.options[elMenuDeSecciones.selectedIndex].text;
    var elMenuDeEstudiantes = document.getElementById("estudiante");

    if (laSeccion == "") {
        $("#errorSeccion").show();
        $('#estudiante').empty();
        var elementoVacio = document.createElement("option");
        elementoVacio.text = "";
        elMenuDeEstudiantes.add(elementoVacio);
    } else {
        $('#estudiante').empty();
        var elementoVacio = document.createElement("option");
        elementoVacio.text = "";
        elMenuDeEstudiantes.add(elementoVacio);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://127.0.0.1:5000/obtengaEstudiantes",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "c74b583f-d742-4792-0dc8-29732420b2bf"
            },
            "processData": false,
            "data": JSON.stringify({"seccion": laSeccion})
        };

        $.ajax(settings).done(function (response) {

            sessionStorage.clear();
            laCantidadDeEstudiantes = Object.keys(response).length;
            elContador = 1;

            while (elContador < laCantidadDeEstudiantes + 1) {
                laIdentificacion = response[elContador.toString()]["identificacion"];
                elNombre = response[elContador.toString()]["nombre"];
                elApellido1 = response[elContador.toString()]["apellido1"];
                elApellido2 = response[elContador.toString()]["apellido2"];
                elNombreCompleto = elNombre + " " + elApellido1 + " " + elApellido2;

                var nuevoElemento = document.createElement("option");
                nuevoElemento.text = elNombreCompleto;
                elMenuDeEstudiantes.add(nuevoElemento);

                sessionStorage.setItem(elContador, laIdentificacion);

                elContador += 1
            }
        });
    }
}

function modificarAnos() {

    $(".alert").hide();

    var elMenuDeEstudiantes = document.getElementById("estudiante");
    var elEstudiante = elMenuDeEstudiantes.options[elMenuDeEstudiantes.selectedIndex].text;
    var elMenuDeAnos = document.getElementById("ano");
    elAnoActual = new Date().getFullYear();

    if (elEstudiante == "") {
        $("#errorEstudiante").show();
        $('#ano').empty();
        var elementoVacio = document.createElement("option");
        elementoVacio.text = "";
        elMenuDeAnos.add(elementoVacio);
    } else {
        for (elContador = 0; elContador < 11; elContador++) {
            var nuevoElemento = document.createElement("option");
            nuevoElemento.text = elAnoActual.toString();
            elMenuDeAnos.add(nuevoElemento);
            elAnoActual -= 1
        }
    }
}

function cargarInformeHogar() {
    traerDatos();
    $("#informe").load("informeHogar");
    $("#botonImprimir").show();
}

function cargarFormula14() {
    traerDatos();
    $("#informe").load("formula14");
    $("#botonImprimir").show();
}

function imprimirInforme() {
    var printContents = document.getElementById("informe").innerHTML;
    var newWindow = window.open();
    newWindow.document.write(printContents);
    newWindow.print();
    newWindow.close();
}

function traerDatos() {
    var elIndiceDelEstudiante = document.getElementById("estudiante").selectedIndex;
    var laIdentificacion = sessionStorage.getItem(elIndiceDelEstudiante);
    var elAno = document.getElementById("ano").value;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:5000/datosInformeHogar",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify({"identificacion": laIdentificacion, "ano": elAno})
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        localStorage.setItem('estudiante', JSON.stringify(response));
    });
}